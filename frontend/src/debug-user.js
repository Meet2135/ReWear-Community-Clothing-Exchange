// Debug script to check user data
// Add this to your browser console after logging in

console.log('=== USER DEBUG INFO ===');

// Check localStorage
console.log('Token:', localStorage.getItem('token'));

// Check Redux state (if you have Redux DevTools)
// You can also check this in Redux DevTools extension

// Check if user object exists
const user = JSON.parse(localStorage.getItem('user') || 'null');
console.log('User from localStorage:', user);

// Check if role exists
if (user) {
  console.log('User role:', user.role);
  console.log('Is admin?', user.role === 'admin');
} else {
  console.log('No user found in localStorage');
}

// Test API call
fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('API Response:', data);
  if (data.success) {
    console.log('User role from API:', data.user.role);
    console.log('Is admin from API?', data.user.role === 'admin');
  }
})
.catch(err => console.error('API Error:', err)); 