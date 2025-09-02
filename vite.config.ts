import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  ssr: {
    noExternal: true,
  },
  optimizeDeps: {
    exclude: ['@prisma/client'],
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          include: ['src/http/controllers/**/**.spec.ts'],
          environment: 'prisma',
        },
      },
      {
        extends: true,
        test: {
          include: ['src/services/**.spec.ts'],
          environment: 'node',
        },
      },
    ],
  },
})
