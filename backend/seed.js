const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "CCSI Wall Mount Panel Air Conditioner",
    category: "Panel AC",
    description: "Robust wall-mounted enclosure cooling units engineered to regulate thermal loads inside automation cabinets and electrical panels. Built to survive harsh high-ambient industrial conditions.",
    specifications: {
      coolingCapacity: 1600,
      power: 800,
      refrigerant: "R134a",
      dimensions: "830 x 400 x 300 mm",
      weight: 36,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/products/panel-ac.png"],
    price: 45000,
    inStock: true,
    applications: [
      "CNC Machine Tools", "Drive Panels", "PLC Panels", "Instrument Panels",
      "Robotics Enclosures", "Medical Electronic Equipment", "Gas Analyzer Equipment",
      "Crane/Material Handling Equipment", "Any Panel Housing Sensitive Electronic Components"
    ],
    featured: true
  },
  {
    name: "CCSI Ductable Panel Air Conditioner",
    category: "Panel AC",
    description: "Ductable cabinet air conditioning system providing optimal thermal control for specialized electrical systems requiring clean/external air ducting.",
    specifications: {
      coolingCapacity: 2000,
      power: 1100,
      refrigerant: "R134a",
      dimensions: "950 x 440 x 340 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["/images/products/panel-ac.png"],
    price: 65000,
    inStock: true,
    applications: [
      "CPU/Server Enclosures", "Process Control Equipment", "Clean Rooms",
      "High-temperature Manufacturing Zones", "Duct-connected Industrial Enclosures"
    ],
    featured: false
  },
  {
    name: "CCSI Water Cooled Panel Air Conditioner",
    category: "Panel AC",
    description: "High performance panel cooling unit utilizing water cooling loops to dissipate cabinet heat. Specially designed for extremely dusty, high-ambient foundry applications.",
    specifications: {
      coolingCapacity: 2700,
      power: 1200,
      refrigerant: "R22",
      dimensions: "800 x 460 x 360 mm",
      weight: 45,
      maxAmbientTemp: 60,
      workingTempRange: "+10°C to +60°C"
    },
    images: ["/images/products/panel-ac.png"],
    price: 95000,
    inStock: true,
    applications: [
      "Steel Plants & Foundries", "Chemical Processing Facilities",
      "High Ambient Dusty Sites", "Any Panel Housing Sensitive Electronic Components"
    ],
    featured: false
  },
  {
    name: "CCSI Outdoor Panel Air Conditioner",
    category: "Panel AC",
    description: "Weatherproof and dustproof panel cooler engineered to protect outdoor electrical cabinets, telecom hubs, and field enclosures.",
    specifications: {
      coolingCapacity: 1000,
      power: 600,
      refrigerant: "R134a",
      dimensions: "750 x 380 x 280 mm",
      weight: 30,
      maxAmbientTemp: 55,
      workingTempRange: "-10°C to +55°C"
    },
    images: ["/images/products/panel-ac.png"],
    price: 55000,
    inStock: true,
    applications: [
      "Telecom Equipment", "Outdoor Power Cabinets", "Remote Sub-stations",
      "Solar Control Panels", "Traffic Control Cabinets"
    ],
    featured: false
  },
  {
    name: "CCSI Rack AC",
    category: "Panel AC",
    description: "Server rack mount refrigeration system engineered to maintain high-density computer hardware at optimal operating temperatures.",
    specifications: {
      coolingCapacity: 1000,
      power: 650,
      refrigerant: "R134a",
      dimensions: "482 x 600 x 266 mm (6U)",
      weight: 28,
      maxAmbientTemp: 45,
      workingTempRange: "+15°C to +40°C"
    },
    images: ["/images/products/rack-ac.png"],
    price: 50000,
    inStock: true,
    applications: [
      "IT Industries", "Server Rooms & Data Center Enclosures", "Telecom Sectors"
    ],
    featured: true
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
    applications: [
      "Pharma Warehouses", "Dry Storage Facilities", "Printing Press Areas",
      "Food & Chemical Preservation", "Archive Vaults"
    ],
    featured: true
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
    applications: [
      "Drying Air For Use In Commercial Or Industrial Processes That Demand Dry Air",
      "Telecom Industry (Pressurizes Underground Cables To Repel Moisture And Avoid Shorts)",
      "Painting Applications", "Pneumatic Tools", "Textile Manufacturing",
      "Pneumatic Control Systems"
    ],
    featured: true
  },
  {
    name: "CCSI Fan Tray",
    category: "Fan Tray",
    description: "Standard cabinet mounting fan array providing active top air circulation and quick heat dissipation inside server configurations.",
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
    applications: [
      "Network Racks", "Server Enclosures", "IT Industries", "Telecom Sector"
    ],
    featured: false
  },
  {
    name: "CCSI Combi-Chiller",
    category: "Chiller",
    description: "Advanced integrated cooling center providing simultaneous refrigeration for spindles, machine panels, and hydraulic oil loops.",
    specifications: {
      coolingCapacity: 10500,
      power: 5000,
      refrigerant: "R22",
      dimensions: "1720 x 758 x 693 mm",
      weight: 300,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 225000,
    inStock: true,
    applications: [
      "CNC/VMC Machine Tools", "CNC Lathes", "Machine Centers",
      "Metal Cutting Operations", "Metal Forming", "Sheet Metal Shop"
    ],
    featured: true
  },
  {
    name: "CCSI Oil Chiller",
    category: "Chiller",
    description: "Spindle cooling and hydraulic oil chiller engineered to keep oil viscosity stable under heavy duty operating runs.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/products/oil-chiller.png"],
    price: 135000,
    inStock: true,
    applications: [
      "Spindle Gearboxes", "Spindle Motors", "Spindle Bearings", "Spindle Drive Cooling",
      "Metal Cutting", "Metal Forming", "General Purpose Hydraulic Equipment"
    ],
    featured: true
  },
  {
    name: "CCSI Water Chiller (With Integrated Tank)",
    category: "Chiller",
    description: "Self-contained water cooling unit integrated with an insulated storage tank and process pump. Ideal for machines requiring a dedicated buffer volume.",
    specifications: {
      coolingCapacity: 7000,
      power: 3200,
      refrigerant: "R22",
      dimensions: "800 x 600 x 950 mm",
      weight: 120,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 45°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 165000,
    inStock: true,
    applications: [
      "Plastic Molding Machine", "Laser Machine", "Robotics Welding Machine",
      "General Machining"
    ],
    featured: false
  },
  {
    name: "CCSI Water Chiller",
    category: "Chiller",
    description: "High performance industrial water and glycol chillers designed for CNC cooling, packaging lines, and process machinery.",
    specifications: {
      coolingCapacity: 5250,
      power: 2000,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 125000,
    inStock: true,
    applications: [
      "Plastic And Packaging Industry", "Food And Beverage Industry",
      "Pharmaceutical Production", "Textile Industry", "RO Systems"
    ],
    featured: true
  },
  {
    name: "CCSI Immersion Chiller",
    category: "Chiller",
    description: "Immersive process cooling unit designed to sit directly inside fluid or coolant sumps. Eliminates the need for external plumbing and pumps.",
    specifications: {
      coolingCapacity: 3500,
      power: 1500,
      refrigerant: "R22",
      dimensions: "650 x 450 x 800 mm",
      weight: 75,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 115000,
    inStock: true,
    applications: [
      "Metal Cutting", "General Purpose Machining Equipment", "CNC Machine Tools", "Sump Cooling"
    ],
    featured: false
  },
  {
    name: "CCSI Water Cooled Chiller",
    category: "Chiller",
    description: "Heavy duty water-cooled chiller providing stable industrial process cooling by rejecting heat into central cooling tower systems.",
    specifications: {
      coolingCapacity: 14000,
      power: 5200,
      refrigerant: "R22",
      dimensions: "950 x 650 x 1100 mm",
      weight: 180,
      maxAmbientTemp: 50,
      workingTempRange: "5°C to 45°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 185000,
    inStock: true,
    applications: [
      "Heavy Machinery Cooling", "Plastic Extruders", "Chemical Reactors", "General Purpose Machining"
    ],
    featured: false
  },
  {
    name: "CCSI Glycol Chiller",
    category: "Chiller",
    description: "Low temperature process cooling unit designed to pump sub-zero glycol-water mixes for food processing, breweries, and pharmaceutical loops.",
    specifications: {
      coolingCapacity: 8750,
      power: 4200,
      refrigerant: "R22",
      dimensions: "850 x 600 x 1000 mm",
      weight: 140,
      maxAmbientTemp: 45,
      workingTempRange: "-10°C to +30°C"
    },
    images: ["/images/products/water-chiller.png"],
    price: 155000,
    inStock: true,
    applications: [
      "Food and Beverage Industry", "Brewery/Winery Fermentation",
      "Pharmaceutical Production", "Low-Temp Process Loops"
    ],
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
