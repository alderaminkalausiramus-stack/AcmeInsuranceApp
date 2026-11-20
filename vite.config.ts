import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/bundler-plugins/vite';
import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const release =
    env.VITE_SENTRY_RELEASE ||
    (env.VERCEL_GIT_COMMIT_SHA
      ? `${packageJson.name}@${env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)}`
      : `${packageJson.name}@${packageJson.version}`);

  return {
    define: {
      __APP_RELEASE__: JSON.stringify(release),
    },
    build: {
      sourcemap: 'hidden',
    },
    plugins: [
      react(),
      // Put the Sentry Vite plugin after all other plugins.
      // Uploads source maps automatically during production builds when SENTRY_AUTH_TOKEN is set.
      ...(env.SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              org: 'mercor-dv',
              project: 'acme-insurance',
              authToken: env.SENTRY_AUTH_TOKEN,
              release: {
                name: release,
              },
              sourcemaps: {
                filesToDeleteAfterUpload: ['./dist/**/*.map'],
              },
            }),
          ]
        : []),
    ],
  };
});
