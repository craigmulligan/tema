export const COLLECTIONS = {
  messages: 'messages',
  threads: 'threads',
  users: 'users',
  notifications: 'notifications'
}

export const API_URL = __DEV__
  ? `http://localhost:5001/dolos-1/us-central1/api`
  : 'https://us-central1-dolos-1.cloudfunctions.net/api'
