import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      // Section behaviours attach DOM listeners on mount, so reload fully
      // instead of hot-swapping components (avoids stale/duplicated listeners).
      name: 'full-reload-on-js',
      handleHotUpdate({ file, server }) {
        if (/\.(jsx?|tsx?)$/.test(file)) {
          server.ws.send({ type: 'full-reload' });
          return [];
        }
      },
    },
  ],
});
