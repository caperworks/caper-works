/* Caper Works — small site helpers */
(function () {
	"use strict";

	// Send a conversion event for every WhatsApp, call and email click.
	// Works automatically once GA4 (gtag) and/or Meta Pixel (fbq) are added in <head>.
	document.addEventListener("click", function (e) {
		var link = e.target.closest && e.target.closest("a[href]");
		if (!link) return;

		var href = link.getAttribute("href") || "";
		var method = null;
		if (href.indexOf("wa.me/") !== -1) method = "whatsapp";
		else if (href.indexOf("tel:") === 0) method = "phone";
		else if (href.indexOf("mailto:") === 0) method = "email";
		if (!method) return;

		var label = (link.textContent || "").replace(/\s+/g, " ").trim();

		if (typeof window.gtag === "function") {
			window.gtag("event", "contact_click", { method: method, link_text: label });
		}
		if (typeof window.fbq === "function") {
			window.fbq("track", "Contact", { method: method, content_name: label });
		}
	});
})();
