'use client';

export const ADMIN_EMAIL = 'admin@faxacademy.com';
export const ADMIN_PASSWORD = 'admin123!@#';

export const checkAdminAuth = () => {
  return typeof window !== 'undefined' && 
    (localStorage.getItem('adminAuthenticated') === 'true' ||
    document.cookie.includes('adminAuthenticated=true'));
};

export const loginAdmin = (email: string, password: string) => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuthenticated', 'true');
    document.cookie = 'adminAuthenticated=true; path=/';
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminAuthenticated');
  document.cookie = 'adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};