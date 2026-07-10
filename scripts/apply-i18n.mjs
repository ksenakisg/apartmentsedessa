import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

function rep(from, to, all = false) {
  if (!html.includes(from)) {
    console.warn("MISSING:", from.slice(0, 70).replace(/\s+/g, " "));
    return;
  }
  html = all ? html.split(from).join(to) : html.replace(from, to);
}

// Scripts
if (!html.includes("./locales/en.js")) {
  rep(
    "    <script>\n      const menuBtn",
    `    <script src="./locales/en.js"></script>
    <script src="./locales/el.js"></script>
    <script src="./js/i18n.js"></script>
    <script>
      const menuBtn`
  );
}

rep(
  'id="langSwitcher"\n            class="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold shadow-sm"\n            role="group"\n            aria-label="Language"',
  'id="langSwitcher"\n            class="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold shadow-sm"\n            role="group"\n            aria-label="Language"\n            data-i18n-aria="nav.languageLabel"'
);

rep(
  '<motion class="text-sm font-semibold tracking-tight text-slate-900">Central &amp; Riverfront</motion>',
  '<div class="text-sm font-semibold tracking-tight text-slate-900" data-i18n="nav.brandLine1">Central &amp; Riverfront</div>'
);
rep(
  '<div class="text-sm font-semibold tracking-tight text-slate-900">Central &amp; Riverfront</div>\n            <div class="text-xs text-slate-600">Apartments • Edessa</div>',
  '<motion class="text-sm font-semibold tracking-tight text-slate-900" data-i18n="nav.brandLine1">Central &amp; Riverfront</motion>\n            <div class="text-xs text-slate-600" data-i18n="nav.brandLine2">Apartments • Edessa</div>'
);

const navLinks = [
  ["#apartments", "nav.apartments", "Apartments"],
  ["#location", "nav.location", "Location"],
  ["#amenities", "nav.amenities", "Amenities"],
  ["#benefits", "nav.benefits", "Why Book Direct"],
  ["#local-guide", "nav.localGuide", "Local Guide"],
  ["#reviews", "nav.reviews", "Reviews"],
  ["#faq", "nav.faq", "FAQ"],
  ["#contact", "nav.contact", "Contact"],
];
for (const [hash, key, label] of navLinks) {
  rep(
    `<a href="${hash}" class="text-sm font-medium text-slate-700 hover:text-slate-900">${label}</a>`,
    `<a href="${hash}" class="text-sm font-medium text-slate-700 hover:text-slate-900" data-i18n="${key}">${label}</a>`
  );
  rep(
    `<a href="${hash}" class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">\n              ${label}\n            </a>`,
    `<a href="${hash}" class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" data-i18n="${key}">\n              ${label}\n            </a>`
  );
}

rep(
  'class="mt-2 inline-flex items-center justify-center rounded-xl bg-river-900 px-4 py-3 text-sm font-semibold text-white shadow-soft-lg hover:bg-river-800 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n            >\n              Call now: 6945209164',
  'class="mt-2 inline-flex items-center justify-center rounded-xl bg-river-900 px-4 py-3 text-sm font-semibold text-white shadow-soft-lg hover:bg-river-800 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n              data-i18n="nav.callNowMobile"\n            >\n              Call now: 6945209164'
);
rep('<span class="sr-only">Open menu</span>', '<span class="sr-only" data-i18n="nav.openMenu">Open menu</span>');

rep(
  '<span class="h-2 w-2 rounded-full bg-forest-600"></span>\n                Direct bookings • Best price guaranteed',
  '<span class="h-2 w-2 rounded-full bg-forest-600"></span>\n                <span data-i18n="hero.badge">Direct bookings • Best price guaranteed</span>'
);
rep(
  '<h1 class="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">\n                Central &amp; Riverfront Apartments In Edessa\n              </h1>',
  '<h1 class="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl" data-i18n="hero.title">\n                Central &amp; Riverfront Apartments In Edessa\n              </h1>'
);
rep(
  '<p class="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-slate-700">\n                Experience the perfect blend',
  '<p class="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-slate-700" data-i18n="hero.subtitle">\n                Experience the perfect blend'
);
rep(
  'Book Directly for Best Price\n                </a>\n                <a\n                  href="tel:+306945209164"',
  'Book Directly for Best Price\n                </a>\n                <a\n                  href="tel:+306945209164"'
);
rep(
  'hover:to-forest-600 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                >\n                  Book Directly for Best Price',
  'hover:to-forest-600 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                  data-i18n="hero.ctaBook"\n                >\n                  Book Directly for Best Price'
);
rep(
  'focus:ring-offset-2"\n                >\n                  Call: 6945209164\n                </a>\n              </div>\n\n              <motion class="mt-8 grid max-w-xl',
  'focus:ring-offset-2"\n                  data-i18n="hero.ctaCall"\n                >\n                  Call: 6945209164\n                </a>\n              </div>\n\n              <div class="mt-8 grid max-w-xl'
);
rep(
  'focus:ring-offset-2"\n                >\n                  Call: 6945209164\n                </a>\n              </div>\n\n              <div class="mt-8 grid max-w-xl',
  'focus:ring-offset-2"\n                  data-i18n="hero.ctaCall"\n                >\n                  Call: 6945209164\n                </a>\n              </div>\n\n              <div class="mt-8 grid max-w-xl'
);

rep('<div class="text-xs font-medium text-slate-600">Walk to</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="hero.stat1Label">Walk to</div>', true);
rep('<div class="mt-1 text-sm font-semibold text-slate-900">Waterfalls</div>', '<div class="mt-1 text-sm font-semibold text-slate-900" data-i18n="hero.stat1Value">Waterfalls</motion>', true);
rep('<motion class="mt-1 text-sm font-semibold text-slate-900" data-i18n="hero.stat1Value">Waterfalls</motion>', '<div class="mt-1 text-sm font-semibold text-slate-900" data-i18n="hero.stat1Value">Waterfalls</div>', true);
rep('<motion class="mt-1 text-xs text-slate-600" data-i18n="hero.stat1Sub">~7 minutes</motion>', '<div class="mt-1 text-xs text-slate-600" data-i18n="hero.stat1Sub">~7 minutes</div>');
rep('<div class="mt-1 text-xs text-slate-600">~7 minutes</div>', '<div class="mt-1 text-xs text-slate-600" data-i18n="hero.stat1Sub">~7 minutes</div>', true);
rep('<div class="text-xs font-medium text-slate-600">Near</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="hero.stat2Label">Near</div>', true);
rep('<div class="mt-1 text-sm font-semibold text-slate-900">Essentials</div>', '<div class="mt-1 text-sm font-semibold text-slate-900" data-i18n="hero.stat2Value">Essentials</div>', true);
rep(
  '<div class="mt-1 text-xs leading-snug text-slate-600">50m supermarkets/pharmacy</motion>',
  '<div class="mt-1 text-xs leading-snug text-slate-600" data-i18n="hero.stat2Sub">50m supermarkets/pharmacy</div>'
);
rep(
  '<div class="mt-1 text-xs leading-snug text-slate-600">50m supermarkets/pharmacy</div>',
  '<div class="mt-1 text-xs leading-snug text-slate-600" data-i18n="hero.stat2Sub">50m supermarkets/pharmacy</motion>'
);
rep('<motion class="text-xs font-medium text-slate-600">Views</motion>', '<div class="text-xs font-medium text-slate-600" data-i18n="hero.stat3Label">Views</div>');
rep('<div class="text-xs font-medium text-slate-600">Views</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="hero.stat3Label">Views</div>', true);
rep('<div class="mt-1 text-sm font-semibold text-slate-900">River &amp; City</div>', '<div class="mt-1 text-sm font-semibold text-slate-900" data-i18n="hero.stat3Value">River &amp; City</div>', true);
rep('<div class="mt-1 text-xs text-slate-600">Varosi-Old Town &amp; more</div>', '<div class="mt-1 text-xs text-slate-600" data-i18n="hero.stat3Sub">Varosi-Old Town &amp; more</div>', true);

rep(
  '<h2 class="text-base font-semibold tracking-tight text-white sm:text-[1.0625rem]">\n                      Verified Trust &amp; Ratings\n                    </h2>',
  '<h2 class="text-base font-semibold tracking-tight text-white sm:text-[1.0625rem]" data-i18n="trust.title">\n                      Verified Trust &amp; Ratings\n                    </h2>'
);
rep(
  '<p class="mt-0.5 text-[11px] font-medium leading-snug text-white/55">\n                      Guest review platforms\n                    </p>',
  '<p class="mt-0.5 text-[11px] font-medium leading-snug text-white/55" data-i18n="trust.subtitle">\n                      Guest review platforms\n                    </p>'
);
rep(
  '<p class="mt-2 text-[11px] font-medium leading-snug text-white/[0.78] sm:mt-2.5 sm:text-xs">\n                      Trusted by 200+ Verified Guest Reviews\n                    </p>',
  '<p class="mt-2 text-[11px] font-medium leading-snug text-white/[0.78] sm:mt-2.5 sm:text-xs" data-i18n="trust.reviewsCount">\n                      Trusted by 200+ Verified Guest Reviews\n                    </p>'
);
rep('id="openHostModal"', 'id="openHostModal" data-i18n="trust.meetHost"');
rep(
  '>\n                      Meet Your Host\n                    </button>',
  '>\n                      Meet Your Host\n                    </button>'
);
rep('<div class="text-sm font-semibold text-slate-900">Get in touch</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="trust.getInTouch">Get in touch</div>', true);
rep(
  '<motion class="mt-1 text-sm text-slate-600">Direct booking perks — call us for the best rate and personal support.</motion>',
  '<div class="mt-1 text-sm text-slate-600" data-i18n="trust.directPerks">Direct booking perks — call us for the best rate and personal support.</div>'
);
rep(
  '<motion class="mt-1 text-sm text-slate-600">Direct booking perks — call us for the best rate and personal support.</div>',
  '<div class="mt-1 text-sm text-slate-600" data-i18n="trust.directPerks">Direct booking perks — call us for the best rate and personal support.</div>'
);
rep(
  '<div class="mt-1 text-sm text-slate-600">Direct booking perks — call us for the best rate and personal support.</div>',
  '<div class="mt-1 text-sm text-slate-600" data-i18n="trust.directPerks">Direct booking perks — call us for the best rate and personal support.</div>'
);
rep(
  'ring-offset-2"\n                        >\n                          Call now\n                        </a>\n                        <a\n                          href="https://wa.me/306945209164"\n                          class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                          rel="noopener"',
  'ring-offset-2"\n                          data-i18n="trust.callNow"\n                        >\n                          Call now\n                        </a>\n                        <a\n                          href="https://wa.me/306945209164"\n                          class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                          rel="noopener"'
);
rep(
  'ring-offset-2"\n                          target="_blank"\n                        >\n                          WhatsApp\n                        </a>\n                        <a\n                          href="mailto:dgjmaria@gmail.com"',
  'ring-offset-2"\n                          target="_blank"\n                          data-i18n="trust.whatsapp"\n                        >\n                          WhatsApp\n                        </a>\n                        <a\n                          href="mailto:dgjmaria@gmail.com"'
);

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Our apartments</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="apartments.title">Our apartments</h2>');
rep(
  '<p class="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">\n                Four refined stays',
  '<p class="mt-3 max-w-2xl text-base leading-relaxed text-slate-700" data-i18n="apartments.subtitle">\n                Four refined stays'
);
rep(
  '>\n              Call to reserve\n            </a>\n          </div>\n\n          <div class="mt-10 grid gap-6 md:grid-cols-2">',
  ' data-i18n="apartments.callReserve">\n              Call to reserve\n            </a>\n          </div>\n\n          <div class="mt-10 grid gap-6 md:grid-cols-2">'
);

rep(
  'Cozy studio\n                  </div>',
  'Cozy studio\n                  </div>',
  false
);
rep(
  '<div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">\n                    Cozy studio\n                  </div>',
  '<div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15" data-i18n="apt.badgeStudio">\n                    Cozy studio\n                  </div>'
);
rep(
  'Apartment (2)</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">\n                    Elegant',
  'Apartment (2)</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15" data-i18n="apt.badgeBalcony">\n                    Elegant'
);
rep(
  'Apartment (3)</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">\n                    River view',
  'Apartment (3)</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15" data-i18n="apt.badgeRiver">\n                    River view'
);
rep(
  'Luxury Apartment In The Center</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15">\n                    Brand new',
  'Luxury Apartment In The Center</h3>\n                  <div class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15" data-i18n="apt.badgeNew">\n                    Brand new'
);

rep('<p class="mt-2 text-sm text-white/90">Perfect for couples who want river views and a calm garden feel.</p>', '<p class="mt-2 text-sm text-white/90" data-i18n="apt.desc1">Perfect for couples who want river views and a calm garden feel.</p>');
rep('<p class="mt-2 text-sm text-white/90">A refined central stay with river views and a generous balcony.</p>', '<p class="mt-2 text-sm text-white/90" data-i18n="apt.desc2">A refined central stay with river views and a generous balcony.</p>');
rep('<p class="mt-2 text-sm text-white/90">A bright, stylish apartment made for relaxed riverfront mornings.</p>', '<p class="mt-2 text-sm text-white/90" data-i18n="apt.desc3">A bright, stylish apartment made for relaxed riverfront mornings.</p>');
rep('<p class="mt-2 text-sm text-white/90">Spacious, refined, and perfectly placed for exploring Edessa.</p>', '<p class="mt-2 text-sm text-white/90" data-i18n="apt.desc4">Spacious, refined, and perfectly placed for exploring Edessa.</p>');

const dtKeys = [
  ["Sleeps", "apt.sleeps"],
  ["View", "apt.view"],
  ["Access", "apt.access"],
  ["Vibe", "apt.vibe"],
  ["Balcony", "apt.balcony"],
  ["Design", "apt.design"],
  ["Kitchen", "apt.kitchen"],
  ["Comfort", "apt.comfort"],
  ["Outdoor", "apt.outdoor"],
  ["Space", "apt.space"],
  ["Views", "apt.views"],
  ["Amenities", "apt.amenities"],
];
for (const [label, key] of dtKeys) {
  rep(`<dt class="text-xs font-medium text-slate-600">${label}</dt>`, `<dt class="text-xs font-medium text-slate-600" data-i18n="${key}">${label}</dt>`, true);
}

rep('<dd class="mt-1 font-semibold text-slate-900">River</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valRiver">River</dd>', true);
rep('<dd class="mt-1 font-semibold text-slate-900">Garden</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valGarden">Garden</dd>', true);
rep('<dd class="mt-1 font-semibold text-slate-900">Couples retreat</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valCouples">Couples retreat</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Up to 3</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valCenter">Up to 3</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Up to 4</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valFamily">Up to 4</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Up to 5</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valUpTo5">Up to 5</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Large</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valLarge">Large</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Elegant</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valElegant">Elegant</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Full</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valFull">Full</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Riverfront calm</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valRiverfrontCalm">Riverfront calm</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Garden balcony</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valGardenBalcony">Garden balcony</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Mountain &amp; river</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valMountainRiver">Mountain &amp; river</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">Spacious</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valSpacious">Spacious</dd>');
rep('<dd class="mt-1 font-semibold text-slate-900">High‑end</dd>', '<dd class="mt-1 font-semibold text-slate-900" data-i18n="apt.valHighEnd">High‑end</dd>');

rep(
  '>\n                    View all photos (Open Airbnb)\n                  </a>',
  ' data-i18n="apt.viewPhotos">\n                    View all photos (Open Airbnb)\n                  </a>',
  true
);
rep(
  '>\n                    Call to book\n                  </a>\n                  <a\n                    href="https://wa.me/306945209164"',
  ' data-i18n="apt.callBook">\n                    Call to book\n                  </a>\n                  <a\n                    href="https://wa.me/306945209164"',
  true
);
rep(
  'target="_blank"\n                    rel="noopener"\n                    class="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                  >\n                    WhatsApp\n                  </a>',
  'target="_blank"\n                    rel="noopener"\n                    class="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n                    data-i18n="apt.whatsapp"\n                  >\n                    WhatsApp\n                  </a>',
  true
);

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Location</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="location.title">Location</h2>');
rep(
  '<p class="mt-4 text-base leading-relaxed text-slate-700">\n                Right in central Edessa',
  '<p class="mt-4 text-base leading-relaxed text-slate-700" data-i18n="location.subtitle">\n                Right in central Edessa'
);
rep('<div class="text-xs font-medium text-slate-600">Everyday essentials</div>', '<motion class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</div>');
rep('<motion class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</div>', '<motion class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</motion>');
rep('<div class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</div>');
rep('<div class="text-xs font-medium text-slate-600">Everyday essentials</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="location.essentialsLabel">Everyday essentials</div>');
rep('<div class="mt-2 text-lg font-semibold text-slate-900">50 meters</div>', '<div class="mt-2 text-lg font-semibold text-slate-900" data-i18n="location.essentialsValue">50 meters</div>');
rep('<div class="mt-1 text-sm text-slate-600">Supermarkets &amp; pharmacies nearby</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="location.essentialsSub">Supermarkets &amp; pharmacies nearby</div>');
rep('<div class="text-xs font-medium text-slate-600">Must‑see</div>', '<div class="text-xs font-medium text-slate-600" data-i18n="location.mustSeeLabel">Must‑see</div>');
rep('<div class="mt-2 text-lg font-semibold text-slate-900">7 min walk</div>', '<motion class="mt-2 text-lg font-semibold text-slate-900" data-i18n="location.mustSeeValue">7 min walk</div>');
rep('<motion class="mt-2 text-lg font-semibold text-slate-900" data-i18n="location.mustSeeValue">7 min walk</div>', '<div class="mt-2 text-lg font-semibold text-slate-900" data-i18n="location.mustSeeValue">7 min walk</div>');
rep('<motion class="mt-1 text-sm text-slate-600" data-i18n="location.mustSeeSub">Edessa Waterfalls</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="location.mustSeeSub">Edessa Waterfalls</div>');
rep('<div class="mt-1 text-sm text-slate-600">Edessa Waterfalls</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="location.mustSeeSub">Edessa Waterfalls</div>');
rep('<div class="text-sm font-semibold text-slate-900">Need directions or availability?</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="location.needHelp">Need directions or availability?</div>');
rep('<div class="mt-1 text-sm text-slate-600">Call and we’ll help instantly.</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="location.callHelp">Call and we’ll help instantly.</div>');
rep(
  '>\n                    Call: 6945209164\n                  </a>\n                </div>\n              </div>\n            </div>\n\n            <div class="lg:col-span-6">\n              <iframe',
  ' data-i18n="location.callDisplay">\n                    Call: 6945209164\n                  </a>\n                </div>\n              </div>\n            </div>\n\n            <div class="lg:col-span-6">\n              <iframe'
);

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Common amenities</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="amenities.title">Common amenities</h2>');
rep(
  '<p class="mt-4 text-base leading-relaxed text-slate-700">\n                Everything you need for a seamless stay',
  '<p class="mt-4 text-base leading-relaxed text-slate-700" data-i18n="amenities.subtitle">\n                Everything you need for a seamless stay'
);

const amenities = [
  ["River View", "amenity.riverView", "Panoramic views of the river from your apartment.", "amenity.riverViewDesc"],
  ["High-Speed WiFi", "amenity.wifi", "Fast, reliable wireless — ideal for remote work and streaming.", "amenity.wifiDesc"],
  ["Free Street Parking", "amenity.parking", "Complimentary on-street parking near the building.", "amenity.parkingDesc"],
  ["Smart TV", "amenity.tv", "Kick back and stream after a day exploring Edessa.", "amenity.tvDesc"],
  ["Air Conditioning", "amenity.ac", "Stay comfortable in every season.", "amenity.acDesc"],
  ["Shared Backyard", "amenity.backyard", "Relax outdoors with shared green space by the river.", "amenity.backyardDesc"],
  ["Luggage Drop-Off Allowed", "amenity.luggage", "Store bags before check-in or after check-out.", "amenity.luggageDesc"],
  ["Security Cameras on Property", "amenity.security", "External cameras for added safety and peace of mind.", "amenity.securityDesc"],
];
for (const [title, tKey, desc, dKey] of amenities) {
  rep(`<motion class="text-sm font-semibold text-slate-900">${title}</div>`, `<div class="text-sm font-semibold text-slate-900" data-i18n="${tKey}">${title}</div>`);
  rep(`<div class="text-sm font-semibold text-slate-900">${title}</div>`, `<div class="text-sm font-semibold text-slate-900" data-i18n="${tKey}">${title}</div>`);
  rep(`<span class="text-sm font-semibold text-slate-900">${title}</span>`, `<span class="text-sm font-semibold text-slate-900" data-i18n="${tKey}">${title}</span>`);
  rep(`<p class="mt-1.5 text-sm leading-snug text-slate-600">${desc}</p>`, `<p class="mt-1.5 text-sm leading-snug text-slate-600" data-i18n="${dKey}">${desc}</p>`);
}
rep(
  '<span class="rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800"\n                          >Guest favorite</span',
  '<span class="rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800" data-i18n="amenity.wifiBadge"\n                          >Guest favorite</span'
);

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Why book direct?</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="benefits.title">Why book direct?</h2>');
rep(
  '<p class="mt-4 text-base leading-relaxed text-slate-700">\n                Calling us directly means you avoid third‑party service fees and get the <span class="font-semibold text-slate-900">best price guaranteed</span>.\n                It’s also the fastest way to confirm availability, ask questions, and get personalized support.\n              </p>',
  '<p class="mt-4 text-base leading-relaxed text-slate-700" data-i18n-html="benefits.intro">\n                Calling us directly means you avoid third‑party service fees and get the <span class="font-semibold text-slate-900">best price guaranteed</span>.\n                It’s also the fastest way to confirm availability, ask questions, and get personalized support.\n              </p>'
);
rep(
  '>\n                  Call: 6945209164\n                </a>\n                <a\n                  href="#apartments"',
  ' data-i18n="benefits.call">\n                  Call: 6945209164\n                </a>\n                <a\n                  href="#apartments"'
);
rep(
  '>\n                  View apartments\n                </a>',
  ' data-i18n="benefits.viewApts">\n                  View apartments\n                </a>'
);
rep('<div class="text-sm font-semibold text-slate-900">Save on platform fees</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="benefits.feesTitle">Save on platform fees</div>');
rep('<div class="mt-1 text-sm text-slate-600">Direct bookings avoid service charges.</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="benefits.feesDesc">Direct bookings avoid service charges.</div>');
rep('<div class="text-sm font-semibold text-slate-900">Best price guaranteed</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="benefits.priceTitle">Best price guaranteed</div>');
rep('<div class="mt-1 text-sm text-slate-600">We’ll match or beat the total platform price.</motion>', '<div class="mt-1 text-sm text-slate-600" data-i18n="benefits.priceDesc">We’ll match or beat the total platform price.</motion>');
rep('<div class="mt-1 text-sm text-slate-600">We’ll match or beat the total platform price.</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="benefits.priceDesc">We’ll match or beat the total platform price.</div>');
rep('<div class="text-sm font-semibold text-slate-900">Faster confirmation</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="benefits.fastTitle">Faster confirmation</div>');
rep('<div class="mt-1 text-sm text-slate-600">Get availability, details, and answers immediately.</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="benefits.fastDesc">Get availability, details, and answers immediately.</div>');
rep('<div class="text-sm font-semibold text-slate-900">24/7 support</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="benefits.supportTitle">24/7 support</div>');
rep('<div class="mt-1 text-sm text-slate-600">We’re here before, during, and after your stay.</div>', '<div class="mt-1 text-sm text-slate-600" data-i18n="benefits.supportDesc">We’re here before, during, and after your stay.</div>');
rep('<div class="text-sm font-semibold">Direct Booking = Personalized Offers</div>', '<div class="text-sm font-semibold" data-i18n="benefits.bannerTitle">Direct Booking = Personalized Offers</div>');
rep('<div class="mt-1 text-sm text-white/90">Contact us directly for our lowest rates and personalized stay packages.</div>', '<div class="mt-1 text-sm text-white/90" data-i18n="benefits.bannerSubtitle">Contact us directly for our lowest rates and personalized stay packages.</div>');
rep(
  '>\n                    Call now\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <!-- Local Guide -->',
  ' data-i18n="benefits.bannerCall">\n                    Call now\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <!-- Local Guide -->'
);

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Local Guide</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="localGuide.title">Local Guide</h2>');
rep(
  '<p class="max-w-3xl text-base leading-relaxed text-slate-700">\n              Discover Edessa\'s iconic landmarks',
  '<p class="max-w-3xl text-base leading-relaxed text-slate-700" data-i18n="localGuide.subtitle">\n              Discover Edessa\'s iconic landmarks'
);
rep('class="mt-4 text-sm font-semibold text-river-800 hover:underline">View on Map</a>', 'class="mt-4 text-sm font-semibold text-river-800 hover:underline" data-i18n="localGuide.viewMap">View on Map</a>', true);

const lgDescs = [
  "The tallest waterfall in Greece and the city's landmark.",
  "The historic old town with traditional Macedonian architecture.",
  "A magnificent Byzantine stone bridge surrounded by plane trees.",
  "A hidden paradise with small waterfalls in the city center.",
  "Explore the ruins of the ancient city in the valley.",
  "Natural thermal springs (37°C) 30km from Edessa.",
  "Our premium recommendation for dining and drinks.",
  "World-class museum with treasures of Alexander the Great.",
  "The best panoramic view of the Pella valley.",
  "A serene wetland sanctuary ideal for birdwatching.",
  "One of the highest and most popular ski resorts in Greece, featuring amazing slopes and the historic Prophet Elias church at the summit.",
  "A stunning natural lake, perfect for birdwatching, water sports, or simply enjoying the peaceful mountain scenery.",
];
lgDescs.forEach((text, i) => {
  const key = `localGuide.d${String(i + 1).padStart(2, "0")}`;
  const needle = `<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">${text}</p>`;
  const repl = `<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600" data-i18n="${key}">${text}</p>`;
  if (html.includes(needle)) html = html.replace(needle, repl);
  else console.warn("LG:", key);
});

rep('<h2 class="text-3xl font-semibold tracking-tight text-slate-900">Guest favorites</h2>', '<h2 class="text-3xl font-semibold tracking-tight text-slate-900" data-i18n="reviews.title">Guest favorites</h2>');
rep(
  '<p class="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">\n                Real stories from our guests.',
  '<p class="mt-3 max-w-2xl text-base leading-relaxed text-slate-700" data-i18n="reviews.subtitle">\n                Real stories from our guests.'
);
rep(
  '<span class="h-2 w-2 rounded-full bg-forest-600"></span> Guest Favorite\n              </span>',
  '<span class="h-2 w-2 rounded-full bg-forest-600"></span> <span data-i18n="reviews.badge">Guest Favorite</span>\n              </span>'
);
rep('>Guest Favorite</span', ' data-i18n="reviews.badge">Guest Favorite</span', true);

rep('<h2 class="mb-8 text-center text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>', '<h2 class="mb-8 text-center text-3xl font-bold text-slate-900" data-i18n="faq.title">Frequently Asked Questions</h2>');
const faq = [
  ["q1", "a1", "Parking", "We provide free parking for motorcycles. For cars, there is plenty of free street parking available right in front of the\n                building."],
  ["q2", "a2", "Location &amp; Center", "You are in the heart of Edessa. The central pedestrian street with cafes and bars is just a 3-minute walk away, while the\n                Waterfalls are only 7 minutes away."],
  ["q3", "a3", "Payment Methods", "For direct bookings, we accept cash or bank transfer. Call us for the best offer."],
  ["q4", "a4", "Can I store my luggage before check-in or after check-out?", "Of course! Luggage drop-off is allowed for your convenience."],
  ["q5", "a5", "Is the property safe?", "Your safety is our priority. The property is equipped with external security cameras for your protection."],
  ["q6", "a6", "Is there an outdoor space?", "Yes, guests have access to a beautiful shared backyard, perfect for relaxing by the sound of the river."],
];
for (const [qk, ak, q, a] of faq) {
  rep(`<h3 class="text-lg font-semibold text-slate-900">${q}</h3>`, `<h3 class="text-lg font-semibold text-slate-900" data-i18n="faq.${qk}">${q}</h3>`);
  rep(`<p class="mt-2 text-gray-600">\n                ${a}\n              </p>`, `<p class="mt-2 text-gray-600" data-i18n="faq.${ak}">\n                ${a}\n              </p>`);
  const one = a.replace(/\n\s+/g, " ");
  rep(`<p class="mt-2 text-gray-600">${one}</p>`, `<p class="mt-2 text-gray-600" data-i18n="faq.${ak}">${one}</p>`);
}

rep('<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to book your stay?</h2>', '<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl" data-i18n="contact.title">Ready to book your stay?</h2>');
rep(
  '<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/90">\n                    Call us for direct booking.',
  '<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/90" data-i18n="contact.subtitle">\n                    Call us for direct booking.'
);
rep('<p class="text-sm font-semibold uppercase tracking-wide text-white/80">Get in touch</p>', '<p class="text-sm font-semibold uppercase tracking-wide text-white/80" data-i18n="contact.getInTouch">Get in touch</p>');
rep(
  '>\n                      Call: 6945209164\n                    </a>\n                    <a\n                      href="https://wa.me/306945209164"\n                      class="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-river-900"\n                      rel="noopener"\n                      target="_blank"\n                    >\n                      Message on WhatsApp',
  ' data-i18n="contact.call">\n                      Call: 6945209164\n                    </a>\n                    <a\n                      href="https://wa.me/306945209164"\n                      class="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-river-900"\n                      rel="noopener"\n                      target="_blank"\n                      data-i18n="contact.whatsapp"\n                    >\n                      Message on WhatsApp'
);

rep('<div class="text-sm font-semibold text-slate-900">Central &amp; Riverfront Apartments • Edessa</div>', '<div class="text-sm font-semibold text-slate-900" data-i18n="footer.brand">Central &amp; Riverfront Apartments • Edessa</div>');
rep('Direct booking support:', '<span data-i18n="footer.support">Direct booking support:</span>');
rep(
  '>\n              Call now\n            </a>\n            <a\n              href="https://wa.me/306945209164"\n              target="_blank"\n              rel="noopener"\n              class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n            >\n              WhatsApp',
  ' data-i18n="footer.call">\n              Call now\n            </a>\n            <a\n              href="https://wa.me/306945209164"\n              target="_blank"\n              rel="noopener"\n              class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-river-600 focus:ring-offset-2"\n              data-i18n="footer.whatsapp"\n            >\n              WhatsApp'
);
rep(' Central &amp; Riverfront Apartments. All rights reserved.</div>', ' <span data-i18n="footer.rights">Central &amp; Riverfront Apartments. All rights reserved.</span></motion>');
rep(' Central &amp; Riverfront Apartments. All rights reserved.</motion>', ' <span data-i18n="footer.rights">Central &amp; Riverfront Apartments. All rights reserved.</span></div>');
rep(
  'In case of no answer at the primary number, please contact our secondary line:',
  '<span data-i18n="footer.secondary">In case of no answer at the primary number, please contact our secondary line:</span>'
);

rep('<h2 id="hostModalTitle" class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">About Maria</h2>', '<h2 id="hostModalTitle" class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl" data-i18n="host.title">About Maria</h2>');
rep('aria-label="Close host profile"', 'aria-label="Close host profile" data-i18n-aria="host.close"');
rep(
  '<p>\n                    Maria welcomes you to Central &amp; Riverfront Apartments with genuine hospitality',
  '<p data-i18n="host.text">\n                    Maria welcomes you to Central &amp; Riverfront Apartments with genuine hospitality'
);
rep(
  '<p>\n                    She is happy to share trusted recommendations for food, walks, and day trips',
  '<p data-i18n="host.text2">\n                    She is happy to share trusted recommendations for food, walks, and day trips'
);

rep('aria-label="Previous photo"', 'aria-label="Previous photo" data-i18n-aria="misc.photoPrev"', true);
rep('aria-label="Next photo"', 'aria-label="Next photo" data-i18n-aria="misc.photoNext"', true);
rep('aria-label="View photo larger"', 'aria-label="View photo larger" data-i18n-aria="misc.viewPhoto"', true);

// Fix brand line if still broken
rep(
  '<div class="text-sm font-semibold tracking-tight text-slate-900" data-i18n="nav.brandLine1">Central &amp; Riverfront</motion>\n            <motion class="text-xs text-slate-600" data-i18n="nav.brandLine2">Apartments • Edessa</div>',
  '<div class="text-sm font-semibold tracking-tight text-slate-900" data-i18n="nav.brandLine1">Central &amp; Riverfront</div>\n            <div class="text-xs text-slate-600" data-i18n="nav.brandLine2">Apartments • Edessa</div>'
);

// Strip erroneous <motion> tags
html = html.replace(/<\/?motion\b[^>]*>/gi, (tag) => {
  if (tag.startsWith("</")) return "</motion>";
  const m = tag.match(/^<motion(\s[^>]*)?>$/i);
  return m ? `<motion${m[1] || ""}>` : tag;
});
html = html.replace(/<motion/gi, "<motion");
html = html.replace(/<\/motion>/gi, "</motion>");

fs.writeFileSync(htmlPath, html);
console.log("data-i18n:", (html.match(/data-i18n/g) || []).length);
console.log("motion tags left:", (html.match(/<\/?motion\b/gi) || []).length);
