# OneLink Card – Design Guide

Design reference for the CA OneLink card: **colours**, **buttons**, and **summary of current behaviour**. Use this for consistency when changing the card or action row.

---

## 1. Colour palette (trust: green–teal + light blue)

| Use | Hex | Notes |
|-----|-----|--------|
| **Trust primary (teal)** | `#0d9488` | Primary CTAs, icons, links, focus (Tailwind: `mango-green`, `trust-primary`) |
| **Trust primary soft** | `#14b8a6` | Gradients, hover (Tailwind: `mango-greenSoft`, `trust-primarySoft`) |
| **Trust primary dark** | `#0f766e` | Hover states, Confirm button (Tailwind: `trust-primaryDark`) |
| **Trust light (teal tint)** | `#ccfbf1` | Icon containers, light bg (Tailwind: `mango-lightGreen`, `trust-light`) |
| **Trust light blue** | `#e0f2fe` | Mixed backgrounds, blueish tint (Tailwind: `trust-lightBlue`) |
| **Trust blue accent** | `#0ea5e9` | Borders, subtle accents (Tailwind: `trust-blue`) |
| **Blue (Call)** | `#1D4ED8`, `#2563EB`, `#3B82F6` | Call Now button gradient |
| **WhatsApp** | `#25D366` | WhatsApp icon / WhatsApp actions |
| **Text primary** | `#111827` | Headings, strong text |
| **Text secondary** | `#6b7280` | Subtitle, helper text |
| **Text muted** | `#374151` | Secondary button text |
| **Border default** | `#e5e7eb` | Cards, inputs, content boxes |
| **Border input** | `#d1d5db` | Form fields |
| **Background light** | `#f9fafb` | Content boxes (services page) |
| **Background white** | `#ffffff` | Cards, pages, modals |
| **Amber (Reviews)** | `#f59e0b`, `rgba(245,158,11,…)` | Reviews button icon & glow |

---

## 2. Action row buttons (main card)

All action buttons: **height 44px** (`h-11`), **border-radius 16px** (`rounded-2xl`), **font semibold**, **text-sm**. Grid: **2 columns**, **gap 16px** (`gap-4`).

### Row 1 – Primary gradient

**Call Now**
- Background: `linear-gradient(90deg, #1D4ED8 0%, #2563EB 45%, #3B82F6 100%)`
- Hover: `#2563EB` → `#3B82F6` → `#60A5FA`
- Shadow: `0 6px 16px rgba(37, 99, 235, 0.35)`, hover stronger
- Text: white, icon white

**Payment (Pay Fees / UPI)**
- Background: `linear-gradient(90deg, #0f766e 0%, #0d9488 45%, #14b8a6 100%)`
- Hover: `#0d9488` → `#14b8a6` → `#2dd4bf`
- Shadow: `0 6px 16px rgba(13, 148, 136, 0.35)`, hover stronger
- Text: white; small “UPI” pill: `bg-white/25`

### Row 2 – White bars

**Book Appointment** | **WhatsApp**
- Background: `#ffffff`
- Border: `border-slate-200/60`
- Shadow: `0 4px 12px rgba(0,0,0,0.08)`, hover `0 6px 16px rgba(0,0,0,0.1)`
- Text: `text-slate-800`
- Icons: Calendar `text-slate-600`, WhatsApp `#25D366`
- Hover: `translateY(-1px)`, slightly stronger shadow

### Row 3 – White bars

**Email Us** | **Office Location**
- Same as Row 2 white bar style
- Icons: Mail `text-slate-600`, MapPin `text-red-500`

### Row 4 – Secondary

**Reviews**
- White bg, border `border-slate-200/60`
- Shadow with amber tint: `0 2px 8px rgba(245, 158, 11, 0.12)`, hover stronger
- Icon: Star `text-amber-500 fill-amber-500`

**Save Contact**
- White bg, border `border-teal-200/90`
- Shadow with trust/teal tint; icon Download `text-slate-600`

---

## 3. Book Consultation (Appointment face)

- **Card:** `#ffffff`, border-radius `22px`, padding `24px`, shadow `0 18px 40px rgba(0,0,0,0.12)`.
- **Back:** Text `#6b7280` (e.g. `text-slate-500`), hover darker; icon 18px.
- **Fields:** Height `48px`, border-radius `12px`, border `1px solid #d1d5db`, padding `0 14px`.
- **Focus:** Border `#047857`, shadow `0 0 0 3px rgba(4,120,87,0.15)`.
- **Date trigger:** Hover `border-emerald-500`, `bg-emerald-50`.
- **Time chips:** Grid 3 cols, gap 10px; height 44px, rounded-full; selected `bg-emerald-600 text-white shadow-md`; unselected `border-slate-300`, hover `border-emerald-500 bg-emerald-50`.
- **Confirm button:** Height `52px`, border-radius `14px`, font-weight 600, gradient `#047857` → `#065f46`, shadow `0 8px 18px rgba(4,120,87,0.35)`.
- **WhatsApp:** `https://wa.me/919086038829`; message template (no phone field).

---

## 4. Services section (homepage)

- **Section bg:** `#ffffff`; container max-width `1100px`, padding `60px 20px`.
- **Title:** 34px, weight 700, `#111827`.
- **Subtitle:** 18px, `#6b7280`, max-width 620px.
- **Cards:** White, border `1px solid #e5e7eb`, border-radius `14px`, padding `26px`; hover shadow `0 10px 24px rgba(0,0,0,0.06)`, `translateY(-3px)`.
- **Grid:** 2 columns (e.g. `md:grid-cols-2`), gap `22px`.
- **Icon block:** 46×46px, border-radius `10px`, background `#ecfdf5`, icon colour `#059669`.
- **Primary button:** Background `#059669`, white text, border-radius `8px`, padding `10px 16px`, font-weight 600.
- **Secondary link:** Transparent, text `#374151`, font-weight 500 (e.g. “Learn More →”).
- **CTA:** “View All Services →” – `#059669`, font-weight 600, margin-top 40px (no large green button).

---

## 5. Services page

- **Page bg:** `#ffffff`.
- **Title:** 36px, weight 700, `#111827`.
- **Subtitle:** 18px, `#6b7280`, max-width 640px.
- **Content box:** Background `#f9fafb`, border `1px solid #e5e7eb`, border-radius `12px`, padding `26px`, margin-top `14px`.
- **List:** Check icon `#059669`; item spacing e.g. `margin-bottom: 10px`.
- **Tool buttons:** Border `1px solid #059669`, colour `#059669`, background white, border-radius `8px`, padding `8px 14px`, font-size 14px; hover `background #059669`, `color white`.
- **Section spacing:** `margin-top: 50px` between service sections.

---

## 6. Flip card behaviour

- **No hover/tilt** on the main card; only a simple Y-axis flip.
- **Animation:** Duration `0.6s`, ease `cubic-bezier(0.22, 1, 0.36, 1)`; no scale.
- **Main card → Business Snapshot:** Click/tap anywhere on the card except buttons, links, action row, social icons.
- **Business Snapshot → Main card:** Click/tap anywhere except “Tap to Return” and “Open in Maps”.
- **Timeout:** `isFlipping` cleared after 650ms to match animation.

---

## 7. Summary of updates (what changed)

1. **Header:** Main card uses handshake/meeting image from `app/gallery/...` (no unnamed.webp).
2. **Flip:** Hover tilt removed; flip is rotateY only, 0.6s; click-anywhere to flip and to flip back (with button/link exclusions).
3. **Appointment:** Phone field removed; back button inside card; header hierarchy (Book Consultation / with CA / helper); date as trigger, time chips; confirm gradient and shadow; WhatsApp template and link as above.
4. **Services (home):** White section, consulting-style header and cards; Lucide icons in green tint box; primary green + secondary text link; “View All Services →” as text link.
5. **Services page:** White page; section titles + content boxes; check list; small outline tool buttons (Send Documents, Book Consultation, WhatsApp Query, etc.).
6. **Action row:** Call (blue gradient), Payment (green gradient), white bars for Book Appointment / WhatsApp / Email / Office Location, Reviews (amber accent), Save Contact (green border accent). No layout or copy changes in this guide; only colour and button style reference.

Use this doc for **colour and button specs**; copy and structure stay in the components.

---

## 8. All numbers & links

| Purpose | Value |
|--------|--------|
| **WhatsApp (primary / client)** | `https://wa.me/919086038829` |
| **Client phone (E164)** | `919086038829` |
| **Client phone (display)** | 90860 38829 |
| **Office phone (E164)** | `919419238829` |
| **Office phone (display)** | 94192 38829 |
| **Call Now (tel)** | `tel:+919086038829` (opens client) |
| **Office (tel)** | `tel:+919419238829` |
| **Email** | ramitkhurana@gmail.com |
| **Maps URL** | https://maps.app.goo.gl/iSyNMxFKeDX6Tgi1A |
| **Reviews URL** | https://www.google.com/search?q=Dogra+Associates+Ramit+Khurana+reviews |
| **Map query (lat,lng)** | 32.746583,74.847111 |
| **UPI ID** | 9419197204.ibz@icici |
| **UPI name** | Dogra Associates |
| **Website** | https://honeymoneyfish.co |
| **Instagram** | https://www.instagram.com/mangojammu/?hl=en |
| **Facebook** | https://www.facebook.com/share/198avg1doq/ |
| **Bank** | Jammu and Kashmir Bank |
| **IFSC** | JAKA0TARGET |
| **Account (masked)** | 0045010100002437 |
| **Branch** | CHANDNAGAR JAMMU |
| **Designer** | RepixelX Studio – https://repixelx.com |

---

## 9. Section names & copy (by section)

### Hero (main card – front)
- **Brand name:** Dogra Associates  
- **Tagline:** Ramit Khurana – Chartered Accountant  
- **Service tagline:** Tax Advisory • Compliance • Financial Services  
- **Keyword badges:** ICAI Registered, 20+ Years Experience, Tax & GST Expert  
- **Button (top right):** Tap to Flip  
- **Action row labels:** Call Now | Payment (UPI) | Book Appointment | WhatsApp | Email Us | Office Location | Reviews | Save Contact  

### Business Snapshot (flip side)
- **Title:** Business Snapshot  
- **Button (top right):** Tap to Return  
- **Block 1 – Location:**  
  - Label: Location  
  - Copy: Shop No 32, B2 South Block, Bahu Plaza, Gandhi Nagar, Jammu, Jammu & Kashmir – 180004  
- **Block 2 – Services:**  
  - Label: Services  
  - Copy: From config `serviceTagline` — e.g. Tax Advisory • Compliance • Financial Services  
- **Block 3 – Timings:**  
  - Label: Timings  
  - Copy: From config `contact.storeHours` — e.g. By appointment  
- **CTA:** Open in Maps  

### About
- **Title:** Welcome to Dogra Associates  
- **Body:** Dogra Associates is a professional Chartered Accountancy firm led by Ramit Khurana, Managing Partner with over 20 years of experience. We offer tax advisory, GST compliance, audit, and financial consulting services for individuals and businesses.  

### Services (homepage)
- **Section title:** Services Offered  
- **Subtitle:** Professional financial and compliance services for individuals and businesses.  
- **Card 1:** Income Tax Services – Income tax return filing, tax planning, and advisory for individuals and businesses. Buttons: Book Consultation | Learn More →  
- **Card 2:** GST Services – GST registration, return filing, and compliance advisory. Buttons: Book Consultation | Learn More →  
- **Card 3:** Business Registration – Company, LLP, and proprietorship registration services. Buttons: Book Consultation | Learn More →  
- **Card 4:** Audit & Compliance – Internal audit, statutory audit, and financial compliance services. Buttons: Book Consultation | Learn More →  
- **Bottom CTA:** View All Services →  

### Services page
- **Page title:** Professional Services  
- **Subtitle:** Comprehensive financial and compliance services for individuals and businesses.  
- **Section titles + list copy:**  
  - **Income Tax Services:** Income Tax Return Filing, Tax Planning, Capital Gains Advisory, Tax Notice Handling. Tools: Send Documents, Book Consultation, WhatsApp.  
  - **GST Services:** GST Registration, GST Return Filing, GST Compliance, GST Advisory. Tools: Send Documents, Book Consultation, WhatsApp.  
  - **Business Registration:** Company Registration, LLP Registration, Proprietorship Registration, Startup Compliance. Tools: Send Documents, Book Consultation, WhatsApp.  
  - **Audit & Compliance:** Internal Audit, Statutory Audit, Financial Compliance. Tools: Send Documents, Book Consultation, WhatsApp.  
- **Consult for a Service:** Select service dropdown + “Start Consultation”.  
- **Client Tools:** Send Documents, Book Consultation, WhatsApp Query.  

### Gallery
- **Section title:** Gallery  
- **Subtitle:** Office moments & client interactions  
- **CTA:** View Gallery (to /gallery)  

### Reviews
- **Section title:** Google Reviews  
- **Link:** Reviews URL above  

### Footer
- **Line 1:** © [Year] Dogra Associates. All rights reserved.  
- **Line 2:** OneLink — your business, one link away.  
- **Link:** Powered by RepixelX Studio (https://repixelx.com/about)  

### Translations (en)
- tapToFlip: Tap to Flip  
- tapToReturn: Tap to Return  
- callNow: Call Now  
- whatsapp: WhatsApp  
- getDirections: Get Directions  
- saveContact: Save Contact  
- openPayment: Payment  
- businessHours: Business Hours  
- address: Address  
- contactUs: Contact Us  
- (plus payment, bank, sections, contact, footer keys as in `app/lib/translations.ts`)  

---

## 10. Booking appointment – design flow

### Entry
- User taps **Book Appointment** in the action row → card flips to **Appointment** face (Book Consultation screen).  

### Screen structure (order)
1. **Back** – Top inside card; label “Back”; goes back to main card.  
2. **Header**  
   - Title: Book Consultation  
   - Line 2: with  
   - Line 3: Ramit Khurana – Chartered Accountant  
   - Helper: Schedule your consultation in a few seconds.  
3. **Name** – Label: Name. Placeholder: Your name.  
4. **Reason for consultation** – Label: Reason for consultation. Dropdown placeholder: Select reason.  
5. **Date** – Label: Date. Trigger shows “Select Date” or e.g. “Tue, 17 Mar 2026”. Tap opens calendar sheet; past dates disabled.  
6. **Time** – Label: Time. Chips in a 3-column grid.  
7. **Confirm Appointment** – Primary CTA; disabled until Name, Reason, Date, Time are filled.  

### Reason options (dropdown)
- Income Tax Filing  
- GST Consultation  
- Business Registration  
- Audit Services  
- Financial Advisory  

### Time slots
- 10:00 AM, 11:00 AM, 12:00 PM, 02:00 PM, 03:00 PM, 04:00 PM  

### On Confirm (success path)
1. Build WhatsApp message (template below).  
2. Open: `https://wa.me/919086038829?text={encoded_message}` in new tab.  
3. Call `onBack()` so card flips back to main card.  

### WhatsApp message template (no phone field)
```
Hello Ramit Sir,

Appointment Request

Name: {name}
Reason: {reason}
Date: {date}
Time: {time}

Please confirm the appointment.

Thank you.
```
- **Date format:** e.g. Tue, 17 Mar 2026 (weekday, day, month, year).  

### Calendar sheet
- Title: Choose date  
- Close control: “Close”  
- Past dates disabled; select one date → sheet closes and selected date shows in the Date trigger.  

This is the full booking flow: entry, screen order, fields, options, time slots, confirm behaviour, and WhatsApp copy.
