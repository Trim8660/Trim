// ============================================================
// YesStyle affiliate link builder — SINGLE SOURCE OF TRUTH
// Replace the placeholder values below with your real IDs from
// the YesStyle affiliate program (AWIN / Partnerize / Impact).
// Every outbound link on the site is generated through here.
// ============================================================

const AFF_CONFIG = {
  network: "awin",           // "awin" | "partnerize" | "direct"
  awinAdvertiserId: "XXXXX", // YesStyle advertiser ID in AWIN
  affiliateId: "YOURAFFID",  // your publisher ID
  campaign: "kbeauty-rankings", // utm_campaign for your own tracking
};

// YesStyle product page URL pattern:
//   https://www.yesstyle.com/en/{slug}/info.html/p/{productId}
// AWIN click-through wraps it:
//   https://www.awin1.com/cread.php?awinmid={advertiser}&awinaffid={aff}&ued={encoded url}
function yesstyleLink(product) {
  const dest = `https://www.yesstyle.com/en/${product.slug}/info.html/p/${product.pid}`;
  if (AFF_CONFIG.network === "awin") {
    const ued = encodeURIComponent(dest + `?utm_source=kbeauty-site&utm_medium=affiliate&utm_campaign=${AFF_CONFIG.campaign}`);
    return `https://www.awin1.com/cread.php?awinmid=${AFF_CONFIG.awinAdvertiserId}&awinaffid=${AFF_CONFIG.affiliateId}&ued=${ued}`;
  }
  if (AFF_CONFIG.network === "partnerize") {
    const ued = encodeURIComponent(dest);
    return `https://prf.hn/click/${AFF_CONFIG.affiliateId}/${AFF_CONFIG.awinAdvertiserId}?destination=${ued}`;
  }
  return dest + `?aff_id=${AFF_CONFIG.affiliateId}`;
}
