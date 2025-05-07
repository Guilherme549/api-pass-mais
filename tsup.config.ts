import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/app.ts', 'src/server.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['@prisma/client'],
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});