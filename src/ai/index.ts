import { AIApi } from './api';
import { systemPrompts } from './systemPrompts';
import { AISettings, AIResponse, AIPingResponse } from './types';

export { AIApi, systemPrompts, AISettings, AIResponse, AIPingResponse };

// 工具函数：创建 AI 实例
export function createAI(settings: AISettings) {
  return new AIApi(settings);
}

// 工具函数：快速 ping 测试
export async function pingAI(settings: AISettings) {
  const ai = new AIApi(settings);
  return ai.ping();
}