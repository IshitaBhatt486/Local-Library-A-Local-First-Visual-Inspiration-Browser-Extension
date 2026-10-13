export function toUserMessage(error: unknown): string { return error instanceof Error ? error.message : 'Something went wrong. Please try again.'; }
export function reportError(error: unknown, context: string): void { console.error(`[${context}]`, error); }
