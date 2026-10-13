declare module '*.css';

declare namespace chrome {
  namespace runtime {
    function openOptionsPage(): Promise<void>;
    function sendMessage(message: unknown): Promise<unknown>;
    const onMessage: { addListener(callback: (message: unknown, sender: unknown, sendResponse: (response: unknown) => void) => boolean | void): void };
  }
}
