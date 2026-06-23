const assert = require('assert');

async function testFrontendConnections() {
  console.log('--- Starting Frontend Connection and CORS Validation ---');

  // 1. Verify Frontend Dev Server is up and serving HTML
  console.log('Verifying Frontend server at http://localhost:5173...');
  try {
    const resFrontend = await fetch('http://localhost:5173');
    assert.strictEqual(resFrontend.status, 200, 'Frontend server should return status 200');
    const htmlText = await resFrontend.text();
    assert.ok(htmlText.includes('<div id="root">') || htmlText.includes('html'), 'Frontend should serve an HTML page containing root element');
    console.log('Frontend server is UP and running.\n');
  } catch (err) {
    console.error('Failed to verify frontend server. Make sure Vite is running on http://localhost:5173');
    throw err;
  }

  const API_BASE = 'http://localhost:5000/api';
  const testOrigin = 'http://localhost:5173';

  // Helper to verify response and CORS headers
  async function testRoute(url, logUrl, options = {}) {
    const defaultHeaders = {
      'Origin': testOrigin,
      'Content-Type': 'application/json'
    };
    
    options.headers = { ...defaultHeaders, ...options.headers };
    
    console.log(`Requesting ${options.method || 'GET'} ${url}...`);
    const res = await fetch(url, options);
    
    // Check status
    const expectedStatus = options.expectedStatus || 200;
    assert.strictEqual(res.status, expectedStatus, `${url} should return status ${expectedStatus}`);
    
    // Check CORS Headers
    const corsOrigin = res.headers.get('access-control-allow-origin');
    const corsCredentials = res.headers.get('access-control-allow-credentials');
    
    assert.strictEqual(corsOrigin, testOrigin, `${url} CORS Header "access-control-allow-origin" should be "${testOrigin}"`);
    assert.strictEqual(corsCredentials, 'true', `${url} CORS Header "access-control-allow-credentials" should be "true"`);
    
    const body = await res.json();
    assert.strictEqual(body.success, true, `${url} should return success: true`);
    
    console.log(`SUCCESS: Got correct response & CORS headers for ${logUrl}\n`);
    return body;
  }

  // 2. GET /api/products (Browse Products)
  const productsResponse = await testRoute(`${API_BASE}/products`, 'http://localhost:5000/api/products');
  assert.ok(Array.isArray(productsResponse.data), 'Products data should be an array');
  const testProduct = productsResponse.data[0];
  const testProductId = testProduct.id || testProduct._id;
  console.log(`Found product: ${testProduct.name} (ID: ${testProductId})\n`);

  // 3. GET /api/products/featured
  await testRoute(`${API_BASE}/products/featured`, 'http://localhost:5000/api/products/featured');

  // 4. GET /api/products/:id
  await testRoute(`${API_BASE}/products/${testProductId}`, 'http://localhost:5000/api/products/:id');

  // 5. POST /api/orders
  const orderData = {
    products: [{ productId: testProductId, quantity: 2 }],
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
  await testRoute(`${API_BASE}/orders`, 'http://localhost:5000/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
    expectedStatus: 201
  });

  // 6. POST /api/inquiries
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
    message: "Custom bracket mounting request."
  };
  await testRoute(`${API_BASE}/inquiries`, 'http://localhost:5000/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData),
    expectedStatus: 201
  });

  // 7. POST /api/contact
  const contactData = {
    name: "Bob Smith",
    email: "bob@example.com",
    subject: "Catalog Request",
    message: "Requesting hi-res schematic drawings."
  };
  await testRoute(`${API_BASE}/contact`, 'http://localhost:5000/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    expectedStatus: 201
  });

  console.log('All frontend-to-backend connections tested successfully!');
  console.log('No CORS errors: Allowed Origin and Credentials headers verified successfully on all endpoints.');
}

testFrontendConnections().catch(err => {
  console.error('Frontend connection test failed:', err);
  process.exit(1);
});
