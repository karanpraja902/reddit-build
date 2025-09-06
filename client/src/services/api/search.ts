const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class SearchApiService {
  static async webSearch(query: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform web search');
      }

      return await response.json();
    } catch (error) {
      console.error('Web search error:', error);
      throw error;
    }
  }

  static async scrapeWebpage(url: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/search/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to scrape webpage');
      }

      return await response.json();
    } catch (error) {
      console.error('Web scraping error:', error);
      throw error;
    }
  }
}

