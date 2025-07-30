require('dotenv').config();
const axios = require('axios');

const testLoginAPI = async () => {
  try {
    console.log('🧪 Testing Login API...');
    
    const loginData = {
      email: 'admin@123gmail.com',
      password: 'admin@123'
    };
    
    console.log('📤 Sending login request...');
    console.log('   Email:', loginData.email);
    console.log('   Password:', loginData.password);
    
    const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login successful!');
    console.log('📊 Response status:', response.status);
    console.log('🎫 Token received:', response.data.token ? 'Yes' : 'No');
    console.log('👤 User data:', {
      id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role
    });
    
    // Test the token by making an authenticated request
    console.log('\n🔐 Testing authenticated request...');
    const authResponse = await axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${response.data.token}`
      }
    });
    
    console.log('✅ Authenticated request successful!');
    console.log('👤 Current user:', authResponse.data.user.name);
    
  } catch (error) {
    console.error('❌ Login test failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data.message);
      console.error('   Data:', error.response.data);
    } else if (error.request) {
      console.error('   Network error - is the server running?');
    } else {
      console.error('   Error:', error.message);
    }
  }
};

testLoginAPI(); 