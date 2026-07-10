/**

 * Bilingual UI (EN / EL). Preserves language in localStorage across scroll & interaction.

 * Reviews blockquotes, guest names, apartment titles, and hero brand headline stay in English.

 */

(function () {

  const STORAGE_KEY = "crr-lang";

  const DEFAULT_LANG = "en";

  const PHONE_TEL = "tel:+306945209164";



  const ENGLISH_ONLY_KEYS = new Set(["nav.brandLine1", "nav.brandLine2", "hero.title"]);



  function getNested(obj, path) {

    return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);

  }



  function getLocale(lang) {

    const map = { en: window.I18N_EN, el: window.I18N_EL };

    return map[lang] || map[DEFAULT_LANG];

  }



  function getLang() {

    const stored = localStorage.getItem(STORAGE_KEY);

    return stored === "el" ? "el" : DEFAULT_LANG;

  }



  function resolveString(lang, key) {

    if (ENGLISH_ONLY_KEYS.has(key)) {

      return getNested(getLocale("en"), key);

    }

    return getNested(getLocale(lang), key);

  }



  function setLang(lang) {

    const next = lang === "el" ? "el" : DEFAULT_LANG;

    localStorage.setItem(STORAGE_KEY, next);

    document.documentElement.lang = next === "el" ? "el" : "en";

    applyTranslations(next);

    updateSwitcherUI(next);

  }



  function applyTranslations(lang) {

    const t = getLocale(lang);

    if (!t) return;



    document.querySelectorAll("[data-i18n]").forEach((el) => {

      const key = el.getAttribute("data-i18n");

      const value = resolveString(lang, key);

      if (value == null) return;

      el.textContent = value;

    });



    document.querySelectorAll("[data-i18n-html]").forEach((el) => {

      const key = el.getAttribute("data-i18n-html");

      const value = resolveString(lang, key);

      if (value == null) return;

      el.innerHTML = value;

    });



    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

      const key = el.getAttribute("data-i18n-placeholder");

      const value = resolveString(lang, key);

      if (value == null) return;

      el.setAttribute("placeholder", value);

    });



    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {

      const key = el.getAttribute("data-i18n-aria");

      const value = resolveString(lang, key);

      if (value == null) return;

      el.setAttribute("aria-label", value);

    });



    const title = getNested(t, "meta.title");

    if (title) document.title = title;



    const desc = getNested(t, "meta.description");

    if (desc) {

      const meta = document.querySelector('meta[name="description"]');

      if (meta) meta.setAttribute("content", desc);

    }

  }



  function updateSwitcherUI(lang) {

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {

      const active = btn.getAttribute("data-lang-btn") === lang;

      btn.setAttribute("aria-pressed", String(active));

    });

  }



  function initSwitcher() {

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {

      btn.addEventListener("click", () => {

        setLang(btn.getAttribute("data-lang-btn"));

      });

    });

  }



  function initPhoneLinks() {

    document.querySelectorAll('a[href^="tel:"]').forEach((anchor) => {

      if (!anchor.getAttribute("href")) {

        anchor.setAttribute("href", PHONE_TEL);

      }

      anchor.addEventListener("click", (e) => {

        const tel = anchor.getAttribute("href");

        if (!tel || !tel.startsWith("tel:")) return;

        e.preventDefault();

        window.location.assign(tel);

      });

    });

  }



  document.addEventListener("DOMContentLoaded", () => {

    const lang = getLang();

    document.documentElement.lang = lang === "el" ? "el" : "en";

    applyTranslations(lang);

    initSwitcher();

    initPhoneLinks();

    updateSwitcherUI(lang);

  });



  window.CRR_I18N = { setLang, getLang, applyTranslations };

})();


