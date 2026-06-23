const assert = require('assert');

async function testEndpoints() {
  console.log('--- Starting API Endpoints Testing ---');
  
  // 1. GET /api/products
  console.log('Testing GET /api/products...');
  const resProducts = await fetch('http://localhost:5000/api/products');
  assert.strictEqual(resProducts.status, 200, 'GET /api/products should return status 200');
  const jsonProducts = await resProducts.json();
  assert.strictEqual(jsonProducts.success, true, 'Response should indicate success');
  assert.ok(Array.isArray(jsonProducts.data), 'data should be an array');
  console.log(`GET /api/products SUCCESS: Returned ${jsonProducts.data.length} products.\n`);

  const testProduct = jsonProducts.data[0];
  const testProductId = testProduct.id || testProduct._id;

  // 2. GET /api/products/featured
  console.log('Testing GET /api/products/featured...');
  const resFeatured = await fetch('http://localhost:5000/api/products/featured');
  assert.strictEqual(resFeatured.status, 200, 'GET /api/products/featured should return status 200');
  const jsonFeatured = await resFeatured.json();
  assert.strictEqual(jsonFeatured.success, true, 'Response should indicate success');
  assert.ok(Array.isArray(jsonFeatured.data), 'data should be an array');
  console.log(`GET /api/products/featured SUCCESS: Returned ${jsonFeatured.data.length} featured products.\n`);

  // 3. GET /api/products/:id
  console.log('Testing GET /api/products/:id...');
  const resProductDetail = await fetch(`http://localhost:5000/api/products/${testProductId}`);
  assert.strictEqual(resProductDetail.status, 200, `GET /api/products/:id should return status 200`);
  const jsonProductDetail = await resProductDetail.json();
  assert.strictEqual(jsonProductDetail.success, true, 'Response should indicate success');
  assert.strictEqual(jsonProductDetail.data.name, testProduct.name, 'Fetched product name matches');
  console.log(`GET /api/products/:id SUCCESS: Product matches and returns correctly.\n`);

  // 4. POST /api/orders
  console.log('Testing POST /api/orders...');
  const orderData = {
    products: [
      { productId: testProductId, quantity: 2 }
    ],
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "9876543210",
      company: "ACME Industrial"
    },
    shippingAddress: {
      street: "123 Main St",
      city: "Pune",
      state: "Maharashtra",
      zip: "411019",
      country: "India"
    }
  };

  const resOrder = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  assert.strictEqual(resOrder.status, 201, 'POST /api/orders should return status 201');
  const jsonOrder = await resOrder.json();
  assert.strictEqual(jsonOrder.success, true, 'Response should indicate success');
  assert.ok(jsonOrder.data.orderNumber, 'Order should have generated orderNumber');
  console.log(`POST /api/orders SUCCESS: Created Order Number ${jsonOrder.data.orderNumber}.\n`);

  // 5. POST /api/inquiries
  console.log('Testing POST /api/inquiries...');
  const inquiryData = {
    productId: testProductId,
    customerName: "Jane Doe",
    companyName: "Tech Solutions",
    email: "jane@techsolutions.com",
    phone: "9876543210",
    quantityNeeded: 5,
    application: "Cooling CNC Machines",
    budgetRange: "100K-500K",
    timeline: "ASAP",
    message: "We need custom modifications on the mounting brackets."
  };

  const resInquiry = await fetch('http://localhost:5000/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  });
  assert.strictEqual(resInquiry.status, 201, 'POST /api/inquiries should return status 201');
  const jsonInquiry = await resInquiry.json();
  assert.strictEqual(jsonInquiry.success, true, 'Response should indicate success');
  assert.ok(jsonInquiry.data.inquiryNumber, 'Inquiry should have generated inquiryNumber');
  console.log(`POST /api/inquiries SUCCESS: Created Inquiry Number ${jsonInquiry.data.inquiryNumber}.\n`);

  // 6. POST /api/contact
  console.log('Testing POST /api/contact...');
  const contactData = {
    name: "Bob Smith",
    email: "bob@example.com",
    subject: "Inquiry about catalog specifications",
    message: "Hello, I would like to request high-res CAD files of your Panel AC catalog."
  };

  const resContact = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });
  assert.strictEqual(resContact.status, 201, 'POST /api/contact should return status 201');
  const jsonContact = await resContact.json();
  assert.strictEqual(jsonContact.success, true, 'Response should indicate success');
  console.log(`POST /api/contact SUCCESS: ${jsonContact.message || "Message received, we'll contact you soon"}\n`);

  console.log('All endpoints tested successfully with correct JSON structures and no errors!\n');
  console.log('✅ Result: Backend is working perfectly!');
}

testEndpoints().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
