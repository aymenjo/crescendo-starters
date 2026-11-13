import type { Page } from "@playwright/test";

/**
 * Faux `embed.js` de Cal.com : il dépile la file du snippet officiel (`Cal.q`, `Cal.ns[…].q`),
 * dessine un iframe `data-testid="cal-embed"` pour chaque « inline », et garde les callbacks « on »
 * dans `window.__cal` pour simuler une réservation. Le vrai agenda se vérifie à la main sur la preview.
 */
const FAKE_EMBED = `
(function () {
  var Cal = window.Cal;
  window.__cal = { callbacks: {}, calls: [] };
  function handle(ns, args) {
    var action = args[0], opts = args[1] || {};
    window.__cal.calls.push([ns, action]);
    if (action === "inline") {
      var el = typeof opts.elementOrSelector === "string" ? document.querySelector(opts.elementOrSelector) : opts.elementOrSelector;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("data-testid", "cal-embed");
      iframe.setAttribute("data-cal-link", opts.calLink);
      iframe.setAttribute("data-namespace", ns);
      iframe.title = "Agenda simulé";
      iframe.style.width = "100%";
      iframe.style.height = "480px";
      iframe.srcdoc = "<p>Agenda simulé</p>";
      el.appendChild(iframe);
    } else if (action === "on") {
      (window.__cal.callbacks[ns] = window.__cal.callbacks[ns] || {})[opts.action] = opts.callback;
    }
  }
  function wire(ns, fn) {
    if (!fn || fn.__wired) return;
    fn.__wired = true;
    var pending = fn.q || [];
    fn.q = { push: function (args) { handle(ns, args); } };
    pending.forEach(function (args) { handle(ns, args); });
  }
  var rootPending = Cal.q || [];
  Cal.q = { push: function (args) {
    if (args[0] === "initNamespace") wire(args[1], Cal.ns[args[1]]);
    else handle("", args);
  } };
  rootPending.forEach(function (args) { Cal.q.push(args); });
  Object.keys(Cal.ns || {}).forEach(function (ns) { wire(ns, Cal.ns[ns]); });
})();
`;

export async function fakeCal(page: Page) {
  await page.route("https://app.cal.com/embed/embed.js", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: FAKE_EMBED }),
  );
}

/** Déclenche l'événement de succès de l'embed, comme après une vraie réservation. */
export async function simulateBooking(page: Page, namespace: string, uid: string) {
  await page.waitForFunction((ns) => !!(window as never as { __cal?: { callbacks: Record<string, Record<string, unknown>> } }).__cal?.callbacks[ns]?.bookingSuccessfulV2, namespace);
  await page.evaluate(
    ([ns, id]) => {
      const cal = (window as never as { __cal: { callbacks: Record<string, Record<string, (e: unknown) => void>> } }).__cal;
      cal.callbacks[ns].bookingSuccessfulV2({ detail: { data: { uid: id } } });
    },
    [namespace, uid] as const,
  );
}
