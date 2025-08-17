// Simple Auth Service for Mock mode
class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  async initialize() {
    // יצירת משתמש דמה
    this.user = {
      id: 'mock_user_' + Date.now(),
      name: 'שחקן אורח',
      type: 'guest'
    };
    this.isAuthenticated = true;
    console.log('Auth Service initialized:', this.user);
    return { success: true, user: this.user };
  }

  async getAuthToken() {
    if (!this.isAuthenticated) {
      await this.initialize();
    }
    return 'mock_token_' + Date.now();
  }

  getCurrentUser() {
    return this.user;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  async logout() {
    this.isAuthenticated = false;
    this.user = null;
    return { success: true };
  }
}

export const authService = new AuthService();
