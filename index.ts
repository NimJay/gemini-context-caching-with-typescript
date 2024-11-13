/*
This is where it all starts (the code invoked by "npm start").
*/

import { createCachedContent, generateContent } from './gemini-cached-content';
import fs from 'fs';

const PROJECT_ID = 'nimjay-playground-3';
const LOCATION = 'us-central1';
const MODEL_VERSION = 'gemini-1.5-flash-002';

async function main() {
  console.log('Running demo...');
  const allFileContentsOfRepo = fs.readFileSync(
    'all-file-contents-terraform-ecommerce-microservices-on-gke.txt', { encoding: 'utf8' },
  );
  const textToCache = `You are a software engineer. Your goal is to answer questions about a codebase.
Here are the contents of the files in the codebase:
${allFileContentsOfRepo}`;
  const cachedContent = await createCachedContent(
    PROJECT_ID, LOCATION, MODEL_VERSION, textToCache,
  );
  console.log(`Created CachedContent with name: ${cachedContent.name}`);
  console.log('Asking Gemini a question using the CachedContent...');
  const generatedContent = await generateContent(
    PROJECT_ID, LOCATION, MODEL_VERSION, cachedContent, 'Summarize the contents of this codebase.',
  );
  console.log({ generatedContent });
}

main();
