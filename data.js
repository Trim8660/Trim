// ============================================================
// Product + category database.
// In production this is generated from the YesStyle product feed
// (affiliate program datafeed / API), one row per SKU.
// skinTypes: oily | dry | combo | sensitive | acne
// concerns:  acne | aging | brightening | hydration | redness
// ============================================================

const CATEGORIES = {
  "pimple-patches": {
    name: "Pimple Patches",
    h1: "Best Korean Pimple Patches in 2026",
    answerBlock: "The COSRX Acne Pimple Master Patch is the best overall pimple patch for most people: hydrocolloid, drug-free, and nearly invisible under makeup. For cystic or early-stage breakouts, the Olive Young Care Plus Spot Patch kills bacteria faster. For sensitive skin, the Some By Mi 30 Days Miracle Patch is the gentlest option. All three are under $10 on YesStyle.",
    criteria: ["Hydrocolloid quality & thickness", "Adhesion overnight", "Visibility under makeup", "Value per patch", "Added actives (tea tree / salicylic acid)"],
    faqs: [
      { q: "Do pimple patches work on cystic acne?", a: "Hydrocolloid patches work best on whiteheads and popped pimples by absorbing fluid and creating a healing barrier. For deep cystic acne, patches with microneedles (like Olive Young's Care Plus) that deliver actives into the bump perform noticeably better than flat patches." },
      { q: "Can I wear a pimple patch under makeup?", a: "Yes. Thin, translucent patches like COSRX's master patch sit flat enough to apply concealer over. Apply skincare first, let it fully absorb, then place the patch and tap makeup around — not on — the edges." },
      { q: "How long should I leave a pimple patch on?", a: "Most hydrocolloid patches are designed for 6–12 hours or overnight. Replace it once the patch turns white and cloudy — that means it has absorbed the breakout fluid and is full." },
      { q: "Are Korean pimple patches better than Western brands?", a: "Korean patches dominate because of manufacturing scale and formulation variety: thinner hydrocolloids, more size options per pack, and added actives like tea tree and centella. Brands like COSRX and Olive Young sell more patches per pack at a lower price point." },
    ],
  },
  "korean-sunscreen": {
    name: "Korean Sunscreens",
    h1: "Best Korean Sunscreens in 2026",
    answerBlock: "Beauty of Joseon Relief Sun: Rice + Probiotics is the best Korean sunscreen for most skin types — SPF50+ PA++++, zero white cast, and a dewy finish at around $13. Oily skin should pick Skin1004 Hyalu-Cica for its weightless gel texture, and sensitive skin should choose Round Lab Birch Juice, which is fragrance-free and alcohol-free. All are chemical-UV filters, so no cast on any skin tone.",
    criteria: ["SPF/PA rating accuracy", "White cast on deep skin tones", "Finish (dewy vs matte)", "Eye-sting test", "Price per ml"],
    faqs: [
      { q: "Why are Korean sunscreens better than American ones?", a: "South Korea regulates sunscreens as cosmetics, not drugs, so brands can use modern UV filters like Tinosorb S and Uvinul A Plus. These filter sets are photostable, lightweight, and leave no white cast — something most US drugstore sunscreens still can't match." },
      { q: "Do Korean sunscreens leave a white cast on dark skin?", a: "Almost never. Korean sunscreens use chemical (organic) UV filters instead of zinc oxide, so they apply clear on all skin tones. This is one of the main reasons they're globally popular with deeper skin tones." },
      { q: "Can I use Korean sunscreen if I have sensitive skin?", a: "Yes, but check the filter list. Fragrance-free, alcohol-free options like Round Lab Birch Juice or Purito Unscented are formulated for reactive skin. Avoid heavily fragranced picks if you're prone to redness." },
      { q: "How much sunscreen should I actually apply?", a: "The recommended amount is 2mg per cm² of skin — about half a teaspoon for face and neck. Most people apply a quarter of that. Korean sunscreens' lightweight textures make it easier to apply the full amount without a greasy feel." },
    ],
  },
  "sheet-masks": {
    name: "Sheet Masks",
    h1: "Best Korean Sheet Masks in 2026",
    answerBlock: "Mediheal N.M.F Aquaring is the best all-rounder sheet mask — deep hydration with hyaluronic acid at roughly $1.50 per mask. For brightening before an event, the Anua Peach 70% Mask delivers noticeable glow, and for irritated or post-breakout skin, Torriden Dive-In soothes with low-molecular hyaluronic acid and zero fragrance.",
    criteria: ["Essence volume & texture", "Mask material fit", "Immediate vs lasting effect", "Fragrance level", "Cost per mask"],
    faqs: [
      { q: "How often should you use a sheet mask?", a: "Two to three times per week is enough for most skin types. Daily masking is fine with hydrating formulas if your skin tolerates it, but active-heavy masks (peeling or vitamin C) should stay at 1–2 times weekly." },
      { q: "Do sheet masks actually work?", a: "Yes, for short-term effects. The occlusive sheet drives hydration and actives into the top skin layers for 24–48 hours of plumpness. They won't replace serums for long-term concerns, which is why we rank them by immediate, per-use results." },
      { q: "Should I wash my face after a sheet mask?", a: "No — pat the leftover essence in and seal it with moisturizer. Rinsing removes the actives you just paid for." },
    ],
  },
  "snail-serum": {
    name: "Snail Mucin Serums",
    h1: "Best Snail Mucin Serums in 2026",
    answerBlock: "COSRX Advanced Snail 96 Mucin Power Essence remains the reference snail product: 96% filtered snail secretion with a slippery, fast-absorbing texture under $15. For barrier repair with added ceramides, Beauty of Joseon's Snail Mucin + Ginseng pairs better with retinol routines. Both layer under any moisturizer without pilling.",
    criteria: ["Mucin concentration & filter quality", "Texture and pilling", "Barrier repair speed", "Layering compatibility", "Price per ml"],
    faqs: [
      { q: "What does snail mucin actually do for skin?", a: "Snail secretion filtrate is rich in glycoproteins, hyaluronic acid, and glycolic acid. Studies show it accelerates barrier repair, reduces transepidermal water loss, and fades post-acne marks over 4–8 weeks of consistent use." },
      { q: "Is snail mucin cruelty free?", a: "No snail is harmed in commercial collection — mucin is gathered from snails moving over mesh surfaces in captivity, similar to how silk is harvested. That said, it is an animal-derived ingredient, so it isn't vegan." },
      { q: "Can I use snail mucin with retinol or vitamin C?", a: "Yes. Snail mucin is one of the most compatible ingredients in skincare. Apply water-based mucin first, let it absorb for a minute, then apply retinol or vitamin C on top. It even buffers irritation from stronger actives." },
    ],
  },
  "lip-tint": {
    name: "Lip Tints",
    h1: "Best Korean Lip Tints in 2026",
    answerBlock: "Rom&nd Juicy Lasting Tint is the best Korean lip tint for most people: a water-gel stain that survives meals and fades evenly at under $10. For a blurred, soft-focus look, Peripera Ink Airy Velvet's mousse texture is the category icon, and deep skin tones should look at 3CE Velvet Lip Tint's brick-red range, which was formulated with more saturated bases.",
    criteria: ["Longevity through food & drink", "Fade evenness (no ring)", "Comfort & dryness", "Shade range across skin tones", "Transfer"],
    faqs: [
      { q: "How do you make a lip tint last all day?", a: "Apply to bare, dry lips, let the first layer set for 60 seconds, then add a second thin layer. Avoid lip balm underneath — tint needs to grip the lip surface. Blot once between layers for a bulletproof stain." },
      { q: "What's the difference between water, velvet, and glow tints?", a: "Water tints stain the hardest and last longest but show every dry patch. Velvet (mousse) tints blur lip lines and feel weightless with a soft-matte finish. Glow tints (Rom&nd Juicy style) layer shine over a stain — the best of both, but they transfer more." },
    ],
  },
  "cushion-foundation": {
    name: "Cushion Foundations",
    h1: "Best Korean Cushion Foundations in 2026",
    answerBlock: "For most skin types, Clio Kill Cover Mesh Glow is the best Korean cushion: medium-buildable coverage with a real-skin finish and the widest shade range at 7 shades. Oily skin should pick Espoir Pro Tailor Be Velvet, and for deep skin tones, Rom&nd's Bare Cushion line now runs genuinely deep warm shades that don't oxidize gray.",
    criteria: ["Shade range & undertone accuracy (incl. deep tones)", "Coverage per layer", "Oxidation after 4h", "SPF accuracy", "Refill availability"],
    faqs: [
      { q: "Do Korean cushions work for dark skin tones?", a: "Historically no — most lines stopped at NC25. That's changing: Clio Kill Cover, Rom&nd Bare Cushion, and Hera Black Foundation cushion now carry shades that work up to deep tan. Always check recent shade extensions, since K-beauty ranges update yearly." },
      { q: "Cushion vs liquid foundation — which is better?", a: "Cushions trade maximum coverage for speed and portability: 30 seconds for even, natural coverage with SPF. For full glam or precise shade matching, liquid foundation still wins. Cushions are ideal for daily wear and touch-ups." },
      { q: "How long does a cushion compact last?", a: "About 2–3 months of daily use (roughly 15g of product). Refills cost 40–60% of the compact price — buy the compact once and refills after." },
    ],
  },
};

const PRODUCTS = [
  // ---- Pimple patches ----
  { id: "cosrx-patch", cat: "pimple-patches", brand: "COSRX", name: "Acne Pimple Master Patch", slug: "cosrx-acne-pimple-master-patch", pid: "1055764931", price: 5.9, size: "24 patches", rating: 4.7, skinTypes: ["oily","combo","acne"], concerns: ["acne"], tags: ["Hydrocolloid","Drug-free","Ultra-thin"], pros: ["Nearly invisible under makeup","Best adhesion overnight","Cheapest per patch in class"], cons: ["Flat patches only — weak on cystic acne"], rankNote: "Best overall" },
  { id: "oy-careplus", cat: "pimple-patches", brand: "Olive Young", name: "Care Plus Spot Patch", slug: "olive-young-care-plus-spot-patch", pid: "1097238845", price: 8.9, size: "84 patches", rating: 4.6, skinTypes: ["oily","combo","acne"], concerns: ["acne"], tags: ["Tea tree","Salicylic acid","3 sizes"], pros: ["Added actives kill bacteria faster","84 patches = best value pack","Three patch sizes per pack"], cons: ["Slightly more visible than COSRX"], rankNote: "Best for active breakouts" },
  { id: "sbm-miracle", cat: "pimple-patches", brand: "Some By Mi", name: "30 Days Miracle Clear Spot Patch", slug: "some-by-mi-30-days-miracle-clear-spot-patch", pid: "1088123456", price: 6.5, size: "18 patches", rating: 4.4, skinTypes: ["sensitive","acne"], concerns: ["acne","redness"], tags: ["AHA-BHA-PHA","Centella","Gentle"], pros: ["Gentlest formula for reactive skin","Centella calms post-patch redness"], cons: ["Fewer patches per pack","Thinner — fills up faster"], rankNote: "Best for sensitive skin" },
  { id: "pyunkang-patch", cat: "pimple-patches", brand: "Pyunkang Yul", name: "Calming Clear Spot Patch", slug: "pyunkang-yul-calming-clear-spot-patch", pid: "1101239877", price: 7.2, size: "15 patches", rating: 4.3, skinTypes: ["dry","sensitive"], concerns: ["acne","redness"], tags: ["No fragrance","Minimal ingredients"], pros: ["Cleanest ingredient list","Won't dry out dry skin"], cons: ["Smallest pack size","Weakest adhesion of the five"], rankNote: "Best minimal formula" },
  { id: "anua-patch", cat: "pimple-patches", brand: "Anua", name: "Heartleaf Spot Patch", slug: "anua-heartleaf-spot-patch", pid: "1108876543", price: 7.9, size: "20 patches", rating: 4.5, skinTypes: ["combo","sensitive","acne"], concerns: ["acne","redness"], tags: ["Heartleaf extract","Vegan hydrocolloid"], pros: ["Heartleaf soothes inflamed spots","Vegan-certified hydrocolloid"], cons: ["Mid-pack value"], rankNote: "Best soothing option" },

  // ---- Sunscreen ----
  { id: "boj-sun", cat: "korean-sunscreen", brand: "Beauty of Joseon", name: "Relief Sun: Rice + Probiotics", slug: "beauty-of-joseon-relief-sun-rice-probiotics", pid: "1091188844", price: 13.0, size: "50ml", rating: 4.8, skinTypes: ["dry","combo","sensitive"], concerns: ["aging","brightening"], tags: ["SPF50+ PA++++","Zero cast","Dewy finish"], pros: ["No white cast on any tone","Rice extract brightens over time","Elegant moisturizer-like texture"], cons: ["Dewy finish too shiny for very oily skin"], rankNote: "Best overall" },
  { id: "skin1004-sun", cat: "korean-sunscreen", brand: "Skin1004", name: "Hyalu-Cica Tone Brightening Sunscreen", slug: "skin1004-hyalu-cica-tone-brightening-sunscreen", pid: "1098123450", price: 15.5, size: "50ml", rating: 4.6, skinTypes: ["oily","combo"], concerns: ["brightening","redness"], tags: ["SPF50+ PA++++","Centella","Weightless gel"], pros: ["Lightest texture in class","Centella calms oily, irritated skin","Matte-ish finish holds in humidity"], cons: ["Contains alcohol (drying for some)"], rankNote: "Best for oily skin" },
  { id: "roundlab-sun", cat: "korean-sunscreen", brand: "Round Lab", name: "Birch Juice Moisturizing Sunscreen", slug: "round-lab-birch-juice-moisturizing-sunscreen", pid: "1096654321", price: 16.0, size: "50ml", rating: 4.7, skinTypes: ["dry","sensitive"], concerns: ["hydration","aging"], tags: ["SPF50+ PA++++","Fragrance-free","Alcohol-free"], pros: ["Zero irritation on reactive skin","Doubles as moisturizer","No eye sting"], cons: ["Slightly tacky first 5 minutes"], rankNote: "Best for sensitive skin" },
  { id: "isntree-sun", cat: "korean-sunscreen", brand: "Isntree", name: "Hyaluronic Acid Watery Sun Gel", slug: "isntree-hyaluronic-acid-watery-sun-gel", pid: "1089988776", price: 14.5, size: "50ml", rating: 4.5, skinTypes: ["dry","combo"], concerns: ["hydration"], tags: ["SPF50+ PA++++","8 types HA","No white cast"], pros: ["Splash of hydration, ideal under makeup","Layers without pilling"], cons: ["Finish is very dewy"], rankNote: "Best under makeup" },
  { id: "anua-sun", cat: "korean-sunscreen", brand: "Anua", name: "Heartleaf Silky Moisture Sunscreen", slug: "anua-heartleaf-silky-moisture-sunscreen", pid: "1103344556", price: 15.0, size: "50ml", rating: 4.4, skinTypes: ["sensitive","combo"], concerns: ["redness","hydration"], tags: ["SPF50+ PA++++","Heartleaf","Sebum control"], pros: ["Controls midday shine","Calms redness-prone skin"], cons: ["Newer — less long-term review data"], rankNote: "Best for redness" },

  // ---- Sheet masks ----
  { id: "mediheal-nmf", cat: "sheet-masks", brand: "Mediheal", name: "N.M.F Aquaring Ampoule Mask", slug: "mediheal-n-m-f-aquaring-ampoule-mask", pid: "1054321877", price: 14.5, size: "10 masks", rating: 4.6, skinTypes: ["dry","combo","oily"], concerns: ["hydration"], tags: ["Hyaluronic acid","NMF complex","Best seller"], pros: ["Deepest hydration per dollar","Fits most face shapes","10-pack brings cost to ~$1.45/mask"], cons: ["Light fragrance"], rankNote: "Best overall" },
  { id: "torriden-mask", cat: "sheet-masks", brand: "Torriden", name: "Dive-In Low Molecular Hyaluronic Acid Mask", slug: "torriden-dive-in-low-molecular-hyaluronic-acid-mask", pid: "1101876543", price: 13.0, size: "10 masks", rating: 4.7, skinTypes: ["sensitive","dry"], concerns: ["hydration","redness"], tags: ["Fragrance-free","Low-MW HA","Vegan"], pros: ["Zero fragrance — sensitive-safe","Plumping effect lasts into next day"], cons: ["Essence is thinner (less 'luxurious')"], rankNote: "Best for sensitive skin" },
  { id: "anua-peach", cat: "sheet-masks", brand: "Anua", name: "Peach 70% Niacin Serum Mask", slug: "anua-peach-70-niacin-serum-mask", pid: "1104455667", price: 16.5, size: "5 masks", rating: 4.5, skinTypes: ["combo","oily","dry"], concerns: ["brightening"], tags: ["Niacinamide","Peach extract","Glow"], pros: ["Visible brightening after one use","Great pre-event mask"], cons: ["Premium price per mask"], rankNote: "Best for brightening" },
  { id: "abib-mask", cat: "sheet-masks", brand: "Abib", name: "Gummy Sheet Mask Hyaluron Sticker", slug: "abib-gummy-sheet-mask-hyaluron-sticker", pid: "1092233445", price: 17.0, size: "10 masks", rating: 4.5, skinTypes: ["dry","sensitive"], concerns: ["hydration","aging"], pros: ["Microfiber 'gummy' material hugs face","No slipping while walking around"], cons: ["Thicker material feels heavier in summer"], rankNote: "Best fit/comfort" },
  { id: "somebymi-mask", cat: "sheet-masks", brand: "Some By Mi", name: "Retinol Intense Daily Mask", slug: "some-by-mi-retinol-intense-daily-mask", pid: "1107766554", price: 15.0, size: "30 masks", rating: 4.3, skinTypes: ["combo","oily"], concerns: ["aging","acne"], tags: ["Retinol","30-day pack","Daily use"], pros: ["30-pack = cheapest daily retinol option","Gentle enough for near-daily use"], cons: ["Not for retinol beginners using actives already"], rankNote: "Best budget multi-pack" },

  // ---- Snail serum ----
  { id: "cosrx-snail", cat: "snail-serum", brand: "COSRX", name: "Advanced Snail 96 Mucin Power Essence", slug: "cosrx-advanced-snail-96-mucin-power-essence", pid: "1061234098", price: 14.0, size: "100ml", rating: 4.8, skinTypes: ["oily","combo","dry","sensitive"], concerns: ["acne","hydration","redness"], tags: ["96% snail filtrate","Fragrance-free","Icon"], pros: ["The reference snail product globally","Repairs post-acne marks in ~6 weeks","100ml lasts 4+ months"], cons: ["Texture takes one use to get used to"], rankNote: "Best overall" },
  { id: "boj-snail", cat: "snail-serum", brand: "Beauty of Joseon", name: "Revive Serum: Ginseng + Snail Mucin", slug: "beauty-of-joseon-revive-serum-ginseng-snail-mucin", pid: "1098765432", price: 15.0, size: "30ml", rating: 4.6, skinTypes: ["dry","combo","sensitive"], concerns: ["aging","redness"], tags: ["3% ginseng","Ceramides","Anti-aging"], pros: ["Pairs snail with ginseng for firming","Better for mature skin than COSRX"], cons: ["Half the size of COSRX for the price"], rankNote: "Best for aging concerns" },
  { id: "mizon-snail", cat: "snail-serum", brand: "Mizon", name: "Snail Repair Intensive Ampoule", slug: "mizon-snail-repair-intensive-ampoule", pid: "1045566778", price: 16.0, size: "30ml", rating: 4.4, skinTypes: ["dry","sensitive"], concerns: ["aging","hydration"], tags: ["High concentration","OG snail brand"], pros: ["One of the original snail lines since 2012","Richer texture for dry skin"], cons: ["Contains fragrance"], rankNote: "Best for dry skin" },
  { id: "jumiso-snail", cat: "snail-serum", brand: "Jumiso", name: "Snail Mucin 95 + Peptide Essence", slug: "jumiso-snail-mucin-95-peptide-essence", pid: "1109988776", price: 13.5, size: "50ml", rating: 4.3, skinTypes: ["combo","oily"], concerns: ["aging","acne"], tags: ["Peptides","Lightweight","Budget"], pros: ["Adds peptides for collagen support","Lightest texture in the category"], cons: ["Newer brand, less review history"], rankNote: "Best lightweight option" },
  { id: "purito-snail", cat: "snail-serum", brand: "Purito", name: "Seoul Snail Repair Essence", slug: "purito-seoul-snail-repair-essence", pid: "1093344556", price: 14.5, size: "60ml", rating: 4.4, skinTypes: ["sensitive","dry"], concerns: ["hydration","redness"], tags: ["Vegan alternative","Fragrance-free"], pros: ["Vegan snail-alternative proteins","Clean, short ingredient list"], cons: ["Purito reformulated in 2023 — verify batch"], rankNote: "Best vegan option" },

  // ---- Lip tint ----
  { id: "romand-juicy", cat: "lip-tint", brand: "Rom&nd", name: "Juicy Lasting Tint", slug: "rom-nd-juicy-lasting-tint", pid: "1087654321", price: 9.5, size: "5.5g", rating: 4.7, skinTypes: ["dry","combo","oily"], concerns: [], tags: ["Gloss + stain","13 shades","Best seller"], pros: ["Survives meals, fades evenly","Shade range includes deep-skin-friendly berries"], cons: ["Glossy layer transfers on cups"], rankNote: "Best overall" },
  { id: "peripera-airy", cat: "lip-tint", brand: "Peripera", name: "Ink Airy Velvet Tint", slug: "peripera-ink-airy-velvet-tint", pid: "1067891234", price: 8.0, size: "4g", rating: 4.6, skinTypes: ["oily","combo"], concerns: [], tags: ["Mousse blur","21 shades","Lightweight"], pros: ["Blurs lip lines instantly","Most shade options of any Korean tint"], cons: ["Velvet finish can cling to dry patches"], rankNote: "Best velvet finish" },
  { id: "3ce-velvet", cat: "lip-tint", brand: "3CE", name: "Velvet Lip Tint", slug: "3ce-velvet-lip-tint", pid: "1078901234", price: 13.0, size: "4g", rating: 4.5, skinTypes: ["dry","combo"], concerns: [], tags: ["Brick red range","Saturated bases","STYLENANDA"], pros: ["Brick-red range made for deeper skin tones","High pigment per swipe"], cons: ["Pricier than drugstore alternatives"], rankNote: "Best for deep skin tones" },
  { id: "dasique-water", cat: "lip-tint", brand: "Dasique", name: "Water Blur Tint", slug: "dasique-water-blur-tint", pid: "1105566778", price: 11.0, size: "3.2g", rating: 4.4, skinTypes: ["combo","sensitive"], concerns: [], tags: ["MLBB shades","Soft blur","Trending"], pros: ["'My lips but better' shade science","Diffuses without a mirror"], cons: ["Shorter wear than Rom&nd"], rankNote: "Best no-mirror tint" },
  { id: "etude-glow", cat: "lip-tint", brand: "Etude", name: "Dear Darling Water Gel Tint", slug: "etude-dear-darling-water-gel-tint", pid: "1056789123", price: 5.5, size: "4.5g", rating: 4.3, skinTypes: ["oily","acne"], concerns: [], tags: ["Under $6","High stain","K-beauty classic"], pros: ["Cheapest way into Korean tints","Stain survives the gym"], cons: ["Can look patchy if lips are dry"], rankNote: "Best budget" },

  // ---- Cushion ----
  { id: "clio-mesh", cat: "cushion-foundation", brand: "Clio", name: "Kill Cover Mesh Glow Cushion", slug: "clio-kill-cover-mesh-glow-cushion", pid: "1091234098", price: 24.0, size: "15g + refill", rating: 4.6, skinTypes: ["combo","dry","oily"], concerns: ["brightening"], tags: ["7 shades","Real-skin finish","SPF50+ PA+++"], pros: ["Widest shade range in K-cushions","Includes refill — ~$12/month"], cons: ["Glow finish needs powder on oily T-zone"], rankNote: "Best overall" },
  { id: "espoir-velvet", cat: "cushion-foundation", brand: "Espoir", name: "Pro Tailor Be Velvet Cushion", slug: "espoir-pro-tailor-be-velvet-cushion", pid: "1098899001", price: 26.0, size: "13g + refill", rating: 4.5, skinTypes: ["oily","combo","acne"], concerns: ["acne"], tags: ["Matte","Longwear","SPF34 PA++"], pros: ["Holds 8+ hours on oily skin without touch-ups","Doesn't settle into pores"], cons: ["Only 5 shades"], rankNote: "Best for oily skin" },
  { id: "romand-bare", cat: "cushion-foundation", brand: "Rom&nd", name: "Bare Cushion Foundation", slug: "rom-nd-bare-cushion-foundation", pid: "1106677889", price: 22.0, size: "15g", rating: 4.4, skinTypes: ["combo","dry","sensitive"], concerns: ["redness"], tags: ["Deep warm shades","No oxidation","Light-medium"], pros: ["New deep warm shades don't turn gray","Zero oxidation after 4 hours"], cons: ["Sheer coverage only (builds to medium)"], rankNote: "Best for deep skin tones" },
  { id: "hera-black", cat: "cushion-foundation", brand: "Hera", name: "Black Foundation Cushion", slug: "hera-black-foundation-cushion", pid: "1094567123", price: 38.0, size: "15g + refill", rating: 4.7, skinTypes: ["combo","oily"], concerns: ["aging"], tags: ["Luxury","24 shades","Semi-matte"], pros: ["Amorepacific's flagship tech","24 shades incl. deep tones","Most skin-like matte finish"], cons: ["2x the price of Clio"], rankNote: "Best luxury" },
  { id: "naming-cushion", cat: "cushion-foundation", brand: "NAMING.", name: "Layered Fit Cushion", slug: "naming-layered-fit-cushion", pid: "1102233445", price: 18.0, size: "12g", rating: 4.3, skinTypes: ["dry","sensitive"], concerns: ["hydration"], tags: ["Dewy","Budget","Sensitive-safe"], pros: ["Dewiest finish under $20","Clean formula for reactive skin"], cons: ["No refill option yet"], rankNote: "Best budget dewy" },
];
