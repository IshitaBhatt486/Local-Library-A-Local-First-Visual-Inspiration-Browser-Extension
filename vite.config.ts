import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: { popup: 'src/entrypoints/popup/index.html', options: 'src/entrypoints/options/index.html', library: 'src/entrypoints/library/index.html', background: 'src/entrypoints/background/index.ts', content: 'src/entrypoints/content/index.ts' },
      output: { entryFileNames: 'assets/[name].js', chunkFileNames: 'assets/[name]-[hash].js', assetFileNames: 'assets/[name]-[hash][extname]' },
    },
  },
});
