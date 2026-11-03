(() => {
  "use strict";

  const tools = [
    { id: "gst-hst-calculator", title: "GST/HST Calculator", desc: "Estimate GST, HST and provincial sales tax for Canadian purchases.", icon: "GST", group: "canada", popular: true, category: "Canadian finance", inputs: [{ id: "amount", label: "Price before tax (CAD)", type: "number", value: 100, min: 0.01, step: "0.01" }, { id: "province", label: "Province or territory", type: "province" }, { id: "mode", label: "Price entry", type: "select", options: [["add", "Add tax to the price"], ["included", "Tax is already included"]] }], example: "A $100 taxable purchase in Ontario at 13% HST has $13.00 tax and a $113.00 total.", faqs: [["Which rate should I use?", "The rate depends on the place of supply and the type of product or service. This estimate uses the selected province or territory's general combined rate; special supplies and place-of-supply rules can differ."]], related: ["canadian-sales-tax-calculator", "canadian-salary-calculator"] },
    { id: "canadian-salary-calculator", title: "Canadian Salary Calculator", desc: "Estimate 2026 federal and provincial income tax from gross salary.", icon: "$", group: "canada", popular: true, category: "Canadian finance", inputs: [{ id: "salary", label: "Annual gross salary (CAD)", type: "number", value: 75000, min: 0, step: "100" }, { id: "province", label: "Province or territory of residence", type: "province", exclude: ["QC"] }, { id: "frequency", label: "Pay frequency", type: "select", options: [["annual", "Annual"], ["monthly", "Monthly"], ["biweekly", "Biweekly (26 pays)"], ["weekly", "Weekly"]] }], example: "For $75,000 of taxable income in Ontario, 2026 federal and provincial bracket rates are applied progressively. Personal credits and payroll contributions are not included.", faqs: [["Which tax year is used?", "The 2026 tax brackets published by the Canada Revenue Agency are used for federal and provincial estimates. The province selected is assumed to be your province of residence on December 31, 2026."], ["Why is Quebec not in the selector?", "Quebec's 2026 provincial tax brackets could not be verified against an accessible official source during this audit, so no Quebec estimate is offered rather than risk showing an unverified result. Consult Revenu Québec's linked rates and a current payroll calculator."], ["Is this my exact take-home pay?", "No. This simplified estimate calculates federal and provincial bracket tax before personal credits. It assumes all gross salary is taxable income and excludes CPP/QPP, EI, deductions, benefits, surtaxes, and individual tax credits. Use a current CRA payroll calculator or tax professional for a personalized estimate."]], related: ["hourly-to-yearly-salary-calculator", "canadian-sales-tax-calculator"], source: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html" },
    { id: "canadian-mortgage-calculator", title: "Canadian Mortgage Calculator", desc: "Estimate mortgage payments and total interest with Canadian payment timing.", icon: "⌂", group: "canada", popular: true, category: "Canadian finance", inputs: [{ id: "price", label: "Home price (CAD)", type: "number", value: 550000, min: 0, step: "1000" }, { id: "down", label: "Down payment (CAD)", type: "number", value: 110000, min: 0, step: "1000" }, { id: "rate", label: "Annual interest rate (%)", type: "number", value: 4.5, min: 0, max: 100, step: "0.01" }, { id: "years", label: "Amortization period (years)", type: "number", value: 25, min: 1, max: 50, step: "1" }, { id: "frequency", label: "Payment frequency", type: "select", options: [["monthly", "Monthly"], ["biweekly", "Biweekly"], ["accelerated", "Accelerated biweekly"]] }], example: "A $440,000 mortgage at 4.5% over 25 years has an estimated monthly payment of about $2,435 using the Canadian semi-annual compounding convention.", faqs: [["Does this include mortgage insurance?", "No. The estimate excludes mortgage default insurance, property tax, utilities, closing costs, and lender-specific fees. Down payments below 20% may require mortgage insurance in Canada."]], related: ["rent-affordability-calculator", "canadian-savings-calculator"] },
    { id: "rent-affordability-calculator", title: "Rent Affordability Calculator", desc: "Set a monthly rent target using your income and chosen budget share.", icon: "⌂", group: "canada", popular: true, category: "Canadian finance", inputs: [{ id: "income", label: "Gross monthly household income (CAD)", type: "number", value: 6000, min: 0, step: "100" }, { id: "share", label: "Income budgeted for rent (%)", type: "number", value: 30, min: 1, max: 100, step: "1" }, { id: "costs", label: "Other monthly housing costs (CAD)", type: "number", value: 250, min: 0, step: "25" }], example: "At $6,000 gross monthly income and a 30% rent budget, the guideline is $1,800 for rent before other housing costs.", faqs: [["Is 30% a rule?", "No. It is a common budgeting guideline, not an eligibility rule or a guarantee of affordability. Your other debts, taxes, household needs, and local costs matter."]], related: ["canadian-mortgage-calculator", "canadian-salary-calculator"] },
    { id: "canadian-sales-tax-calculator", title: "Canadian Sales Tax Calculator", desc: "See an estimated sales tax breakdown by province or territory.", icon: "TAX", group: "canada", popular: false, category: "Canadian finance", inputs: [{ id: "amount", label: "Taxable amount (CAD)", type: "number", value: 89.99, min: 0.01, step: "0.01" }, { id: "province", label: "Province or territory", type: "province" }, { id: "mode", label: "Price entry", type: "select", options: [["add", "Before tax"], ["included", "Tax included in price"]] }], example: "A $89.99 taxable purchase in Nova Scotia at 14% HST has approximately $12.60 tax when tax is added.", faqs: [["Are all products taxed at the same rate?", "No. Zero-rated, exempt, and specially treated goods or services may have different treatment. This tool applies a general combined rate to the entered amount."]], related: ["gst-hst-calculator", "discount-calculator"] },
    { id: "canadian-savings-calculator", title: "Canadian Savings Calculator", desc: "Project savings growth from a starting balance and recurring deposits.", icon: "↗", group: "canada", popular: false, category: "Canadian finance", inputs: [{ id: "principal", label: "Starting balance (CAD)", type: "number", value: 5000, min: 0, step: "100" }, { id: "contribution", label: "Monthly contribution (CAD)", type: "number", value: 300, min: 0, step: "25" }, { id: "rate", label: "Annual interest rate (%)", type: "number", value: 4, min: 0, max: 100, step: "0.1" }, { id: "years", label: "Time period (years)", type: "number", value: 10, min: 1, max: 100, step: "1" }], example: "Starting with $5,000 and saving $300 per month for 10 years at 4% annual interest compounds monthly.", faqs: [["Is the interest guaranteed?", "No. This projection assumes a constant annual rate compounded monthly and steady end-of-month deposits. Actual account rates, fees, taxes, and returns vary."]], related: ["compound-interest-calculator", "canadian-mortgage-calculator"] },
    { id: "age-calculator", title: "Age Calculator", desc: "Calculate your age in years, months, and days on a selected date.", icon: "BD", group: "math", popular: true, category: "Everyday math", inputs: [{ id: "birth", label: "Date of birth", type: "date" }, { id: "asof", label: "Age on date", type: "date", today: true }], example: "Enter a date of birth and an optional date to see the elapsed calendar age.", faqs: [["Can I calculate age on a past date?", "Yes. Choose any date on or after the date of birth."]], related: ["date-calculator", "percentage-calculator"] },
    { id: "date-calculator", title: "Date Calculator", desc: "Count the calendar days between two dates.", icon: "▦", group: "math", popular: false, category: "Everyday math", inputs: [{ id: "start", label: "Start date", type: "date", today: true }, { id: "end", label: "End date", type: "date", today: true }], example: "The difference between January 1 and January 31 is 30 elapsed calendar days.", faqs: [["Is the first day included?", "The calculator reports elapsed days: the start date is day zero. Add one to count both endpoints inclusively."]], related: ["age-calculator", "percentage-calculator"] },
    { id: "percentage-calculator", title: "Percentage Calculator", desc: "Find a percentage of a number, a percent change, or what percent one value is.", icon: "%", group: "math", popular: true, category: "Everyday math", inputs: [{ id: "kind", label: "Calculation", type: "select", options: [["of", "What is X% of Y?"], ["change", "Percentage change from X to Y"], ["ratio", "X is what percent of Y?"]] }, { id: "x", label: "X (%)", type: "number", value: 15, step: "any" }, { id: "y", label: "Y", type: "number", value: 200, step: "any" }], example: "15% of 200 is 30.", faqs: [["How is percentage change calculated?", "Percentage change is (new value − original value) ÷ |original value| × 100. The original value must not be zero."]], related: ["discount-calculator", "date-calculator"] },
    { id: "celsius-to-fahrenheit-converter", title: "Celsius to Fahrenheit Converter", desc: "Convert a temperature in degrees Celsius to Fahrenheit.", icon: "°C", group: "conversion", popular: true, category: "Unit converters", inputs: [{ id: "celsius", label: "Temperature (°C)", type: "number", value: 20, step: "any" }], example: "20°C equals 68°F.", faqs: [["What is the conversion formula?", "Multiply Celsius by 9/5, then add 32."]], related: ["cm-to-inches-converter", "kg-to-pounds-converter"] },
    { id: "cm-to-inches-converter", title: "CM to Inches Converter", desc: "Convert centimetres to inches using the exact unit conversion.", icon: "↔", group: "conversion", popular: false, category: "Unit converters", inputs: [{ id: "cm", label: "Length (cm)", type: "number", value: 170, min: 0, step: "any" }], example: "170 cm is approximately 66.93 inches.", faqs: [["What is one inch in centimetres?", "One inch is exactly 2.54 centimetres."]], related: ["kg-to-pounds-converter", "celsius-to-fahrenheit-converter"] },
    { id: "kg-to-pounds-converter", title: "KG to Pounds Converter", desc: "Convert kilograms to pounds using the exact unit conversion.", icon: "↔", group: "conversion", popular: false, category: "Unit converters", inputs: [{ id: "kg", label: "Weight (kg)", type: "number", value: 70, min: 0, step: "any" }], example: "70 kg is approximately 154.32 lb.", faqs: [["What is one kilogram in pounds?", "One kilogram is exactly 2.2046226218 pounds."]], related: ["cm-to-inches-converter", "celsius-to-fahrenheit-converter"] },
    { id: "hourly-to-yearly-salary-calculator", title: "Hourly to Yearly Salary Calculator", desc: "Convert hourly pay to annual, monthly, and weekly gross income.", icon: "$/h", group: "planning", popular: false, category: "Money & planning", inputs: [{ id: "hourly", label: "Hourly wage", type: "number", value: 25, min: 0, step: "0.01" }, { id: "currency", label: "Currency", type: "select", options: [["CAD", "CAD — Canadian dollar"], ["USD", "USD — US dollar"], ["GBP", "GBP — British pound"], ["AUD", "AUD — Australian dollar"]] }, { id: "hours", label: "Hours worked per week", type: "number", value: 40, min: 0, max: 168, step: "0.5" }, { id: "weeks", label: "Paid weeks per year", type: "number", value: 52, min: 0, max: 52, step: "1" }], example: "$25 per hour × 40 hours per week × 52 paid weeks is $52,000 gross per year.", faqs: [["Does this account for overtime or unpaid leave?", "No. Enter the actual paid weeks and average hours. Overtime, bonuses, benefits, taxes, and deductions are not included."]], related: ["canadian-salary-calculator", "rent-affordability-calculator"] },
    { id: "compound-interest-calculator", title: "Compound Interest Calculator", desc: "Estimate how an investment or savings balance may grow over time.", icon: "↗", group: "planning", popular: true, category: "Money & planning", inputs: [{ id: "principal", label: "Initial amount", type: "number", value: 10000, min: 0, step: "100" }, { id: "currency", label: "Currency", type: "select", options: [["CAD", "CAD — Canadian dollar"], ["USD", "USD — US dollar"], ["GBP", "GBP — British pound"], ["AUD", "AUD — Australian dollar"]] }, { id: "rate", label: "Annual interest rate (%)", type: "number", value: 5, min: 0, max: 100, step: "0.1" }, { id: "years", label: "Time period (years)", type: "number", value: 10, min: 1, max: 100, step: "1" }, { id: "frequency", label: "Compounding frequency", type: "select", options: [["1", "Annually"], ["2", "Semi-annually"], ["4", "Quarterly"], ["12", "Monthly"], ["365", "Daily"]] }], example: "$10,000 at 5% compounded annually for 10 years grows to approximately $16,288.95 before fees and taxes.", faqs: [["What is compound interest?", "Compound interest is interest earned on both the original balance and previously accumulated interest."]], related: ["canadian-savings-calculator", "discount-calculator"] },
    { id: "discount-calculator", title: "Discount Calculator", desc: "Calculate the sale price and savings from a percentage discount.", icon: "−%", group: "math", popular: false, category: "Everyday math", inputs: [{ id: "price", label: "Original price", type: "number", value: 80, min: 0, step: "0.01" }, { id: "currency", label: "Currency", type: "select", options: [["CAD", "CAD — Canadian dollar"], ["USD", "USD — US dollar"], ["GBP", "GBP — British pound"], ["AUD", "AUD — Australian dollar"]] }, { id: "discount", label: "Discount (%)", type: "number", value: 25, min: 0, max: 100, step: "0.1" }], example: "A 25% discount on $80 saves $20, leaving a price of $60 before any applicable tax.", faqs: [["Is sales tax included?", "No. The result is the discounted price before sales tax. Tax treatment varies by location and product."]], related: ["percentage-calculator", "gst-hst-calculator"] }
  ];

  const formulas = {
    "gst-hst-calculator": "For a pre-tax price: estimated tax = taxable subtotal × combined general rate; total = subtotal + tax. For a tax-included price: estimated pre-tax subtotal = entered total ÷ (1 + combined rate). Individual tax components are rounded to cents.",
    "canadian-salary-calculator": "Federal estimate = sum of each federal bracket's taxable slice × its marginal rate. Provincial estimate is calculated the same way. Estimated amount after income tax = gross salary − federal estimate − provincial estimate; personal credits and payroll deductions are excluded.",
    "canadian-mortgage-calculator": "For regular payments, i = (1 + j/2)^(2/m) − 1 and payment = P × i ÷ [1 − (1 + i)^(-N)], where P is principal, j is the nominal annual rate, m is payments per year, and N is the total scheduled payments. The accelerated biweekly payment is half the regular monthly payment.",
    "rent-affordability-calculator": "Estimated maximum rent = max(0, gross monthly household income × chosen budget percentage − other monthly housing costs).",
    "canadian-sales-tax-calculator": "For a pre-tax price: estimated tax = taxable subtotal × combined general rate; total = subtotal + tax. For a tax-included price: estimated pre-tax subtotal = entered total ÷ (1 + combined rate). Individual tax components are rounded to cents.",
    "canadian-savings-calculator": "Future balance = P × (1 + i)^n + C × ((1 + i)^n − 1) ÷ i, where P is the starting balance, C is each end-of-month contribution, i is the annual rate divided by 12, and n is 12 × years. At 0% interest, balance = P + C × n.",
    "age-calculator": "Calendar age is counted as completed whole years, then completed whole months and remaining days between the birth date and selected date. Month anniversaries are clamped to the last valid calendar day, including leap-day birthdays.",
    "date-calculator": "Elapsed calendar days = the absolute difference between the two dates in days. Inclusive count = elapsed days + 1.",
    "percentage-calculator": "Percentage of a value = X ÷ 100 × Y. Percentage change = (Y − X) ÷ |X| × 100. X as a percentage of Y = X ÷ Y × 100. The divisor must not be zero.",
    "celsius-to-fahrenheit-converter": "°F = (°C × 9/5) + 32.",
    "cm-to-inches-converter": "Inches = centimetres ÷ 2.54; one inch is exactly 2.54 centimetres.",
    "kg-to-pounds-converter": "Pounds = kilograms × 2.2046226218.",
    "hourly-to-yearly-salary-calculator": "Gross annual pay = hourly wage × hours worked per week × paid weeks per year. Gross monthly pay = annual pay ÷ 12. Taxes, overtime, and deductions are excluded.",
    "compound-interest-calculator": "A = P × (1 + r/n)^(n × t), where P is the initial balance, r is the annual rate as a decimal, n is compounding periods per year, and t is the number of years. No additional deposits are included.",
    "discount-calculator": "Discount amount = original price × (discount percentage ÷ 100). Sale price = original price − discount amount, before applicable sales tax."
  };

  const provinces = [
    ["AB", "Alberta"], ["BC", "British Columbia"], ["MB", "Manitoba"], ["NB", "New Brunswick"],
    ["NL", "Newfoundland and Labrador"], ["NS", "Nova Scotia"], ["NT", "Northwest Territories"],
    ["NU", "Nunavut"], ["ON", "Ontario"], ["PE", "Prince Edward Island"], ["QC", "Quebec"],
    ["SK", "Saskatchewan"], ["YT", "Yukon"]
  ];
  const salesTaxes = {
    AB: [["GST", 5]], BC: [["GST", 5], ["PST", 7]], MB: [["GST", 5], ["RST", 7]],
    NB: [["HST", 15]], NL: [["HST", 15]], NS: [["HST", 14]], NT: [["GST", 5]],
    NU: [["GST", 5]], ON: [["HST", 13]], PE: [["HST", 15]], QC: [["GST", 5], ["QST", 9.975]],
    SK: [["GST", 5], ["PST", 6]], YT: [["GST", 5]]
  };
  const salesRates = Object.fromEntries(Object.entries(salesTaxes).map(([province, taxes]) => [province, taxes.reduce((sum, [, rate]) => sum + rate, 0)]));
  const federalBrackets = [[58523, .14], [117045, .205], [181440, .26], [258482, .29], [Infinity, .33]];
  const provincialBrackets = {
    AB: [[61200, .08], [154259, .10], [185111, .12], [246813, .13], [370220, .14], [Infinity, .15]],
    BC: [[50363, .056], [100728, .077], [115648, .105], [140430, .1229], [190405, .147], [265545, .168], [Infinity, .205]],
    MB: [[47564, .108], [101200, .1275], [Infinity, .174]],
    NB: [[52333, .094], [104666, .14], [193861, .16], [Infinity, .195]],
    NL: [[44678, .087], [89354, .145], [159528, .158], [223340, .178], [285319, .198], [570638, .208], [1141275, .213], [Infinity, .218]],
    NS: [[30995, .0879], [61991, .1495], [97417, .1667], [157124, .175], [Infinity, .21]],
    NT: [[53003, .059], [106009, .086], [172346, .122], [Infinity, .1405]],
    NU: [[55801, .04], [111602, .07], [181439, .09], [Infinity, .115]],
    ON: [[53891, .0505], [107785, .0915], [150000, .1116], [220000, .1216], [Infinity, .1316]],
    PE: [[33928, .095], [65820, .1347], [106890, .166], [142520, .1762], [200000, .19], [Infinity, .20]],
    SK: [[54532, .105], [155805, .125], [Infinity, .145]],
    YT: [[58523, .064], [117045, .09], [181440, .109], [500000, .128], [Infinity, .15]]
  };
  const money = (value, currency = "CAD") => new Intl.NumberFormat("en-CA", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
  const number = (value, digits = 2) => new Intl.NumberFormat("en-CA", { maximumFractionDigits: digits }).format(Number.isFinite(value) ? value : 0);
  const byId = (id) => document.getElementById(id);
  const todayISO = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  };

  function applyTheme() {
    const saved = localStorage.getItem("maple-theme");
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", dark);
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    });
  }
  document.querySelectorAll(".page-footer").forEach((footer) => {
    if (footer.querySelector(".page-footer-links")) return;
    const links = document.createElement("nav");
    links.className = "page-footer-links";
    links.setAttribute("aria-label", "Information");
    for (const [label, href] of [
      ["About", "../about.html"], ["Contact", "../contact.html"],
      ["Privacy", "../privacy.html"], ["Terms", "../terms.html"],
      ["Disclaimer", "../disclaimer.html"], ["Editorial policy", "../editorial-policy.html"]
    ]) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      links.append(link);
    }
    const footerBottom = footer.querySelector(".footer-bottom");
    footer.insertBefore(links, footerBottom);
  });
  document.querySelectorAll(".theme-toggle").forEach((button) => button.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("maple-theme", dark ? "dark" : "light");
    applyTheme();
  }));
  applyTheme();

  function addMotionEffects() {
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOff) return;
    document.body.classList.add("motion-ready");
    const selectors = [
      ".hero-copy > *", ".hero-aside", ".section-top", ".tool-card",
      ".category-card", ".tool-group", ".faq-list details",
      ".page-heading", ".calculator-card", ".result-card", ".content-card"
    ];
    const elements = [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];
    elements.forEach((element, index) => {
      element.classList.add("reveal-on-view");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
    });
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    elements.forEach((element) => observer.observe(element));
  }
  addMotionEffects();

  function card(tool) {
    return `<div class="tool-card-unit"><a class="tool-card" href="${toolHref(tool.id)}"><span class="tool-card-top"><span class="tool-icon" aria-hidden="true">${tool.icon}</span><span class="tool-arrow" aria-hidden="true">↗</span></span><strong>${tool.title}</strong><small>${tool.desc}</small></a></div>`;
  }
  function toolHref(id) {
    return `${location.pathname.includes("/tools/") ? "" : "tools/"}${id}.html`;
  }
  function renderHome() {
    const grid = byId("popular-tools");
    if (!grid) return;
    document.querySelectorAll(".tool-list").forEach((list) => {
      list.innerHTML = tools.filter((tool) => tool.group === list.dataset.group).map((tool) => `<a href="${toolHref(tool.id)}">${tool.title}<span aria-hidden="true">↗</span></a>`).join("");
    });
    const draw = (query = "") => {
      const matches = tools.filter((tool) => (query ? true : tool.popular) && `${tool.title} ${tool.desc} ${tool.category}`.toLowerCase().includes(query.toLowerCase()));
      grid.innerHTML = matches.map(card).join("");
      byId("empty-state").hidden = matches.length > 0;
      if (document.body.classList.contains("motion-ready")) {
        grid.querySelectorAll(".tool-card").forEach((element, index) => {
          element.classList.add("reveal-on-view", "is-in-view", "card-enter");
          element.style.setProperty("--card-delay", `${Math.min(index, 7) * 45}ms`);
        });
      }
    };
    draw();
    const form = byId("tool-search");
    const search = byId("search-input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      draw(search.value.trim());
      byId("popular").scrollIntoView({ behavior: "smooth" });
    });
    search.addEventListener("input", () => draw(search.value.trim()));
    byId("current-year").textContent = String(new Date().getFullYear());
  }

  function addField(field) {
    const label = `<label for="${field.id}">${field.label}</label>`;
    let input;
    if (field.type === "select") {
      input = `<select id="${field.id}" name="${field.id}">${field.options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select>`;
    } else if (field.type === "province") {
      const available = provinces.filter(([value]) => !field.exclude?.includes(value));
      input = `<select id="${field.id}" name="${field.id}">${available.map(([value, text]) => `<option value="${value}"${value === "ON" ? " selected" : ""}>${text}</option>`).join("")}</select>`;
    } else {
      const min = field.min !== undefined ? ` min="${field.min}"` : "";
      const max = field.max !== undefined ? ` max="${field.max}"` : "";
      const step = field.step ? ` step="${field.step}"` : "";
      const value = field.value !== undefined ? ` value="${field.value}"` : field.today ? ` value="${todayISO()}"` : "";
      const maxDate = field.type === "date" && field.id === "birth" ? ` max="${todayISO()}"` : "";
      input = `<input id="${field.id}" name="${field.id}" type="${field.type}"${value}${min}${max}${step}${maxDate} required>`;
    }
    return `<div class="field">${label}${input}${field.help ? `<small class="field-help">${field.help}</small>` : ""}</div>`;
  }

  function progressiveTax(income, brackets) {
    let tax = 0;
    let lower = 0;
    for (const [upper, rate] of brackets) {
      tax += Math.max(0, Math.min(income, upper) - lower) * rate;
      if (income <= upper) break;
      lower = upper;
    }
    return tax;
  }

  function renderTool(tool) {
    const root = byId("tool-app");
    if (!root) return;
    root.innerHTML = `
      <div class="form-grid">${tool.inputs.map(addField).join("")}</div>
      <div class="form-error" id="form-error" role="alert" aria-live="polite"></div>
      <div class="form-actions"><button class="button" type="submit">Calculate <span aria-hidden="true">→</span></button><button class="button button-outline" id="reset-form" type="reset">Reset</button></div>`;
    const guide = document.createElement("section");
    guide.className = "content-card calculator-guide";
    for (const [headingText, contentText] of [
      ["How to use this calculator", "Enter the requested values above and choose any available options. Select Calculate to see the result and supporting breakdown; use Reset to restore the starting values."],
      ["Calculation formula", formulas[tool.id]]
    ]) {
      const heading = document.createElement("h2");
      heading.textContent = headingText;
      const paragraph = document.createElement("p");
      paragraph.textContent = contentText;
      guide.append(heading, paragraph);
    }
    const belowCalculator = root.closest("main")?.querySelector(".below-calculator");
    if (belowCalculator) belowCalculator.insertBefore(guide, belowCalculator.children[1] || null);
    const form = root.closest("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const error = byId("form-error");
      error.textContent = "";
      if (!form.reportValidity()) return;
      try {
        const result = calculate(tool.id, Object.fromEntries(new FormData(form)));
        byId("result-value").textContent = result.value;
        const resultCard = byId("result-value").closest(".result-card");
        resultCard.classList.remove("result-updated");
        void resultCard.offsetWidth;
        resultCard.classList.add("result-updated");
        byId("result-description").textContent = result.description || "";
        byId("result-lines").innerHTML = (result.lines || []).map(([label, value]) => `<div class="result-line"><span>${label}</span><strong>${value}</strong></div>`).join("");
        byId("result-note").textContent = result.note || "";
      } catch (problem) {
        error.textContent = problem.message || "Check your inputs and try again.";
      }
    });
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        byId("form-error").textContent = "";
        byId("result-value").textContent = "Your result";
        byId("result-description").textContent = "Enter your values, then select Calculate to see an estimate.";
        byId("result-lines").innerHTML = "";
        byId("result-note").textContent = "";
        updatePercentageLabels();
      }, 0);
    });
    const updatePercentageLabels = () => {
      if (tool.id !== "percentage-calculator") return;
      const kind = byId("kind").value;
      byId("x").previousElementSibling.textContent = kind === "of" ? "Percentage (X)" : kind === "change" ? "Starting value (X)" : "Value (X)";
      byId("y").previousElementSibling.textContent = kind === "change" ? "New value (Y)" : kind === "ratio" ? "Total value (Y)" : "Number (Y)";
    };
    if (tool.id === "percentage-calculator") {
      byId("kind").addEventListener("change", updatePercentageLabels);
      updatePercentageLabels();
    }
  }

  function val(data, key) {
    const result = Number(data[key]);
    if (!Number.isFinite(result)) throw new Error("Enter a valid number in every required field.");
    return result;
  }

  function calculate(id, data) {
    let value;
    let lines = [];
    let description = "";
    let note = "";
    switch (id) {
      case "gst-hst-calculator":
      case "canadian-sales-tax-calculator": {
        const amount = val(data, "amount");
        const components = salesTaxes[data.province];
        const rate = salesRates[data.province] / 100;
        const name = provinces.find(([code]) => code === data.province)[1];
        const subtotal = data.mode === "included" ? amount / (1 + rate) : amount;
        const componentAmounts = components.map(([, componentRate]) => Math.round(subtotal * componentRate) / 100);
        const tax = data.mode === "included"
          ? Math.round((amount - subtotal) * 100) / 100
          : componentAmounts.reduce((sum, componentAmount) => sum + componentAmount, 0);
        const total = data.mode === "included" ? amount : Math.round((amount + tax) * 100) / 100;
        const componentLines = components.map(([label, componentRate], index) => [`${label} (${number(componentRate, 3)}%)`, money(componentAmounts[index])]);
        value = money(total);
        lines = [["Province / territory", name], ["Combined general rate", `${number(rate * 100, 3)}%`], ...componentLines, ["Price before tax", money(subtotal)], ["Estimated sales tax", money(tax)]];
        description = data.mode === "included" ? "Tax is included in the entered price." : "Estimated total with tax added.";
        note = "General-rate estimate only; individual tax components are rounded to cents and can differ from a combined-rate estimate by a cent. Rates shown are the CRA's general rates applicable on or after April 1, 2025; confirm the linked source for updates. Place-of-supply rules and taxable, zero-rated, exempt, or specially treated goods can change tax treatment.";
        break;
      }
      case "canadian-salary-calculator": {
        const income = val(data, "salary");
        if (income < 0) throw new Error("Salary cannot be negative.");
        const federal = progressiveTax(income, federalBrackets);
        const provincial = progressiveTax(income, provincialBrackets[data.province]);
        const total = federal + provincial;
        const divisor = { annual: 1, monthly: 12, biweekly: 26, weekly: 52 }[data.frequency];
        value = money((income - total) / divisor);
        lines = [["Gross salary, annual", money(income)], ["Federal tax before credits", money(federal)], [`${provinces.find(([code]) => code === data.province)[1]} tax before credits`, money(provincial)], ["Estimated combined income tax", money(total)], ["Estimated amount after income tax", money(income - total)]];
        description = `Estimated ${data.frequency === "annual" ? "annual" : data.frequency} amount after estimated federal and provincial income tax, before payroll deductions.`;
        note = "2026 bracket rates; progressive calculation on entered income. Personal tax credits, CPP/QPP, EI, surtaxes, deductions, and other circumstances are excluded, so this is not take-home pay or tax advice. Province assumes residence on December 31, 2026.";
        break;
      }
      case "canadian-mortgage-calculator": {
        const principal = val(data, "price") - val(data, "down");
        const annual = val(data, "rate") / 100;
        const years = val(data, "years");
        if (principal <= 0) throw new Error("Home price must be greater than the down payment.");
        const periods = data.frequency === "monthly" ? 12 : 26;
        const monthlyRate = Math.pow(1 + annual / 2, 2 / 12) - 1;
        const periodRate = Math.pow(1 + annual / 2, 2 / periods) - 1;
        const scheduledPeriods = years * periods;
        const regularPayment = periodRate === 0 ? principal / scheduledPeriods : principal * periodRate / (1 - Math.pow(1 + periodRate, -scheduledPeriods));
        const payment = data.frequency === "accelerated"
          ? (monthlyRate === 0 ? principal / (years * 12) : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -years * 12))) / 2
          : regularPayment;
        let balance = principal;
        let totalPaid = 0;
        let totalInterest = 0;
        let paymentCount = 0;
        while (balance > 0.005 && paymentCount < scheduledPeriods) {
          const interest = balance * periodRate;
          const paid = Math.min(balance + interest, payment);
          balance = Math.max(0, balance + interest - paid);
          totalPaid += paid;
          totalInterest += interest;
          paymentCount++;
        }
        value = money(payment);
        lines = [["Mortgage amount", money(principal)], ["Payment frequency", data.frequency === "monthly" ? "Monthly" : data.frequency === "biweekly" ? "Biweekly" : "Accelerated biweekly"], ["Number of payments", number(paymentCount, 0)], ["Estimated total payments", money(totalPaid)], ["Estimated interest", money(totalInterest)]];
        description = data.frequency === "monthly" ? "Estimated monthly payment" : data.frequency === "biweekly" ? "Estimated regular biweekly payment" : "Estimated accelerated biweekly payment";
        note = `Uses a nominal Canadian mortgage rate compounded semi-annually and a ${years}-year amortization. Excludes insurance, fees, taxes, and lender-specific terms.`;
        break;
      }
      case "rent-affordability-calculator": {
        const income = val(data, "income");
        const share = val(data, "share") / 100;
        const costs = val(data, "costs");
        const budget = income * share;
        value = money(Math.max(0, budget - costs));
        lines = [["Monthly gross income", money(income)], ["Chosen housing budget", money(budget)], ["Other monthly housing costs", money(costs)], ["Annual rent at this level", money(Math.max(0, budget - costs) * 12)]];
        description = "Suggested maximum rent after the other housing costs you entered.";
        note = "A budgeting estimate, not a lender or landlord qualification. A 30% gross-income ratio is only a rule of thumb; choose a percentage that fits your situation.";
        break;
      }
      case "canadian-savings-calculator":
      case "compound-interest-calculator": {
        const principal = val(data, "principal");
        const rate = val(data, "rate") / 100;
        const years = val(data, "years");
        const monthly = id === "canadian-savings-calculator";
        const currency = monthly ? "CAD" : data.currency;
        const frequency = monthly ? 12 : Number(data.frequency);
        const contribution = monthly ? val(data, "contribution") : 0;
        const periods = Math.round(years * frequency);
        const periodicRate = rate / frequency;
        const balance = principal * Math.pow(1 + periodicRate, periods) + (periodicRate ? contribution * (Math.pow(1 + periodicRate, periods) - 1) / periodicRate : contribution * periods);
        const contributed = principal + contribution * periods;
        value = money(balance, currency);
        lines = [["Starting balance", money(principal, currency)], ["Contributions", money(contribution * periods, currency)], ["Total contributed", money(contributed, currency)], ["Estimated interest earned", money(balance - contributed, currency)], ["Time period", `${number(years, 0)} years`]];
        description = "Projected balance at the end of the selected period.";
        note = "Assumes a constant nominal annual rate, regular end-of-period deposits where applicable, and no fees or taxes. Actual returns are not guaranteed.";
        break;
      }
      case "age-calculator": {
        const birth = new Date(`${data.birth}T00:00:00Z`);
        const on = new Date(`${data.asof}T00:00:00Z`);
        if (Number.isNaN(+birth) || Number.isNaN(+on)) throw new Error("Enter valid dates.");
        if (on < birth) throw new Error("The age-on date must be on or after the date of birth.");
        const addMonths = (date, count) => {
          const monthStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + count, 1));
          const lastDay = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 0)).getUTCDate();
          monthStart.setUTCDate(Math.min(date.getUTCDate(), lastDay));
          return monthStart;
        };
        let years = on.getUTCFullYear() - birth.getUTCFullYear();
        if (addMonths(birth, years * 12) > on) years--;
        let months = 0;
        while (months < 11 && addMonths(birth, years * 12 + months + 1) <= on) {
          months++;
        }
        const cursor = addMonths(birth, years * 12 + months);
        const days = Math.floor((+on - +cursor) / 86400000);
        const elapsed = Math.floor((+on - +birth) / 86400000);
        value = `${years} years`;
        lines = [["Additional months", String(months)], ["Additional days", String(days)], ["Total elapsed days", number(elapsed, 0)]];
        description = `Age on ${new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(on)}.`;
        break;
      }
      case "date-calculator": {
        const start = new Date(`${data.start}T00:00:00Z`);
        const end = new Date(`${data.end}T00:00:00Z`);
        if (Number.isNaN(+start) || Number.isNaN(+end)) throw new Error("Enter valid dates.");
        const elapsed = Math.abs(Math.round((+end - +start) / 86400000));
        value = `${number(elapsed, 0)} days`;
        lines = [["Start date", new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeZone: "UTC" }).format(start)], ["End date", new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeZone: "UTC" }).format(end)], ["Inclusive count", number(elapsed + 1, 0) + " days"]];
        description = "Elapsed calendar days between the dates (start date is day zero).";
        break;
      }
      case "percentage-calculator": {
        const x = val(data, "x");
        const y = val(data, "y");
        if (data.kind === "of") { value = number(x / 100 * y); description = `${number(x)}% of ${number(y)} is ${value}.`; }
        else if (data.kind === "ratio") {
          if (y === 0) throw new Error("Y cannot be zero for this calculation.");
          value = `${number(x / y * 100)}%`; description = `${number(x)} is ${value} of ${number(y)}.`;
        } else {
          if (x === 0) throw new Error("The starting value cannot be zero.");
          value = `${number((y - x) / Math.abs(x) * 100)}%`;
          description = `Percentage change from ${number(x)} to ${number(y)}.`;
        }
        lines = [["X", number(x)], ["Y", number(y)]];
        break;
      }
      case "celsius-to-fahrenheit-converter": {
        const c = val(data, "celsius"); const f = c * 9 / 5 + 32;
        value = `${number(f)} °F`; description = `${number(c)} °C is ${number(f)} °F.`;
        lines = [["Celsius", `${number(c)} °C`], ["Formula", "°F = (°C × 9/5) + 32"]];
        break;
      }
      case "cm-to-inches-converter": {
        const cm = val(data, "cm"); value = `${number(cm / 2.54)} in`;
        description = `${number(cm)} centimetres is ${number(cm / 2.54)} inches.`;
        lines = [["Centimetres", `${number(cm)} cm`], ["Exact conversion", "1 in = 2.54 cm"]];
        break;
      }
      case "kg-to-pounds-converter": {
        const kg = val(data, "kg"); value = `${number(kg * 2.2046226218)} lb`;
        description = `${number(kg)} kilograms is ${number(kg * 2.2046226218)} pounds.`;
        lines = [["Kilograms", `${number(kg)} kg`], ["Exact conversion", "1 kg = 2.2046226218 lb"]];
        break;
      }
      case "hourly-to-yearly-salary-calculator": {
        const hourly = val(data, "hourly"); const hours = val(data, "hours"); const weeks = val(data, "weeks");
        const annual = hourly * hours * weeks;
        value = money(annual, data.currency);
        lines = [["Gross yearly", money(annual, data.currency)], ["Gross monthly", money(annual / 12, data.currency)], ["Gross weekly", money(annual / 52, data.currency)], ["Hours per year", number(hours * weeks, 0)]];
        description = "Estimated gross earnings before tax and deductions.";
        note = "Assumes the same hours and wage for each paid week. Does not include overtime, bonuses, benefits, or deductions.";
        break;
      }
      case "discount-calculator": {
        const price = val(data, "price"); const rate = val(data, "discount") / 100; const saved = price * rate;
        value = money(price - saved, data.currency);
        lines = [["Original price", money(price, data.currency)], ["Discount", `${number(rate * 100)}%`], ["You save", money(saved, data.currency)]];
        description = "Price after discount, before sales tax.";
        break;
      }
      default: throw new Error("This calculator is not available.");
    }
    return { value, description, lines, note };
  }

  function renderToolContent(tool) {
    const example = byId("tool-example");
    if (!example) return;
    example.textContent = tool.example;
    byId("tool-faqs").innerHTML = tool.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
    const related = tools.filter((item) => tool.related.includes(item.id));
    byId("related-tools").innerHTML = related.map((item) => `<a href="${toolHref(item.id)}">${item.title} <span aria-hidden="true">↗</span></a>`).join("");
    const source = byId("official-source");
    if (source) {
      if (tool.source) source.innerHTML = `Rates source: <a class="source-link" href="${tool.source}" target="_blank" rel="noopener noreferrer">Canada Revenue Agency — 2026 tax rates and brackets</a>.`;
      else source.textContent = "";
    }
  }

  renderHome();
  const currentTool = tools.find((tool) => tool.id === document.body.dataset.tool);
  if (currentTool) {
    renderTool(currentTool);
    renderToolContent(currentTool);
  }
})();
