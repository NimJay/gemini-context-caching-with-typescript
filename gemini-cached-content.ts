/*
This file contains methods that interface with Gemini models on Vertex AI (Google Cloud).
*/

import { CachedContent, VertexAI } from "@google-cloud/vertexai";

async function createCachedContent(
  projectId: string, location: string, modelVersion: string, content: string,
): Promise<CachedContent> {
  const vertexAI = new VertexAI({ project: projectId, location: location });
  const cachedContent: CachedContent = {
    displayName: 'My cached content',
    model: `projects/${projectId}/locations/${location}/publishers/google/models/${modelVersion}`,
    systemInstruction: '',
    contents: [
      { role: 'USER', parts: [{ text: content }] },
    ],
    ttl: 3600 * 3 + 's', // TTL (time-to-live) is 3 hours
  }
  const createdCachedContent = await vertexAI.preview.cachedContents.create(cachedContent);
  if (!createdCachedContent || !createdCachedContent.name) {
    throw new Error('Failed to create CachedContent.');
  }
  return createdCachedContent;
}

async function generateContent(
  projectId: string, location: string, modelVersion: string, cachedContent: CachedContent, prompt: string,
): Promise<string | undefined> {
  const vertexAI = new VertexAI({ project: projectId, location: location });
  const modelFromCache = vertexAI.preview.getGenerativeModelFromCachedContent(
    cachedContent,
    { model: modelVersion },
  );
  const result = await modelFromCache.generateContent({
    contents: [{ role: 'USER', parts: [{ text: prompt }] }],
  });
  if (result && result.response && result.response.candidates && result.response.candidates[0]) {
    return result.response.candidates[0].content.parts[0].text;
  }
  return undefined;
}

export { createCachedContent, generateContent };
