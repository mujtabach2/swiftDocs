function scrollToPricing(e) {
  e.preventDefault();
  const pricingSection = document.getElementById("pricing");
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: "smooth" });
  }
}

export { scrollToPricing };
