import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

function removeModuleAttributePlugin() {
  return {
    name: 'remove-module-attribute',
    enforce: 'post',
    transformIndexHtml(html) {
      let cleaned = html.replace(/<script type="module" crossorigin>/g, '<script>').replace(/<script type="module">/g, '<script>');
      cleaned = cleaned.replace(/\(function\(\)\{const e=document\.createElement\("link"\)\.relList;[\s\S]*?fetch\(i\.href,s\)\}\}\)\(\);/g, '');
      return cleaned;
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false, removeCRLF: true }), removeModuleAttributePlugin()],
  build: {
    modulePreload: false,
    target: 'es2015',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'WebTHCSDongTanApp',
        inlineDynamicImports: true
      }
    }
  },
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
