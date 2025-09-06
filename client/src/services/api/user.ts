const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class UserApiService {
  static async getUserProfile(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  static async updateUserProfile(userId: string, profileData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }

  static async getUserStats(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  }
}

