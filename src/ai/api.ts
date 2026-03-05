import { AISettings, AIResponse, AIPingResponse } from './types';
import { systemPrompts } from './systemPrompts';

export class AIApi {
  private settings: AISettings;

  constructor(settings: AISettings) {
    this.settings = settings;
  }

  private async makeRequest(messages: { role: string; content: string }[]): Promise<AIResponse> {
    const url = this.settings.url;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.settings.key}`,
        },
        body: JSON.stringify({
          model: this.settings.model,
          messages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI API request failed:', error);
      throw error;
    }
  }

  async ping(): Promise<AIPingResponse> {
    try {
      const response = await this.makeRequest([
        { role: 'system', content: systemPrompts.ping },
        { role: 'user', content: 'Ping test' },
      ]);

      return {
        success: true,
        message: response.choices[0]?.message?.content || 'API connection successful',
        model: response.model,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async generateArticle(topic: string): Promise<string> {
    const response = await this.makeRequest([
      { role: 'system', content: systemPrompts.articleGeneration },
      { role: 'user', content: topic },
    ]);

    return response.choices[0]?.message?.content || '';
  }

  async getSentenceFeedback(sentence: string): Promise<string> {
    const response = await this.makeRequest([
      { role: 'system', content: systemPrompts.sentenceFeedback },
      { role: 'user', content: sentence },
    ]);

    return response.choices[0]?.message?.content || '';
  }

  async generateExampleSentences(word: string): Promise<string> {
    const response = await this.makeRequest([
      { role: 'system', content: systemPrompts.exampleSentence },
      { role: 'user', content: word },
    ]);

    return response.choices[0]?.message?.content || '';
  }
}