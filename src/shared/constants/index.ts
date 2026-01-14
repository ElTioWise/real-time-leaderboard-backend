export const CONSTANTS = {
  // JWT
  JWT_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  BCRYPT_SALT_ROUNDS: 10,

  // Rate Limiting
  THROTTLE_TTL: 60,
  THROTTLE_LIMIT: 10,
  THROTTLE_SEARCH_LIMIT: 30,
  THROTTLE_REGISTER_LIMIT: 5,
  THROTTLE_UPLOAD_LIMIT: 5,

  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
  COVER_IMAGE_DIMENSIONS: {
    width: 800,
    height: 1200,
  },

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
