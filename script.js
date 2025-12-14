// ==================================================
// CP Smart Grocery AI Platform · Front-end Script
// Works across pages. Each block checks if the element exists.
// ==================================================

// --------------------------------------------------
// 1) Customer · Image-based query demo (Apple and Milk)
// --------------------------------------------------
const visionSelect = document.getElementById("visionSelect");
const visionPreview = document.getElementById("visionPreview");
const visionRunBtn = document.getElementById("visionRunBtn");
const visionResultBox = document.getElementById("visionResultBox");

// Backward compatibility (older page used appleDemoBtn/appleResultBox)
const appleDemoBtn = document.getElementById("appleDemoBtn");
const appleResultBox = document.getElementById("appleResultBox");
const milkDemoBtn = document.getElementById("milkDemoBtn");
const milkResultBox = document.getElementById("milkResultBox");

const visionDemos = {
  apple: {
    img: "apple.jpg",
    title: "Qwen multimodal result (Apple demo)",
    bodyHtml: `
      <p>
        The apple in the image looks like a <strong>Fuji</strong> or a <strong>Pink Lady</strong>.
        It has a red surface with lighter yellow undertones and subtle striping.
      </p>
      <p>Demo market-style summary</p>
      <ol>
        <li><strong>Price</strong><br/>
          Average cost is about <strong>$1.50–$3.00 per lb</strong>, depending on region and season.
          If it is a premium variety like Pink Lady, it can be <strong>$2.50–$4.00 per lb</strong>.
        </li>
        <li><strong>Sales volume</strong><br/>
          Fuji and Pink Lady are widely consumed, with strong demand in many markets.
          Local peaks often appear in <strong>autumn and winter</strong>.
        </li>
        <li><strong>Discount patterns</strong><br/>
          Bulk purchases can see <strong>10–15%</strong> off.
          During harvest season, bundle deals and buy one get one offers are common.
        </li>
      </ol>
      <p style="color:#9ca3af;font-size:0.85rem;">
        In the full system, the backend would call the Qwen vision model for category recognition,
        then match the label to product master data and promotion rules before generating the explanation.
      </p>
    `,
  },
  milk: {
    img: "milk.jpg",
    title: "Qwen multimodal result (Milk demo)",
    bodyHtml: `
      <p>
        The product shown is <strong>Yili Pure Milk</strong> (250ml cartons).
        It is a mainstream dairy product in China and is usually marketed as a daily nutrition staple.
      </p>
      <p>Demo market-style summary</p>
      <ol>
        <li><strong>Variety</strong><br/>
          Product type is <strong>pure milk</strong>.
          Typical label highlights include high protein and daily nutrition positioning.
        </li>
        <li><strong>Price</strong><br/>
          A common range is <strong>¥3–5 per 250ml carton</strong>.
          Bulk packs may be around <strong>¥28–40 for 12 cartons</strong>, depending on channel.
        </li>
        <li><strong>Sales volume</strong><br/>
          Yili is a major dairy brand with broad distribution.
          Pure milk is a core item, so the category usually shows <strong>high sales volume</strong>.
        </li>
        <li><strong>Discounts</strong><br/>
          Common patterns include buy one get one, festival discounts around 10–20%,
          and bulk purchase rebates for multi-pack orders.
        </li>
      </ol>
      <p style="color:#9ca3af;font-size:0.85rem;">
        In production, the system would show real-time prices and promotions from the store rule engine
        rather than a fixed demo range.
      </p>
    `,
  },
};

function setVisionPreview(key) {
  if (!visionSelect || !visionPreview) return;
  const k = key || visionSelect.value || "apple";
  const demo = visionDemos[k] || visionDemos.apple;
  visionPreview.src = demo.img;
}

function renderVisionResult(key, targetBox) {
  const demo = visionDemos[key] || visionDemos.apple;
  const box = targetBox || visionResultBox || appleResultBox || milkResultBox;
  if (!box) return;
  box.innerHTML = `
    <p><strong>${demo.title}</strong></p>
    ${demo.bodyHtml}
  `;
}

if (visionSelect && visionPreview) {
  visionSelect.addEventListener("change", () => {
    setVisionPreview(visionSelect.value);
    if (visionResultBox) {
      visionResultBox.innerHTML =
        '<p class="placeholder">Click the button to show the recognition result and demo market analysis.</p>';
    }
  });
  setVisionPreview(visionSelect.value);
}

if (visionRunBtn) {
  visionRunBtn.addEventListener("click", () => {
    const key = visionSelect ? visionSelect.value : "apple";
    renderVisionResult(key, visionResultBox);
  });
}

// Older buttons support
if (appleDemoBtn && appleResultBox) {
  appleDemoBtn.addEventListener("click", () => {
    renderVisionResult("apple", appleResultBox);
  });
}
if (milkDemoBtn && milkResultBox) {
  milkDemoBtn.addEventListener("click", () => {
    renderVisionResult("milk", milkResultBox);
  });
}

// --------------------------------------------------
// 2) Customer · Recommendation demo (age segments)
// --------------------------------------------------
const ageSegmentSelect = document.getElementById("ageSegmentSelect");
const ageRecoBox = document.getElementById("ageRecoBox");

const agePlans = {
  "10-20": {
    title: "Age 10–20 · Students and young users",
    intro:
      "They usually like snacks and sweet drinks. They also care about price and quick satisfaction.",
    items: [
      {
        product: "Milk tea and dessert combo",
        pitch: "A small reward after class or study time, easy to share with friends.",
        discount: "Weekdays 14:00–17:00, second milk tea 50% off, dessert 20% off.",
      },
      {
        product: "Late-night instant noodles set",
        pitch: "A classic choice for late-night streaming or deadlines, easy to store and prepare.",
        discount: "Daily 20:00–23:00, buy 3 and save ¥5 on selected instant noodles.",
      },
      {
        product: "Small fruit packs",
        pitch: "A simple way to feel a bit healthier while still enjoying something sweet.",
        discount: "Student verified users get 10% off. New users get an extra ¥3 off first order.",
      },
    ],
    note:
      "Demo logic: pick the highest-frequency categories for this segment, then attach time-window discounts and small threshold deals.",
  },
  "20-40": {
    title: "Age 20–40 · Office workers and young families",
    intro:
      "They value efficiency and quality. Typical needs are quick lunch, fast dinner, and family baskets on weekends.",
    items: [
      {
        product: "Healthy lunch combo",
        pitch: "Salad plus chicken or yogurt, lighter meals for busy weekdays.",
        discount: "Weekdays 11:00–13:30, 10% off. Members earn extra points.",
      },
      {
        product: "Weekday dinner semi-prep set",
        pitch: "Steak with vegetables or quick noodles, ready in about 20 minutes.",
        discount: "Mon–Thu 17:00–20:00, second set 30% off, free delivery above ¥99.",
      },
      {
        product: "Weekend family fruit platter",
        pitch: "A larger fruit mix for 2–3 people during family time.",
        discount: "Fri–Sun, orders above ¥69 get a small kids snack gift.",
      },
    ],
    note:
      "Demo logic: use order time patterns to decide what to push and attach simple operational promotions such as free delivery thresholds.",
  },
  "40-60": {
    title: "Age 40–60 · Health and long-term value",
    intro:
      "They often focus on nutrition, food safety, and bulk buying for better long-term value.",
    items: [
      {
        product: "Staples bundle",
        pitch: "Rice, noodles, and cooking oil in one order, fewer shopping trips.",
        discount: "Bundles above ¥199 get 5% off, members above ¥299 get an extra ¥20 off.",
      },
      {
        product: "High-protein meat plus vegetables",
        pitch: "Meat with leafy greens, balanced meals for the family.",
        discount: "Tue and Thu, selected meat plus vegetables get 10% off with next-day cold chain.",
      },
      {
        product: "Nuts and healthy snacks",
        pitch: "Daily snacks with lower sugar and better nutrition positioning.",
        discount: "Buy 2 get 1 in the healthy snacks section, plus ¥5 off when combined with fruit.",
      },
    ],
    note:
      "Demo logic: emphasize stable value and scheduled discount days, which matches bulk-buy habits.",
  },
};

if (ageSegmentSelect && ageRecoBox) {
  ageSegmentSelect.addEventListener("change", () => {
    const key = ageSegmentSelect.value;
    const plan = agePlans[key];

    if (!key || !plan) {
      ageRecoBox.innerHTML =
        '<p class="placeholder">Choose an age segment to see a demo bundle and promotion ideas.</p>';
      return;
    }

    const itemsHtml =
      "<ol>" +
      plan.items
        .map(
          (item) =>
            `<li>
              <strong>${item.product}</strong><br/>
              <span style="color:#e5e7eb;">Pitch</span> ${item.pitch}<br/>
              <span style="color:#38bdf8;">Promo</span> ${item.discount}
            </li>`
        )
        .join("") +
      "</ol>";

    ageRecoBox.innerHTML = `
      <h4 style="margin-top:0;margin-bottom:6px;">${plan.title}</h4>
      <p style="margin-top:0;margin-bottom:8px;color:#9ca3af;">${plan.intro}</p>
      ${itemsHtml}
      <p style="color:#9ca3af;font-size:0.85rem;margin-top:8px;">
        This is a demo output. In production, bundles would be generated by the recommendation engine plus user profiles.
      </p>
    `;
  });
}

// --------------------------------------------------
// 3) Customer · AI Customer Service demo (chat box)
// --------------------------------------------------
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");
const quickButtons = document.querySelectorAll(
  ".chat-quick-actions [data-question]"
);

const campusLocation = "XJTLU Taicang Campus Residential Area";

const storeData = [
  {
    name: "Dingdong Grocery · Taicang Demo Dark Store",
    distanceKm: 2.3,
    etaMin: 12,
    hours: "07:30–23:00",
  },
  {
    name: "Freshippo · Taicang Demo Store",
    distanceKm: 4.2,
    etaMin: 18,
    hours: "09:00–22:00",
  },
];

function appendMessage(text, role = "bot") {
  if (!chatBox) return;
  const div = document.createElement("div");
  div.className = `chat-message ${role}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(userText) {
  const raw = userText || "";
  const t = raw.toLowerCase();

  const has = (kw) => t.includes(kw);

  // Promotions
  if (has("promotion") || has("discount") || has("deal") || raw.includes("促销") || raw.includes("打折") || raw.includes("优惠")) {
    return (
      "Here is a demo 'Today’s Promotions' list based on Top 5 items\n" +
      "1 Fresh fruit 10% off in the fruit zone plus ¥1 add-on snack above ¥49\n" +
      "2 Beef second pack 50% off for family meals\n" +
      "3 Instant noodles 20:00–23:00 buy 3 save ¥5\n" +
      "4 Apple 5% off when bundled with oats or yogurt\n" +
      "5 Healthy food members 12% off\n" +
      "This is a demo. The real system would generate this from live promotion rules."
    );
  }

  // Delivery time
  if (
    has("delivery") ||
    has("eta") ||
    has("how long") ||
    has("arrive") ||
    raw.includes("多久") ||
    raw.includes("送到") ||
    raw.includes("配送")
  ) {
    const s1 = storeData[0];
    const s2 = storeData[1];
    return (
      `Demo address is ${campusLocation}\n` +
      `Nearest store is ${s1.name}, about ${s1.distanceKm} km, average ${s1.etaMin} minutes\n` +
      `Another option is ${s2.name}, about ${s2.distanceKm} km, estimated ${s2.etaMin}–25 minutes\n` +
      "In production, the estimate would use store location, rider availability, traffic, and peak time load."
    );
  }

  // Business hours
  if (
    has("open") ||
    has("close") ||
    has("hours") ||
    raw.includes("营业") ||
    raw.includes("关门") ||
    raw.includes("几点")
  ) {
    const s1 = storeData[0];
    const s2 = storeData[1];
    return (
      "Demo store hours\n" +
      `${s1.name} ${s1.hours}, orders stop at 22:30 for same-day delivery\n` +
      `${s2.name} ${s2.hours}, orders stop at 21:30 for same-day delivery\n` +
      "In production, the assistant would query the live store status and warn users near closing time."
    );
  }

  // Apple shortcut
  if (has("apple") || raw.includes("苹果")) {
    return (
      "In the demo, the apple is recognized as Fuji or Pink Lady.\n" +
      "Typical price range is about $1.5–3.0 per lb.\n" +
      "Bulk discounts and seasonal bundle deals are common.\n" +
      "For live pricing, the system would query the selected store."
    );
  }

  // Refund
  if (has("refund") || has("return") || raw.includes("退款") || raw.includes("退货")) {
    return (
      "If the item is damaged or not as described, open the order details and choose after-sales support.\n" +
      "The system can auto-review clear cases, and route complex cases to a human agent."
    );
  }

  // Human agent
  if (has("human") || has("agent") || raw.includes("人工")) {
    return (
      "This is a demo assistant with fixed rules and example data.\n" +
      "In production, there would be a handoff to a human agent with the conversation context attached."
    );
  }

  // Default
  return (
    "I can demo these topics\n" +
    "Today’s promotions\n" +
    "Delivery time to the campus area\n" +
    "Store opening hours\n" +
    "Try asking: What promotions are available today"
  );
}

if (chatForm && chatInput && chatBox) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    const reply = getBotReply(text);
    setTimeout(() => {
      appendMessage(reply, "bot");
    }, 200);
    chatInput.value = "";
  });
}

if (quickButtons && quickButtons.length) {
  quickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-question") || "";
      if (!q) return;
      appendMessage(q, "user");
      const reply = getBotReply(q);
      setTimeout(() => {
        appendMessage(reply, "bot");
      }, 200);
    });
  });
}

// --------------------------------------------------
// 4) Merchant · Hot products table
// --------------------------------------------------
const hotProductsTable = document.getElementById("hotProductsTable");
if (hotProductsTable) {
  const tbody = hotProductsTable.querySelector("tbody");
  const rows = [
    ["#1", "Fresh fruit", "Medium", "Use as an entry category and combine with simple bundles to lift basket size"],
    ["#2", "Beef", "High", "Family packs work well with weekend deals and cross-sell bundles"],
    ["#3", "Instant noodles", "High", "Night-time small-threshold promos can boost impulse buys"],
    ["#4", "Apple", "Medium", "Pair with the image demo as a fun entry to the promo page"],
    ["#5", "Healthy food", "Medium", "Member pricing improves long-term retention"],
  ];
  if (tbody) {
    tbody.innerHTML = "";
    rows.forEach((r) => {
      const tr = document.createElement("tr");
      r.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
}

// --------------------------------------------------
// 5) Merchant · Demand forecast and cost text
// --------------------------------------------------
const forecastBox = document.getElementById("forecastBox");
if (forecastBox) {
  forecastBox.innerHTML = `
    <p><strong>1 Meat demand forecast (inventory demo)</strong></p>
    <p>Prediction for <strong>meat</strong></p>
    <ul>
      <li>Predicted mean daily demand <strong>117.44</strong></li>
      <li>Demand volatility (standard deviation) <strong>2.84</strong></li>
    </ul>
    <p>
      Interpretation: you can set safety stock as mean demand plus a multiplier times volatility,
      then combine it with lead time to estimate reorder points.
    </p>

    <p><strong>2 Milk cost view and 30-day sales (forecast demo)</strong></p>
    <p>Example for milk</p>
    <ul>
      <li>Forecast cost <strong>223.04</strong></li>
      <li>Over-forecast cost <strong>60.61</strong></li>
      <li>Under-forecast cost <strong>101.83</strong></li>
    </ul>
    <p>
      Over-forecasting increases waste risk. Under-forecasting increases stock-out risk.
      The demo compares both costs to support ordering decisions.
    </p>
    <p style="color:#9ca3af;font-size:0.85rem;">
      In production, the system would show an actual vs predicted chart for the last 30 days.
    </p>
  `;
}

// --------------------------------------------------
// 6) Merchant · Inventory optimization table
// --------------------------------------------------
const inventoryTable = document.getElementById("inventoryTable");
if (inventoryTable) {
  const tbodyInv = inventoryTable.querySelector("tbody");
  const rowsInv = [
    [
      "Meat",
      "Mean 117.44, volatility 2.84",
      "Stable but critical category, avoid stock-outs and control waste",
      "Use safety stock and increase refresh frequency, reorder in smaller batches",
    ],
    [
      "Milk",
      "Forecast cost 223.04 (over 60.61, under 101.83)",
      "Under-forecasting is more expensive in this demo, stock-outs hurt experience",
      "Bias slightly towards availability while monitoring expiry and using promo clearance",
    ],
  ];
  if (tbodyInv) {
    tbodyInv.innerHTML = "";
    rowsInv.forEach((r) => {
      const tr = document.createElement("tr");
      r.forEach((cell, idx) => {
        const td = document.createElement("td");
        td.textContent = cell;
        if (idx === 3) td.style.color = "#38bdf8";
        tr.appendChild(td);
      });
      tbodyInv.appendChild(tr);
    });
  }
}

// --------------------------------------------------
// 7) Insights Dashboard · Recreate Streamlit charts in HTML
// Data is embedded as arrays and objects.
// --------------------------------------------------
const insightsPage = document.getElementById("insightsPage");

const INSIGHTS_DATA = {
  marketValue: {
    year: [2019, 2020, 2021, 2022, 2023, 2024],
    actual: [8932833.4, 9488809.1, 10549000.0, 10716177.0, 11244903.0, 11737998.8],
    forecastYear: [2024, 2025, 2026, 2027, 2028, 2029],
    forecast: [11737998.8, 12462258.8, 13007985.4, 13538451.0, 14055855.8, 14559317.7],
  },
  categoryShare: {
    category: ["Food", "Drinks", "Tobacco", "Household Products"],
    y2019: [73.6, 13.7, 9.8, 2.8],
    y2024: [75.4, 13.4, 8.8, 2.4],
  },
  geo: {
    region: ["Asia-Pacific", "Europe", "North America", "South America", "Middle East & Africa"],
    share2024: [53.8, 20.3, 18.7, 5.0, 2.2],
  },
  channels: {
    channel: [
      "Convenience Stores & Gas Stations",
      "Hypermarkets, Supermarkets & Hard Discounters",
      "Food & Drinks Specialists",
      "Online Specialists",
      "Other",
    ],
    share2024: [37.1, 35.1, 15.9, 4.0, 7.9],
  },
  drivers: {
    driver: [
      "High Disposable Income",
      "Premium or High-Quality Products",
      "Health Consciousness",
      "Population Growth and Urbanization",
      "E-commerce Platforms",
      "Technology and Automation",
    ],
    impact5: [4.5, 4.2, 4.0, 3.8, 4.8, 4.7],
  },
  customerInsights: {
    factor: [
      "Price Sensitivity",
      "Low Switching Costs",
      "Multi-channel Options",
      "Social Media Influence",
      "Loyalty Program Effect",
    ],
    score5: [4.5, 4.0, 4.8, 3.5, 2.5],
  },
};

const COMPETITORS = {
  "Walmart Inc.": {
    description:
      "Walmart operates grocery stores, hypermarkets, discount stores, and online platforms. Its positioning is everyday low prices plus omnichannel reach.",
    keyProducts:
      "Grocery and consumables, health and wellness, electronics, apparel, and home categories.",
    coverage: "Americas, Africa, and Asia-Pacific. Headquarters in the United States.",
    segments: "Broad base of everyday shoppers, often price-sensitive.",
    strategicFocus: {
      "Price Leadership": 4.5,
      "Omnichannel": 5.0,
      "Technology": 4.0,
      "Private Label": 3.5,
      "International": 4.5,
    },
    revenueUSD: 680.985,
  },
  "Tesco Plc": {
    description:
      "Tesco is a multinational retailer with multi-format stores and online services. It focuses on value, loyalty programs, and operational efficiency.",
    keyProducts:
      "Fresh food, drinks, grocery, home products, baby products, clothing, and household goods.",
    coverage: "UK and Europe. Headquarters in the United Kingdom.",
    segments: "Value-conscious consumers and loyalty program members.",
    strategicFocus: {
      "Price Leadership": 3.5,
      "Omnichannel": 4.0,
      "Technology": 3.0,
      "Private Label": 4.0,
      "International": 3.0,
    },
    revenueGBP: 69.916,
  },
  "Carrefour SA": {
    description:
      "Carrefour runs hypermarkets, supermarkets, convenience stores, and digital channels. It emphasizes omnichannel experience and digitalization.",
    keyProducts:
      "Fresh produce, locally sourced items, fast-moving goods, and essential non-food products.",
    coverage: "Europe, Latin America, Asia, and MEA. Headquarters in France.",
    segments: "Diverse base including digital shoppers and convenience seekers.",
    strategicFocus: {
      "Price Leadership": 3.0,
      "Omnichannel": 4.5,
      "Technology": 4.5,
      "Private Label": 3.8,
      "International": 4.0,
    },
    revenueEUR: 87.27,
  },
  "Aldi Einkauf GmbH & Co oHG": {
    description:
      "Aldi is a discount supermarket chain focusing on competitive prices and strong private label assortments.",
    keyProducts:
      "Food, beverages, baby products, personal care, produce, pet food, and household goods.",
    coverage: "Europe and the United States. Headquarters in Germany.",
    segments: "Budget shoppers, price-sensitive consumers, private label fans.",
    strategicFocus: {
      "Price Leadership": 5.0,
      "Omnichannel": 2.0,
      "Technology": 2.5,
      "Private Label": 5.0,
      "International": 3.5,
    },
    revenueEUR: 55.0,
  },
};

const SEGMENTS = {
  textHtml: `
    <ul style="margin:0;padding-left:18px;">
      <li><strong>Value shoppers</strong> prefer discounts and clear price signals</li>
      <li><strong>Health-conscious</strong> care about fresh, organic, and nutrition labels</li>
      <li><strong>Convenience seekers</strong> use online ordering and fast delivery</li>
      <li><strong>Brand loyalists</strong> stick to preferred brands and stable quality</li>
      <li><strong>Family shoppers</strong> buy in bulk and focus on household essentials</li>
    </ul>
  `,
  segmentData: {
    label: ["Value shoppers", "Health-conscious", "Convenience seekers", "Brand loyalists", "Family shoppers"],
    basket: [30, 45, 25, 40, 60],
    onlinePct: [20, 30, 70, 40, 50],
    organicPct: [10, 80, 20, 30, 40],
  },
  productSeg: {
    label: ["Fresh Produce", "Packaged Foods", "Dairy & Frozen", "Beverages", "Household Goods"],
    revenueShare: [25, 30, 15, 20, 10],
    margin: [20, 15, 18, 25, 10],
  },
};

const OPPORTUNITIES = {
  label: [
    "Expand Online Delivery",
    "AI Personalization",
    "Private Label Expansion",
    "Enter New Urban Districts",
    "Partner with Local Farms",
    "Offer Meal Kits",
  ],
  impact: [4.5, 4.8, 4.0, 3.5, 3.8, 4.2],
  feasibility: [4.0, 3.5, 4.2, 3.0, 4.5, 3.8],
  swotHtml: `
    <p style="margin-top:0;"><strong>Strengths</strong> Brand recognition, store network, supply chain experience, omnichannel growth</p>
    <p><strong>Weaknesses</strong> High logistics cost, perishable waste risk, intense price competition</p>
    <p><strong>Opportunities</strong> Online penetration, healthy and sustainable demand, AI and automation</p>
    <p style="margin-bottom:0;"><strong>Threats</strong> New entrants, shifts in preference, supply chain disruptions, regulation</p>
  `,
};

function chartBaseOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#e5e7eb" } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(148,163,184,0.12)" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(148,163,184,0.12)" } },
    },
  };
}

function safeNewChart(canvasId, config) {
  const el = document.getElementById(canvasId);
  if (!el) return null;

  if (typeof Chart === "undefined") {
    const wrap = el.parentElement;
    if (wrap) {
      wrap.innerHTML =
        '<p style="color:#9ca3af;font-size:0.85rem;margin:0;">Chart.js is not loaded. Please ensure the page can access the CDN or add a local chart library.</p>';
    }
    return null;
  }

  try {
    return new Chart(el, config);
  } catch (e) {
    const wrap = el.parentElement;
    if (wrap) {
      wrap.innerHTML =
        '<p style="color:#9ca3af;font-size:0.85rem;margin:0;">Chart rendering failed. Please check browser console for details.</p>';
    }
    return null;
  }
}

function competitorRevenueToUSD(name, data) {
  if (data.revenueUSD) return data.revenueUSD;
  if (data.revenueGBP) return data.revenueGBP * 1.25;
  if (data.revenueEUR) return data.revenueEUR * 1.08;
  return 0;
}

function renderCompetitorProfile(name) {
  const box = document.getElementById("competitorProfile");
  if (!box) return;
  const d = COMPETITORS[name];
  if (!d) {
    box.innerHTML = '<p class="placeholder">Select a competitor to show details.</p>';
    return;
  }

  box.innerHTML = `
    <p style="margin-top:0;"><strong>${name}</strong></p>
    <p><strong>Overview</strong> ${d.description}</p>
    <p><strong>Key products</strong> ${d.keyProducts}</p>
    <p><strong>Coverage</strong> ${d.coverage}</p>
    <p style="margin-bottom:0;"><strong>Customer segments</strong> ${d.segments}</p>
  `;
}

let INSIGHTS_CHARTS = {
  mv: null,
  mv2: null,
  cat: null,
  geo: null,
  channels: null,
  drivers: null,
  drivers2: null,
  customer: null,
  customer2: null,
  revenue: null,
  focus: null,
  segmentBar: null,
  productSeg: null,
  opp: null,
};

function renderTabCharts(tabKey) {
  if (!insightsPage) return;

  // Overview
  if (tabKey === "overview") {
    if (!INSIGHTS_CHARTS.mv) {
      INSIGHTS_CHARTS.mv = safeNewChart("mvChart", {
        type: "line",
        data: {
          labels: INSIGHTS_DATA.marketValue.year.map(String),
          datasets: [
            {
              label: "Actual (USD trillion)",
              data: INSIGHTS_DATA.marketValue.actual.map((v) => v / 1000000),
            },
            {
              label: "Forecast (USD trillion)",
              data: INSIGHTS_DATA.marketValue.forecast.map((v) => v / 1000000),
              borderDash: [6, 6],
            },
          ],
        },
        options: chartBaseOptions(),
      });
    }

    if (!INSIGHTS_CHARTS.cat) {
      INSIGHTS_CHARTS.cat = safeNewChart("catChart", {
        type: "bar",
        data: {
          labels: INSIGHTS_DATA.categoryShare.category,
          datasets: [
            { label: "2019 share (%)", data: INSIGHTS_DATA.categoryShare.y2019 },
            { label: "2024 share (%)", data: INSIGHTS_DATA.categoryShare.y2024 },
          ],
        },
        options: chartBaseOptions(),
      });
    }

    if (!INSIGHTS_CHARTS.geo) {
      INSIGHTS_CHARTS.geo = safeNewChart("geoChart", {
        type: "pie",
        data: {
          labels: INSIGHTS_DATA.geo.region,
          datasets: [{ label: "2024 share (%)", data: INSIGHTS_DATA.geo.share2024 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#e5e7eb" } } } },
      });
    }

    if (!INSIGHTS_CHARTS.channels) {
      INSIGHTS_CHARTS.channels = safeNewChart("channelChart", {
        type: "doughnut",
        data: {
          labels: INSIGHTS_DATA.channels.channel,
          datasets: [{ label: "2024 share (%)", data: INSIGHTS_DATA.channels.share2024 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#e5e7eb" } } } },
      });
    }

    if (!INSIGHTS_CHARTS.drivers) {
      INSIGHTS_CHARTS.drivers = safeNewChart("driversChart", {
        type: "bar",
        data: {
          labels: INSIGHTS_DATA.drivers.driver,
          datasets: [{ label: "Impact score (out of 5)", data: INSIGHTS_DATA.drivers.impact5 }],
        },
        options: { ...chartBaseOptions(), indexAxis: "y" },
      });
    }

    if (!INSIGHTS_CHARTS.customer) {
      INSIGHTS_CHARTS.customer = safeNewChart("customerRadar", {
        type: "radar",
        data: {
          labels: INSIGHTS_DATA.customerInsights.factor,
          datasets: [{ label: "Score (out of 5)", data: INSIGHTS_DATA.customerInsights.score5 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: "#e5e7eb" } } },
          scales: {
            r: {
              angleLines: { color: "rgba(148,163,184,0.18)" },
              grid: { color: "rgba(148,163,184,0.18)" },
              pointLabels: { color: "#9ca3af" },
              ticks: {
                display: false,
                color: "#9ca3af",
                // ✅ remove the white backdrop strip behind tick labels
                showLabelBackdrop: false,
                backdropColor: "rgba(0,0,0,0)",
              },
              suggestedMin: 0,
              suggestedMax: 5,
            },
          },
        },
      });
    }
  }

  // Market analysis
  if (tabKey === "market") {
    if (!INSIGHTS_CHARTS.drivers2) {
      INSIGHTS_CHARTS.drivers2 = safeNewChart("driversChart2", {
        type: "bar",
        data: {
          labels: INSIGHTS_DATA.drivers.driver,
          datasets: [{ label: "Impact score (out of 5)", data: INSIGHTS_DATA.drivers.impact5 }],
        },
        options: { ...chartBaseOptions(), indexAxis: "y" },
      });
    }

    if (!INSIGHTS_CHARTS.customer2) {
      INSIGHTS_CHARTS.customer2 = safeNewChart("customerRadar2", {
        type: "radar",
        data: {
          labels: INSIGHTS_DATA.customerInsights.factor,
          datasets: [{ label: "Score (out of 5)", data: INSIGHTS_DATA.customerInsights.score5 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: "#e5e7eb" } } },
          scales: {
            r: {
              angleLines: { color: "rgba(148,163,184,0.18)" },
              grid: { color: "rgba(148,163,184,0.18)" },
              pointLabels: { color: "#9ca3af" },
              ticks: {
                display: false,
                color: "#9ca3af",
                // ✅ remove the white backdrop strip behind tick labels
                showLabelBackdrop: false,
                backdropColor: "rgba(0,0,0,0)",
              },
              suggestedMin: 0,
              suggestedMax: 5,
            },
          },
        },
      });
    }

    if (!INSIGHTS_CHARTS.mv2) {
      INSIGHTS_CHARTS.mv2 = safeNewChart("mvChart2", {
        type: "line",
        data: {
          labels: INSIGHTS_DATA.marketValue.forecastYear.map(String),
          datasets: [
            {
              label: "Forecast (USD trillion)",
              data: INSIGHTS_DATA.marketValue.forecast.map((v) => v / 1000000),
            },
          ],
        },
        options: chartBaseOptions(),
      });
    }
  }

  // Competitors
  if (tabKey === "competitors") {
    if (!INSIGHTS_CHARTS.revenue) {
      const names = Object.keys(COMPETITORS);
      const rev = names.map((n) => competitorRevenueToUSD(n, COMPETITORS[n]));
      INSIGHTS_CHARTS.revenue = safeNewChart("revChart", {
        type: "bar",
        data: {
          labels: names,
          datasets: [{ label: "Revenue (USD bn, demo conversion)", data: rev }],
        },
        options: chartBaseOptions(),
      });
    }

    const select = document.getElementById("competitorSelect");
    if (select && select.options.length === 0) {
      Object.keys(COMPETITORS).forEach((name) => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      });
      renderCompetitorProfile(select.value);

      select.addEventListener("change", () => {
        renderCompetitorProfile(select.value);
        updateCompetitorRadar(select.value);
      });
    }

    if (!INSIGHTS_CHARTS.focus) {
      const firstName = select ? select.value : Object.keys(COMPETITORS)[0];
      INSIGHTS_CHARTS.focus = buildCompetitorRadar(firstName);
    }
  }

  // Segmentation
  if (tabKey === "segmentation") {
    const segText = document.getElementById("segmentText");
    if (segText && segText.innerHTML.trim() === "") segText.innerHTML = SEGMENTS.textHtml;

    if (!INSIGHTS_CHARTS.segmentBar) {
      INSIGHTS_CHARTS.segmentBar = safeNewChart("segmentBar", {
        type: "bar",
        data: {
          labels: SEGMENTS.segmentData.label,
          datasets: [
            { label: "Average basket size", data: SEGMENTS.segmentData.basket },
            { label: "Online purchase (%)", data: SEGMENTS.segmentData.onlinePct },
            { label: "Organic preference (%)", data: SEGMENTS.segmentData.organicPct },
          ],
        },
        options: chartBaseOptions(),
      });
    }

    if (!INSIGHTS_CHARTS.productSeg) {
      INSIGHTS_CHARTS.productSeg = safeNewChart("productSegBar", {
        type: "bar",
        data: {
          labels: SEGMENTS.productSeg.label,
          datasets: [
            { label: "Revenue share (%)", data: SEGMENTS.productSeg.revenueShare },
            { label: "Profit margin (%)", data: SEGMENTS.productSeg.margin },
          ],
        },
        options: chartBaseOptions(),
      });
    }
  }

  // Opportunities
  if (tabKey === "opportunities") {
    const swotBox = document.getElementById("swotBox");
    if (swotBox && swotBox.innerHTML.trim() === "") swotBox.innerHTML = OPPORTUNITIES.swotHtml;

    if (!INSIGHTS_CHARTS.opp) {
      const bubbleData = OPPORTUNITIES.label.map((name, i) => ({
        x: OPPORTUNITIES.feasibility[i],
        y: OPPORTUNITIES.impact[i],
        r: 10 + OPPORTUNITIES.impact[i] * 2,
        name,
      }));

      INSIGHTS_CHARTS.opp = safeNewChart("oppBubble", {
        type: "bubble",
        data: {
          datasets: [
            {
              label: "Opportunities",
              data: bubbleData,
              parsing: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#e5e7eb" } },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const p = ctx.raw;
                  return `${p.name} impact ${p.y} feasibility ${p.x}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Feasibility (1 to 5)", color: "#9ca3af" },
              min: 0,
              max: 5,
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(148,163,184,0.12)" },
            },
            y: {
              title: { display: true, text: "Impact (1 to 5)", color: "#9ca3af" },
              min: 0,
              max: 5,
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(148,163,184,0.12)" },
            },
          },
        },
      });
    }
  }
}

function buildCompetitorRadar(name) {
  const d = COMPETITORS[name];
  if (!d) return null;

  const labels = Object.keys(d.strategicFocus);
  const values = labels.map((k) => d.strategicFocus[k]);

  return safeNewChart("focusRadar", {
    type: "radar",
    data: {
      labels,
      datasets: [{ label: name, data: values }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "#e5e7eb" } } },
      scales: {
        r: {
          angleLines: { color: "rgba(148,163,184,0.18)" },
          grid: { color: "rgba(148,163,184,0.18)" },
          pointLabels: { color: "#9ca3af" },
          ticks: {
                display: false,
            color: "#9ca3af",
            // ✅ remove the white backdrop strip behind tick labels
            showLabelBackdrop: false,
            backdropColor: "rgba(0,0,0,0)",
          },
          suggestedMin: 0,
          suggestedMax: 5,
        },
      },
    },
  });
}

function updateCompetitorRadar(name) {
  const d = COMPETITORS[name];
  const chart = INSIGHTS_CHARTS.focus;
  if (!d || !chart) return;

  const labels = Object.keys(d.strategicFocus);
  const values = labels.map((k) => d.strategicFocus[k]);

  chart.data.labels = labels;
  chart.data.datasets[0].label = name;
  chart.data.datasets[0].data = values;
  chart.update();
}

// Tabs wiring
function setupInsightsTabs() {
  const tabs = document.getElementById("insightsTabs");
  if (!tabs) return;

  const panels = {
    overview: document.getElementById("tab-overview"),
    market: document.getElementById("tab-market"),
    competitors: document.getElementById("tab-competitors"),
    segmentation: document.getElementById("tab-segmentation"),
    opportunities: document.getElementById("tab-opportunities"),
  };

  const initFlags = {
    overview: false,
    market: false,
    competitors: false,
    segmentation: false,
    opportunities: false,
  };

  function setActive(key) {
    Object.keys(panels).forEach((k) => {
      if (!panels[k]) return;
      panels[k].classList.toggle("active", k === key);
    });

    tabs.querySelectorAll("button[data-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === key);
    });

    if (!initFlags[key]) {
      initFlags[key] = true;
      renderTabCharts(key);
    }
  }

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    setActive(btn.dataset.tab);
  });

  setActive("overview");
}

if (insightsPage) {
  document.addEventListener("DOMContentLoaded", () => {
    setupInsightsTabs();
  });
}
