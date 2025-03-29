// utils/auth.js
export const generateUserId = () => {
    return Math.random().toString(36).substr(2, 9); // Random string
  };
  