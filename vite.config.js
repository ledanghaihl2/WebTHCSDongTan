import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

function removeModuleAttributePlugin() {
  return {
    name: 'remove-module-attribute',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(/<script type="module" crossorigin>/g, '<script>').replace(/<script type="module">/g, '<script>');
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), removeModuleAttributePlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});



