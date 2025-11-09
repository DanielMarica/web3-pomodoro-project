export const API_ENDPOINTS = {
  // Sessions
  sessions: '/sessions',
  sessionById: (id: string) => `/sessions/${id}`,
  sessionStats: '/sessions/stats',
  
  // Tasks
  tasks: '/tasks',
  taskById: (id: string) => `/tasks/${id}`,
  
  // User (si besoin d'auth plus tard)
  user: '/user',
  login: '/auth/login',
  register: '/auth/register',
} as const;
