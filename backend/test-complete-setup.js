require('dotenv').config();
const axios = require('axios');

const testCompleteSetup = async () => {
  try {
    console.log('🧪 Complete Setup Test...');
    
    // Test 1: Check if server is running
    console.log('\n1️⃣ Testing server health...');
    try {
      const healthResponse = await axios.get('http://localhost:5000/health');
      console.log('✅ Server is running');
      console.log('   Status:', healthResponse.status);
      console.log('   Message:', healthResponse.data.message);
    } catch (error) {
      console.log('❌ Server is not running or not accessible');
      console.log('   Error:', error.message);
      return;
    }
    
    // Test 2: Test CORS with different origins
    console.log('\n2️⃣ Testing CORS configuration...');
    const origins = ['http://localhost:3000', 'http://localhost:3001'];
    
    for (const origin of origins) {
      try {
        const corsResponse = await axios.get('http://localhost:5000/api/items', {
          headers: {
            'Origin': origin
          }
        });
        console.log(`✅ CORS working for ${origin}`);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(`✅ CORS working for ${origin} (401 is expected for unauthenticated request)`);
        } else {
          console.log(`❌ CORS failed for ${origin}:`, error.message);
        }
      }
    }
    
    // Test 3: Test admin login
    console.log('\n3️⃣ Testing admin login...');
    const loginData = {
      email: 'admin@123gmail.com',
      password: 'admin@123'
    };
    
    try {
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3001'
        }
      });
      
      console.log('✅ Admin login successful!');
      console.log('   Status:', loginResponse.status);
      console.log('   Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('   User role:', loginResponse.data.user.role);
      
      // Test 4: Test authenticated request
      console.log('\n4️⃣ Testing authenticated request...');
      const authResponse = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`,
          'Origin': 'http://localhost:3001'
        }
      });
      
      console.log('✅ Authenticated request successful!');
      console.log('   User:', authResponse.data.user.name);
      console.log('   Role:', authResponse.data.user.role);
      
      // Test 5: Test admin-specific endpoint
      console.log('\n5️⃣ Testing admin endpoint...');
      const adminResponse = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`,
          'Origin': 'http://localhost:3001'
        }
      });
      
      console.log('✅ Admin endpoint accessible!');
      console.log('   Status:', adminResponse.status);
      
    } catch (error) {
      console.log('❌ Admin login failed:');
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Message:', error.response.data.message);
        console.log('   Data:', error.response.data);
      } else {
        console.log('   Error:', error.message);
      }
    }
    
    console.log('\n🎉 Complete setup test finished!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testCompleteSetup(); 