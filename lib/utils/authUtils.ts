// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 chars, should have uppercase, lowercase, and number)
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

// Get password strength message
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; message: string } => {
  if (password.length < 6) return { strength: 'weak', message: 'Password too short (min 6 characters)' };
  if (!/[A-Z]/.test(password)) return { strength: 'weak', message: 'Add uppercase letters' };
  if (!/[a-z]/.test(password)) return { strength: 'weak', message: 'Add lowercase letters' };
  if (!/\d/.test(password)) return { strength: 'weak', message: 'Add numbers' };
  
  if (password.length >= 8) return { strength: 'strong', message: 'Strong password' };
  return { strength: 'medium', message: 'Medium strength password' };
};

// Phone number validation (Indian format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 3 && !/[^a-zA-Z\s]/.test(name);
};

// Password match validation
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `+91 ${cleaned}`;
};

// Auth storage utilities
export const saveAuthToStorage = (user: any) => {
  localStorage.setItem('auth_user', JSON.stringify(user));
  localStorage.setItem('auth_token', `token_${Date.now()}`);
  localStorage.setItem('auth_timestamp', Date.now().toString());
};

export const getAuthFromStorage = () => {
  try {
    const user = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    return user && token ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem('auth_user');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_timestamp');
};

// User storage utilities
export const saveUserToStorage = (user: any) => {
  const users = JSON.parse(localStorage.getItem('healthcare_users') || '[]');
  const existingIndex = users.findIndex((u: any) => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...user };
  } else {
    users.push(user);
  }
  
  localStorage.setItem('healthcare_users', JSON.stringify(users));
};

export const getUserFromStorage = (email: string) => {
  const users = JSON.parse(localStorage.getItem('healthcare_users') || '[]');
  return users.find((u: any) => u.email === email);
};

export const verifyUserCredentials = (email: string, password: string): any => {
  const user = getUserFromStorage(email);
  if (!user) return null;
  
  // Simple password verification (in real app, use bcrypt on backend)
  if (user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};
