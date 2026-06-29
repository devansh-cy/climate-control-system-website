const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "CCSI Industrial Oil Cooling Chiller",
    category: "Chiller",
    description: "Mild Steel Industrial Oil Cooling Chiller. Easy to operate with high performance. Equipped with solenoid valve & delay timer, single phase preventer, hermetically sealed air cooled immersion compressor, digital control system, safety fuse for main & compressor, and built-in overload protection. LP/HP switch turns off in case of low pressure.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: [
      "/images/products/industrial-oil-chiller-1.png",
      "/images/products/industrial-oil-chiller-2.png",
      "/images/products/industrial-oil-chiller-3.png"
    ],
    price: 65000,
    inStock: true,
    applications: ["Machining Centre", "CNC Lathe", "EDM", "NC SPM", "Hydraulic Press"],
    features: [
      "Easy to operate",
      "Solenoid valve & delay timer",
      "High performance",
      "Single phase preventer for cooling system",
      "LP/HP switch turns off in case of low pressure",
      "Hermetically sealed air cooled immersion compressor",
      "Digital control system",
      "Safety fuse for main & compressor",
      "Built-in overload protection for compressor",
      "Potential free alarm for high and low temperature",
      "High / Low pressure switch",
      "Fan failure alarm module",
      "Water-cooled condenser for high ambient environment",
      "Custom built size for replacement of imported units and special applications",
      "Flow switch",
      "Ante freezing switch"
    ],
    material: "Mild Steel",
    featured: true
  },
  {
    name: "CCSI Refrigerated Oil Chiller",
    category: "Chiller",
    description: "Mild Steel Refrigerated Oil Chiller. Industrial grade oil chiller designed for hydraulic and cooling loops. Air cooled, sturdy, reliable, and energy efficient construction.",
    specifications: {
      coolingCapacity: 2700,
      power: 1600,
      refrigerant: "R22",
      dimensions: "700 x 500 x 825 mm",
      weight: 80,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: [
      "/images/products/refrigerated-oil-chiller-1.png",
      "/images/products/refrigerated-oil-chiller-2.png"
    ],
    price: 40000,
    inStock: true,
    applications: ["Hydraulic Power Packs", "Industrial Machinery Cooling", "Gearbox Cooling"],
    features: [
      "Air cooled chiller",
      "Sturdy construction",
      "Reliable performance",
      "Energy efficient"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Spindle Oil Chiller",
    category: "Chiller",
    description: "Copper Spindle Oil Chiller. Precision spindle oil cooling chiller with optimum tolerance capacity, heat resistance, and long functional life. Equipped with single phase preventer, solenoid valve & delay timer, hermetically sealed air cooled immersion compressor, digital control system, safety fuse, and built-in overload protection.",
    specifications: {
      coolingCapacity: 3500,
      power: 1800,
      refrigerant: "R22",
      dimensions: "720 x 500 x 850 mm",
      weight: 85,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: [
      "/images/products/spindle-oil-chiller-1.png",
      "/images/products/spindle-oil-chiller-2.png"
    ],
    price: 65000,
    inStock: true,
    applications: ["Machining Center", "CNC Lathe", "EDM", "NC SPM", "Hydraulic Press"],
    features: [
      "Optimum tolerance capacity",
      "Heat resistance",
      "Long functional life",
      "Single phase preventer for cooling system",
      "LP/HP switch turns off in case of low pressure",
      "Solenoid valve & delay timer",
      "Hermetically sealed air cooled immersion compressor",
      "Digital control system",
      "Safety fuse for main & compressor",
      "Built-in overload protection for compressor"
    ],
    material: "Copper",
    featured: true
  },
  {
    name: "CCSI Hydraulic Oil Chiller",
    category: "Chiller",
    description: "Mild Steel Hydraulic Oil Chiller. Easy to operate hydraulic oil chiller with hermetically sealed air cooled immersion compressor, digital controller, built-in overload protection, LP/HP switch, and safety fuses. Includes optional water-cooled condenser for high ambient environments.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: [
      "/images/products/hydraulic-oil-chiller-1.png",
      "/images/products/hydraulic-oil-chiller-2.png"
    ],
    price: 55000,
    inStock: true,
    applications: ["Machining Centre", "CNC Lathe", "EDM", "NC SPM", "Hydraulic Press"],
    features: [
      "Easy to operate",
      "Solenoid valve & delay timer",
      "High performance",
      "Single phase preventer for cooling system",
      "LP/HP switch turns off in case of low pressure",
      "Hermetically sealed air cooled immersion compressor",
      "Digital control system",
      "Safety fuse for main & compressor",
      "Built-in overload protection for compressor",
      "Potential free alarm for high and low temperature",
      "High / Low pressure switch",
      "Fan failure alarm module",
      "Water-cooled condenser for high ambient environment",
      "Custom built size for replacement of imported units and special applications",
      "Flow switch",
      "Ante freezing switch"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Industrial Air Conditioner",
    category: "Panel AC",
    description: "4 Star rated Industrial Air Conditioner. Heavy-duty industrial air conditioner built for high durability, lightweight design, easy installation, and accurate thermal regulation for industrial control rooms and operator cabins.",
    specifications: {
      coolingCapacity: 5000,
      power: 2200,
      refrigerant: "R22",
      dimensions: "1400 x 400 x 330 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C",
      starRating: "4 Star"
    },
    images: [
      "/images/products/industrial-ac-1.png",
      "/images/products/industrial-ac-2.png",
      "/images/products/industrial-ac-3.png"
    ],
    price: 70000,
    inStock: true,
    applications: ["Industrial Control Rooms", "Automation Enclosures", "Operator Cabins"],
    features: [
      "4 Star energy rating",
      "High durability",
      "Lightweight design",
      "Easy installation",
      "Accurate thermal regulation"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Panel Air Conditioner",
    category: "Panel AC",
    description: "4 Star rated electrical Panel Air Conditioner providing optimum cooling for electrical control cabinets and automation enclosures. Features smooth finish, minimum maintenance design, weekly filter alarm, and digital temperature controller.",
    specifications: {
      coolingCapacity: 1600,
      power: 800,
      refrigerant: "R134a",
      dimensions: "830 x 400 x 300 mm",
      weight: 36,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C",
      starRating: "4 Star"
    },
    images: [
      "/images/products/panel-ac-1.png",
      "/images/products/panel-ac-2.png",
      "/images/products/panel-ac-3.png",
      "/images/products/panel-ac-4.png",
      "/images/products/panel-ac-5.png"
    ],
    price: 24000,
    inStock: true,
    applications: ["Electrical Control Cabinets", "Automation Enclosures", "Server Cabinets"],
    features: [
      "4 Star energy rating",
      "Smooth finish",
      "Minimum maintenance design",
      "Weekly filter alarm",
      "Digital temperature controller",
      "Optimum cooling performance"
    ],
    material: "Mild Steel",
    featured: true
  },
  {
    name: "CCSI Ductable Panel Air Conditioner",
    category: "Panel AC",
    description: "High strength, precisely engineered Ductable Panel Air Conditioner offering optimum cooling solutions for panels requiring external air routing. Ideal for CNC machine tools and enclosures in dusty or contaminated environments.",
    specifications: {
      coolingCapacity: 2000,
      power: 1100,
      refrigerant: "R134a",
      dimensions: "950 x 440 x 340 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: [
      "/images/products/ductable-ac-1.png",
      "/images/products/ductable-ac-2.png",
      "/images/products/ductable-ac-3.png",
      "/images/products/ductable-ac-4.png",
      "/images/products/ductable-ac-5.png",
      "/images/products/ductable-ac-6.png",
      "/images/products/ductable-ac-7.png",
      "/images/products/ductable-ac-8.png"
    ],
    price: 40000,
    inStock: true,
    applications: ["CNC Machine Tools", "Enclosures in Dusty Environments", "Process Control Rooms"],
    features: [
      "High strength construction",
      "Precisely engineered",
      "Optimum cooling with external air routing",
      "Suitable for dusty/contaminated environments"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Online Water Chiller",
    category: "Chiller",
    description: "Mild Steel 5 TR Online Water Chiller. Precision online water chiller designed specifically for laser machine cooling, featuring highly stable temperature control. Trusted for use in laser cutting machines, medical lasers, and industrial packaging lines.",
    specifications: {
      coolingCapacity: 5250,
      power: 2000,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C",
      capacity: "5 TR"
    },
    images: [
      "/images/products/online-water-chiller-1.png",
      "/images/products/online-water-chiller-2.png"
    ],
    price: 120000,
    inStock: true,
    applications: ["Laser Cutting Machines", "Medical Lasers", "Industrial Packaging Lines"],
    features: [
      "Highly stable temperature control",
      "5 TR cooling capacity",
      "Precise temperature regulation",
      "Suitable for laser cooling applications"
    ],
    material: "Mild Steel",
    featured: true
  },
  {
    name: "CCSI Water Cooling Chiller Machine",
    category: "Chiller",
    description: "Industrial heavy-duty Water Cooling Chiller Machine boasting robust construction, sturdiness, and optimum performance under continuous operation. Designed for large-scale industrial applications including plastic moulding plants and extrusion lines.",
    specifications: {
      coolingCapacity: 14000,
      power: 5200,
      refrigerant: "R22",
      dimensions: "950 x 650 x 1100 mm",
      weight: 180,
      maxAmbientTemp: 50,
      workingTempRange: "5°C to 45°C"
    },
    images: [
      "/images/products/water-cooling-machine-1.png"
    ],
    price: 2000000,
    inStock: true,
    applications: ["Plastic Moulding Plants", "Extrusion Lines", "Centralized Industrial Cooling"],
    features: [
      "Robust construction",
      "Heavy-duty performance",
      "Suitable for continuous operation",
      "Centralized industrial cooling"
    ],
    material: "Mild Steel",
    featured: true
  },
  {
    name: "CCSI Air To Air Heat Exchanger",
    category: "Panel AC",
    description: "Mild Steel Air To Air Heat Exchanger, Air-Cooled, 240V operating voltage. Features precise construction, optimum functionality, and elevated service life. Ideal for cooling electrical enclosures and control cabinets without introducing outside air.",
    specifications: {
      coolingCapacity: 1000,
      power: 240,
      refrigerant: "Air",
      dimensions: "600 x 300 x 150 mm",
      weight: 12,
      maxAmbientTemp: 60,
      workingTempRange: "+10°C to +60°C",
      voltage: "240V",
      coolingType: "Air-Cooled"
    },
    images: [
      "/images/products/air-heat-exchanger-1.png"
    ],
    price: 11000,
    inStock: true,
    applications: ["Electrical Enclosures", "Control Cabinets", "Telecom Booths"],
    features: [
      "Precise construction",
      "Optimum functionality",
      "Elevated service life",
      "Air-cooled design",
      "240V operating voltage"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Water Cooled Scroll Chiller",
    category: "Chiller",
    description: "Mild Steel 10 Ton Water Cooled Scroll Chiller. Engineered for low power consumption, less heat emission, and smooth functioning in centralized cooling setups. Ideal for heavy machinery cooling and industrial process applications.",
    specifications: {
      coolingCapacity: 10500,
      power: 5000,
      refrigerant: "R22",
      dimensions: "1720 x 758 x 693 mm",
      weight: 300,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C",
      capacity: "10 Ton"
    },
    images: [
      "/images/products/scroll-chiller-1.png"
    ],
    price: 85000,
    inStock: true,
    applications: ["Heavy Machinery Cooling", "Plastics & Moulding", "Chemical Processing"],
    features: [
      "Low power consumption",
      "Less heat emission",
      "Smooth functioning",
      "10 Ton cooling capacity",
      "Water cooled scroll compressor"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Water Soluble Coolant Chiller",
    category: "Chiller",
    description: "Mild Steel 6 TR Water Soluble Coolant Chiller. Highly flexible, easy to install water soluble coolant chiller with increased effectiveness for machine tool coolant sumps. Designed for CNC machining centers and grinding operations.",
    specifications: {
      coolingCapacity: 3500,
      power: 1500,
      refrigerant: "R22",
      dimensions: "650 x 450 x 800 mm",
      weight: 75,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C",
      capacity: "6 TR"
    },
    images: [
      "/images/products/coolant-chiller-1.png"
    ],
    price: 80000,
    inStock: true,
    applications: ["CNC Machining Centers", "Grinding Sump Systems", "Metal Cutting Machines"],
    features: [
      "Easy installation",
      "Highly flexible",
      "Increased effectiveness",
      "6 TR cooling capacity",
      "Designed for water soluble coolants"
    ],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Industrial Dehumidifier",
    category: "Dehumidifier",
    description: "High capacity refrigerated moisture removal unit designed to protect raw materials, pharma products, and dry warehouses from moisture damage.",
    specifications: {
      coolingCapacity: 1800,
      power: 750,
      refrigerant: "R134a",
      dimensions: "700 x 450 x 400 mm",
      weight: 38,
      maxAmbientTemp: 40,
      workingTempRange: "5°C to 38°C"
    },
    images: ["/images/products/dehumidifier.png"],
    price: 28000,
    inStock: true,
    applications: ["Pharma Warehouses", "Dry Storage Facilities", "Printing Press Areas", "Food & Chemical Preservation"],
    features: ["High capacity moisture removal", "Refrigerated dehumidification", "Protects against moisture damage"],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Refrigerated Air Dryer",
    category: "Air Dryer",
    description: "Compressed air moisture separation system protecting pneumatic tools, instrumentation, and processes by drying input air.",
    specifications: {
      coolingCapacity: 1200,
      power: 600,
      refrigerant: "R134a",
      dimensions: "600 x 450 x 500 mm",
      weight: 45,
      maxAmbientTemp: 45,
      workingTempRange: "2°C to 10°C"
    },
    images: ["/images/products/air-dryer.png"],
    price: 35000,
    inStock: true,
    applications: ["Pneumatic Tool Lines", "Packaging Machinery", "Paint Spray Systems", "Textile Manufacturing"],
    features: ["Compressed air drying", "Moisture separation", "Protects pneumatic tools and instrumentation"],
    material: "Mild Steel",
    featured: false
  },
  {
    name: "CCSI Fan Tray",
    category: "Fan Tray",
    description: "Standard cabinet mounting fan array providing active top air circulation and quick heat dissipation inside server and network rack configurations.",
    specifications: {
      coolingCapacity: 0,
      power: 80,
      refrigerant: "Air",
      dimensions: "482 x 350 x 44 mm",
      weight: 4,
      maxAmbientTemp: 60,
      workingTempRange: "-10°C to 60°C"
    },
    images: ["/images/products/rack-ac.png"],
    price: 15000,
    inStock: true,
    applications: ["Network Racks", "Server Enclosures", "IT Industries", "Telecom Sector"],
    features: ["Active air circulation", "Quick heat dissipation", "Standard rack mount"],
    material: "Mild Steel",
    featured: false
  }
];

const seedDatabase = async (disconnectAfter = true) => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to database...');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Database connected.');
    }

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    console.log('Seeding sample products...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products seeded.`);

    if (disconnectAfter) {
      console.log('Closing database connection...');
      await mongoose.disconnect();
      console.log('Database connection closed. Seeding completed successfully.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    if (disconnectAfter) {
      try {
        await mongoose.disconnect();
      } catch (e) {}
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedDatabase(true);
}

module.exports = { seedDatabase, sampleProducts };
