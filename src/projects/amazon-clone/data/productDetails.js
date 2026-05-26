// Shop names pool — deterministically picked by product id
const shops = [
  'NovaMart', 'UrbanNest', 'PeakSupply', 'ClearPath Co.',
  'BlueSky Goods', 'TrueValue Shop', 'EverHome', 'SwiftDeal',
];

// Delivery options
const deliveryOptions = [
  { label: 'Standard Shipping', days: '5–7 business days', price: 'Free' },
  { label: 'Express Shipping', days: '2–3 business days', price: '$4.99' },
  { label: 'Next-Day Delivery', days: '1 business day', price: '$9.99' },
];

// Spec templates keyed by keyword found in product name
const specTemplates = [
  {
    match: ['sock'],
    specs: { Material: '80% Cotton, 15% Polyester, 5% Elastane', 'Pack Size': '6 Pairs', 'Sizes Available': 'S / M / L / XL', 'Care Instructions': 'Machine wash cold', 'Country of Origin': 'Bangladesh' },
  },
  {
    match: ['basketball'],
    specs: { Size: 'Intermediate (Size 6)', Material: 'Composite leather', Circumference: '28.5 inches', 'Inflation': 'Pre-inflated', 'Recommended For': 'Indoor & Outdoor' },
  },
  {
    match: ['t-shirt', 'tshirt', 'shirt', 'polo'],
    specs: { Material: '100% Cotton', Fit: 'Regular', 'Pack Size': '2 Pack', 'Care Instructions': 'Machine wash warm', Sizes: 'XS – 3XL' },
  },
  {
    match: ['toaster'],
    specs: { Slots: '2', Wattage: '850W', 'Browning Settings': '6 levels', 'Cord Length': '1.5 m', Dimensions: '28 × 16 × 18 cm' },
  },
  {
    match: ['plate', 'dinner', 'bowl', 'artistic'],
    specs: { Material: 'Porcelain', 'Piece Count': '2', 'Dishwasher Safe': 'Yes', 'Microwave Safe': 'Yes', Diameter: '27 cm' },
  },
  {
    match: ['cooking', 'pot', 'cook set', 'non-stick'],
    specs: { Material: 'Aluminium with non-stick coating', Pieces: '3 or 4', 'Oven Safe': 'Up to 180 °C', 'Induction Compatible': 'Yes', 'Dishwasher Safe': 'No — hand wash recommended' },
  },
  {
    match: ['sweater', 'hoodie', 'fleece'],
    specs: { Material: '60% Cotton, 40% Polyester', Fit: 'Oversized / Relaxed', 'Care Instructions': 'Machine wash cold, tumble dry low', Sizes: 'XS – 3XL', 'Country of Origin': 'Turkey' },
  },
  {
    match: ['towel', 'bath towel', 'luxury towel'],
    specs: { Material: '100% Egyptian Cotton', GSM: '600', 'Piece Count': '2', Dimensions: '70 × 140 cm', 'Care Instructions': 'Machine wash at 40 °C' },
  },
  {
    match: ['tissue', 'paper towel'],
    specs: { Ply: '2-Ply', 'Pack Count': '8 Boxes', 'Sheets per Box': '120', Material: 'Virgin wood pulp', 'Fragrance': 'Unscented' },
  },
  {
    match: ['dress', 'beach dress'],
    specs: { Material: '95% Rayon, 5% Spandex', Fit: 'Relaxed', Length: 'Midi', 'Care Instructions': 'Hand wash cold', Sizes: 'XS – XL' },
  },
  {
    match: ['sandal', 'heel', 'ballet flat', 'sneaker', 'shoe', 'flat sneaker', 'skateboard shoe'],
    specs: { Material: 'Synthetic upper, rubber sole', 'Heel Height': '2–8 cm', Closure: 'Slip-on / Lace-up', 'Sizes Available': 'EU 35–42', 'Care': 'Wipe clean with damp cloth' },
  },
  {
    match: ['sunglasses'],
    specs: { 'Frame Material': 'Metal alloy', 'Lens Material': 'Polycarbonate', 'UV Protection': 'UV400', 'Lens Width': '52 mm', 'Bridge Width': '20 mm' },
  },
  {
    match: ['curtain'],
    specs: { Material: '100% Polyester', 'Blackout Level': '99%', Dimensions: '42 × 84 inches', 'Care Instructions': 'Machine wash cold', 'Grommets': '8 per panel' },
  },
  {
    match: ['jean', 'shorts', 'pants', 'chino', 'lounge'],
    specs: { Material: '98% Cotton, 2% Elastane', Fit: 'Relaxed / Slim', Rise: 'Mid-rise', 'Care Instructions': 'Machine wash cold', Sizes: 'XS – 3XL' },
  },
  {
    match: ['kettle'],
    specs: { Capacity: '1.7 L', Wattage: '1500W', Material: 'Stainless steel', 'Auto Shut-off': 'Yes', 'Boil Time': '~4 minutes' },
  },
  {
    match: ['hat', 'beanie', 'sun hat'],
    specs: { Material: '100% Straw / Acrylic knit', 'Brim Width': '10 cm', 'One Size Fits Most': 'Yes', 'UV Protection': 'UPF 50+', 'Care': 'Spot clean only' },
  },
  {
    match: ['wool sweater'],
    specs: { Material: '70% Merino Wool, 30% Nylon', Fit: 'Slim', 'Care Instructions': 'Dry clean only', Sizes: 'S – XXL', 'Country of Origin': 'Italy' },
  },
  {
    match: ['bath mat', 'bathroom mat'],
    specs: { Material: '100% Microfiber', Dimensions: '16 × 32 inches', 'Non-Slip Backing': 'Yes', 'Care Instructions': 'Machine wash warm', Colors: 'Grey / Beige / White' },
  },
  {
    match: ['detergent'],
    specs: { Form: 'Dissolvable tabs', Loads: '50', Fragrance: 'Fresh linen', 'Compatible Machines': 'HE & Standard', 'Packaging': 'Resealable pouch' },
  },
  {
    match: ['earring'],
    specs: { Material: 'Sterling Silver / Zirconia', 'Clasp Type': 'Push-back', 'Stone': 'Cubic Zirconia', Hypoallergenic: 'Yes', 'Comes With': 'Gift box' },
  },
  {
    match: ['duvet', 'cover'],
    specs: { Material: '100% Microfiber', Size: 'Queen', 'Thread Count': '200 TC', 'Closure': 'Zipper', 'Care Instructions': 'Machine wash cold' },
  },
  {
    match: ['mirror', 'vanity'],
    specs: { 'LED Lights': '10 dimmable bulbs', 'Power': 'USB or AA batteries', Magnification: '1× / 5×', Dimensions: '30 × 40 cm', Color: 'Pink / White' },
  },
  {
    match: ['container', 'glass', 'food'],
    specs: { Material: 'Borosilicate glass', 'Piece Count': '3', 'Lid Type': 'Screw-top', 'Oven Safe': 'Yes', 'Dishwasher Safe': 'Yes' },
  },
  {
    match: ['espresso', 'blender'],
    specs: { Wattage: '1000–1450W', Capacity: '0.5–2 L', Material: 'Stainless steel / BPA-free plastic', 'Auto Shut-off': 'Yes', Warranty: '1 year' },
  },
];

function getSpecs(name) {
  const lower = name.toLowerCase();
  for (const tmpl of specTemplates) {
    if (tmpl.match.some((kw) => lower.includes(kw))) return tmpl.specs;
  }
  return { Material: 'Premium quality', Weight: '0.5 kg', Dimensions: '20 × 15 × 10 cm', Warranty: '6 months', Origin: 'Imported' };
}

export function getProductDetails(product) {
  const shop = shops[(product.id - 1) % shops.length];
  const rating = (3.5 + ((product.id * 7) % 15) / 10).toFixed(1);
  const reviewCount = 30 + ((product.id * 37) % 2200);
  const stock = 5 + ((product.id * 13) % 46);
  return {
    shop,
    rating: parseFloat(rating),
    reviewCount,
    stock,
    deliveryOptions,
    specs: getSpecs(product.name),
  };
}
