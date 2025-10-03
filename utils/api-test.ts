import axios from 'axios';
import { BASE_URL } from '../constants/api';

/**
 * Test API connectivity and endpoints
 */
export const testApiConnectivity = async () => {
  console.log('🔗 Testing API connectivity...');
  console.log('📡 Base URL:', BASE_URL);

  try {
    // Test basic connectivity
    console.log('⏱️ Testing basic connectivity...');
    const healthCheck = await axios.get(`${BASE_URL}/health`, { timeout: 10000 });
    console.log('✅ Health check passed:', healthCheck.status);
  } catch (error: any) {
    console.warn('⚠️ Health check failed:', error.message);
    
    // Try alternate health check
    try {
      const altHealthCheck = await axios.get(`${BASE_URL}/`, { timeout: 10000 });
      console.log('✅ Alternative health check passed:', altHealthCheck.status);
    } catch (altError: any) {
      console.error('❌ All health checks failed:', altError.message);
      return false;
    }
  }

  // Test specific endpoints
  const endpoints = [
    '/api/users/login',
    '/api/products/all',
    '/api/orders',
    '/api/cart/my-cart',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🔍 Testing endpoint: ${endpoint}`);
      const response = await axios.head(`${BASE_URL}${endpoint}`, { 
        timeout: 5000,
        validateStatus: (status) => status < 500 // Accept any status less than 500
      });
      console.log(`✅ ${endpoint}: ${response.status}`);
    } catch (error: any) {
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.error(`❌ ${endpoint}: Connection failed (${error.code})`);
        return false;
      } else {
        console.warn(`⚠️ ${endpoint}: ${error.response?.status || error.message}`);
      }
    }
  }

  return true;
};

/**
 * Test login endpoint specifically
 */
export const testLoginEndpoint = async (email: string = 'test@example.com', password: string = 'test123') => {
  console.log('🔐 Testing login endpoint...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, {
      email,
      password,
    }, { 
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Login test successful:', response.status);
    return true;
  } catch (error: any) {
    console.error('❌ Login test failed:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    console.error('Full error:', error.response?.data);
    return false;
  }
};

// Export for use in debugging
export const debugApi = {
  testConnectivity: testApiConnectivity,
  testLogin: testLoginEndpoint,
};