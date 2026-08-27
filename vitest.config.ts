import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@app': path.resolve(import.meta.dirname, './src/app'),
      '@features': path.resolve(import.meta.dirname, './src/features'),
      '@shared': path.resolve(import.meta.dirname, './src/shared'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    clearMocks: true,
    restoreMocks: true,

    include: ['tests/**/*.test.{ts,tsx}'],

    exclude: [
      'e2e/**',
      'node_modules/**',
      'dist/**',
    ],
  },
});