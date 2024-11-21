import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import typescript from 'rollup-plugin-typescript2';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    typescript({
      check: false,
      tsconfig: './tsconfig.app.json', // Use the correct tsconfig file
      useTsconfigDeclarationDir: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'MyUiLibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `my-ui-library.${format}.js`, // Use .js for outputs
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
