const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "CCSI Industrial Oil Cooling Chiller",
    category: "Chiller",
    description: "High-performance air-cooled industrial oil cooling chiller equipped with solenoid valve, delay timer, single phase preventer, and LP/HP switch. Perfect for machining centers, CNC lathes, EDM, NC SPM, and hydraulic presses.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350534001/IE/MS/PK/191739580/industrial-oil-cooling-chiller-500x500.jpg"],
    price: 65000,
    inStock: true,
    applications: ["Machining Centre", "CNC Lathe", "EDM", "NC SPM", "Hydraulic Press"],
    featured: true
  },
  {
    name: "CCSI Refrigerated Oil Chiller",
    category: "Chiller",
    description: "Industrial grade refrigerated oil chiller designed for hydraulic and cooling loops. Sturdy, reliable, and energy efficient construction.",
    specifications: {
      coolingCapacity: 2700,
      power: 1600,
      refrigerant: "R22",
      dimensions: "700 x 500 x 825 mm",
      weight: 80,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350535486/SZ/ST/XO/191739580/refrigerated-oil-chiller-500x500.jpg"],
    price: 40000,
    inStock: true,
    applications: ["Hydraulic Power Packs", "Industrial Machinery Cooling", "Gearbox Cooling"],
    featured: false
  },
  {
    name: "CCSI Spindle Oil Chiller",
    category: "Chiller",
    description: "Precision spindle oil cooling chiller with optimum tolerance capacity, heat resistance, long functional life, single phase preventer, solenoid valve, and digital control system.",
    specifications: {
      coolingCapacity: 3500,
      power: 1800,
      refrigerant: "R22",
      dimensions: "720 x 500 x 850 mm",
      weight: 85,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350537912/PH/TD/TA/191739580/spindle-oil-chiller-500x500.jpg"],
    price: 65000,
    inStock: true,
    applications: ["Machining Center Spindles", "CNC Lathe Spindles", "EDM Spindle Cooling", "NC SPM Spindles", "Hydraulic Presses"],
    featured: true
  },
  {
    name: "CCSI Hydraulic Oil Chiller",
    category: "Chiller",
    description: "Easy-to-operate hydraulic oil chiller with hermetically sealed air cooled immersion compressor, digital controller, built-in overload protection, LP/HP switch, and safety fuses.",
    specifications: {
      coolingCapacity: 5250,
      power: 2500,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350537467/IM/LV/QR/191739580/hydraulic-oil-chiller-500x500.jpg"],
    price: 55000,
    inStock: true,
    applications: ["Hydraulic Presses", "Machining Centres", "CNC Lathes", "EDM", "NC SPM"],
    featured: false
  },
  {
    name: "CCSI Industrial Air Conditioner",
    category: "Panel AC",
    description: "Heavy-duty 4-star rated industrial air conditioner built for high durability, lightweight design, easy installation, and accurate thermal regulation.",
    specifications: {
      coolingCapacity: 5000,
      power: 2200,
      refrigerant: "R22",
      dimensions: "1400 x 400 x 330 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/349692168/WC/HX/BF/191739580/industrial-air-conditioner-500x500.jpeg"],
    price: 70000,
    inStock: true,
    applications: ["Industrial Control Rooms", "Automation Enclosures", "Operator Cabins"],
    featured: false
  },
  {
    name: "CCSI Panel Air Conditioner",
    category: "Panel AC",
    description: "4-star rated electrical panel air conditioner providing optimum cooling with smooth finish, minimum maintenance, weekly filter alarm, and digital temperature controller.",
    specifications: {
      coolingCapacity: 1600,
      power: 800,
      refrigerant: "R134a",
      dimensions: "830 x 400 x 300 mm",
      weight: 36,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["https://5.imimg.com/data5/ANDROID/Default/2023/10/355927036/LN/KW/EN/191739580/product-jpeg-500x500.jpg"],
    price: 24000,
    inStock: true,
    applications: ["Electrical Control Cabinets", "Automation Enclosures", "Server Cabinets"],
    featured: true
  },
  {
    name: "CCSI Ductable Panel Air Conditioner",
    category: "Panel AC",
    description: "High strength, precisely engineered ductable panel cooler offering optimum cooling solutions for panels requiring external air routing.",
    specifications: {
      coolingCapacity: 2000,
      power: 1100,
      refrigerant: "R134a",
      dimensions: "950 x 440 x 340 mm",
      weight: 42,
      maxAmbientTemp: 55,
      workingTempRange: "+10°C to +55°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/3/395250551/XX/DG/MW/191739580/ductable-panel-air-conditioner-500x500.jpg"],
    price: 40000,
    inStock: true,
    applications: ["CNC Machine Tools", "Enclosures in Dusty Environments", "Process Control Rooms"],
    featured: false
  },
  {
    name: "CCSI Online Water Chiller",
    category: "Chiller",
    description: "Precision online water chiller designed specifically for laser machine cooling, featuring highly stable temperature control.",
    specifications: {
      coolingCapacity: 5250,
      power: 2000,
      refrigerant: "R22",
      dimensions: "755 x 505 x 930 mm",
      weight: 90,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350531467/QK/EJ/IX/191739580/online-water-chiller-500x500.jpg"],
    price: 120000,
    inStock: true,
    applications: ["Laser Cutting Machines", "Medical Lasers", "Industrial Packaging Lines"],
    featured: true
  },
  {
    name: "CCSI Water Cooling Chiller Machine",
    category: "Chiller",
    description: "Industrial heavy-duty water cooling chiller machine boasting robust construction, sturdiness, and optimum performance under continuous operation.",
    specifications: {
      coolingCapacity: 14000,
      power: 5200,
      refrigerant: "R22",
      dimensions: "950 x 650 x 1100 mm",
      weight: 180,
      maxAmbientTemp: 50,
      workingTempRange: "5°C to 45°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350532110/QM/PU/ND/191739580/water-cooling-chiller-machine-500x500.jpg"],
    price: 2000000,
    inStock: true,
    applications: ["Plastic Moulding Plants", "Extrusion Lines", "Centralized Industrial Cooling"],
    featured: true
  },
  {
    name: "CCSI Air To Air Heat Exchanger",
    category: "Panel AC",
    description: "Mild steel air-to-air heat exchanger, air-cooled, 240V operating voltage. Features precise construction, optimum functionality, and elevated service life.",
    specifications: {
      coolingCapacity: 1000,
      power: 240,
      refrigerant: "Air",
      dimensions: "600 x 300 x 150 mm",
      weight: 12,
      maxAmbientTemp: 60,
      workingTempRange: "+10°C to +60°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/349697988/HZ/GH/UD/191739580/autoblie-harness-500x500.png"],
    price: 11000,
    inStock: true,
    applications: ["Electrical Enclosures", "Control Cabinets", "Telecom Booths"],
    featured: false
  },
  {
    name: "CCSI Water Cooled Scroll Chiller",
    category: "Chiller",
    description: "Water-cooled scroll chiller engineered for low power consumption, less heat emission, and smooth functioning in centralized cooling setups.",
    specifications: {
      coolingCapacity: 10500,
      power: 5000,
      refrigerant: "R22",
      dimensions: "1720 x 758 x 693 mm",
      weight: 300,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/349691198/UM/NK/GZ/191739580/water-cooled-scroll-chiller-500x500.jpeg"],
    price: 85000,
    inStock: true,
    applications: ["Heavy Machinery Cooling", "Plastics & Moulding", "Chemical Processing"],
    featured: false
  },
  {
    name: "CCSI Water Soluble Coolant Chiller",
    category: "Chiller",
    description: "Highly flexible, water soluble coolant chiller designed for easy installation and increased cooling effectiveness in machine tool coolant sumps.",
    specifications: {
      coolingCapacity: 3500,
      power: 1500,
      refrigerant: "R22",
      dimensions: "650 x 450 x 800 mm",
      weight: 75,
      maxAmbientTemp: 45,
      workingTempRange: "10°C to 50°C"
    },
    images: ["https://5.imimg.com/data5/SELLER/Default/2023/10/350533873/IM/GZ/KG/191739580/water-soluble-coolant-chiller-500x500.jpg"],
    price: 80000,
    inStock: true,
    applications: ["CNC Machining Centers", "Grinding Sump Systems", "Metal Cutting Machines"],
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
    featured: false
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
