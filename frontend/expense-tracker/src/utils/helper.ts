// Validate email format
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get initials from full name (first letter of first two words)
export const getInitials = (name: string): string => {
  if (!name) return "";

  const words = name.trim().split(" "); 
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i].length > 0) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};

// Add thousands separator to numbers
export const addThousandsSeparator = (num: number | null | undefined): string => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};