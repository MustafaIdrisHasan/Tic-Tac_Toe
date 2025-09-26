// Utility helper functions

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls to once per specified time
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get random element from array
 */
export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deep clone an object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Check if device is mobile
 */
export function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Check if device supports touch
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get URL parameters
 */
export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to kebab-case
 */
export function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Check if object is empty
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Clamp number between min and max
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * Check if arrays are equal
 */
export function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates(array) {
  return [...new Set(array)];
}

/**
 * Group array elements by key
 */
export function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}
