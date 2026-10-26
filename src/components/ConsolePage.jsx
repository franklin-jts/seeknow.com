/* Seek Now · Console product page — single-file React component.
   Usage: import ConsolePage from './console.js';  (styles: ./console-page.css)
   Generated from console.html. Logic and markup are identical to the standalone page,
   plus: StrictMode-safe layout guards, tracked listeners/timers, hero width hardening. */
/* eslint-disable */
import { createElement as h, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./console-page.css";

// ---------- routes ----------
var ROUTES = {
  demo: null,        // "Book a Demo" / "Book a Console Demo"
  contact: null,     // "Talk to Our Team"
  resources: null,
  company: null,
  platform: "./#platform",
  solutions: "solutions.html",
  referNow: "/refer-now",
  console: "console.html",
  seekPeople: "seek-people.html",
  pricing: "./#pricing"
};
var FOOTER = {
  showPending: true, // false = omit unlinked items (production)
  links: {
    demo: null, contact: null, referNow: ROUTES.referNow, console: ROUTES.console, seekPeople: ROUTES.seekPeople,
    pricing: ROUTES.pricing, wos: "./#platform", recruitment: null, employee: null, hrms: null, solutions: ROUTES.solutions,
    about: null, careers: null, resources: null, support: null, privacy: null, terms: null, cookies: null
  },
  social: [], // { name: 'LinkedIn', url: '...' }
  legalEntity: null
};

// ---------- header ----------
function RouteLink({ to, className, children, onClick }) {
  const href = ROUTES[to];
  return h("a", { className, href: href || "#", "data-pending": href ? undefined : "true",
    onClick: (e) => { if (!href) e.preventDefault(); onClick && onClick(e); } }, children);
}
var Soon = () => h("em", { className: "soon" }, "Launching soon");
var Logo = ({ id }) => h("a", { className: "logo", href: "./", "aria-label": "Seek Now home" },
  h("svg", { width: 30, height: 30, viewBox: "0 0 32 32", "aria-hidden": "true" },
    h("defs", null, h("linearGradient", { id, x1: "0", y1: "0", x2: "1", y2: "1" },
      h("stop", { offset: "0", stopColor: "#B991FF" }), h("stop", { offset: "1", stopColor: "#8660F8" }))),
    h("rect", { width: 32, height: 32, rx: 9, fill: `url(#${id})` }),
    h("circle", { cx: 14.5, cy: 14.5, r: 6, fill: "none", stroke: "#0D0618", strokeWidth: 2.6 }),
    h("path", { d: "M19 19l5 5", stroke: "#0D0618", strokeWidth: 2.6, strokeLinecap: "round" })),
  h("span", null, "Seek ", h("b", null, "Now")));
var DdIcon = ({ children }) => h("span", { className: "dd-ic", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 24 24" }, children));

function ConsoleHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const ddRef = useRef(null), btnRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onDoc = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  const closeAll = () => { setOpen(false); setMenu(false); };
  return h("header", { className: `site-header${scrolled ? " scrolled" : ""}${open ? " open" : ""}`, id: "top-header" },
    h("div", { className: "wrap" }, h("div", { className: "inner" },
      h("nav", { className: "nav", "aria-label": "Main" },
        h(Logo, { id: "lg" }),
        h("ul", { className: "nav-links" },
          h("li", null, h("a", { href: ROUTES.platform }, "Platform")),
          h("li", { className: "nav-dd", ref: ddRef,
              onKeyDown: (e) => { if (e.key === "Escape" && menu) { setMenu(false); btnRef.current && btnRef.current.focus(); } },
              onBlur: (e) => { if (e.relatedTarget && ddRef.current && !ddRef.current.contains(e.relatedTarget)) setMenu(false); } },
            h("button", { ref: btnRef, type: "button", className: "nav-ddb", "aria-expanded": menu, "aria-controls": "dd-products", onClick: () => setMenu((v) => !v) },
              "Products", h("svg", { viewBox: "0 0 12 12", "aria-hidden": "true" }, h("path", { d: "M3 4.5l3 3 3-3", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))),
            menu && h("div", { className: "dd", id: "dd-products" },
              h("a", { className: "dd-i", href: ROUTES.referNow },
                h(DdIcon, null, h("circle", { cx: 11, cy: 11, r: 6 }), h("path", { d: "M20 20l-4.5-4.5" })),
                h("span", null, h("b", null, "Refer Now ", h(Soon)), h("small", null, "Employee referrals & talent discovery"))),
              h("a", { className: "dd-i", href: ROUTES.console, "aria-current": "page" },
                h(DdIcon, null, h("rect", { x: 4, y: 4, width: 4.5, height: 16, rx: 1.5 }), h("rect", { x: 10, y: 4, width: 4.5, height: 11, rx: 1.5 }), h("rect", { x: 16, y: 4, width: 4, height: 7, rx: 1.5 })),
                h("span", null, h("b", null, "Console"), h("small", null, "Recruitment CRM & applicant tracking"))),
              h("a", { className: "dd-i", href: ROUTES.seekPeople },
                h(DdIcon, null, h("circle", { cx: 9, cy: 8, r: 3.2 }), h("circle", { cx: 17, cy: 9, r: 2.5 }), h("path", { d: "M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" })),
                h("span", null, h("b", null, "Seek People"), h("small", null, "HRMS & employee management"))))),
          h("li", null, h("a", { href: ROUTES.solutions }, "Solutions")),
          h("li", null, h(RouteLink, { to: "resources" }, "Resources")),
          h("li", null, h(RouteLink, { to: "company" }, "Company"))),
        h(RouteLink, { to: "demo", className: "nav-cta" }, "Book a Demo ", h("span", { "aria-hidden": "true" }, "\u2197")),
        h("button", { className: "burger", type: "button", id: "burger", "aria-expanded": open, "aria-controls": "m-panel", "aria-label": open ? "Close menu" : "Open menu", onClick: () => setOpen((v) => !v) }, h("span"))),
      h("div", { className: "m-panel", id: "m-panel" },
        h("ul", null,
          h("li", null, h("a", { href: ROUTES.platform, onClick: closeAll }, "Platform")),
          h("li", { className: "m-group" }, h("span", { className: "m-h" }, "Products"),
            h("a", { href: ROUTES.referNow, onClick: closeAll }, "Refer Now ", h(Soon)),
            h("a", { href: ROUTES.console, "aria-current": "page", onClick: closeAll }, "Console"),
            h("a", { href: ROUTES.seekPeople, onClick: closeAll }, "Seek People")),
          h("li", null, h("a", { href: ROUTES.solutions, onClick: closeAll }, "Solutions")),
          h("li", null, h(RouteLink, { to: "resources", onClick: closeAll }, "Resources")),
          h("li", null, h(RouteLink, { to: "company", onClick: closeAll }, "Company"))),
        h(RouteLink, { to: "demo", className: "nav-cta", onClick: closeAll }, "Book a Demo ", h("span", { "aria-hidden": "true" }, "\u2197"))))));
}

// ---------- footer ----------
var ICON = {
  LinkedIn: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z",
  Facebook: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.97v2.23H8v3h2.5V21z",
  YouTube: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"
};
var COLUMNS = [
  { id: "products", title: "Products", items: [["Refer Now", "referNow", true], ["Console", "console"], ["Seek People", "seekPeople"], ["Pricing", "pricing"]] },
  { id: "platform", title: "Platform & Solutions", items: [["Workforce Operating System", "wos"], ["Recruitment Management", "recruitment"], ["Employee Management", "employee"], ["HRMS", "hrms"], ["Solutions", "solutions"]] },
  { id: "company", title: "Company", items: [["About Us", "about"], ["Contact Us", "contact"], ["Careers", "careers"], ["Book a Demo", "demo"]] },
  { id: "res", title: "Resources & Legal", items: [["Resources", "resources"], ["Help & Support", "support"], ["Privacy Policy", "privacy"], ["Terms of Service", "terms"], ["Cookie Policy", "cookies"]] }
];
var LEGAL = [["privacy", "Privacy Policy"], ["terms", "Terms of Service"], ["cookies", "Cookie Policy"]];

function ConsoleFooter() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const on = () => setSmall(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const { links, showPending, social, legalEntity } = FOOTER;
  let pending = 0;
  const cols = COLUMNS.map((col) => ({ ...col, items: col.items.filter(([, key]) => { if (links[key]) return true; pending++; return showPending; }) })).filter((c) => c.items.length);
  const socials = social.filter((s) => s && s.url && ICON[s.name]);
  const legal = LEGAL.filter(([k]) => links[k]);
  return h("footer", { className: "ft wrap", id: "site-footer" },
    h("div", { className: "ft-top" },
      h("div", { className: "ft-brand" },
        h(Logo, { id: "lgf" }),
        h("p", { className: "ft-tag" }, "Seek Now \u2014 The Workforce Operating System"),
        h("p", null, "Technology for discovering talent, managing recruitment and supporting people at work."),
        socials.length > 0 && h("ul", { className: "ft-soc", "aria-label": "Seek Now on social media" },
          socials.map((s) => h("li", { key: s.name }, h("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Seek Now on ${s.name} (opens in a new tab)` },
            h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: ICON[s.name] })))))),
      ),
      h("div", { className: "ft-cols" }, cols.map((col) =>
        h("nav", { key: col.id, "aria-labelledby": `ft-h-${col.id}` },
          h("details", { open: !small },
            h("summary", { id: `ft-h-${col.id}` }, col.title, h("i", { "aria-hidden": "true" })),
            h("ul", null, col.items.map(([label, key, soon]) => h("li", { key },
              links[key] ? h("a", { href: links[key] }, label) : h("span", { className: "ft-pend", title: "Route not configured yet" }, label),
              soon && h("em", { className: "soon" }, "Soon")))))))),
    ),
    pending > 0 && showPending && h("p", { className: "ft-dev" }, h("span", null, "Dev preview"), "Dotted items have no route yet. Set FOOTER.showPending to false to omit them."),
    h("div", { className: "ft-bot" },
      h("p", { style: { margin: 0 } }, "\u00A9 ", new Date().getFullYear(), " Seek Now. All rights reserved.", legalEntity ? ` ${legalEntity}.` : ""),
      h("nav", { "aria-label": "Legal" }, h("ul", null, legal.map(([k, t]) => h("li", { key: k }, h("a", { href: links[k] }, t)))))));
}

// ---------- section markup (from console.html) ----------
var heroHtml = `<section class="cx wrap" id="console-hero" aria-labelledby="cx-h1">
    <div class="cx-bg" aria-hidden="true"></div>
    <div class="cx-glow" aria-hidden="true"></div>
    <div class="cx-in">
      <p class="cx-eb">Introducing Seek Now Console</p>
      <h1 class="cx-h1" id="cx-h1"><span class="sr">Recruitment. Reimagined.</span><span class="vis" aria-hidden="true"><span class="ln ln1"><span class="ch" style="--i:0">R</span><span class="ch" style="--i:1">e</span><span class="ch" style="--i:2">c</span><span class="ch" style="--i:3">r</span><span class="ch" style="--i:4">u</span><span class="ch" style="--i:5">i</span><span class="ch" style="--i:6">t</span><span class="ch" style="--i:7">m</span><span class="ch" style="--i:8">e</span><span class="ch" style="--i:9">n</span><span class="ch" style="--i:10">t</span><span class="ch" style="--i:11">.</span></span><span class="ln ln2"><span class="wd" data-t="Reimagined.">Reimagined.</span></span></span></h1>

      <p class="cx-lc" id="cx-lc">
        <span class="sr">Screen candidates, manage interviews and onboard employees.</span>
        <span class="ph" aria-hidden="true">Screen Candidates</span>
        <span class="ph" aria-hidden="true">Manage Interviews</span>
        <span class="ph" aria-hidden="true">Onboard Employees</span>
        <span class="all" aria-hidden="true"><b>Screen Candidates</b><i>→</i><b>Manage Interviews</b><i>→</i><b>Onboard Employees</b></span>
      </p>

      <p class="cx-sub">One powerful recruitment command centre. From the first call to the first day.</p>
      <p class="cx-sub2">CRM, Applicant Tracking and Auto Dialler — built for companies, HR teams and recruitment consultancies.</p>
      <ul class="cx-caps" aria-label="Console capabilities">
        <li class="lead">Recruitment management software with</li>
        <li>CRM</li>
        <li><abbr title="Applicant Tracking System">ATS</abbr></li>
        <li>AUTO DIALLER</li>
      </ul>
      <div class="cx-ctas">
        <a class="btn btn-primary" href="#" data-cx-route="demo">Book a Console Demo <span class="arr" aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href="#crm-workspaces" data-cx-route="explore">Explore Console <span class="arr" aria-hidden="true">↓</span></a>
      </div>
    </div>
    <a class="cx-scroll" href="#crm-workspaces" data-cx-route="explore">SCROLL TO EXPLORE<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></a>
  </section>`;

var workspacesHtml = `<section class="cs" id="crm-workspaces" aria-labelledby="cs-title">
    <div class="cs-intro">
      <span class="eyebrow" style="display:flex;justify-content:center">The Recruitment Operating Workspace</span>
      <h2 class="cs-h2" id="cs-title"><span>Three Powerful Workspaces.</span><span><em>One Seamless Recruitment Experience.</em></span></h2>
      <p class="cs-lede">Explore how Hiring Console, Interview Console and Onboard Console bring structure to every stage of recruitment.</p>
    </div>

    <div class="cs-track" id="cs-track">
      <div class="cs-stage" id="cs-stage">
        <div class="cs-glow" aria-hidden="true"></div>

        <!-- ===== one Console application, three workspace screens (illustrative, sample data) ===== -->
        <div class="cs-app-main" id="cs-appw" aria-hidden="true">
        <div class="cs-app" id="cs-app">
          <div class="cs-top">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="cs-brand"><i><svg viewBox="0 0 24 24"><path d="M5 20V9M12 20V4M19 20v-7"/></svg></i>Console</span>
            <span class="cs-crumb"><span data-s="0">Recruitment / <b>Hiring Console</b></span><span data-s="1">Recruitment / <b>Interview Console</b></span><span data-s="2">Recruitment / <b>Onboard Console</b></span></span>
            <span class="cs-search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>Search candidates</span>
            <span class="cs-badge">Sample data</span>
          </div>
          <div class="cs-body">
            <div class="cs-side">
              <p>WORKSPACES</p>
              <span class="cs-nv" data-s="0"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span>Hiring</span></span>
              <span class="cs-nv" data-s="1"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg><span>Interviews</span></span>
              <span class="cs-nv" data-s="2"><svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg><span>Onboarding</span></span>
              <p style="margin-top:14px">RECORDS</p>
              <span class="cs-nv"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 0 1 0 7M21 20c0-2.6-1.6-4.8-4-5.6"/></svg><span>Candidates</span></span>
              <span class="cs-nv"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg><span>Recruiters</span></span>
            </div>
            <div class="cs-scrs">
              <!-- HIRING -->
              <div class="cs-scr" data-s="0">
                <div class="cs-mh"><div><h5>Hiring Console</h5><small>4 open requirements · week of 27 Oct</small></div><span class="cs-btn m-x">+ New requirement</span></div>
                <div class="cs-stats" data-src="h4"><div><span>Open requirements</span><b>4</b></div><div><span>Openings</span><b>13</b></div><div><span>In pipeline</span><b>11</b></div><div><span>Hiring progress · 5 of 13 filled</span><span class="cs-bar" style="margin-top:7px"><i style="--w:38%"></i></span></div></div>
                <div class="cs-hg">
                  <div class="cs-pn" data-src="h0"><p class="cs-hd">Requirements</p>
                    <div class="cs-row sel"><span><span><b>Software Engineer</b><small>Bengaluru · 3 openings</small></span></span><span class="cs-pl hi">High</span></div>
                    <div class="cs-row"><span><span><b>Support Specialist</b><small>Pune · 5 openings</small></span></span><span class="cs-pl md">Med</span></div>
                    <div class="cs-row"><span><span><b>Sales Executive</b><small>Mumbai · 4 openings</small></span></span><span class="cs-pl hi">High</span></div>
                    <div class="cs-row m-x"><span><span><b>HR Generalist</b><small>Bengaluru · 1 opening</small></span></span><span class="cs-pl">Low</span></div>
                  </div>
                  <div class="cs-pn"><p class="cs-hd">Software Engineer — Bengaluru</p>
                    <div class="cs-chips" data-src="h2"><span class="cs-chip lead"><span class="cs-av b">AM</span>Arjun Mehta · Lead</span><span class="cs-chip"><span class="cs-av c">SK</span>Sana Khan</span><span class="cs-chip m-x"><span class="cs-av">+</span>Assign</span></div>
                    <div class="cs-tb" data-src="h1">
                      <div class="cs-row"><span><span class="cs-av">PS</span><b>Priya Sharma</b></span><span class="cs-pl md">Interview</span></div>
                      <div class="cs-row"><span><span class="cs-av d">RK</span><b>Rohit Kumar</b></span><span class="cs-pl st">Screening</span></div>
                      <div class="cs-row"><span><span class="cs-av c">AN</span><b>Ayesha Nair</b></span><span class="cs-pl st">Screening</span></div>
                      <div class="cs-row m-x"><span><span class="cs-av b">VR</span><b>Vikram Rao</b></span><span class="cs-pl">New</span></div>
                    </div>
                  </div>
                  <div class="cs-pn" data-src="h3"><p class="cs-hd">Follow-ups</p>
                    <div class="cs-fu"><span>Confirm interview panel<small>Arjun M. · Tomorrow</small></span></div>
                    <div class="cs-fu"><span>Call back Ayesha Nair<small>Sana K. · Today 16:00</small></span></div>
                    <div class="cs-fu m-x"><span>Share shortlist with manager<small>Arjun M. · Fri</small></span></div>
                  </div>
                </div>
              </div>
              <!-- INTERVIEW -->
              <div class="cs-scr" data-s="1">
                <div class="cs-mh"><div><h5>Interview Console</h5><small>5 interviews this week · 27–31 Oct</small></div><span class="cs-btn m-x">+ Schedule interview</span></div>
                <div class="cs-ig" style="grid-row:span 2">
                  <div style="display:grid;gap:10px;align-content:start;min-width:0">
                    <div class="cs-pn" data-src="i0"><p class="cs-hd">Interview calendar</p>
                      <div class="cs-cal">
                        <div></div><div class="dh">MON<b>27</b></div><div class="dh t">TUE<b>28</b></div><div class="dh">WED<b>29</b></div><div class="dh d4">THU<b>30</b></div><div class="dh d5">FRI<b>31</b></div>
                        <div class="tm">11:00</div><div class="c"></div><div class="ev sel"><b>Priya Sharma</b><small>Technical</small></div><div class="c"></div><div class="ev d4"><b>Kabir Singh</b><small>Second round</small></div><div class="c d5"></div>
                        <div class="tm">15:00</div><div class="ev done"><b>Divya Menon</b><small>HR round</small></div><div class="c"></div><div class="c"></div><div class="c d4"></div><div class="ev d5"><b>Tara Bose</b><small>First round</small></div>
                        <div class="tm">17:00</div><div class="c"></div><div class="c"></div><div class="ev"><b>Rohit Kumar</b><small>Technical</small></div><div class="c d4"></div><div class="c d5"></div>
                      </div>
                    </div>
                    <div class="cs-pn" data-src="i1"><p class="cs-hd">Interviewers this week</p>
                      <div class="cs-ivs">
                        <div class="cs-row"><span><span class="cs-av">KR</span><span><b>Kavya Rao</b><small>2 interviews</small></span></span></div>
                        <div class="cs-row"><span><span class="cs-av b">AM</span><span><b>Arjun Mehta</b><small>1 interview</small></span></span></div>
                        <div class="cs-row m-x"><span><span class="cs-av d">DJ</span><span><b>Deepak Joshi</b><small>1 interview</small></span></span></div>
                      </div>
                    </div>
                  </div>
                  <div class="cs-pn" style="gap:10px">
                    <div class="cs-who"><span class="cs-av">PS</span><span><b>Priya Sharma</b><small>Software Engineer · Technical round</small></span></div>
                    <div class="cs-kv" style="grid-template-columns:1fr 1fr"><div><span>Date</span><b>28 Oct · 11:00</b></div><div><span>Mode</span><b>In person</b></div></div>
                    <div style="display:grid;gap:5px;padding:6px;border-radius:10px" data-src="i2"><p class="cs-hd">Feedback</p>
                      <div class="cs-row"><span><span class="cs-av">KR</span><b>Kavya Rao</b></span><span class="cs-pl ok">Submitted</span></div>
                      <div class="cs-row"><span><span class="cs-av b">AM</span><b>Arjun Mehta</b></span><span class="cs-pl md">Pending</span></div>
                    </div>
                    <div style="display:grid;gap:4px;padding:6px;border-radius:10px" data-src="i3"><p class="cs-hd">Evaluation notes</p><p class="cs-note">Clear problem-solving approach. Discuss system design depth in next round.</p></div>
                    <div style="display:grid;gap:5px;padding:6px;border-radius:10px" data-src="i4"><p class="cs-hd">Selection status</p><div class="cs-seg"><span class="on">Shortlisted</span><span>Selected</span><span>On hold</span></div></div>
                  </div>
                </div>
              </div>
              <!-- ONBOARD -->
              <div class="cs-scr" data-s="2">
                <div class="cs-mh"><div><h5>Onboard Console</h5><small>3 selected candidates joining in November</small></div><span class="cs-btn m-x">+ Add task</span></div>
                <div class="cs-og" style="grid-row:span 2">
                  <div class="cs-pn" data-src="o0"><p class="cs-hd">Selected candidates</p>
                    <div class="cs-row sel"><span><span class="cs-av">PS</span><span><b>Priya Sharma</b><small>Joins 17 Nov</small></span></span></div>
                    <div class="cs-row"><span><span class="cs-av d">SP</span><span><b>Sneha Pillai</b><small>Joins 10 Nov</small></span></span></div>
                    <div class="cs-row"><span><span class="cs-av c">DM</span><span><b>Divya Menon</b><small>Joins 3 Nov</small></span></span></div>
                  </div>
                  <div style="display:grid;gap:10px;align-content:start;min-width:0">
                    <div class="cs-pn"><div class="cs-who"><span class="cs-av">PS</span><span><b>Priya Sharma</b><small>Software Engineer · <span class="cs-pl st">Preparing to Join</span></small></span></div>
                      <div class="cs-kv" data-src="o3" style="padding:4px;border-radius:10px"><div><span>Joining date</span><b>17 Nov 2026</b></div><div><span>HR contact</span><b>Meera Iyer</b></div><div><span>Department</span><b>Engineering</b></div></div>
                    </div>
                    <div class="cs-pn" data-src="o2"><p class="cs-hd">Onboarding checklist</p>
                      <div class="cs-ck">
                        <div class="dn"><i class="cs-cb on"></i><span>Offer accepted</span></div>
                        <div class="dn"><i class="cs-cb on"></i><span>Joining documents submitted</span></div>
                        <div><i class="cs-cb"></i><span>Background details form</span></div>
                        <div><i class="cs-cb"></i><span>Day-one schedule shared</span></div>
                        <div class="m-x"><i class="cs-cb"></i><span>Workstation request raised</span></div>
                      </div>
                    </div>
                  </div>
                  <div style="display:grid;gap:10px;align-content:start;min-width:0">
                    <div class="cs-pn" data-src="o4" style="grid-template-columns:auto 1fr;align-items:center;gap:10px"><span class="cs-ring" style="--p:40"><b>40%</b></span><span><b style="font-size:13px">2 of 5 tasks</b><small style="display:block;font-size:10.5px;color:var(--ink-3)">Onboarding progress</small></span></div>
                    <div class="cs-pn" data-src="o1"><p class="cs-hd">Documents</p>
                      <div class="cs-dc"><span>ID proof</span><span class="cs-pl ok">Received</span></div>
                      <div class="cs-dc"><span>Certificates</span><span class="cs-pl ok">Received</span></div>
                      <div class="cs-dc"><span>Previous employer letter</span><span class="cs-pl md">Pending</span></div>
                      <div class="cs-dc m-x"><span>Bank details</span><span class="cs-pl md">Pending</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <svg class="cs-trails" id="cs-trails" aria-hidden="true"><defs><linearGradient id="cs-tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8660F8" stop-opacity=".2"/><stop offset="1" stop-color="#E3D6FF"/></linearGradient></defs></svg>

        <!-- ===== Chapter 01 ===== -->
        <article class="cs-ch" data-c="0" aria-labelledby="cs-h-0">
          <div class="cs-head"><p class="cs-num"><b>01</b> / HIRING CONSOLE</p><h3 id="cs-h-0">Every Requirement. Under Control.</h3></div>
          <div class="cs-prev" aria-hidden="true"></div>
          <ul class="cs-frags">
            <li class="cs-f" data-src="h0" style="--i:0"><div class="cs-sn" aria-hidden="true"><div class="r"><span><b>Software Engineer</b></span><span class="cs-pl hi">High</span></div><div class="r"><small>Bengaluru · 3 openings</small><small>Requirement</small></div></div><h4>Hiring Requirements</h4><p>Manage open positions, vacancies and recruitment priorities.</p></li>
            <li class="cs-f" data-src="h1" style="--i:1"><div class="cs-sn" aria-hidden="true"><div class="r"><span><span class="cs-av">PS</span>Priya Sharma</span><span class="cs-pl md">Interview</span></div><div class="r"><span><span class="cs-av d">RK</span>Rohit Kumar</span><span class="cs-pl st">Screening</span></div></div><h4>Candidate Management</h4><p>Keep candidate information and recruitment status organised.</p></li>
            <li class="cs-f" data-src="h2" style="--i:2"><div class="cs-sn" aria-hidden="true"><div class="r"><span><span class="cs-av b">AM</span>Arjun Mehta</span><span class="cs-pl st">Lead recruiter</span></div><div class="r"><span><span class="cs-av c">SK</span>Sana Khan</span><small>Tele-recruiter</small></div></div><h4>Recruiter Assignment</h4><p>Coordinate recruitment responsibilities across your team.</p></li>
            <li class="cs-f" data-src="h3" style="--i:3"><div class="cs-sn" aria-hidden="true"><div class="r"><span>Call back Ayesha Nair</span><span class="cs-pl md">Today 16:00</span></div><div class="r"><small>Assigned to Sana K.</small><small>Pending</small></div></div><h4>Recruitment Follow-Ups</h4><p>Stay on top of pending candidate and recruiter activities.</p></li>
            <li class="cs-f" data-src="h4" style="--i:4"><div class="cs-sn" aria-hidden="true"><div class="r"><span>4 requirements · 13 openings</span><small>5 filled</small></div><span class="cs-bar"><i style="--w:38%"></i></span></div><h4>Hiring Visibility</h4><p>Track ongoing recruitment requirements and progress.</p></li>
          </ul>
        </article>

        <!-- ===== Chapter 02 ===== -->
        <article class="cs-ch" data-c="1" aria-labelledby="cs-h-1">
          <div class="cs-head"><p class="cs-num"><b>02</b> / INTERVIEW CONSOLE</p><h3 id="cs-h-1">Every Interview. Perfectly Organised.</h3></div>
          <div class="cs-prev" aria-hidden="true"></div>
          <ul class="cs-frags">
            <li class="cs-f" data-src="i0" style="--i:0"><div class="cs-sn" aria-hidden="true"><div class="r"><span><b>Tue 28 Oct · 11:00</b></span><span class="cs-pl st">Scheduled</span></div><div class="r"><small>Priya Sharma · Technical round</small></div></div><h4>Interview Scheduling</h4><p>Organise interview dates, times and candidate appointments.</p></li>
            <li class="cs-f" data-src="i1" style="--i:1"><div class="cs-sn" aria-hidden="true"><div class="r"><span><span class="cs-av">KR</span>Kavya Rao</span><small>Engineering Lead</small></div><div class="r"><span><span class="cs-av b">AM</span>Arjun Mehta</span><small>Recruiter</small></div></div><h4>Interviewer Assignment</h4><p>Coordinate interviews with the right hiring team members.</p></li>
            <li class="cs-f" data-src="i2" style="--i:2"><div class="cs-sn" aria-hidden="true"><div class="r"><span>Kavya Rao</span><span class="cs-pl ok">Submitted</span></div><div class="r"><span>Arjun Mehta</span><span class="cs-pl md">Pending</span></div></div><h4>Interview Feedback</h4><p>Keep interviewer observations and feedback organised.</p></li>
            <li class="cs-f" data-src="i3" style="--i:3"><div class="cs-sn" aria-hidden="true"><small>Evaluation notes · Technical round</small><span style="white-space:normal">Clear problem-solving approach.</span></div><h4>Candidate Evaluation</h4><p>Review candidate assessment information in one place.</p></li>
            <li class="cs-f" data-src="i4" style="--i:4"><div class="cs-sn" aria-hidden="true"><div class="cs-seg"><span class="on">Shortlisted</span><span>Selected</span><span>On hold</span></div></div><h4>Selection Tracking</h4><p>Maintain clarity over interview and selection status.</p></li>
          </ul>
        </article>

        <!-- ===== Chapter 03 ===== -->
        <article class="cs-ch" data-c="2" aria-labelledby="cs-h-2">
          <div class="cs-head"><p class="cs-num"><b>03</b> / ONBOARD CONSOLE</p><h3 id="cs-h-2">A Great First Day Starts Before Day One.</h3></div>
          <div class="cs-prev" aria-hidden="true"></div>
          <ul class="cs-frags">
            <li class="cs-f" data-src="o0" style="--i:0"><div class="cs-sn" aria-hidden="true"><div class="r"><span><span class="cs-av">PS</span>Priya Sharma</span><span class="cs-pl st">Preparing to Join</span></div><div class="r"><small>Software Engineer · Engineering</small></div></div><h4>Selected Candidate Management</h4><p>Keep selected candidate records and joining information organised.</p></li>
            <li class="cs-f" data-src="o1" style="--i:1"><div class="cs-sn" aria-hidden="true"><div class="r"><span>ID proof</span><span class="cs-pl ok">Received</span></div><div class="r"><span>Previous employer letter</span><span class="cs-pl md">Pending</span></div></div><h4>Document Collection</h4><p>Track required candidate documents and their status.</p></li>
            <li class="cs-f" data-src="o2" style="--i:2"><div class="cs-sn" aria-hidden="true"><div class="r"><span><i class="cs-cb on"></i>Joining documents submitted</span></div><div class="r"><span><i class="cs-cb"></i>Day-one schedule shared</span></div></div><h4>Onboarding Checklist</h4><p>Organise tasks that need to be completed before joining.</p></li>
            <li class="cs-f" data-src="o3" style="--i:3"><div class="cs-sn" aria-hidden="true"><div class="r"><span><b>Mon 17 Nov 2026</b></span><small>Joining date</small></div><div class="r"><small>HR contact · Meera Iyer</small></div></div><h4>Joining Information</h4><p>Maintain joining dates and relevant onboarding details.</p></li>
            <li class="cs-f" data-src="o4" style="--i:4"><div class="cs-sn" aria-hidden="true"><div class="r"><span><span class="cs-ring" style="--p:40;--s:34px"><b style="font-size:9.5px">40%</b></span>2 of 5 tasks done</span></div></div><h4>Onboarding Progress</h4><p>Track pending and completed onboarding activities.</p></li>
          </ul>
        </article>

        <div class="cs-close" id="cs-close">
          <p class="cs-close-t"><span>Hiring. Interviewing. Onboarding.</span><span>All Inside Console.</span></p>
          <p>Three dedicated workspaces for managing the recruitment process from requirement to joining.</p>
        </div>
      </div>
    </div>
    <p class="cs-seo">Console's recruitment CRM software brings hiring requirements, interview management software and recruitment onboarding software together as three connected workspaces within one recruitment management software product. Interfaces shown use fictional sample data.</p>
  </section>`;

var diallerHtml = `<section class="adx wrap" id="auto-dialler" aria-labelledby="dd-title">
    <div class="dd-intro">
      <span class="eyebrow" style="display:flex;justify-content:center">Console Auto Dialler</span>
      <h2 class="dd-h2" id="dd-title"><span class="ln"><span>Every Call Counts.</span></span><span class="ln"><span>Every Conversation Moves Hiring Forward.</span></span></h2>
      <p class="dd-lede">Manage recruitment calling, candidate screening outcomes and follow-up activities through Console's web and mobile experiences.</p>
      <p class="dd-labels"><span>WEB APPLICATION</span><i aria-hidden="true"></i><span>MOBILE APPLICATION</span></p>
    </div>

    <div class="dd-sw">
      <div class="dd-tabs" role="tablist" aria-label="Choose a Console app to explore">
        <span class="dd-ind" aria-hidden="true"></span>
        <button type="button" class="dd-tab" role="tab" id="dd-t-web" aria-controls="dd-p-web" aria-selected="true" tabindex="0" data-f="web"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg><span class="lg">Explore Web App</span><span class="sm">Web App</span></button>
        <button type="button" class="dd-tab" role="tab" id="dd-t-mob" aria-controls="dd-p-mob" aria-selected="false" tabindex="-1" data-f="mobile"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg><span class="lg">Explore Mobile App</span><span class="sm">Mobile App</span></button>
      </div>
    </div>

    <div class="dd-stage" id="dd-stage" data-focus="web">
      <svg class="dd-link" id="dd-link" aria-hidden="true"><defs><linearGradient id="ddGrad" x1="0" x2="1"><stop offset="0" stop-color="#8660F8"/><stop offset="1" stop-color="#E3D6FF"/></linearGradient></defs><path id="dd-lp" pathLength="1"/><circle id="dd-lc" r="4"/></svg>

      <!-- WEB APPLICATION -->
      <div class="dd-webw" id="dd-webw">
        <span class="dd-tag">WEB VIEW</span>
        <div class="dd-web" id="dd-web" role="group" aria-label="Console web application demo: auto dialler with sample candidates">
          <div class="dw" id="dw">
            <div class="dw-url"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="addr">console · auto dialler · sample data</span></div>
            <div class="dw-app">
              <div class="dw-q">
                <p class="dw-h" id="dw-qh">Calling queue <span id="dw-qc"></span></p>
                <ul class="dw-ql" id="dw-ql" aria-labelledby="dw-qh"></ul>
              </div>
              <div class="dw-m" id="dw-m" data-ph="ready"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- MOBILE APPLICATION -->
      <div class="dd-phw" id="dd-phw">
        <span class="dd-tag">MOBILE VIEW</span>
        <div class="dd-ph" id="dd-ph" role="group" aria-label="Console mobile application demo: assigned candidates and calling with sample data">
          <div class="pm" id="pm">
            <div class="pm-sb" aria-hidden="true"><span>9:41</span><span>●●● ▮</span></div>
            <div class="pm-v" id="pm-list"></div>
            <div class="pm-v hid" id="pm-prof"></div>
            <div class="pm-v hid pm-callv" id="pm-call" data-ph="dialling"></div>
            <div class="pm-v hid" id="pm-out"></div>
          </div>
        </div>
      </div>
      <p class="dd-live" id="dd-live" role="status" aria-live="polite"></p>
    </div>

    <div class="dd-desc">
      <div id="dd-p-web" role="tabpanel" aria-labelledby="dd-t-web">
        <h3>Web application</h3>
        <ul><li>Work through a calling queue for your assigned recruitment requirements.</li><li>See candidate details, requirement and screening status beside the call.</li><li>Record the screening outcome, follow-up action and notes in one place.</li></ul>
      </div>
      <div id="dd-p-mob" role="tabpanel" aria-labelledby="dd-t-mob" hidden>
        <h3>Mobile application</h3>
        <ul><li>View assigned candidates and their contact details on the go.</li><li>Start a call from the candidate profile.</li><li>Confirm the screening outcome and add follow-up notes after the call.</li></ul>
      </div>
    </div>
    <p class="dd-tagline" id="dd-tagline">Your Recruitment Workspace. <em>On Web and Mobile.</em></p>
    <p class="dd-demo">Demo with fictional candidates. Both previews use the same sample data on this page; no calls are placed, no phone app or microphone is used, and nothing is saved.<button type="button" id="dd-reset">Reset demo</button></p>

    <p class="dd-seo">Console's recruitment auto dialler is available as web-based recruitment software and as a mobile recruitment app, so tele-recruitment teams can use the same recruitment calling software and candidate screening software from the desk or on the move.</p>
  </section>`;

var screeningHtml = `<section class="rv wrap" id="resume-screening" aria-labelledby="rv-title">
    <div class="rv-intro">
      <span class="eyebrow" style="display:flex;justify-content:center">Smarter Resume Screening</span>
      <h2 class="rv-h2" id="rv-title"><span>Beyond the Resume.</span><span><em>See the Match.</em></span></h2>
      <p class="rv-lede">Compare resumes against job requirements, review candidate qualifications and identify relevant applicants with Console's resume screening and scoring capabilities.</p>
      <ul class="rv-tags" aria-label="Capabilities"><li>Resume Screening</li><li>Candidate Matching</li><li>Match Scoring</li><li>Shortlisting</li></ul>
    </div>

    <div class="rv-track" id="rv-track">
      <div class="rv-stage">
        <div class="rv-left">
          <ol class="rv-steps" id="rv-steps" aria-label="How screening works in this demo">
            <li class="rv-step"><span class="n">01</span><h3>Job requirement</h3><p>Start from the role: required skills, preferred skills and the experience range.</p></li>
            <li class="rv-step"><span class="n">02</span><h3>Resume screening</h3><p>Each sample resume is compared against that requirement.</p></li>
            <li class="rv-step"><span class="n">03</span><h3>Match scores</h3><p>Every applicant gets an illustrative score from a transparent example rubric.</p></li>
            <li class="rv-step"><span class="n">04</span><h3>Explain the match</h3><p>Open a candidate to see matching skills, gaps and the resume evidence behind the score.</p></li>
            <li class="rv-step"><span class="n">05</span><h3>Human shortlisting</h3><p>You review the evidence and decide who moves forward.</p></li>
          </ol>
        </div>

        <div class="rv-win" id="rv-win" role="region" aria-label="Resume screening demo with sample data">
          <div class="rv-bar">
            <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="brand"><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 20V9M12 20V4M19 20v-7"/></svg></i>Console</span>
            <span class="ttl">Applicant tracking · Resume screening</span>
            <span class="demo">Conceptual demo · sample data</span>
          </div>

          <div class="rv-job" id="rv-job">
            <h3 class="rv-hd">Job requirement</h3>
            <div class="rv-jr">
              <div class="rv-jt" id="rv-jt"></div>
              <label class="rv-f">Sample requirement<select class="rv-in" id="rv-jsel"><option value="se">Software Engineer</option><option value="fe">Frontend Developer</option><option value="fs">Full-Stack Engineer</option></select></label>
              <label class="rv-f">Experience range<select class="rv-in" id="rv-exp"><option value="2-4">2–4 years</option><option value="3-5">3–5 years</option><option value="4-7">4–7 years</option><option value="5-8">5–8 years</option></select></label>
            </div>
            <div class="rv-sk">
              <span id="rv-req-h">Required</span><div class="rv-chips" id="rv-req" role="group" aria-labelledby="rv-req-h"></div>
              <span id="rv-pref-h">Preferred</span><div class="rv-chips" id="rv-pref" role="group" aria-labelledby="rv-pref-h"></div>
            </div>
            <p class="rv-hint">Select a skill to move it between required and preferred. Scores update using the example rubric.</p>
            <details class="rv-rub"><summary>How this example score works</summary>
              <ul>
                <li>Required skills found in the resume: 50%</li>
                <li>Relevant experience (meets the minimum, or a proportion of it): 30%</li>
                <li>Preferred skills found in the resume: 20%</li>
                <li>Only skills and years of experience from the sample resume are used. Names, age, gender, photographs and other personal characteristics are never part of the score.</li>
                <li>These weights are for illustration and are not Console's scoring method.</li>
              </ul>
            </details>
          </div>

          <div class="rv-body">
            <div class="rv-cands">
              <h3 class="rv-hd">Applicants · application order</h3>
              <ul class="rv-cl" id="rv-cl"></ul>
              <div class="rv-scan" id="rv-scan" aria-hidden="true"></div>
              <p class="rv-ill"><b>Illustrative Match Scores</b>Example rubric, sample resumes</p>
              <div class="rv-short" id="rv-short">
                <h3 class="rv-hd" style="margin-bottom:8px">Shortlist <span id="rv-sn"></span></h3>
                <ul class="rv-sl" id="rv-sl"></ul>
                <p>Shortlisting is your decision. Scores are a starting point for review.</p>
              </div>
            </div>
            <div class="rv-eval" id="rv-eval" aria-live="off"></div>
          </div>
          <div class="rv-foot"><span>Conceptual demonstration with fictional, anonymised resumes. Nothing is uploaded, analysed by AI or saved.</span><button type="button" id="rv-reset">Reset demo</button></div>
          <p class="rv-live" id="rv-live" role="status" aria-live="polite"></p>
        </div>
      </div>
    </div>

    <div class="rv-end">
      <h3>Better Insights. <em>More Informed Hiring Decisions.</em></h3>
      <p>Console's applicant tracking system helps you compare applicant information with each job requirement, so the recruiter can review the evidence and choose who to shortlist.</p>
      <p class="s">Resume screening software and candidate matching software should support recruitment screening, not replace judgement. In Console's recruitment software, resume scoring is shown alongside the evidence so the decision stays with your team.</p>
    </div>
  </section>`;

var solutionsHtml = `<section class="so wrap" id="solutions" aria-labelledby="so-title">
    <div class="so-intro">
      <span class="eyebrow" style="display:flex;justify-content:center">Built for the Way You Recruit</span>
      <h2 class="so-h2" id="so-title"><span class="ln"><span>Your Recruitment Model.</span></span><span class="ln"><span>Your Command Centre.</span></span></h2>
      <p class="so-lede">Whether you're building your own workforce or recruiting for multiple clients, Console supports the way your recruitment team operates.</p>
    </div>

    <div class="so-worlds" aria-hidden="true">
      <div class="so-w l"><b>CORPORATE HR</b><i></i><i></i><i></i></div>
      <div class="so-w so-rr"><b>RECRUITMENT CONSULTANCY</b><i></i><i></i><i></i></div>
    </div>

    <div class="so-sel">
      <div class="so-tabs" role="tablist" aria-label="Choose your recruitment model">
        <span class="so-ind" aria-hidden="true"></span>
        <button type="button" class="so-tab" role="tab" id="so-t-co" aria-controls="so-p-co" aria-selected="true" tabindex="0" data-m="co"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/></svg></span><b>Companies</b><small>Hiring for your own organisation</small></button>
        <button type="button" class="so-tab" role="tab" id="so-t-hr" aria-controls="so-p-hr" aria-selected="false" tabindex="-1" data-m="hr"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="2.5"/><circle cx="5" cy="17" r="2.5"/><circle cx="12" cy="18" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M12 8.5v7M10.4 7.9 6.2 15M13.6 7.9l4.2 7.1"/></svg></span><b>HR Consultancies</b><small>Hiring for multiple clients</small></button>
      </div>
    </div>

    <div class="so-stage">
      <div class="so-copy">
        <div class="so-panel" id="so-p-co" role="tabpanel" aria-labelledby="so-t-co">
          <p class="so-kick">For companies</p>
          <h3>Build Your Team With Confidence.</h3>
          <p>Give your internal recruitment team a structured way to coordinate hiring requirements, manage candidate activities and keep recruitment moving.</p>
          <ul class="so-caps" aria-label="Use cases">
            <li><h4>Internal recruitment</h4><p>Organise in-house hiring from requirement to selection.</p></li>
            <li><h4>Department hiring</h4><p>Keep vacancies from each department in one place.</p></li>
            <li><h4>Talent acquisition coordination</h4><p>Give TA teams a shared view of open work.</p></li>
            <li><h4>Recruiter assignments</h4><p>Assign recruiters to the requirements they own.</p></li>
            <li><h4>Candidate screening</h4><p>Record screening status and recruiter notes.</p></li>
            <li><h4>Hiring progress visibility</h4><p>See how every open requirement is moving.</p></li>
          </ul>
        </div>
        <div class="so-panel" id="so-p-hr" role="tabpanel" aria-labelledby="so-t-hr" hidden>
          <p class="so-kick">For HR consultancies</p>
          <h3>Multiple Clients. One Recruitment Workspace.</h3>
          <p>Organise client requirements, coordinate recruitment teams and manage candidate interactions across multiple hiring assignments.</p>
          <ul class="so-caps" aria-label="Use cases">
            <li><h4>Client hiring requirements</h4><p>Organise requirements by client account.</p></li>
            <li><h4>Multi-client recruitment</h4><p>Run several hiring assignments side by side.</p></li>
            <li><h4>Recruitment team coordination</h4><p>Allocate recruiters across client work.</p></li>
            <li><h4>Tele-recruiter activities</h4><p>Keep calling and screening work organised.</p></li>
            <li><h4>Candidate follow-ups</h4><p>Track next actions for every candidate.</p></li>
            <li><h4>Recruitment status tracking</h4><p>Follow progress on each client requirement.</p></li>
          </ul>
        </div>
      </div>

      <div class="so-ws" id="so-ws" role="region" aria-label="Interactive Console workspace demo with fictional organisations">
        <div class="so-bar">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="brand"><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 20V9M12 20V4M19 20v-7"/></svg></i>Console</span>
          <span class="org so-mv" id="so-org"></span>
          <span class="demo">Demo · fictional data</span>
        </div>
        <div class="so-rail" id="so-rail" aria-label="How this workspace is organised"></div>
        <div class="so-grid">
          <div class="so-nav"><h4 class="so-hd so-mv" id="so-nh"></h4><ul class="so-nl so-stg" id="so-nl" aria-labelledby="so-nh"></ul></div>
          <div class="so-reqs"><h4 class="so-hd so-mv" id="so-rh"></h4><ul class="so-rl so-stg" id="so-rl" aria-labelledby="so-rh"></ul></div>
          <div class="so-sum so-mv" id="so-sum"></div>
        </div>
        <div class="so-foot"><span>Fictional organisations and sample data. Changes stay on this page and nothing is saved.</span><button type="button" id="so-reset">Reset demo</button></div>
        <p class="so-live" id="so-live" role="status" aria-live="polite"></p>
      </div>
    </div>

    <div class="so-end">
      <h3>Different Recruitment Models. <em>One Console.</em></h3>
      <p>Internal talent acquisition or multi-client recruitment: Console organises the requirements, recruiters and candidates behind your hiring.</p>
      <a class="btn btn-primary" href="#" data-cx-route="demo">Book a Console Demo <span class="arr" aria-hidden="true">→</span></a>
    </div>
    <p class="so-seo">Console is recruitment management software that works as recruitment software for companies and corporate recruitment software for in-house talent acquisition teams, and as recruitment consultancy software and a recruitment agency CRM for firms hiring on behalf of clients. In both cases it supports talent acquisition software needs and day-to-day recruitment team management.</p>
  </section>`;

var ctaHtml = `<section class="cf wrap" id="console-demo" aria-labelledby="cf-title">
    <div class="cf-bg" aria-hidden="true"><i></i></div>
    <div class="cf-in">
      <span class="eyebrow" style="display:flex;justify-content:center">Your Next Hire Starts Here</span>
      <h2 class="cf-h2" id="cf-title"><span class="ln"><span>Ready to Take Control</span></span><span class="ln"><span>of Recruitment?</span></span></h2>
      <p class="cf-p">See how Console can support your recruitment workflows, from candidate screening and calling to interviewing and onboarding.</p>
      <div class="cf-cta">
        <a class="btn btn-primary" href="#" data-cx-route="demo">Book a Console Demo <span class="arr" aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href="#" data-cx-route="contact">Talk to Our Team <span class="arr" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>`;

// ---------- section behaviours (from console.html) ----------
function initWorkspaces(env) {
  const { setTimeout, setInterval, requestAnimationFrame } = env;

    const sec = document.getElementById('crm-workspaces');
    const track = document.getElementById('cs-track'), stage = document.getElementById('cs-stage');
    const appW = document.getElementById('cs-appw'), app = document.getElementById('cs-app');
    const svg = document.getElementById('cs-trails'), close = document.getElementById('cs-close');
    const intro = sec.querySelector('.cs-intro');
    const chs = [...sec.querySelectorAll('.cs-ch')];
    const heads = chs.map(c => c.querySelector('.cs-head'));
    const frags = chs.map(c => [...c.querySelectorAll('.cs-f')]);
    const scrs = [...app.querySelectorAll('.cs-scr')], navs = [...app.querySelectorAll('.cs-nv[data-s]')], crumbs = [...app.querySelectorAll('.cs-crumb span')];
    const header = document.querySelector('.site-header');
    const mqStatic = matchMedia('(max-width: 819px), (prefers-reduced-motion: reduce)');
    const AW = 880, AH = 540, SX = .84, NS = 'http://www.w3.org/2000/svg';
    const cl = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const seg = (p, a, b) => ease(cl((p - a) / (b - a)));

    /* ---- timeline: one source of truth ---- */
    const CH = [0.02, 0.29, 0.56];           // chapter starts
    const CLOSE = [0.80, 0.885];             // closing statement
    function windows(mode) {               // per chapter, per feature: [inA, inB, outA, outB]
      return CH.map(S => {
        if (mode === 'wide') {
          const E0 = S + .03, E1 = S + .115, R0 = S + .19, R1 = S + .235;
          return [0, 1, 2, 3, 4].map(i => [E0 + i * .012, E0 + i * .012 + .045, R0 + (4 - i) * .006, R0 + (4 - i) * .006 + .021]).map(w => w.map(v => Math.min(v, R1)));
        }
        const A = [S + .03, S + .07, S + .105, S + .12], B = [S + .125, S + .16, S + .21, S + .235];
        return [0, 1, 2, 3, 4].map(i => { const W = i < 3 ? A : B, o = (i < 3 ? i : i - 3) * .008; return [W[0] + o, W[1] + o, W[2] + o * .5, W[3]]; });
      });
    }
    const SWITCH = [[0.255, 0.30], [0.525, 0.57]];   // workspace transform windows (01→02, 02→03)

    let mode = 'static', L = null, WIN = null, raf = 0, last = -1;
    const navH = () => (header ? header.getBoundingClientRect().height : 72);

    /* ---- static / mobile / reduced motion ---- */
    function buildPreviews() {
      chs.forEach((c, i) => {
        const box = c.querySelector('.cs-prev');
        if (box.firstChild) return;
        const cl = app.cloneNode(true); cl.removeAttribute('id');
        cl.querySelectorAll('[data-src]').forEach(e => e.removeAttribute('data-src'));
        cl.querySelectorAll(`.cs-scr[data-s="${i}"],.cs-nv[data-s="${i}"],.cs-crumb span[data-s="${i}"]`).forEach(e => e.classList.add('cur'));
        box.appendChild(cl);
      });
    }
    function sizePreviews() {
      const fluid = innerWidth < 820;
      chs.forEach(c => {
        const box = c.querySelector('.cs-prev');
        box.classList.toggle('fl', fluid); box.classList.toggle('sc', !fluid);
        if (!fluid) box.style.setProperty('--k', Math.min(1.1, box.clientWidth / AW).toFixed(4));
      });
    }
    let io = null;
    function enterStatic() {
      sec.classList.remove('cs-pin'); sec.classList.add('cs-static');
      track.style.height = ''; intro.style.cssText = '';
      [...heads, close, appW, ...frags.flat()].forEach(e => { e.style.transform = ''; e.style.opacity = ''; });
      buildPreviews(); sizePreviews();
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window && !io) {
        sec.classList.add('cs-anim');
        io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
        chs.forEach(c => io.observe(c));
      }
    }

    /* ---- pinned: measured layout ---- */
    function off(el) { let x = 0, y = 0; while (el && el !== app) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return [x, y]; }
    function layout() {
      if (!stage.isConnected || !stage.clientWidth) return;
      const W = stage.clientWidth, H = stage.clientHeight, top = navH() + 14;
      // headline zone
      const hw = Math.min(900, W - 80);
      heads.forEach(h => h.style.setProperty('--hw', hw + 'px'));
      const hh = Math.max(...heads.map(h => h.offsetHeight));
      const aTop = top + hh + 22, aH = H - aTop - 22;
      let m = W >= 1100 ? 'wide' : 'mid', fw, k, cx, cy;
      const gap = 30, pad = 24;
      if (m === 'wide') {
        fw = cl(W * .19, 236, 296);
        k = Math.min((W - 2 * (fw + gap + pad)) / SX / AW, aH / AH, 1.12);
        if (k * SX < .58) m = 'mid';
      }
      if (m === 'mid') {
        fw = cl(W * .3, 236, 300);
        k = Math.min((W - fw - gap - 2 * pad) / AW, aH / AH, 1);
        cx = pad + AW * k / 2;
      } else cx = W / 2;
      cy = aTop + aH / 2 + (m === 'wide' ? 0 : 0);
      const s = m === 'wide' ? SX : 1, S = k * s;
      const fx0 = cx - AW * S / 2, fy0 = cy - AH * S / 2, fx1 = cx + AW * S / 2;
      const hx = m === 'wide' ? (W - hw) / 2 : Math.max(pad, cx - hw / 2);
      // fragments
      const out = chs.map((c, ci) => {
        const fs = frags[ci];
        fs.forEach(f => f.style.setProperty('--fw', fw + 'px'));
        const items = fs.map((f, i) => {
          const src = app.querySelector(`.cs-scr[data-s="${ci}"] [data-src="${f.dataset.src}"]`);
          const [ox, oy] = off(src);
          return { f, i, src, ox: fx0 + S * (ox + src.offsetWidth / 2), oy: fy0 + S * (oy + src.offsetHeight / 2), h: f.offsetHeight };
        });
        const place = (list, x, side) => {
          list.sort((a, b) => a.oy - b.oy);
          const g = 14, tot = list.reduce((a, b) => a + b.h, 0) + g * (list.length - 1);
          let y = cl(cy - tot / 2, top, H - 16 - tot);
          list.forEach(it => { it.tx = x; it.ty = y; it.side = side; y += it.h + g; });
        };
        if (m === 'wide') {
          const byX = [...items].sort((a, b) => a.ox - b.ox);
          place(byX.slice(0, 3), fx0 - gap - fw, -1); place(byX.slice(3), fx1 + gap, 1);
        } else {
          const x = Math.min(W - pad - fw, fx1 + gap);
          place(items.slice(0, 3), x, 1); place(items.slice(3), x, 1);
        }
        items.forEach(it => {
          const ex = it.side < 0 ? it.tx + fw : it.tx, ey = it.ty + it.h / 2;
          const mx = (it.ox + ex) / 2, my = (it.oy + ey) / 2 - Math.min(60, Math.abs(ex - it.ox) * .18);
          it.d = `M${it.ox.toFixed(1)} ${it.oy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
          it.cx = mx; it.cy = my;
        });
        return items;
      });
      // svg trails
      svg.querySelectorAll('g').forEach(g => g.remove());
      out.forEach((items, ci) => items.forEach(it => {
        const g = document.createElementNS(NS, 'g'), pth = document.createElementNS(NS, 'path'), dot = document.createElementNS(NS, 'circle');
        pth.setAttribute('d', it.d); dot.setAttribute('r', '2.6');
        g.append(pth, dot); g.style.opacity = 0; svg.appendChild(g);
        it.g = g; it.p = pth; it.dot = dot; it.len = pth.getTotalLength();
        pth.style.strokeDasharray = it.len; pth.style.strokeDashoffset = it.len;
      }));
      svg.querySelector('#cs-tg').setAttribute('x2', W);
      const hTop = top;
      L = { W, H, k, s, cx, cy, m, fw, hx, hTop, aTop, out };
      WIN = windows(m);
      track.style.height = (m === 'wide' ? 560 : 620) + 'vh';
      heads.forEach(h => { h.style.left = hx + 'px'; h.style.top = hTop + 'px'; });
      close.style.top = (top + 10) + 'px';
      last = -1; render();
    }

    function render() {
      raf = 0;
      if (!stage.isConnected) return; if (mode !== 'pin' || !L) return;
      const r = track.getBoundingClientRect(), H = L.H, span = track.offsetHeight - H;
      const p = cl(-r.top / span), pre = cl((innerHeight - r.top) / (innerHeight * .95));
      // intro fades upward as the stage takes over
      const ir = intro.getBoundingClientRect(), fi = cl((ir.bottom - navH()) / (ir.height * .9));
      intro.style.opacity = (fi * fi).toFixed(3); intro.style.transform = `translateY(${(-(1 - fi) * 40).toFixed(1)}px)`;
      const key = p.toFixed(4) + '|' + pre.toFixed(3);
      if (key === last) return; last = key;

      // workspace weights
      const sw = SWITCH.map(([a, b]) => seg(p, a, b));
      const w = [1 - sw[0], sw[0] * (1 - sw[1]), sw[1]];
      scrs.forEach((e, i) => e.style.setProperty('--o', w[i].toFixed(3)));
      navs.forEach((e, i) => e.style.setProperty('--o', w[i].toFixed(3)));
      crumbs.forEach((e, i) => e.style.setProperty('--o', w[i].toFixed(3)));
      const bump = SWITCH.reduce((a, [x, y]) => a + Math.sin(Math.PI * cl((p - x) / (y - x))), 0);

      // fragments
      let chE = [0, 0, 0];
      L.out.forEach((items, ci) => items.forEach(it => {
        const [a, b, c2, d] = WIN[ci][it.i];
        const ein = seg(p, a, b), eout = seg(p, c2, d), e = ein * (1 - eout);
        chE[ci] = Math.max(chE[ci], cl((p - (WIN[ci][0][0] - .02)) / .03) * (1 - cl((p - WIN[ci][4][3] + .005) / .02)));
        const f = it.f;
        if (e <= .001) { f.style.opacity = 0; f.style.transform = 'translate3d(-9999px,0,0)'; it.g.style.opacity = 0; it.src.style.setProperty('--hl', 0); return; }
        const ex = it.tx + L.fw / 2, ey = it.ty + it.h / 2, q = 1 - e;
        // quadratic bezier along the trail curve
        const px = q * q * it.ox + 2 * q * e * it.cx + e * e * ex, py = q * q * it.oy + 2 * q * e * it.cy + e * e * ey;
        const sc = .22 + .78 * e, ry = it.side * -16 * (1 - e), z = -140 * (1 - e);
        f.style.opacity = cl((e - .12) * 1.5).toFixed(3);
        f.style.transform = `translate3d(${(px - L.fw / 2).toFixed(1)}px,${(py - it.h / 2).toFixed(1)}px,${z.toFixed(0)}px) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        it.p.style.strokeDashoffset = (it.len * (1 - e)).toFixed(1);
        it.g.style.opacity = ((.32 + 2.4 * ein * (1 - ein)) * (1 - eout)).toFixed(3);
        const pt = it.len ? it.p.getPointAtLength(it.len * e) : { x: px, y: py };
        it.dot.setAttribute('cx', pt.x.toFixed(1)); it.dot.setAttribute('cy', pt.y.toFixed(1));
        it.src.style.setProperty('--hl', (cl(ein * 3) * (1 - eout) * (.45 + 2.2 * ein * (1 - ein))).toFixed(3));
      }));

      // application transform
      const ent = ease(pre), clo = seg(p, CLOSE[0], CLOSE[1]);
      const shrink = L.m === 'wide' ? (1 - SX) * Math.max(...chE) : 0;
      let sc = L.k * (1 - shrink) * (1 + .028 * bump) * (.9 + .1 * ent) * (1 - .4 * clo);
      const ccy = L.cy + clo * (L.H * .17) + (1 - ent) * 60;
      const ccx = L.m === 'wide' ? L.cx : L.cx + clo * (L.W / 2 - L.cx);
      appW.style.transform = `translate3d(${(ccx - AW * sc / 2).toFixed(1)}px,${(ccy - AH * sc / 2).toFixed(1)}px,0) rotateX(${(10 * (1 - ent)).toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      appW.style.opacity = (ent * (1 - .45 * clo)).toFixed(3);
      appW.style.transformOrigin = '0 0';
      stage.style.setProperty('--ga', (.22 + .06 * Math.max(...chE) + .22 * clo).toFixed(3));
      stage.style.setProperty('--gs', (1 + .12 * clo).toFixed(3));

      // chapter headlines
      heads.forEach((h, i) => {
        let o = w[i], y = 0;
        if (i > 0) { const t = sw[i - 1]; y += (1 - t) * 26; }
        if (i < 2) { const t = sw[i]; y -= t * 26; }
        if (i === 0) o *= ent;
        if (i === 2) { o *= (1 - clo); y -= clo * 26; }
        h.style.opacity = o.toFixed(3); h.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
      });
      close.style.opacity = clo.toFixed(3);
      close.style.transform = `translate3d(-50%,${((1 - clo) * 34).toFixed(1)}px,0) scale(${(.96 + .04 * clo).toFixed(3)})`;
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };

    function setMode() {
      const want = (mqStatic.matches || innerHeight < 540) ? 'static' : 'pin';
      if (want === 'static') { mode = 'static'; enterStatic(); return; }
      mode = 'pin';
      sec.classList.remove('cs-static', 'cs-anim'); sec.classList.add('cs-pin');
      layout();
    }
    let rt = 0;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (mode === 'static' && !(mqStatic.matches || innerHeight < 540)) setMode(); else if (mode === 'pin' && (mqStatic.matches || innerHeight < 540)) setMode(); else if (mode === 'pin') layout(); else sizePreviews(); }, 140); });
    mqStatic.addEventListener?.('change', setMode);
    addEventListener('scroll', onScroll, { passive: true });
    setMode();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (mode === 'pin') layout(); else sizePreviews(); });
  
}
function initDialler(env) {
  const { setTimeout, setInterval, requestAnimationFrame } = env;

    const SEED = [
      { ini: 'PS', name: 'Priya Sharma', role: 'Software Engineer', req: 'Software Engineer · SE-108', rec: 'Sample Recruiter', loc: 'Bengaluru', phone: '+91 99••• ••318', st: ['new', 'Pending screening'], fu: 'First screening call', notes: 'Applied via careers page. Backend experience with Java.', hist: [['Application received', 'Mon']] },
      { ini: 'RD', name: 'Rohan Desai', role: 'Customer Support Executive', req: 'Customer Support · CS-214', rec: 'Sample Recruiter', loc: 'Pune', phone: '+91 98••• ••214', st: ['new', 'Pending screening'], fu: 'First screening call', notes: 'Open to rotational shifts.', hist: [['Application received', 'Mon']] },
      { ini: 'NK', name: 'Neha Kulkarni', role: 'Sales Associate', req: 'Sales Associate · SA-118', rec: 'Sample Recruiter', loc: 'Mumbai', phone: '+91 97••• ••540', st: ['cb', 'Call back'], fu: 'Call back · Today 16:00', notes: 'Asked to be called after 4 pm.', hist: [['Call · Call back requested', 'Yesterday']] },
      { ini: 'IS', name: 'Imran Shaikh', role: 'Field Sales Executive', req: 'Field Sales · FS-090', rec: 'Sample Recruiter', loc: 'Bengaluru', phone: '+91 96••• ••077', st: ['new', 'Pending screening'], fu: 'First screening call', notes: 'Has a two-wheeler and licence.', hist: [['Referred by employee', 'Tue']] }
    ];
    const OUT = { interested: ['ok', 'Interested'], callback: ['cb', 'Call back'], not: ['no', 'Not interested'], noanswer: ['na', 'No answer'] };
    const FU = { interested: 'Schedule interview', callback: 'Call back', not: 'Close candidate', noanswer: 'Retry call' };
    const PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>';
    const CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    const BACK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    const WAVE = n => `<div class="dd-wave" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i style="--i:${i};--h:${(0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * .6))).toFixed(2)}"></i>`).join('')}</div>`;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const mmss = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    const isoTomorrow = () => { const d = new Date(Date.now() + 864e5); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
    const fmt = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    const sec = $('auto-dialler'), stage = $('dd-stage');
    sec.classList.add('dd-js');
    const live = $('dd-live');
    const say = m => { live.textContent = ''; setTimeout(() => { live.textContent = m; }, 30); };

    /* shared demo state: both previews read from the same sample records */
    let C, cur, call, mView, webMsg, mobMsg;
    function boot() {
      C = JSON.parse(JSON.stringify(SEED)); cur = 0;
      call = { on: null, ph: 'ready', s: 0, t: 0, d: 0 };
      mView = 'list'; webMsg = ''; mobMsg = '';
      renderWeb(); renderMob();
    }
    const busy = () => call.on && (call.ph === 'dialling' || call.ph === 'connected');

    /* ---------- focus switch ---------- */
    const tabs = [...sec.querySelectorAll('.dd-tab')], ind = sec.querySelector('.dd-ind');
    const panels = { web: $('dd-p-web'), mobile: $('dd-p-mob') };
    const moveInd = () => { const t = tabs.find(x => x.getAttribute('aria-selected') === 'true'); ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft}px)`; };
    function setFocus(f, opts = {}) {
      stage.dataset.focus = f;
      tabs.forEach(t => { const on = t.dataset.f === f; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      panels.web.hidden = f !== 'web'; panels.mobile.hidden = f !== 'mobile';
      moveInd();
      if (opts.focusTab) tabs.find(t => t.dataset.f === f).focus();
    }
    tabs.forEach(t => t.addEventListener('click', () => setFocus(t.dataset.f)));
    sec.querySelector('.dd-tabs').addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault(); setFocus(stage.dataset.focus === 'web' ? 'mobile' : 'web', { focusTab: true });
    });
    $('dd-webw').addEventListener('pointerdown', () => { if (stage.dataset.focus !== 'web') setFocus('web'); });
    $('dd-phw').addEventListener('pointerdown', () => { if (stage.dataset.focus !== 'mobile') setFocus('mobile'); });
    $('dd-webw').addEventListener('focusin', () => { if (stage.dataset.focus !== 'web' && !mqS.matches) setFocus('web'); });
    $('dd-phw').addEventListener('focusin', () => { if (stage.dataset.focus !== 'mobile' && !mqS.matches) setFocus('mobile'); });

    /* ---------- connecting light between the two previews ---------- */
    const lp = $('dd-lp'), lc = $('dd-lc'), link = $('dd-link');
    function connect() {
      if (reduce || mqT.matches) return;
      const s = stage.getBoundingClientRect();
      const a = $('dw-ql').querySelector('[aria-pressed="true"]');
      const b = mView === 'list' ? $('pm-list').querySelector('.pm-cb.hl') : $('pm').querySelector('.pm-v:not(.hid) .pm-top, .pm-v:not(.hid) .who');
      if (!a || !b) return;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const x1 = ra.right - s.left, y1 = ra.top + ra.height / 2 - s.top, x2 = rb.left - s.left + 6, y2 = rb.top + rb.height / 2 - s.top;
      link.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);
      lp.setAttribute('d', `M${x1},${y1} C${x1 + (x2 - x1) * .45},${y1 - 60} ${x2 - (x2 - x1) * .35},${y2 + 40} ${x2},${y2}`);
      lc.setAttribute('cx', x2); lc.setAttribute('cy', y2);
      [lp, lc].forEach(el => { el.classList.remove('go'); void el.getBBox(); el.classList.add('go'); });
    }

    /* ---------- web app ---------- */
    function renderWeb() {
      const done = C.filter(c => c.st[0] !== 'new').length;
      $('dw-qc').textContent = `${done} of ${C.length} contacted`;
      $('dw-ql').innerHTML = C.map((c, i) => `<li><button type="button" class="dw-qb" data-i="${i}" aria-pressed="${i === cur}"${busy() && i !== cur ? ' disabled' : ''}><span class="dd-av" aria-hidden="true">${c.ini}</span><div><b>${esc(c.name)}</b><small>${esc(c.role)}</small><span class="dd-pl ${c.st[0]}">${esc(c.st[1])}</span></div></button></li>`).join('');
      const c = C[cur], onWeb = call.on === 'web', ph = onWeb ? call.ph : 'ready', otherBusy = busy() && !onWeb;
      const m = $('dw-m'); m.dataset.ph = ph;
      const label = { ready: 'Ready to call', dialling: 'Dialling…', connected: 'Connected', ended: 'Call ended', saved: 'Outcome recorded' }[ph];
      m.innerHTML = `
        <div class="dw-who"><span class="dd-av" aria-hidden="true">${c.ini}</span><div><b>${esc(c.name)}</b><small>${esc(c.role)} · ${esc(c.loc)} · ${esc(c.phone)}</small></div><span class="dd-pl ${c.st[0]}">${esc(c.st[1])}</span></div>
        <div class="dw-kv"><div><span>Requirement</span><b>${esc(c.req)}</b></div><div><span>Assigned recruiter</span><b>${esc(c.rec)}</b></div><div><span>Next follow-up</span><b>${esc(c.fu)}</b></div></div>
        <div class="dw-call"><div class="st"><b><i aria-hidden="true"></i>${label}</b><span id="dw-tm">${ph === 'connected' || ph === 'ended' || ph === 'saved' ? mmss(call.s) : ''}</span></div>${WAVE(30)}
          ${ph === 'ready' ? `<button type="button" class="dw-btn" id="dw-go"${otherBusy ? ' disabled title="A demo call is in progress on mobile"' : ''}>${PHONE}Start sample call</button>` : ''}
          ${ph === 'dialling' || ph === 'connected' ? `<button type="button" class="dw-btn end" id="dw-end">${PHONE}End call</button>` : ''}
          ${ph === 'saved' ? `<button type="button" class="dw-btn" id="dw-next">Next candidate →</button>` : ''}
        </div>
        ${ph === 'ended' ? `<form class="dw-out" id="dw-out" novalidate>
          <fieldset><legend>Screening outcome</legend><div class="dd-og">${Object.entries(OUT).map(([k, v]) => `<label class="dd-oc"><input type="radio" name="dw-o" value="${k}"${call.d === 0 && k === 'noanswer' ? ' checked' : ''}>${v[1]}</label>`).join('')}</div></fieldset>
          <div class="dw-row">
            <label class="dd-f">Follow-up action<select class="dd-in" id="dw-fa">${Object.values(FU).map(v => `<option>${v}</option>`).join('')}</select></label>
            <label class="dd-f">Due<input class="dd-in" type="date" id="dw-fd" value="${isoTomorrow()}"></label>
            <label class="dd-f">Note<input class="dd-in" id="dw-note" maxlength="90" placeholder="Optional"></label>
            <button type="submit" class="dw-save" id="dw-save" disabled>Save outcome</button>
          </div></form>` : ''}
        ${webMsg ? `<div class="dw-ok"><i aria-hidden="true">✓</i><span>${esc(webMsg)}</span></div>` : ''}
        <div class="dw-notes"><div class="dw-card"><p class="dw-h" style="margin:0">Candidate notes</p><p>${esc(c.notes)}</p></div><div class="dw-card"><p class="dw-h" style="margin:0">Activity</p><ul class="dw-hist">${c.hist.slice(0, 3).map((h, i) => `<li class="${h[2] && i === 0 ? 'nw' : ''}"><b style="font-weight:inherit">${esc(h[0])}</b><span>${esc(h[1])}</span></li>`).join('')}</ul></div></div>`;
      bindWeb();
    }
    function bindWeb() {
      const go = $('dw-go'), end = $('dw-end'), nx = $('dw-next'), f = $('dw-out');
      if (go) go.addEventListener('click', () => startCall('web'));
      if (end) end.addEventListener('click', () => endCall());
      if (nx) nx.addEventListener('click', () => { webMsg = ''; select((cur + 1) % C.length, 'web'); const g = $('dw-go'); if (g) g.focus({ preventScroll: true }); });
      if (f) {
        const save = $('dw-save'), fa = $('dw-fa');
        const sync = () => { const v = (f.querySelector('input[name="dw-o"]:checked') || {}).value; save.disabled = !v; if (v && document.activeElement !== fa) fa.value = FU[v]; };
        f.addEventListener('change', e => { if (e.target.name === 'dw-o') sync(); });
        sync();
        f.addEventListener('submit', e => {
          e.preventDefault(); const v = (f.querySelector('input[name="dw-o"]:checked') || {}).value; if (!v) return;
          const due = $('dw-fd').value ? fmt($('dw-fd').value) : '';
          record(v, fa.value + (due && fa.value !== 'Close candidate' ? ' · ' + due : ''), $('dw-note').value.trim(), 'web');
        });
        (f.querySelector('input:checked') || f.querySelector('input')).focus({ preventScroll: true });
      }
    }
    $('dw-ql').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b && !b.disabled) select(+b.dataset.i, 'web'); });

    /* ---------- mobile app ---------- */
    function show(v) {
      mView = v;
      ['list', 'prof', 'call', 'out'].forEach(k => $('pm-' + k).classList.toggle('hid', k !== v));
      ['list', 'prof', 'call', 'out'].forEach(k => { const el = $('pm-' + k); if (k !== v) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
    }
    function renderMob() {
      const c = C[cur], onMob = call.on === 'mobile', otherBusy = busy() && !onMob;
      $('pm-list').innerHTML = `<div class="pm-top"><div><small>Console</small><h4>My candidates</h4></div></div>
        <div class="pm-search" aria-hidden="true">Search assigned candidates</div>
        <ul class="pm-list">${C.map((x, i) => `<li><button type="button" class="pm-cb${i === cur ? ' hl' : ''}" data-i="${i}"><span class="dd-av" aria-hidden="true">${x.ini}</span><div><b>${esc(x.name)}</b><small>${esc(x.role)}</small><span class="dd-pl ${x.st[0]}">${esc(x.st[1])}</span></div>${CHEV}</button></li>`).join('')}</ul>
        <div class="pm-tabs" aria-hidden="true"><span class="on"><i></i>Candidates</span><span><i></i>Calls</span><span><i></i>Follow-ups</span><span><i></i>Profile</span></div>`;
      $('pm-prof').innerHTML = `<div class="pm-top"><button type="button" class="pm-back" data-back="list" aria-label="Back to candidates">${BACK}</button><div><small>Candidate</small><h4>Profile</h4></div></div>
        <div class="pm-prof"><span class="dd-av" aria-hidden="true">${c.ini}</span><b>${esc(c.name)}</b><small>${esc(c.role)}</small><span class="dd-pl ${c.st[0]}">${esc(c.st[1])}</span></div>
        ${mobMsg ? `<div class="pm-ok"><span aria-hidden="true">✓</span><span>${esc(mobMsg)}</span></div>` : ''}
        <div class="pm-card"><div class="pm-kv"><span>Phone</span><b>${esc(c.phone)}</b></div><div class="pm-kv"><span>Requirement</span><b>${esc(c.req.split(' · ')[0])}</b></div><div class="pm-kv"><span>Follow-up</span><b>${esc(c.fu)}</b></div></div>
        <button type="button" class="pm-call" id="pm-go"${otherBusy ? ' disabled' : ''}>${PHONE}${otherBusy ? 'Call in progress on web' : 'Call candidate'}</button>
        <div class="pm-card"><span class="pm-lab">Latest note</span><span style="font-size:.82em;color:var(--ink-2)">${esc(c.notes)}</span></div>`;
      const ph = onMob ? call.ph : 'dialling';
      $('pm-call').dataset.ph = ph;
      $('pm-call').innerHTML = `<div class="who"><div class="ring"><span class="dd-av" aria-hidden="true">${c.ini}</span></div><b>${esc(c.name)}</b><small>${esc(c.role)}</small></div>
        <div style="display:grid;justify-items:center;gap:.4em;width:100%"><span class="stt">${ph === 'connected' ? 'Connected' : 'Calling…'}</span><span class="tm" id="pm-tm">${ph === 'connected' ? mmss(call.s) : ''}</span>${WAVE(22)}<span class="pm-disc">Simulated call · Console demo</span></div>
        <button type="button" class="pm-end" id="pm-end" aria-label="End simulated call">${PHONE}</button>`;
      $('pm-out').innerHTML = `<div class="pm-top"><div><small>${esc(c.name)}</small><h4>Screening outcome</h4></div></div>
        <form id="pm-form" novalidate style="display:grid;gap:.7em">
          <fieldset style="margin:0;padding:0;border:0;min-width:0"><legend class="pm-lab" style="padding:0;margin-bottom:.45em">How did the call go?</legend><div class="pm-og">${Object.entries(OUT).map(([k, v]) => `<label class="dd-oc"><input type="radio" name="pm-o" value="${k}"${onMob && call.d === 0 && k === 'noanswer' ? ' checked' : ''}>${v[1]}</label>`).join('')}</div></fieldset>
          <label style="display:grid;gap:.35em"><span class="pm-lab">Follow-up note</span><textarea class="pm-in" id="pm-note" maxlength="90" placeholder="e.g. Call back after 4 pm"></textarea></label>
          <button type="submit" class="pm-call" id="pm-save" disabled>Confirm outcome</button>
        </form>`;
      bindMob();
      show(mView);
    }
    function bindMob() {
      $('pm-list').querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => { select(+b.dataset.i, 'mobile'); mobMsg = ''; renderMob(); show('prof'); focusFirst('pm-prof'); }));
      $('pm').querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => { mobMsg = ''; show(b.dataset.back); focusFirst('pm-list'); }));
      const go = $('pm-go'); if (go) go.addEventListener('click', () => startCall('mobile'));
      $('pm-end').addEventListener('click', () => endCall());
      const f = $('pm-form'), save = $('pm-save');
      const sync = () => { save.disabled = !f.querySelector('input[name="pm-o"]:checked'); };
      f.addEventListener('change', sync); sync();
      f.addEventListener('submit', e => {
        e.preventDefault(); const v = (f.querySelector('input[name="pm-o"]:checked') || {}).value; if (!v) return;
        const note = $('pm-note').value.trim();
        record(v, FU[v], note, 'mobile');
      });
    }
    const focusFirst = id => { const el = $(id).querySelector('button,input,textarea'); if (el) el.focus({ preventScroll: true }); };

    /* ---------- shared actions ---------- */
    function select(i, from) {
      if (busy()) { say('Finish the current sample call first.'); return; }
      cur = i;
      if (call.on && (call.ph === 'ended' || call.ph === 'saved')) call = { on: null, ph: 'ready', s: 0, t: 0, d: 0 };
      if (from === 'web') { mobMsg = ''; if (mView !== 'list') mView = 'prof'; }
      renderWeb(); renderMob();
      if (from === 'web' && !reduce) { const w = $('dw'); w.classList.remove('sweep'); void w.offsetWidth; w.classList.add('sweep'); }
      requestAnimationFrame(connect);
      say(`${C[i].name} selected on ${from === 'web' ? 'web' : 'mobile'}. The other preview shows the same sample candidate.`);
    }
    function startCall(where) {
      if (busy()) return;
      webMsg = ''; mobMsg = '';
      call = { on: where, ph: 'dialling', s: 0, t: 0, d: 0 };
      renderWeb(); renderMob(); if (where === 'mobile') { show('call'); focusFirst('pm-call'); } else { const e = $('dw-end'); if (e) e.focus({ preventScroll: true }); }
      say(`Sample call to ${C[cur].name} started on ${where}. This is a simulation.`);
      call.d = setTimeout(() => {
        call.ph = 'connected'; call.d = 1;
        if (where === 'web') renderWeb(); else { renderMob(); show('call'); }
        if (where === 'web') { const e = $('dw-end'); if (e) e.focus({ preventScroll: true }); } else focusFirst('pm-call');
        call.t = setInterval(() => { call.s++; const el = $(where === 'web' ? 'dw-tm' : 'pm-tm'); if (el) el.textContent = mmss(call.s); }, 1000);
        say('Connected.');
      }, reduce ? 300 : 1700);
    }
    function endCall() {
      const where = call.on; if (!where) return;
      const connected = call.ph === 'connected';
      if (!connected) clearTimeout(call.d);
      clearInterval(call.t);
      call.ph = 'ended'; call.d = connected ? 1 : 0;
      renderWeb(); renderMob();
      if (where === 'mobile') { show('out'); focusFirst('pm-out'); }
      say(connected ? `Call ended after ${mmss(call.s)}. Choose a screening outcome.` : 'Call ended before connecting. Choose a screening outcome.');
    }
    function record(k, fu, note, where) {
      const c = C[cur], [cls, label] = OUT[k];
      c.st = [cls, label]; c.fu = fu || '—';
      if (note) c.notes = c.notes + ' ' + note;
      c.hist = c.hist.map(h => [h[0], h[1]]);
      c.hist.unshift([`${where === 'web' ? 'Web' : 'Mobile'} call · ${label}${call.s ? ' · ' + mmss(call.s) : ''}`, 'Just now', true]);
      call.ph = 'saved';
      const msg = `${label} recorded for ${c.name} in this demo. Nothing was saved.`;
      if (where === 'web') webMsg = msg; else mobMsg = msg;
      renderWeb(); renderMob();
      if (where === 'mobile') { show('prof'); focusFirst('pm-prof'); call = { on: null, ph: 'ready', s: 0, t: 0, d: 0 }; renderWeb(); }
      else { const n = $('dw-next'); if (n) n.focus({ preventScroll: true }); }
      requestAnimationFrame(connect);
      say(msg + ' Both previews now show the updated status.');
    }
    $('dd-reset').addEventListener('click', () => { clearTimeout(call.d); clearInterval(call.t); boot(); say('Demo reset.'); });

    /* ---------- responsive helpers ---------- */
    const mqS = matchMedia('(max-width: 819px)'), mqT = matchMedia('(max-width: 1079px)');
    boot(); moveInd();
    addEventListener('resize', moveInd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);

    /* ---------- cinematic reveal: web rises, phone emerges from behind, link draws once ---------- */
    const webw = $('dd-webw'), phw = $('dd-phw'), tag = $('dd-tagline'), pmEl = $('pm');
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => 1 - Math.pow(1 - t, 3);
    let swept = false, linked = false, tick = false;
    function reveal() {
      tick = false;
      if (reduce || mqT.matches) { [webw, phw].forEach(el => { el.style.transform = ''; el.style.opacity = ''; el.style.zIndex = ''; }); pmEl.style.setProperty('--lit', 1); tag.style.opacity = ''; tag.style.transform = ''; return; }
      const r = stage.getBoundingClientRect(), vh = innerHeight;
      const p = clamp((vh - r.top) / (vh * .95));
      const ew = ease(clamp(p / .42)), ep = ease(clamp((p - .38) / .4)), et = ease(clamp((p - .82) / .18));
      webw.style.opacity = (.1 + .9 * ew).toFixed(3);
      webw.style.transform = `translateY(${((1 - ew) * 90).toFixed(1)}px) rotateX(${((1 - ew) * 12).toFixed(2)}deg)`;
      phw.style.opacity = clamp(ep * 1.6).toFixed(3);
      phw.style.zIndex = ep > .55 ? 2 : 0;
      phw.style.transform = `translateX(${((1 - ep) * -55).toFixed(1)}%) translateY(${((1 - ep) * 6).toFixed(1)}%) rotateY(${((1 - ep) * 28).toFixed(1)}deg) scale(${(.82 + .18 * ep).toFixed(3)})`;
      pmEl.style.setProperty('--lit', (.25 + .75 * clamp((ep - .5) / .5)).toFixed(3));
      tag.style.opacity = (.15 + .85 * et).toFixed(3);
      tag.style.transform = `translateY(${((1 - et) * 14).toFixed(1)}px)`;
      if (!swept && ew > .7) { swept = true; const w = $('dw'); w.classList.add('sweep'); }
      if (!linked && ep > .98) { linked = true; setTimeout(connect, 150); }
    }
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(reveal); } }, { passive: true });
    addEventListener('resize', reveal);
    mqT.addEventListener('change', reveal);
    reveal();

    if (!reduce && 'IntersectionObserver' in window && sec.getBoundingClientRect().top > innerHeight * .85) {
      sec.classList.add('wait');
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { sec.classList.remove('wait'); io.disconnect(); } }, { threshold: .1 });
      io.observe(sec.querySelector('.dd-intro'));
    }
  
}
function initScreening(env) {
  const { setTimeout, setInterval, requestAnimationFrame } = env;

    /* Illustrative example rubric — NOT Console's scoring algorithm.
       Required skills 50% · Relevant experience 30% · Preferred skills 20%.
       Uses only skills and years of experience from the sample resume. */
    function rvScore(job, cand) {
      const has = s => cand.skills.includes(s);
      const reqF = job.req.filter(has), prefF = job.pref.filter(has);
      const reqR = job.req.length ? reqF.length / job.req.length : 1;
      const prefR = job.pref.length ? prefF.length / job.pref.length : 1;
      const expR = cand.years >= job.exp[0] ? 1 : cand.years / job.exp[0];
      const parts = { req: 50 * reqR, exp: 30 * expR, pref: 20 * prefR };
      return {
        total: Math.round(parts.req + parts.exp + parts.pref),
        parts, reqF, prefF,
        reqMissing: job.req.filter(s => !has(s)), prefMissing: job.pref.filter(s => !has(s)),
        expNote: cand.years >= job.exp[0] ? (cand.years > job.exp[1] ? 'Above the range (counted as meeting it)' : 'Within the range') : 'Below the range'
      };
    }
    const RV_JOBS = {
      se: { title: 'Software Engineer', loc: 'Bengaluru', exp: [3, 5], req: ['React', 'JavaScript', 'TypeScript'], pref: ['Node.js', 'Jest', 'REST APIs', 'Git', 'Accessibility'] },
      fe: { title: 'Frontend Developer', loc: 'Pune', exp: [2, 4], req: ['React', 'CSS', 'JavaScript'], pref: ['TypeScript', 'Jest', 'Accessibility'] },
      fs: { title: 'Full-Stack Engineer', loc: 'Hyderabad', exp: [4, 7], req: ['JavaScript', 'Node.js', 'REST APIs'], pref: ['React', 'TypeScript', 'SQL'] }
    };
    const RV_CANDS = [
      { id: 'A', title: 'Frontend Engineer', years: 4, skills: ['React', 'JavaScript', 'TypeScript', 'Jest', 'REST APIs', 'Git'],
        ev: { React: 'Built React and TypeScript dashboards for a logistics platform (2022–present).', TypeScript: 'Migrated a JavaScript codebase to TypeScript.', JavaScript: 'Four years of JavaScript across web projects.', Jest: 'Wrote unit tests with Jest for shared UI components.', 'REST APIs': 'Integrated REST APIs for order tracking.', Git: 'Maintained release branches in Git.' } },
      { id: 'B', title: 'Web Developer', years: 3, skills: ['React', 'JavaScript', 'TypeScript', 'Git', 'CSS'],
        ev: { React: 'Developed customer-facing React pages for an e-commerce site.', JavaScript: 'Three years building interactive web features.', TypeScript: 'Used TypeScript for new modules since 2023.', CSS: 'Built responsive layouts with modern CSS.', Git: 'Used Git with pull-request reviews.' } },
      { id: 'C', title: 'Full-Stack Developer', years: 5, skills: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'SQL', 'CSS'],
        ev: { React: 'Built admin tools in React.', JavaScript: 'Five years of JavaScript, front end and back end.', 'Node.js': 'Designed Node.js services for payments.', 'REST APIs': 'Designed and documented REST APIs.', SQL: 'Wrote reporting queries in SQL.', CSS: 'Styled internal tools with CSS.' } },
      { id: 'D', title: 'Software Developer', years: 6, skills: ['Angular', 'JavaScript', 'TypeScript', 'Git', 'SQL'],
        ev: { Angular: 'Led an Angular migration for a banking portal.', JavaScript: 'Six years of JavaScript development.', TypeScript: 'Used TypeScript daily with Angular.', Git: 'Managed Git workflows for a team of five.', SQL: 'Maintained SQL stored procedures.' } }
    ];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const sec = $('resume-screening');
    const say = m => { const l = $('rv-live'); l.textContent = ''; setTimeout(() => { l.textContent = m; }, 30); };
    let job, jobKey, sel, short, shown = {}, P = 1;

    function boot(key = 'se') {
      jobKey = key; job = JSON.parse(JSON.stringify(RV_JOBS[key])); sel = 'A'; short = [];
      $('rv-jsel').value = key; $('rv-exp').value = job.exp.join('-');
      renderJob(); renderCands(false); renderEval(); renderShort();
    }
    const scoreOf = id => rvScore(job, RV_CANDS.find(c => c.id === id));

    function renderJob() {
      $('rv-jt').innerHTML = `${esc(job.title)}<small>${esc(job.loc)} · ${job.exp[0]}–${job.exp[1]} years · sample requirement</small>`;
      const chip = (s, req) => `<button type="button" class="rv-chip${req ? ' req' : ''}" data-s="${esc(s)}" aria-label="${esc(s)}, ${req ? 'required' : 'preferred'}. Select to make it ${req ? 'preferred' : 'required'}.">${esc(s)}<span class="k" aria-hidden="true">${req ? 'Req' : 'Pref'}</span></button>`;
      $('rv-req').innerHTML = job.req.map(s => chip(s, true)).join('');
      $('rv-pref').innerHTML = job.pref.map(s => chip(s, false)).join('') || '<span style="font-size:12.5px;color:var(--ink-3)">None</span>';
    }
    function tween(el, from, to, fmt) {
      if (reduce || from === to) { el.innerHTML = fmt(to); return; }
      const t0 = performance.now(), D = 600;
      const step = now => { const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3); el.innerHTML = fmt(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    function renderCands(animate) {
      $('rv-cl').innerHTML = RV_CANDS.map((c, i) => {
        const s = scoreOf(c.id), inS = short.includes(c.id);
        return `<li class="rv-it" data-i="${i}"><button type="button" class="rv-cb" data-id="${c.id}" aria-pressed="${c.id === sel}" aria-label="Candidate ${c.id}, ${esc(c.title)}, ${c.years} years. Illustrative match score ${s.total} percent.${inS ? ' Shortlisted.' : ''}">
          <span class="rv-doc" aria-hidden="true"><span class="pg"><i></i><i></i><i></i><i></i><i></i></span><span class="ln"><b>Resume · Candidate ${c.id}</b><i style="width:88%"></i><i style="width:64%"></i></span></span>
          <span class="rv-card"><span class="rv-av" aria-hidden="true">${c.id}</span><span class="m"><b>Candidate ${c.id}</b><small>${esc(c.title)} · ${c.years} yrs</small>${inS ? '<span class="sl">✓ Shortlisted</span>' : ''}</span>
          <span class="rv-sc" aria-hidden="true"><b data-sc="${c.id}">${shown[c.id] ?? s.total}<small>%</small></b><span class="bar"><i style="--w:${s.total}%"></i></span></span></span>
        </button></li>`;
      }).join('');
      RV_CANDS.forEach(c => { const el = $('rv-cl').querySelector(`[data-sc="${c.id}"]`), to = scoreOf(c.id).total, from = shown[c.id] ?? to; if (animate) tween(el, from, to, v => `${v}<small>%</small>`); shown[c.id] = to; });
      applyP(P);
    }
    function renderEval() {
      const c = RV_CANDS.find(x => x.id === sel), s = scoreOf(sel), inS = short.includes(sel);
      const pill = (t, y, kind) => `<span class="rv-pill ${y ? 'y' : 'n'}"><span class="ic" aria-hidden="true">${y ? '✓' : '?'}</span>${esc(t)}<span class="rv-live">${y ? ' found in resume' : ' not found in resume'}${kind ? ', ' + kind : ''}</span></span>`;
      const ev = [...s.reqF, ...s.prefF].slice(0, 3).map(k => `<li><b>${esc(k)}:</b> “${esc(c.ev[k] || k + ' listed in skills section.')}”</li>`).join('');
      $('rv-eval').innerHTML = `
        <h3 class="rv-hd">Match explanation</h3>
        <div class="rv-eh"><div class="rv-ring" style="--s:${s.total}" role="img" aria-label="Illustrative match score ${s.total} out of 100"><span><b>${s.total}%</b><small>illustrative</small></span></div>
          <div><h4>Candidate ${c.id}</h4><p>${esc(c.title)} · ${c.years} years · for ${esc(job.title)}</p></div></div>
        <div class="rv-act"><button type="button" class="rv-add" id="rv-add" aria-pressed="${inS}">${inS ? '✓ Shortlisted · remove' : 'Add to Shortlist'}</button><small>The recruiter decides who moves forward.</small></div>
        <div class="rv-bk" aria-label="Score breakdown">
          <div><span>Required skills · ${s.reqF.length} of ${job.req.length}</span><span class="bar"><i style="--w:${(s.parts.req / 50 * 100).toFixed(0)}%"></i></span><b>${Math.round(s.parts.req)} / 50</b></div>
          <div><span>Experience · ${c.years} yrs vs ${job.exp[0]}–${job.exp[1]}</span><span class="bar"><i style="--w:${(s.parts.exp / 30 * 100).toFixed(0)}%"></i></span><b>${Math.round(s.parts.exp)} / 30</b></div>
          <div><span>Preferred skills · ${s.prefF.length} of ${job.pref.length}</span><span class="bar"><i style="--w:${job.pref.length ? (s.parts.pref / 20 * 100).toFixed(0) : 100}%"></i></span><b>${Math.round(s.parts.pref)} / 20</b></div>
        </div>
        <div class="rv-grp"><p>Required qualifications</p><div class="rv-pills">${job.req.map(k => pill(k, c.skills.includes(k), 'required')).join('')}</div></div>
        <div class="rv-grp"><p>Preferred qualifications</p><div class="rv-pills">${job.pref.length ? job.pref.map(k => pill(k, c.skills.includes(k), 'preferred')).join('') : '<span style="font-size:12.5px;color:var(--ink-3)">None set</span>'}</div></div>
        <div class="rv-grp"><p>Relevant experience</p><div class="rv-pills"><span class="rv-pill ${c.years >= job.exp[0] ? 'y' : 'n'}"><span class="ic" aria-hidden="true">${c.years >= job.exp[0] ? '✓' : '?'}</span>${c.years} years · ${esc(s.expNote.toLowerCase())}</span></div></div>
        ${ev ? `<div class="rv-grp"><p>Resume evidence</p><ul class="rv-ev">${ev}</ul></div>` : ''}
        <p class="rv-warn">? means not found in this sample resume. That is information to verify with the candidate, not proof they lack the skill.</p>
        `;
      $('rv-add').addEventListener('click', () => toggleShort(sel, true));
    }
    function renderShort() {
      $('rv-sn').textContent = `(${short.length})`;
      $('rv-sl').innerHTML = short.length ? short.map(id => `<li>Candidate ${id} · ${scoreOf(id).total}%<button type="button" data-rm="${id}" aria-label="Remove Candidate ${id} from shortlist">×</button></li>`).join('') : '<li class="empty">No candidates shortlisted yet.</li>';
    }
    function toggleShort(id, fromBtn) {
      const i = short.indexOf(id);
      if (i >= 0) short.splice(i, 1); else short.push(id);
      const on = short.includes(id);
      renderCands(false); renderShort(); renderEval();
      if (fromBtn) $('rv-add').focus({ preventScroll: true });
      say(on ? `Candidate ${id} added to the shortlist in this demo.` : `Candidate ${id} removed from the shortlist.`);
    }

    $('rv-cl').addEventListener('click', e => {
      const b = e.target.closest('[data-id]'); if (!b) return;
      sel = b.dataset.id;
      $('rv-cl').querySelectorAll('[data-id]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.id === sel)));
      renderEval();
      const s = scoreOf(sel); say(`Candidate ${sel} selected. Illustrative match score ${s.total} percent. Explanation updated.`);
    });
    $('rv-sl').addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) toggleShort(b.dataset.rm, false); });
    $('rv-req').parentElement.addEventListener('click', e => {
      const b = e.target.closest('.rv-chip'); if (!b) return;
      const s = b.dataset.s;
      if (job.req.includes(s)) { if (job.req.length === 1) { say('Keep at least one required skill.'); return; } job.req = job.req.filter(x => x !== s); job.pref.push(s); }
      else { job.pref = job.pref.filter(x => x !== s); job.req.push(s); }
      renderJob(); renderCands(true); renderEval(); renderShort();
      const back = sec.querySelector(`.rv-chip[data-s="${CSS.escape(s)}"]`); if (back) back.focus({ preventScroll: true });
      say(`${s} is now ${job.req.includes(s) ? 'required' : 'preferred'}. Illustrative scores updated.`);
    });
    $('rv-jsel').addEventListener('change', e => { const prev = { ...shown }; boot(e.target.value); shown = prev; renderCands(true); say(`${job.title} selected. Illustrative scores updated.`); });
    $('rv-exp').addEventListener('change', e => { job.exp = e.target.value.split('-').map(Number); renderJob(); renderCands(true); renderEval(); renderShort(); say('Experience range changed. Illustrative scores updated.'); });
    $('rv-reset').addEventListener('click', () => { shown = {}; boot('se'); say('Demo reset.'); });

    /* ---------- scroll-controlled sequence ---------- */
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => 1 - Math.pow(1 - t, 3);
    const steps = [...sec.querySelectorAll('.rv-step')], TH = [0, .16, .5, .66, .82];
    const jobEl = $('rv-job'), scan = $('rv-scan'), evalEl = $('rv-eval'), shortEl = $('rv-short');
    let nudged = false;
    function applyP(p) {
      P = p;
      const jf = ease(clamp(p / .14));
      jobEl.style.opacity = (.25 + .75 * jf).toFixed(3);
      jobEl.style.transform = jf < 1 ? `scale(${(.97 + .03 * jf).toFixed(4)})` : '';
      jobEl.style.filter = jf < 1 ? `blur(${((1 - jf) * 4).toFixed(2)}px)` : '';
      const items = [...$('rv-cl').children];
      items.forEach((li, i) => {
        const a = ease(clamp((p - .14 - i * .035) / .12));
        li.style.opacity = a.toFixed(3);
        li.style.transform = a < 1 ? `translate(${((1 - a) * (i % 2 ? 40 : -40)).toFixed(1)}px,${((1 - a) * 24).toFixed(1)}px) rotate(${((1 - a) * (i % 2 ? 4 : -4)).toFixed(2)}deg)` : '';
        const f = clamp((p - .5 - i * .02) / .08);
        li.querySelector('.rv-doc').style.opacity = (1 - f).toFixed(3);
        const card = li.querySelector('.rv-card'); card.style.opacity = f.toFixed(3);
        const id = RV_CANDS[i].id, tot = scoreOf(id).total, scEl = li.querySelector('[data-sc]');
        const sk = clamp((p - .52) / .12);
        if (p < 1) scEl.innerHTML = `${Math.round(tot * ease(sk))}<small>%</small>`;
        li.querySelector('.rv-sc .bar i').style.setProperty('--w', (tot * ease(sk)).toFixed(1) + '%');
      });
      const sx = clamp((p - .3) / .2);
      scan.style.opacity = sx > 0 && sx < 1 ? Math.sin(Math.PI * sx).toFixed(3) : '0';
      scan.style.transform = `translateX(${(sx * ($('rv-cl').offsetWidth + 40) - 50).toFixed(1)}px)`;
      const eo = ease(clamp((p - .64) / .12));
      evalEl.style.opacity = (.12 + .88 * eo).toFixed(3);
      evalEl.style.transform = eo < 1 ? `translateX(${((1 - eo) * 24).toFixed(1)}px)` : '';
      const so = ease(clamp((p - .8) / .1));
      shortEl.style.opacity = (.15 + .85 * so).toFixed(3);
      shortEl.style.transform = so < 1 ? `translateY(${((1 - so) * 14).toFixed(1)}px)` : '';
      const cur = TH.reduce((a, t, i) => p >= t ? i : a, 0);
      steps.forEach((s, i) => { s.classList.toggle('on', i === cur); s.classList.toggle('done', i < cur); });
      if (p >= .9 && !nudged && !short.length && !reduce) { nudged = true; const b = $('rv-add'); if (b) b.classList.add('nudge'); }
    }

    const track = $('rv-track'), mqW = matchMedia('(min-width: 1100px) and (min-height: 700px)');
    let pin = false, tick = false, io = null;
    function onScroll() {
      tick = false; if (!pin) return;
      const r = track.getBoundingClientRect();
      applyP(clamp(-r.top / (track.offsetHeight - innerHeight) * 1.08));
    }
    function setMode() {
      pin = mqW.matches && !reduce;
      sec.classList.toggle('rv-pin', pin);
      if (io) { io.disconnect(); io = null; }
      if (pin) { onScroll(); return; }
      if (reduce || !('IntersectionObserver' in window)) { applyP(1); return; }
      if ($('rv-win').getBoundingClientRect().top > innerHeight * .8) {
        applyP(0);
        io = new IntersectionObserver(es => {
          if (!es[0].isIntersecting) return; io.disconnect(); io = null;
          const t0 = performance.now(), D = 3400;
          const step = now => { const k = clamp((now - t0) / D); applyP(k); if (k < 1 && !pin) requestAnimationFrame(step); };
          requestAnimationFrame(step);
        }, { threshold: .25 });
        io.observe($('rv-win'));
      } else applyP(1);
    }
    boot('se');
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    addEventListener('resize', () => { if (pin) onScroll(); });
    mqW.addEventListener('change', setMode);
    setMode();
  
}
function initSolutions(env) {
  const { setTimeout, setInterval, requestAnimationFrame } = env;

    const AV = { MI: 'linear-gradient(135deg,#E2D4FF,#9E84F5)', AM: 'linear-gradient(135deg,#B5A3F3,#8660F8)', SK: 'linear-gradient(135deg,#C9F0EA,#5ED3C8)', FA: 'linear-gradient(135deg,#C9F0EA,#5ED3C8)', DP: 'linear-gradient(135deg,#F3E2C4,#D9B26A)' };
    const WORLDS = {
      co: {
        org: '<b>Northstar Technologies</b> · internal recruitment',
        rail: [['Organisation', 'Northstar Technologies'], ['Departments', '4 departments'], ['Hiring requirements', 'Internal vacancies']],
        navH: 'Departments', reqH: 'Hiring requirements', ownerL: 'Hiring manager',
        recruiters: [['MI', 'Meera Iyer'], ['AM', 'Arjun Mehta'], ['SK', 'Sana Khan']],
        nodes: [
          { name: 'Engineering', sub: 'Product & platform', reqs: [
            { t: 'Software Engineer', open: 3, owner: 'Kavya Rao', loc: 'Bengaluru', st: 'Screening', rec: 'AM', act: [['Screening calls in progress', 'Today'], ['Requirement approved by Engineering', 'Mon']] },
            { t: 'QA Engineer', open: 1, owner: 'Kavya Rao', loc: 'Bengaluru', st: 'Sourcing', rec: 'SK', act: [['Job description finalised', 'Yesterday']] } ] },
          { name: 'Sales', sub: 'Regional sales', reqs: [
            { t: 'Sales Executive', open: 4, owner: 'Deepak Joshi', loc: 'Mumbai', st: 'Interviews', rec: 'MI', act: [['Interviews scheduled with shortlisted candidates', 'Today'], ['Openings increased from 3 to 4', 'Tue']] },
            { t: 'Inside Sales Associate', open: 2, owner: 'Deepak Joshi', loc: 'Pune', st: 'Sourcing', rec: 'MI', act: [['Requirement raised by Sales', 'Mon']] } ] },
          { name: 'Customer Support', sub: 'Customer experience', reqs: [
            { t: 'Support Specialist', open: 5, owner: 'Pooja Menon', loc: 'Pune', st: 'Screening', rec: 'SK', act: [['Walk-in screening planned for Saturday', 'Today'], ['Shift timings confirmed', 'Tue']] } ] },
          { name: 'Human Resources', sub: 'People operations', reqs: [
            { t: 'HR Generalist', open: 1, owner: 'Anil Kapoor', loc: 'Bengaluru', st: 'Offer stage', rec: 'AM', act: [['Offer discussion with selected candidate', 'Yesterday']] } ] }
        ]
      },
      hr: {
        org: '<b>TalentBridge Recruitment</b> · client recruitment',
        rail: [['Consultancy', 'TalentBridge Recruitment'], ['Client accounts', '3 clients'], ['Client requirements', 'Hiring for clients']],
        navH: 'Client accounts', reqH: 'Client requirements', ownerL: 'Client contact',
        recruiters: [['FA', 'Faisal Ahmed'], ['DP', 'Divya Pillai'], ['MI', 'Meera Iyer']],
        nodes: [
          { name: 'Northstar Technologies', sub: 'Technology', reqs: [
            { t: 'Software Engineer', open: 2, owner: 'Kavya Rao (client)', loc: 'Bengaluru', st: 'CVs with client', pr: ['hi', 'High'], rec: 'FA', fu: [['Collect client feedback on shared CVs', 'Pending'], ['Book client interview slots', 'Pending']], act: [['Five CVs shared with client', 'Today'], ['Requirement received from client', 'Mon']] },
            { t: 'Support Specialist', open: 6, owner: 'Pooja Menon (client)', loc: 'Pune', st: 'Screening', pr: ['md', 'Medium'], rec: 'DP', fu: [['Confirm shift preferences with client', 'In progress']], act: [['Screening calls started', 'Yesterday']] } ] },
          { name: 'BluePeak Industries', sub: 'Manufacturing', reqs: [
            { t: 'Production Supervisor', open: 3, owner: 'Ramesh K. (client)', loc: 'Chakan', st: 'Sourcing', pr: ['hi', 'High'], rec: 'DP', fu: [['Share first shortlist with client', 'Pending']], act: [['Client brief call completed', 'Today']] },
            { t: 'Quality Inspector', open: 4, owner: 'Ramesh K. (client)', loc: 'Chakan', st: 'Client interviews', pr: ['md', 'Medium'], rec: 'MI', fu: [['Coordinate interview travel for candidates', 'In progress']], act: [['Three candidates interviewed by client', 'Tue']] } ] },
          { name: 'UrbanGrid Solutions', sub: 'Infrastructure', reqs: [
            { t: 'Site Engineer', open: 2, owner: 'Neha D. (client)', loc: 'Hyderabad', st: 'Screening', pr: ['hi', 'High'], rec: 'FA', fu: [['Verify site experience with candidates', 'Pending']], act: [['Requirement priority raised by client', 'Today']] },
            { t: 'Project Coordinator', open: 1, owner: 'Neha D. (client)', loc: 'Hyderabad', st: 'Offer stage', pr: ['lo', 'Low'], rec: 'DP', fu: [['Confirm joining date with client', 'Pending']], act: [['Client selected a candidate', 'Yesterday']] } ] }
        ]
      }
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const sec = $('solutions'), ws = $('so-ws');
    sec.classList.add('so-js');
    const say = m => { const l = $('so-live'); l.textContent = ''; setTimeout(() => { l.textContent = m; }, 30); };
    let D, mode = 'co', node = 0, req = 0, litRec = '';
    const W = () => D[mode], R = () => W().nodes[node].reqs[req];
    const nameOf = ini => (W().recruiters.find(r => r[0] === ini) || [ini, ini])[1];
    const av = (ini, lit) => `<span class="so-av${lit ? ' lit' : ''}" style="--avbg:${AV[ini] || ''}" aria-hidden="true">${ini}</span>`;

    function renderRail(swap) {
      $('so-rail').innerHTML = W().rail.map((r, i) => `${i ? '<span class="so-arr" aria-hidden="true">→</span>' : ''}<span class="so-node${i === 2 ? ' hl' : ''}"><small>${esc(r[0])}</small><b class="${swap ? 'swap' : ''}" style="--i:${i}">${i === 2 ? esc(W().nodes[node].name) + ' · ' + esc(r[1]) : esc(r[1])}</b></span>`).join('');
    }
    function renderNav(anim) {
      $('so-nl').classList.toggle('anim', !!anim);
      $('so-org').innerHTML = W().org;
      $('so-nh').textContent = W().navH;
      $('so-nl').innerHTML = W().nodes.map((n, i) => `<li style="--i:${i}"><button type="button" class="so-nb" data-n="${i}" aria-pressed="${i === node}"><span class="ic" aria-hidden="true">${esc(n.name.split(' ').map(w => w[0]).slice(0, 2).join(''))}</span><div><span>${esc(n.name)}</span><small>${esc(n.sub)}</small></div><span class="ct" aria-label="${n.reqs.length} requirements">${n.reqs.length}</span></button></li>`).join('');
    }
    function renderReqs(anim) {
      $('so-rl').classList.toggle('anim', !!anim);
      const n = W().nodes[node];
      $('so-rh').textContent = `${W().reqH} · ${n.name}`;
      $('so-rl').innerHTML = n.reqs.map((r, i) => `<li style="--i:${i}"><button type="button" class="so-rb" data-r="${i}" aria-pressed="${i === req}">
        <span class="so-tt"><b>${esc(r.t)}</b>${r.pr ? `<span class="so-pl ${r.pr[0]}">${r.pr[1]}</span>` : `<span class="so-pl st">${esc(r.st)}</span>`}</span>
        <small>${r.open} ${r.open === 1 ? 'opening' : 'openings'} · ${esc(r.loc)}${r.pr ? ' · ' + esc(r.st) : ''}</small>
        <span class="so-rr">${av(r.rec, litRec === r.rec && i === req)}${esc(nameOf(r.rec))}</span></button></li>`).join('');
    }
    function renderSum(newAct) {
      const n = W().nodes[node], r = R();
      const fu = r.fu ? `<div class="so-sec"><p class="so-hd">Follow-up tasks</p><ul class="so-fu">${r.fu.map((f, i) => `<li><span>${esc(f[0])}<small>${esc(nameOf(r.rec))}</small></span><label><span class="so-live">Status for ${esc(f[0])}</span><select data-f="${i}">${['Pending', 'In progress', 'Done'].map(o => `<option${o === f[1] ? ' selected' : ''}>${o}</option>`).join('')}</select></label></li>`).join('')}</ul></div>` : '';
      $('so-sum').innerHTML = `
        <p class="so-hd">${mode === 'co' ? 'Requirement summary' : 'Client requirement'}</p>
        <h4>${esc(r.t)}</h4><p class="so-sub">${mode === 'co' ? 'Department' : 'Client account'}: ${esc(n.name)}</p>
        <div class="so-kv"><div><span>${W().ownerL}</span><b>${esc(r.owner)}</b></div><div><span>Open positions</span><b>${r.open}</b></div><div><span>Location</span><b>${esc(r.loc)}</b></div><div><span>${mode === 'co' ? 'Screening status' : 'Recruitment status'}</span><b>${esc(r.st)}</b></div></div>
        <div class="so-sec"><p class="so-hd" id="so-rech">Assigned recruiter</p><div class="so-recs" role="radiogroup" aria-labelledby="so-rech">${W().recruiters.map(([ini, nm]) => `<label class="so-rc"><input type="radio" name="so-rec" value="${ini}"${ini === r.rec ? ' checked' : ''}>${av(ini)}${esc(nm)}</label>`).join('')}</div></div>
        ${fu}
        <div class="so-sec"><p class="so-hd">${mode === 'co' ? 'Recruitment activity' : 'Client activity'}</p><ul class="so-tl">${r.act.slice(0, 4).map((a, i) => `<li class="${newAct && i === 0 ? 'nw' : ''}"><i aria-hidden="true"></i><span style="color:inherit;white-space:normal">${esc(a[0])}</span><span>${esc(a[1])}</span></li>`).join('')}</ul></div>`;
      $('so-sum').querySelectorAll('input[name="so-rec"]').forEach(inp => inp.addEventListener('change', () => {
        r.rec = inp.value; litRec = inp.value;
        r.act.unshift([`Assigned to ${nameOf(inp.value)}`, 'Just now']);
        renderReqs(); renderSum(true);
        const back = $('so-sum').querySelector(`input[name="so-rec"][value="${inp.value}"]`); if (back) back.focus({ preventScroll: true });
        say(`${r.t} assigned to ${nameOf(inp.value)} in this demo.`);
      }));
      $('so-sum').querySelectorAll('select[data-f]').forEach(s => s.addEventListener('change', () => {
        const f = r.fu[+s.dataset.f]; f[1] = s.value;
        r.act.unshift([`Follow-up ${s.value === 'Done' ? 'completed' : 'marked ' + s.value.toLowerCase()}: ${f[0]}`, 'Just now']);
        renderSum(true);
        const back = $('so-sum').querySelector(`select[data-f="${s.dataset.f}"]`); if (back) back.focus({ preventScroll: true });
        say(`Follow-up status changed to ${s.value}. Activity updated.`);
      }));
    }
    function renderAll(swap) { renderRail(swap); renderNav(swap); renderReqs(swap); renderSum(); }

    $('so-nl').addEventListener('click', e => {
      const b = e.target.closest('[data-n]'); if (!b) return;
      node = +b.dataset.n; req = 0; litRec = '';
      renderNav(); renderRail(true); renderReqs(true); renderSum();
      $('so-nl').querySelector(`[data-n="${node}"]`).focus({ preventScroll: true });
      say(`${W().nodes[node].name} selected. ${W().nodes[node].reqs.length} requirements shown.`);
    });
    $('so-rl').addEventListener('click', e => {
      const b = e.target.closest('[data-r]'); if (!b) return;
      req = +b.dataset.r; litRec = '';
      $('so-rl').querySelectorAll('[data-r]').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.r === req)));
      renderSum();
      say(`${R().t} selected.`);
    });

    /* selector + world switch */
    const tabs = [...sec.querySelectorAll('.so-tab')], ind = sec.querySelector('.so-ind');
    const moveInd = () => { const t = tabs.find(x => x.getAttribute('aria-selected') === 'true'); ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft}px)`; };
    let switching = false;
    function setMode(m, focusTab) {
      if (m === mode || switching) { if (focusTab) tabs.find(t => t.dataset.m === m).focus(); return; }
      tabs.forEach(t => { const on = t.dataset.m === m; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      $('so-p-co').hidden = m !== 'co'; $('so-p-hr').hidden = m !== 'hr';
      moveInd();
      if (focusTab) tabs.find(t => t.dataset.m === m).focus();
      const go = () => { mode = m; node = 0; req = 0; litRec = ''; renderAll(true); };
      if (reduce) { go(); }
      else {
        switching = true; ws.classList.add('out');
        setTimeout(() => { go(); ws.classList.remove('out'); ws.classList.add('in'); setTimeout(() => { ws.classList.remove('in'); switching = false; }, 520); }, 320);
      }
      say(m === 'co' ? 'For companies: organisation, departments and internal hiring requirements.' : 'For HR consultancies: consultancy, client accounts and client hiring requirements.');
    }
    tabs.forEach(t => t.addEventListener('click', () => setMode(t.dataset.m)));
    sec.querySelector('.so-tabs').addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault(); setMode(e.key === 'Home' ? 'co' : e.key === 'End' ? 'hr' : (mode === 'co' ? 'hr' : 'co'), true);
    });
    function boot() { D = JSON.parse(JSON.stringify(WORLDS)); node = 0; req = 0; litRec = ''; renderAll(false); }
    $('so-reset').addEventListener('click', () => { boot(); say('Demo reset.'); });
    boot(); moveInd();
    addEventListener('resize', moveInd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);

    /* entrance: headline, two worlds converge, shared console emerges, selector appears */
    if (!reduce && 'IntersectionObserver' in window && sec.getBoundingClientRect().top > innerHeight * .85) {
      sec.classList.add('wait');
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { sec.classList.remove('wait'); sec.classList.add('play'); io.disconnect(); setTimeout(moveInd, 50); } }, { threshold: .15 });
      io.observe(sec.querySelector('.so-intro'));
    }
  
}
function initCta(env) {
  const { setTimeout, setInterval, requestAnimationFrame } = env;

    const s = document.getElementById('console-demo');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || s.getBoundingClientRect().top < innerHeight * .8) return;
    s.classList.add('wait');
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { s.classList.remove('wait'); io.disconnect(); } }, { threshold: .25 });
    io.observe(s.querySelector('.cf-in'));
  
}

function initHero(env) {
  const { setTimeout } = env;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lc = document.getElementById("cx-lc");
  const hero = document.getElementById("console-hero");
  if (lc && !reduce) {
    const ph = [...lc.querySelectorAll(".ph")];
    lc.classList.add("run");
    const show = (i) => ph.forEach((p, j) => { p.classList.toggle("in", j === i); p.classList.toggle("out", j < i || i === -1); });
    [[1150, 0], [2550, 1], [3950, 2], [5350, -1]].forEach(([ms, i]) => setTimeout(() => { show(i); if (i === -1) lc.classList.add("done"); }, ms));
  }
  if (hero && !reduce) {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    hero.addEventListener("pointermove", (e) => {
      if (!fine.matches) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--gx", (50 + ((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2) + "%");
      hero.style.setProperty("--gy", (44 + ((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2) + "%");
    });
    hero.addEventListener("pointerleave", () => { hero.style.setProperty("--gx", "50%"); hero.style.setProperty("--gy", "44%"); });
  }
}

// ---------- mount helpers ----------
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Runs a section's init and returns one function that undoes every timer, listener and observer it created.
function runTracked(init) {
  const undo = [];
  const to = new Set(), iv = new Set(), raf = new Set();
  const env = {
    setTimeout(fn, ms, ...a) { const id = window.setTimeout(() => { to.delete(id); fn(...a); }, ms); to.add(id); return id; },
    setInterval(fn, ms, ...a) { const id = window.setInterval(fn, ms, ...a); iv.add(id); return id; },
    requestAnimationFrame(fn) { const id = window.requestAnimationFrame((t) => { raf.delete(id); fn(t); }); raf.add(id); return id; }
  };
  undo.push(() => { to.forEach((i) => window.clearTimeout(i)); iv.forEach((i) => window.clearInterval(i)); raf.forEach((i) => window.cancelAnimationFrame(i)); });
  const w = window, d = document;
  const origW = w.addEventListener, origD = d.addEventListener, origMM = w.matchMedia, OrigIO = w.IntersectionObserver;
  w.addEventListener = function (t, f, o) { undo.push(() => w.removeEventListener(t, f, o)); return origW.call(this, t, f, o); };
  d.addEventListener = function (t, f, o) { undo.push(() => d.removeEventListener(t, f, o)); return origD.call(this, t, f, o); };
  w.matchMedia = function (q) {
    const m = origMM.call(w, q);
    const add = m.addEventListener && m.addEventListener.bind(m);
    if (add) m.addEventListener = (t, f, o) => { undo.push(() => m.removeEventListener(t, f, o)); return add(t, f, o); };
    return m;
  };
  if (OrigIO) {
    w.IntersectionObserver = function (cb, opt) { const io = new OrigIO(cb, opt); undo.push(() => io.disconnect()); return io; };
    w.IntersectionObserver.prototype = OrigIO.prototype;
  }
  try { init(env); }
  finally {
    w.addEventListener = origW; d.addEventListener = origD; w.matchMedia = origMM;
    if (OrigIO) w.IntersectionObserver = OrigIO;
  }
  return () => undo.splice(0).forEach((fn) => { try { fn(); } catch (e) {} });
}

function Section({ html, init }) {
  const ref = useRef(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    el.innerHTML = html;
    const stop = runTracked(init);
    return () => { stop(); el.innerHTML = ""; };
  }, [html, init]);
  return h("div", { ref, style: { display: "contents" } });
}

// ---------- page ----------
export default function ConsolePage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Console \u2014 Recruitment CRM, ATS & Auto Dialler | Seek Now";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta && meta.content;
    if (meta) meta.content = "Discover Console by Seek Now, recruitment software combining CRM, ATS, Auto Dialler, resume screening, interview coordination and onboarding workflows for businesses and recruitment consultancies.";
    const root = document.documentElement, prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => { document.title = prevTitle; if (meta && prevDesc != null) meta.content = prevDesc; root.style.scrollBehavior = prevBehavior; };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const journey = document.getElementById("crm-workspaces");
    const cleanups = [];
    document.querySelectorAll(".console-page [data-cx-route]").forEach((a) => {
      const key = a.dataset.cxRoute;
      let fn;
      if (key === "explore") {
        fn = (e) => { e.preventDefault(); journey && journey.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); history.replaceState(null, "", "#crm-workspaces"); };
      } else {
        const href = ROUTES[key];
        if (href) a.setAttribute("href", href);
        else { a.setAttribute("href", "#"); a.dataset.pending = "true"; a.title = "Destination not connected yet"; fn = (e) => e.preventDefault(); }
      }
      if (fn) { a.addEventListener("click", fn); cleanups.push(() => a.removeEventListener("click", fn)); }
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return h("div", { className: "console-page" },
    h(ConsoleHeader),
    h("main", { id: "top" },
      h(Section, { html: heroHtml, init: initHero }),
      h(Section, { html: workspacesHtml, init: initWorkspaces }),
      h(Section, { html: diallerHtml, init: initDialler }),
      h(Section, { html: screeningHtml, init: initScreening }),
      h(Section, { html: solutionsHtml, init: initSolutions }),
      h(Section, { html: ctaHtml, init: initCta })),
    h(ConsoleFooter));
}