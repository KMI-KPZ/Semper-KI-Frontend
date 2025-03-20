import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import EnvironmentPlugin from "vite-plugin-environment" 

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(),EnvironmentPlugin("all")],
  server: {
    open: false,
    port: 3000,
    // host: '127.0.0.1',
    host: '0.0.0.0',
    headers: {
      'Content-Security-Policy': "frame-ancestors 'self' http://127.0.0.1:3000 http://127.0.0.1:38080",
    },
  },
  build:{
    outDir: 'build',
  },   define: {
    __APP_VERSION__: JSON.stringify(Date.now()), // Use a timestamp to force reload
  }
});
