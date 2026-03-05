export interface AISettings {
  url: string;
  key: string;
  model: string;
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AIPingResponse {
  success: boolean;
  message: string;
  model?: string;
}