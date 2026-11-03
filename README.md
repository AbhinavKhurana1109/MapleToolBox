# MapleToolbox

A responsive, dependency-free calculator and utility website. Each calculator has its own static URL, page metadata, and reusable calculation logic. Calculations run locally in the visitor's browser.

## Run locally

Open `index.html` in a modern browser. No package installation, build, API key, or development server is required.

For deployment or local HTTP testing, publish the workspace root as a static site. The relative asset and calculator links work from the domain root.

## Deploy

- **Vercel:** Import the repository, select **Other** as the framework preset, leave the build command empty, and use `.` as the output directory.
- **GitHub Pages:** Publish the repository root as the site source. If using a project site under a path (rather than a custom domain), adjust the canonical and sitemap URLs to the deployed origin.
- Before launch, replace the `https://mapletoolbox.com/` canonical and Open Graph URLs in the HTML files and `robots.txt`/`sitemap.xml` if that is not the site's verified domain.

## Calculators

- Canadian: GST/HST, salary (2026 tax brackets), mortgage, rent affordability, sales tax, and savings.
- Everyday: age, date, percentage, and discounts.
- Conversions and planning: Celsius to Fahrenheit, centimetres to inches, kilograms to pounds, hourly to yearly salary, and compound interest.

Calculator pages are in `tools/`; shared styling and JavaScript are in `assets/`.

## Tax and financial estimates

Canadian salary estimates use the 2026 federal and provincial income-tax brackets published by the Canada Revenue Agency for the provinces offered in the calculator. Quebec is deliberately unavailable because its 2026 brackets could not be verified against an accessible official source during this audit. Estimates exclude personal credits, CPP/QPP, EI, deductions, and other individual factors; the displayed amount after estimated income tax is not take-home pay or tax advice.

GST/HST and sales-tax calculators use the CRA's general rates applicable in 2026 for supplies made on or after April 1, 2025. They do not account for every place-of-supply rule, special tax treatment, or component-rounding difference. Mortgage, savings, and affordability results are planning estimates, not offers, guarantees, or professional financial advice. Follow each calculator's official references and assumptions before relying on an estimate.

## Static-site files

- `robots.txt` allows crawling and points to the sitemap.
- `sitemap.xml` lists the homepage, calculators, and information pages.
- Information pages: `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`, and `editorial-policy.html`. Add verified contact details to the Contact page and review the privacy/terms copy against the actual deployment before launch.
- Canonical URLs and Open Graph metadata use `https://mapletoolbox.com/`. Update these if the production domain changes.

## Browser support and accessibility

The site uses semantic HTML, keyboard-accessible native form controls, visible focus states, responsive layouts, and a `prefers-reduced-motion` treatment. The theme preference is stored in the browser's local storage.
