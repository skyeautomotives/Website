# Indian Retail Engine Oil Prices by SAE Grade: Primary Source Research (2026)

> **Note on location:** This repository (Skye Automotives / Motovian static site) had no existing "research notes" convention or folder. This `research/` directory was created specifically to hold this investigation: it is not an established project convention.

> **Research date:** 2026-09-14. Prices, availability, and page content on brand websites change frequently and were not archived beyond what is quoted below: treat these as a snapshot, not a permanent reference.

## Methodology and an important overall finding

I attempted to source each grade from an **official brand-operated page** (a manufacturer's own India website or its own first-party e-commerce store), not a reseller/marketplace (Amazon, Flipkart, IndiaMART, Moglix, etc.).

The single biggest finding of this research: **most pure lubricant brands active in India do not sell directly to consumers online and do not publish MRP/price on their own websites.**

- **Castrol India** (castrol.com/en_in): product pages exist (e.g. the POWER1, EDGE, CRB Turbomax lines) but none display a price; Castrol has no first-party consumer checkout in India that could be reached.
- **HP Lubricants / HPCL** (hplubricants.in): confirmed by direct fetch: individual product pages (HP Racer, HP Racer Synth, HP Racer Plus, HP Cruise, HP Neosynth, HP Milcy, HP Dieselino, etc.) list specifications only, **no MRP or pack pricing anywhere on the site**.
- **Motul India** (motulindia.com): the product catalogue (bike/engine-oil/... URLs) exists and is indexed by search engines, but the live site actively refused every fetch attempt in this session (connection refused via automated fetch, and refused browser navigation as well), so no price could be confirmed directly from Motul even though the products (7100, 3000, 5100, 300V) clearly exist.
- **Shell India, Servo/IndianOil, Gulf Oil India, Valvoline Cummins India**: no first-party e-commerce store with visible consumer pricing could be found for any of these; IndianOil's SERVO and Gulf Oil India's corporate pages are informational/B2B only, and Valvoline in India trades mainly as "Valvoline Cummins" through industrial/OEM channels, not direct retail.

Where a brand does sell directly with visible prices, it is almost always an **OEM two-wheeler manufacturer's own accessories e-commerce store** selling its house-branded oil:
- **Hero MotoCorp**: `shop.heromotocorp.com` (official Hero e-commerce store): has real prices.
- **Suzuki Motorcycle India**: `suzukimotorcycle.co.in` genuine-accessories catalogue: has real prices.
- **Honda Cars India**: `hondacarindia.com` genuine-oil page: has real (but ungraded) indicative prices.
- **TVS Motor** (`shop.tvsmotor.com`): sells bike-care chemicals but its flagship **TRU4 engine oil is not actually listed for sale** on the official store (searched directly; only 1 unrelated DOT4 fluid result came back for "TRU4").
- **Maruti Suzuki** (`marutisuzuki.com/genuine-parts` and `/genuine-accessories`): sells ECSTAR car-care chemicals and transmission fluids online with visible prices, but the ECSTAR **engine oil** product pages (0W-16, 0W-20, 5W-30) could not be located as live, priced pages on the site in this session: the correct catalogue URL either 404'd or was not indexed.

Given this, several of the 12 grades below have **no genuine primary-source price** and are marked accordingly, with a clearly labeled secondary-source figure offered only as a rough fallback.

---

## 1. 10W-30 (motorcycle 4T)

**Confidence: Primary source found**

- **Official brand + product:** Hero MotoCorp: "Hero 4T Plus Engine Oil 10W30" (mineral/semi-synthetic 4T oil for Hero motorcycles)
- **Price:** ₹480 for an 800 ml bottle → **₹480 ÷ 0.8 L = ₹600/litre**
- **Source URL:** https://shop.heromotocorp.com/en/product/hero-4t-plus-10w30-sl-ma2-b2s2ml800-
- **Page date/version:** No explicit revision date shown on page; captured live 2026-09-14.

**Corroborating primary source:** Suzuki Motorcycle India: "ECSTAR Semi-Synthetic Engine Oil 10W-30 MA" (part no. 990P0-21040-001), ₹565.00, sold as a 1-litre pack (no size suffix on part code, matching Suzuki's 1L-pack numbering pattern elsewhere on the same page) → **≈₹565/litre**.
Source: https://www.suzukimotorcycle.co.in/accessories/for-your-suzuki/oils--chemicals (captured live 2026-09-14 via rendered page).

Hero's cheaper mineral-blend 10W-30 (₹600/L) and Suzuki's semi-synthetic 10W-30 (₹565/L) bracket a plausible real 10W-30 motorcycle-oil retail price of roughly **₹565–₹600/litre** for entry/mid-tier branded oil in this grade.

---

## 2. 20W-40 (motorcycle 4T)

**Confidence: Primary source found**

- **Official brand + product:** Suzuki Motorcycle India: "SUZUKI GEN OIL 20W40" (part no. 9900EF21001C021)
- **Price:** ₹437.00 for a 1-litre pack → **₹437/litre**
- **Source URL:** https://www.suzukimotorcycle.co.in/accessories/for-your-suzuki/oils--chemicals (captured live 2026-09-14 via rendered page; a smaller 0.8 L pack of the same oil, part 9900EF21001C028, is ₹362.00 → ₹452.50/litre, consistent with the 1 L figure)

**Corroborating primary source:** Hero MotoCorp: "Hero Genuine 4T Plus Premium Engine Oil 20W-40" (product code SPDMCYL10PPS), ₹490 for a 900 ml bottle → ₹490 ÷ 0.9 L = **₹544.44/litre**.
Source: https://shop.heromotocorp.com/en/product/hero-motocorp-genuine-4t-plus-20w-40-engine-oil-for-bikes-900-ml-api-sn-and-jaso-ma2-certifiedor-advanced-fuel-saving-technologyor-specially-formulated-for-hero-motorcycles

Real 20W-40 motorcycle oil from OEM-branded stores in 2026 runs roughly **₹437–₹545/litre** depending on brand and pack size.

---

## 3. 15W-40 (car/diesel)

**Confidence: No reliable primary source found**

No official brand page for a car/diesel 15W-40 product displayed a price:
- Castrol CRB Turbomax 15W-40 (Castrol's diesel-truck/car line): product exists on castrol.com but no price shown on any Castrol India page found.
- HP Lubricants HP CRUISE 15W-40, HP MILCY 15W-40, HP MILCY TURBO 15W-40, HP DIESELINO 15W-40T (all confirmed present on hplubricants.in/products/automotive-oils): **no MRP shown on any HP Lubricants product page** (confirmed by direct fetch).

**Secondary-source fallback (clearly not a primary/official price: flagged as such):** IndiaMART wholesale/retail listings for Castrol CRB Turbo 15W-40 show extremely wide, inconsistent pricing: ₹160/litre (Ahmedabad wholesale), ₹225/litre (Hyderabad, 15 L bucket), and ₹270/bottle (Kolkata): https://www.indiamart.com/proddetail/castrol-crb-turbo-15w-40-ch4-engine-oil-15685915612.html and related listings. This spread (₹160–270/litre) is too inconsistent to state as "the" price and is offered only as a rough, low-confidence indication.

---

## 4. 10W-40 (motorcycle)

**Confidence: Primary source found**

- **Official brand + product:** Suzuki Motorcycle India: "ECSTAR Full Synthetic Engine Oil 10W-40 R9000" (part no. 990P0-21010-001)
- **Price:** ₹887.00 for a 1000 ml (1 L) bottle → **₹887/litre**
- **Source URL:** https://www.suzukimotorcycle.co.in/accessories-details/ecstar-full-synthetic-engine-oil-10w-40-1000-ml (captured live 2026-09-14)
- Larger packs of the same product, same page/catalogue, confirm the per-litre rate: 1.1 L pack = ₹970 (₹881.8/L), 1.2 L pack = ₹1058 (₹881.7/L): internally consistent with the ₹887/L single-litre price.

**Corroborating primary source (lower semi-synthetic tier):** Suzuki: "ECSTAR Semi-Synthetic Engine Oil 10W-40 MA R7000" (part 990P0-21050-001), ₹628.00/litre; and "ECSTAR SEMI-SYN ENGINE OIL 10W-40 R7000" 1.1 L pack ₹692 (₹629/L) / 1.2 L pack ₹755 (₹629/L): same source URL as above.

So genuine OEM-branded 10W-40 motorcycle oil in India spans roughly **₹628/litre (semi-synthetic) to ₹887/litre (full synthetic)**.

---

## 5. 15W-50 (motorcycle, full-synthetic)

**Confidence: No reliable primary source found**

- HP Lubricants sells three 15W-50 products (HP Racer 15W-50, HP Racer Plus 15W-50, HP Racer Synth 15W-50): confirmed present on hplubricants.in, but **no price shown on any of the three product pages** (direct fetch confirmed no MRP/pricing content).
- Motul's 7100 4T 15W-50 (part of Motul's "7100" full-synthetic bike-oil line) is listed in Motul India's catalogue, but the motulindia.com site refused every fetch/navigation attempt in this session, so no price could be verified.

**Secondary-source fallback (flagged, not a primary/official price):** A reseller blog citing an Amazon India listing shows "HP Lubricants Racer4 15W-50 Engine Oil for Bikes (2.5 L)" at ₹543 → ₹543 ÷ 2.5 L ≈ **₹217/litre** (source: https://www.indiafreestuff.in/hp-lubricants-racer4-15w-50-engine-oil-bikes-2-5-l-rs-536-amazon: note this is a marketplace/deal-aggregator page, not HP's own site, and the figure looks unusually low for a full-synthetic 15W-50, so treat it with real skepticism).

---

## 6. 20W-50 (motorcycle)

**Confidence: No reliable primary source found**

- Castrol POWER1 Cruise 20W-50 and POWER1 Ultimate 20W-50 (Castrol's mineral and full-synthetic 20W-50 bike oils respectively) exist on castrol.com, but no Castrol India page found displays a price.
- Suzuki's official India accessories catalogue (checked in full, including "load more") does **not** list a 20W-50 product for the Indian market (Suzuki's 20W-50 "R5000" oil is sold only through Suzuki's US motorcycle store, a different market/site).

**Secondary-source fallback (flagged, not primary):** Flipkart lists Castrol POWER1 Cruise 4T 20W-50 around ₹562, and an Amazon listing (captured 2026-09-05 per a price-tracking aggregator) shows ₹603 for what appears to be a 1-litre pack of the same product, i.e. roughly **₹560–₹600/litre**: sources: https://www.flipkart.com/castrol-4t-20w-50-1-2-litres-power1-cruise-engine-oil-bikes-3in1-technology-synthetic-blend/p/itm69359e891b496 and https://www.amazon.in/Castrol-POWER1-Synthetic-Technology-Performance/dp/B00WMDRTAM. Both are marketplace listings, not Castrol's own site.

---

## 7. 10W-50 (motorcycle, full-synthetic)

**Confidence: No reliable primary source found**

- Motul's 7100 4T 10W-50 and 300V² Factory Line 10W-50 (Motul's premium full-synthetic 10W-50 bike oils) are listed in Motul India's own catalogue (motulindia.com/bike/engine-oil/7100-4t-10w50 and .../300v2-factory-line-10w50), confirming the products exist for the Indian market, but **the Motul India website could not be reached at all in this session**: every WebFetch attempt returned a connection error and a browser-navigation attempt was also refused by the site: so no price could be verified from Motul directly.

**Secondary-source fallback (flagged, not primary):** Marketplace/reseller listings for Motul 7100 4T 10W-50 (1 L) range from about ₹680–₹890 depending on the retailer and any discount applied, e.g. https://www.indiamart.com/proddetail/motul-7100-4t-10w-40-bike-engine-oil-25280253912.html (this specific listing is actually 10W-40, illustrating how inconsistently these are labeled by resellers) and https://inrdeals.com/motul-7100-4t-10w50-motul-synthetic-motor-oil1-l-at-lowest-price-in-online-india-VLUEDPH2J2UNAXGE-offer (~₹719 for the 10W-50 1 L). Given the labeling inconsistency across reseller listings, treat any 10W-50 figure here as low-confidence.

---

## 8. 5W-30 (car, full-synthetic)

**Confidence: No reliable primary source found for the car grade** (a related but different-vehicle-class primary figure exists: see note)

- No official car-lubricant brand page (Castrol EDGE 5W-30, HP Neosynth 5W-30, Shell Helix HX8/Ultra 5W-30) displays a price.
- Maruti Suzuki's own ECSTAR 5W-30 (used on some diesel engines) could not be located as a live, priced product page on marutisuzuki.com in this session.

**Related official primary data point (different vehicle class: flagged):** Hero MotoCorp does sell a **motorcycle** 5W-30 oil with a real price: "Hero Genuine 4T Plus 5W-30 Synthetic Engine Oil for bikes" (product code SPDMCYL14SS), ₹750 for 1000 ml → **₹750/litre**. Source: https://shop.heromotocorp.com/en/product/hero-genuine-4t-plus-5w-30-synthetic-engine-oil-for-bikes-or-api-sn-and-jaso-ma2-certified-or-advanced-fuel-saving-technologyor-specially-formulated-for-hero-motorcycles-1000-ml-spdmcyl14ss. This is genuine, verifiable, primary-source pricing: but it is a **motorcycle** oil, not the car oil the question asks about, so it is not used as the headline figure for this grade.

**Secondary-source fallback for the car grade (flagged, not primary):** IndiaMART lists "Castrol Edge 5W30 LL Full Synthetic Engine Oil," bottle of 1 litre, at ₹400/bottle → **≈₹400/litre**: source: https://www.indiamart.com/proddetail/castrol-edge-5w30-ll-full-synthetic-engine-oil-23721689773.html. This figure looks implausibly low for a genuine full-synthetic Castrol EDGE product (likely a grey-market, decanted, or mislabeled listing) and should not be trusted as representative.

---

## 9. 5W-40 (car/bike, full-synthetic)

**Confidence: No reliable primary source found**

- Shell Helix Ultra 5W-40 and Motul 8100 X-Cess/X-Clean 5W-40 (both car-oriented full-synthetic 5W-40 products) exist but neither Shell India nor Motul India displays a price on an official page reachable in this session.

**Secondary-source fallback (flagged, not primary):** Reseller listings for Shell Helix Ultra 5W-40 (4 L pack) range enormously: ₹3,000/can (IndiaMART, https://www.indiamart.com/proddetail/shell-helix-ultra-5w40-synthetic-oil-4-lit-pack-23244740562.html → ₹750/litre) versus ₹4,312 on Flipkart (→ ₹1,078/litre). The nearly 45% spread between these two reseller quotes for the same nominal product underscores why this is not being reported as a reliable price.

---

## 10. 0W-20 (car, full-synthetic)

**Confidence: No reliable primary source found with an explicit SAE grade**

- Castrol EDGE 0W-20 exists but no Castrol India page shows a price.
- **Honda Cars India does publish an official indicative price** for its genuine synthetic engine oil: "Petrol Engine Oil (Synthetic 2.0)" at **₹926/litre** (source: https://www.hondacarindia.com/honda-services/our-strength/honda-genuine-oil, captured live 2026-09-14, explicitly marked "indicative," "inclusive of taxes," and subject to change without notice): and many current Honda petrol models specify 0W-20, but **the page itself does not state the SAE grade**, so this cannot be confidently attributed to 0W-20 specifically rather than another synthetic grade Honda might also sell under that label. Reporting it here as a strong hint, not a confirmed grade-price match.

**Secondary-source fallback (flagged, not primary):** Flipkart lists "Castrol EDGE 0W-20 High Performance Engine Oil" at ₹1,767 (pack size not confirmed in the search result, likely a multi-litre pack): https://www.flipkart.com/castrol-edge-0w-20-high-performance-engine-oil/p/itm23070d7e34b71: too pack-size-ambiguous to convert to a reliable per-litre figure.

---

## 11. 0W-16 (car, full-synthetic, Maruti-specific)

**Confidence: No reliable primary source found**

- This grade is specific to Maruti Suzuki's ECSTAR F9000 0W-16, used on newer K-series petrol engines. Maruti Suzuki's official site (marutisuzuki.com/genuine-parts and /genuine-accessories) sells other ECSTAR car-care products online with visible prices, but the ECSTAR **engine oil** listings (0W-16 specifically) could not be located as a live, priced page in this session: the relevant catalogue URL pattern either 404'd or was not indexed by search.

**Secondary-source fallback (flagged, not primary):** IndiaMART lists "Ecstar 0W16 F9000 Full Synthetic Engine Oil" at ₹450/litre: https://www.indiamart.com/proddetail/ecstar-0w16-f9000-full-synthetic-engine-oil-2855711848273.html. A separate IndiaMART listing for the same product in a different city quotes ₹1,300 "per can" with no stated pack size, illustrating the inconsistency typical of these listings: https://www.indiamart.com/proddetail/maruti-suzuki-0w16-f9000-ecstar-automobile-engine-oil-2854434801030.html.

---

## 12. 0W-30 (car, full-synthetic)

**Confidence: No reliable primary source found**

- Castrol EDGE 0W-30 / EDGE SUV 0W-30 exists in Castrol's range (confirmed via Castrol.com product listing pages) but no price is shown on Castrol's own site.
- Hyundai India's official engine-oil specification page confirms Hyundai approves 0W-30 (ACEA C2, and API SP as a synthetic option) for several current models, but: like the Honda page: **lists specifications and service intervals only, with no INR pricing anywhere on the page**. Source: https://www.hyundai.com/in/en/connect-to-service/maintenance/oils-consumables/engine-oil (captured live 2026-09-14).

**Secondary-source fallback (flagged, not primary):** A price-tracking aggregator (not a retailer itself, but citing an Amazon India listing) shows Castrol EDGE around ₹908 for a 1 L bottle, and IndiaMART separately quotes a 5-litre can of "Castrol EDGE 5W-30 LL / EDGE 0W-30" at ₹150/litre (source: https://www.indiamart.com/proddetail/castrol-edge-5w-30-ll-engine-oil-castrol-edge-0w-30-engine-oil-2852417477533.html): a roughly 6x spread between these two figures for nominally the same product line, which is why neither is being reported as a reliable price.

---

## Summary table

| # | Grade | Category | Best price found | Per-litre | Source type |
|---|-------|----------|-------------------|-----------|-------------|
| 1 | 10W-30 | Motorcycle 4T | Hero 4T Plus, ₹480/800ml | **₹600/L** | Primary (Hero official store) |
| 2 | 20W-40 | Motorcycle 4T | Suzuki Gen Oil, ₹437/1L | **₹437/L** | Primary (Suzuki official) |
| 3 | 15W-40 | Car/diesel | N/A | ₹160–270/L (secondary, unreliable) | No primary found |
| 4 | 10W-40 | Motorcycle | Suzuki Ecstar full-syn, ₹887/1L | **₹887/L** | Primary (Suzuki official) |
| 5 | 15W-50 | Motorcycle, full-syn | N/A | ~₹217/L (secondary, unreliable) | No primary found |
| 6 | 20W-50 | Motorcycle | N/A | ~₹560–600/L (secondary) | No primary found |
| 7 | 10W-50 | Motorcycle, full-syn | N/A | ~₹680–890/L (secondary, inconsistent) | No primary found |
| 8 | 5W-30 | Car, full-syn | (Hero motorcycle 5W-30 ₹750/L exists but wrong vehicle class) | ~₹400/L (secondary, likely unreliable) | No primary found for car |
| 9 | 5W-40 | Car/bike, full-syn | N/A | ₹750–1,078/L (secondary, wide spread) | No primary found |
| 10 | 0W-20 | Car, full-syn | Honda "Synthetic 2.0" ₹926/L (grade not stated on page) | **₹926/L (grade unconfirmed)** | Primary price, unconfirmed grade |
| 11 | 0W-16 | Car, full-syn (Maruti) | N/A | ~₹450/L (secondary, inconsistent) | No primary found |
| 12 | 0W-30 | Car, full-syn | N/A | ₹150–908/L (secondary, huge spread) | No primary found |

## Bottom line

Genuine, verifiable, official-brand pricing was only obtainable for **motorcycle oils sold through OEM manufacturers' own e-commerce stores** (Hero MotoCorp and Suzuki Motorcycle India): grades 1, 2, and 4, plus a motorcycle-only 5W-30 data point under grade 8. For every car/diesel grade (3, 5, 6, 7, 9, 10, 11, 12), no lubricant or car brand in India was found to publish consumer-facing per-litre pricing on its own official website in this session; where a figure is given for those grades it is explicitly a flagged, often inconsistent, secondary/reseller number and should not be treated as authoritative. If accurate car-oil pricing is required, the most reliable next step would be to call/visit an authorized dealer service desk (Maruti Suzuki, Honda, Hyundai) directly, since even their own websites do not publish grade-specific consumer pricing.
