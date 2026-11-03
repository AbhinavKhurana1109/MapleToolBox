# MapleToolbox Project Audit

## Scope and limitations

The opened workspace was inspected as a static website. It has no package manifest or build step, and no Git metadata or remote is available here, so this audit could not inspect the GitHub repository history or deployment configuration. The production domain `mapletoolbox.com` is assumed by canonicals, social metadata, `robots.txt`, and the sitemap; confirm that domain before launch.

The tax source review used public Canada Revenue Agency material for 2026 income-tax brackets and general GST/HST/PST rates applicable on or after April 1, 2025. Revenu Québec's 2026 brackets could not be independently verified from an accessible official page during this audit. No Quebec salary estimate is offered. These calculators remain estimates and are not tax or financial advice.

## Findings and changes

| Finding | Resolution |
|---|---|
| The initial workspace contained an unrelated static dental demo rather than the requested MapleToolbox project. | Replaced the demo with a static calculator site and documented its no-build local run and Vercel setup in `README.md`. |
| The requested About, Contact, Privacy, Terms, Disclaimer, and Editorial Policy pages were missing while the homepage linked to them. | Added all six pages and linked them from the homepage, each information-page footer, and calculator-page footers. Contact and owner identity details are not invented; the Contact page clearly requests owner-supplied contact information. |
| The GST/HST page did not include the favicon and social-sharing image metadata present on the other pages. | Added the SVG favicon and PNG Open Graph image metadata. |
| Quebec bracket data remained in the shared calculator code although the selector excluded Quebec because official 2026 rates could not be verified. | Removed the unsupported bracket data and retained the selector exclusion and user-facing explanation. |
| Tax calculators could be mistaken for exact results and did not fully expose rate-date, component-rounding, and supply-specific limitations. | Added CRA references and clarified general-rate assumptions, component rounding, tax treatment, and the 2026 salary estimate's excluded credits and payroll deductions. |
| Calculator pages explained results and gave examples, but did not consistently show a dedicated usage guide and explicit calculation formula. | Added a concise “How to use this calculator” guide and tool-specific formula section to all 15 calculator pages using the shared calculator renderer. |
| Date defaults and reset behavior could use UTC dates or repopulate the birth date after reset. | Updated date handling to use local calendar dates and keep the birth-date field blank on reset. |
| The sitemap omitted the six information pages. | Added all six URLs; `robots.txt` points to the sitemap. |
| A fixed social/check-date claim was not necessary to explain the applicable general tax rates. | Removed the unsupported “checked November 2026” claim and describe the effective date instead. |

## Verification performed

- Exercised all 15 calculator pages in a browser with sample values. Results:
  - GST/HST, $100 in Ontario: **$113.00**
  - 2026 salary, $75,000 in Ontario: **$58,776.03** after estimated income tax, before payroll deductions
  - Mortgage, $440,000 at 4.5% for 25 years: **$2,435.28 monthly**
  - Rent affordability, $6,000 income, 30% budget, $250 other housing costs: **$1,550.00**
  - Sales tax, $89.99 in Ontario: **$101.69**
  - Savings, $5,000 initial plus $300 monthly for 10 years at 4%: **$51,629.10**
  - Age, January 1, 1989 to January 1, 2025: **36 years**
  - January 1–31, 2025 date difference: **30 days**
  - 15% of 200: **30**
  - 20°C: **68°F**
  - 170 cm: **66.93 in**
  - 70 kg: **154.32 lb**
  - $25/hour × 40 hours × 52 weeks: **$52,000.00**
  - $10,000 at 5%, annual compounding for 10 years: **$16,288.95**
  - $80 with a 25% discount: **$60.00**
- Confirmed each calculator page renders its usage instructions and formula explanation after the shared renderer update.
- Checked validation for a zero percentage denominator, a mortgage down payment equal to the home price, a negative salary, and an age-on date before birth. Checked reset behavior.
- Homepage search returned the mortgage match and no results for a nonsense query. Light/dark theme toggling persisted across reload.
- Checked responsive overflow at 320, 375, 768, and 1280 CSS pixels on the homepage, and at 320 pixels on all 21 calculator and information pages. No horizontal overflow was observed.
- Checked reduced-motion behavior; animation duration is reduced when `prefers-reduced-motion` is enabled.
- Checked all 22 pages for a unique title, description, canonical, one H1, favicon, social image metadata, valid local links, and six footer information links. No duplicate titles or broken local HTML/fragment links were found.
- Confirmed `sitemap.xml` parses with 22 unique URLs, includes all six information pages, and is referenced by `robots.txt`.
- Browser checks reported no console errors or page exceptions on the calculator and information pages. All calculator inputs had associated labels.

## Remaining before production

- Confirm that `https://mapletoolbox.com/` is the production domain; otherwise update canonical, Open Graph, `robots.txt`, and sitemap URLs.
- Replace the Contact page's explicit contact-email prompt with a monitored address. Confirm the owner identity and review the privacy policy and terms against the actual hosting, analytics, and legal requirements.
- Recheck 2026 tax brackets and sales-tax rates against current official sources before launch and after rate changes. Quebec salary remains intentionally unavailable.
- Run Lighthouse/Core Web Vitals on the deployed site and test on real mobile devices and additional browsers. Those checks were not available in this local static-file browser session.
- No production deployment, GitHub remote inspection, automated build, or deployment pipeline was available or performed.
