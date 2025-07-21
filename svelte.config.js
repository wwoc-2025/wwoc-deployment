import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to detect repository name from Git or package.json
function detectRepoName() {
  try {
    // Try to get it from Git remote URL
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    
    // Parse the repo name from remote URL
    let repoName = '';
    
    if (remoteUrl.includes('github.com')) {
      // Handle GitHub URLs in various formats
      const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/);
      if (match && match[2]) {
        repoName = `/${match[2]}`;
      }
    }
    
    if (repoName) return repoName;
    
    // Fallback to package.json if Git doesn't work
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    if (packageJson.name) {
      return `/${packageJson.name.replace('@', '').replace('/', '-')}`;
    }
    
    return '';
  } catch (e) {
    console.warn('Could not auto-detect repository name:', e.message);
    return '';
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Add preprocess for TypeScript support
  preprocess: vitePreprocess(),
  kit: {
    // Configure the static adapter with a fallback for SPA routing
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false
    }),
    
    // Set the base path to match your repository name
    paths: {
      // Use an environment variable in production, empty string in development
      base: process.argv.includes('dev')
        ? ''
        : process.env.BASE_PATH || detectRepoName() || ''
    }
  }
};
export default config;
