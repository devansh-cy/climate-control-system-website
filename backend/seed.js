const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "CCSI PAC 300W",
    category: "Panel AC",
    description: "Enclosure cooling unit designed for electrical control cabinets and small electronic panels. Ideal for maintaining optimal temperatures inside automated manufacturing cabinets.",
    specifications: {
      coolingCapacity: 300,
      power: 200,
      refrigerant: "R134a",
      dimensions: "610 x 275 x 235 mm",
      weight: 18,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_5_img_1.png"],
    price: 25000,
    inStock: true,
    applications: ["CNC Machine Tools", "Drive Panels", "PLC Panels", "Instrument Panels"],
    featured: true
  },
  {
    name: "CCSI PAC 600W",
    category: "Panel AC",
    description: "Compact wall mount panel air conditioner built to protect sensitive electronic components from extreme heat and dust in industrial environments.",
    specifications: {
      coolingCapacity: 600,
      power: 400,
      refrigerant: "R134a",
      dimensions: "700 x 275 x 300 mm",
      weight: 30,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_5_img_2.png"],
    price: 35000,
    inStock: true,
    applications: ["PLC Panels", "CPU/Server Enclosures", "Telecom Equipment"],
    featured: false
  },
  {
    name: "CCSI PAC 1000W",
    category: "Panel AC",
    description: "Medium capacity panel air conditioner designed for robust thermal regulation in automation cabinets and server enclosures.",
    specifications: {
      coolingCapacity: 1000,
      power: 680,
      refrigerant: "R134a",
      dimensions: "771 x 305 x 275 mm",
      weight: 32,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_6_img_11.jpeg"],
    price: 45000,
    inStock: true,
    applications: ["CPU/Server Enclosures", "Telecom Equipment", "Medical Electronic Equipment"],
    featured: true
  },
  {
    name: "CCSI PAC 1600W",
    category: "Panel AC",
    description: "High performance cabinet air conditioner delivering steady cooling capacity for automation and manufacturing lines.",
    specifications: {
      coolingCapacity: 1500,
      power: 850,
      refrigerant: "R134a",
      dimensions: "831 x 405 x 305 mm",
      weight: 36,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_6_img_11.jpeg"],
    price: 65000,
    inStock: true,
    applications: ["Heavy Duty Control Panels", "Robotics Enclosures", "Process Control Equipment"],
    featured: false
  },
  {
    name: "CCSI PAC 2000W",
    category: "Panel AC",
    description: "Robust wall mount cabinet air conditioner engineered to handle high heat loads in automation and process control systems.",
    specifications: {
      coolingCapacity: 2000,
      power: 1100,
      refrigerant: "R134a",
      dimensions: "1000 x 440 x 345 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_7_img_15.png"],
    price: 75000,
    inStock: true,
    applications: ["CNC Machine Tools", "IT Industries", "Telecom Sector"],
    featured: true
  },
  {
    name: "CCSI PAC 2700W",
    category: "Panel AC",
    description: "High capacity industrial enclosure cooler engineered to regulate high thermal loads in large power panels.",
    specifications: {
      coolingCapacity: 2700,
      power: 1300,
      refrigerant: "R22",
      dimensions: "804 x 460 x 360 mm",
      weight: 45,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_7_img_16.png"],
    price: 95000,
    inStock: true,
    applications: ["Main Power Distribution Boards", "Heavy Duty Control Panels"],
    featured: true
  },
  {
    name: "CCSI PAC 5000W",
    category: "Panel AC",
    description: "Industrial wall mount air conditioner engineered for high density automation boards and large power distribution boards.",
    specifications: {
      coolingCapacity: 5000,
      power: 2200,
      refrigerant: "R22",
      dimensions: "1400 x 400 x 330 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_8_img_15.png"],
    price: 120000,
    inStock: true,
    applications: ["Heavy Industry Enclosures", "Automotive Assembly Lines", "Robotics Enclosures"],
    featured: false
  },
  {
    name: "CCSI PAC 7000W",
    category: "Panel AC",
    description: "Maximum capacity industrial panel cooler designed for heavy thermal control under extreme ambient temperatures.",
    specifications: {
      coolingCapacity: 7000,
      power: 3200,
      refrigerant: "R22",
      dimensions: "1500 x 458 x 400 mm",
      weight: 60,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/page_8_img_16.png"],
    price: 155000,
    inStock: true,
    applications: ["Heavy Industry Enclosures", "Steel Plants", "Foundries"],
    featured: false
  },
  {
    name: "CCSI Combi-Chiller",
    category: "Chiller",
    description: "Premium Combi-Chiller unit providing all-in-one cooling solution with multiple cooling loops for panel AC, oil chiller, and coolant chiller circuits.",
    specifications: {
      coolingCapacity: 10500,
      power: 5000,
      refrigerant: "R22",
      dimensions: "1720 x 758 x 693 mm",
      weight: 300,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/page_14_img_3.png"],
    price: 225000,
    inStock: true,
    applications: ["CNC/VMC Machine Tools", "CNC Lathes", "Machine Centers", "Metal Cutting", "Metal Forming", "Sheet Metal Shop"],
    featured: true
  },
  {
    name: "CCSI OC 1.5 TR",
    category: "Chiller",
    description: "Precision Industrial Oil Chiller designed to maintain hydraulic fluid and lubricating oil at exact temperatures for CNC gearboxes and spindle circuits.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/page_15_img_4.png"],
    price: 135000,
    inStock: true,
    applications: ["CNC Machine Tools", "Metal Cutting", "Metal Forming", "General Purpose Hydraulic Equipment"],
    featured: true
  },
  {
    name: "CCSI OC 2700W",
    category: "Chiller",
    description: "Compact oil cooling chiller to maintain optimum fluid temperatures in hydraulic power packs and high-speed CNC spindles.",
    specifications: {
      coolingCapacity: 2700,
      power: 1600,
      refrigerant: "R22",
      dimensions: "700 x 500 x 825 mm",
      weight: 80,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/page_15_img_5.png"],
    price: 110000,
    inStock: true,
    applications: ["CNC Spindles", "Hydraulic Power Packs", "Metal Forming"],
    featured: false
  },
  {
    name: "CCSI WC 1.5 TR",
    category: "Chiller",
    description: "Robust B2B Water Chiller providing cooling loops for CNC machines, laser cutting machinery, and industrial packaging processes.",
    specifications: {
      coolingCapacity: 5250,
      power: 2000,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/page_20_img_6.png"],
    price: 125000,
    inStock: true,
    applications: ["Plastic And Packaging Industry", "Food And Beverage Industry", "Pharmaceutical", "Textile Industry", "Laser Machines", "Robotics Welding"],
    featured: true
  },
  {
    name: "CCSI WC 2 TR",
    category: "Chiller",
    description: "High capacity water chiller designed to handle thermal loads in heavy duty multi-machine industrial configurations.",
    specifications: {
      coolingCapacity: 7000,
      power: 3000,
      refrigerant: "R22",
      dimensions: "700 x 600 x 845 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/page_20_img_7.png"],
    price: 150000,
    inStock: true,
    applications: ["Plastic Molding Machines", "Laser Machines", "Chemical Processing", "Pharmaceutical"],
    featured: false
  },
  {
    name: "CCSI Dehumidifier",
    category: "Dehumidifier",
    description: "Industrial refrigerated dehumidifier engineered to remove humidity and protect raw goods in dry storage warehouses.",
    specifications: {
      coolingCapacity: 1800,
      power: 750,
      refrigerant: "R134a",
      dimensions: "700 x 450 x 400 mm",
      weight: 38,
      maxAmbientTemp: 40,
      workingTempRange: "5°C to 38°C"
    },
    images: ["/images/page_12_img_13.png"],
    price: 28000,
    inStock: true,
    applications: ["Pharma Warehouses", "Dry Storage Facilities", "Printing Press Areas", "Food & Chemical Preservation"],
    featured: false
  },
  {
    name: "CCSI Air Dryer",
    category: "Air Dryer",
    description: "High efficiency refrigerated air dryer built to extract water vapor and moisture from compressed air pipelines.",
    specifications: {
      coolingCapacity: 1200,
      power: 600,
      refrigerant: "R134a",
      dimensions: "600 x 450 x 500 mm",
      weight: 45,
      maxAmbientTemp: 45,
      workingTempRange: "2°C to 10°C"
    },
    images: ["/images/page_12_img_16.png"],
    price: 35000,
    inStock: true,
    applications: ["Pneumatic Tool Lines", "Packaging Machinery", "Paint Spray Systems", "Textile Manufacturing"],
    featured: true
  },
  {
    name: "CCSI Fan Tray",
    category: "Fan Tray",
    description: "Standard 19-inch rack-mount multi-fan tray designed for top cabinet ventilation and heat dissipation in control boards.",
    specifications: {
      coolingCapacity: 0,
      power: 80,
      refrigerant: "Air",
      dimensions: "482 x 350 x 44 mm",
      weight: 4,
      maxAmbientTemp: 60,
      workingTempRange: "-10°C to 60°C"
    },
    images: ["/images/page_12_img_37.png"],
    price: 15000,
    inStock: true,
    applications: ["Network Racks", "Server Enclosures", "IT Industries", "Telecom Sector"],
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
