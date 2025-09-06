const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ChatApiService {
  static async createChat(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      return await response.json();
    } catch (error) {
      console.error('Create chat error:', error);
      throw error;
    }
  }

  static async getChat(chatId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get chat');
      }

      return await response.json();
    } catch (error) {
      console.error('Get chat error:', error);
      throw error;
    }
  }

  static async getUserChats(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user chats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user chats error:', error);
      throw error;
    }
  }

  static async addMessage(chatId: string, role: string, content: string, files?: any[]) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, content, files }),
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }

      return await response.json();
    } catch (error) {
      console.error('Add message error:', error);
      throw error;
    }
  }

  static async updateChatTitle(chatId: string, title: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}/title`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chat title');
      }

      return await response.json();
    } catch (error) {
      console.error('Update chat title error:', error);
      throw error;
    }
  }

  static async deleteChat(chatId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete chat error:', error);
      throw error;
    }
  }

  static async getChatMessages(chatId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}/messages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get chat messages');
      }

      return await response.json();
    } catch (error) {
      console.error('Get chat messages error:', error);
      throw error;
    }
  }
}

