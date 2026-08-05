export interface AIRequest {
  capability: string;
  promptVersion: string;
  input: Record<string, unknown>;
  sensitivity: 'low' | 'medium' | 'high';
}

export interface AIResponse {
  output: Record<string, unknown>;
  model: string;
  provider: string;
  requiresHumanReview: boolean;
}

export interface AIService {
  execute(request: AIRequest): Promise<AIResponse>;
}
