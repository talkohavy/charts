import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  root: `${process.cwd()}/src`, // <--- defaults to process.cwd(). where the index.html is located.
  plugins: [react(), libInjectCss()],
  server: { open: true, port: 3001, strictPort: true },
  preview: { open: false, port: 3001, strictPort: true },
  build: {
    copyPublicDir: false, // <--- defaults to `true`
    emptyOutDir: false, // <--- defaults to `true`
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts', 'lib/**/*.stories.tsx'],
          })
          .map((file) => [
            // Step 1: The name of the entry point lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // Step 2: The absolute path to the entry file lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
