# Gemini's context caching with TypeScript

This TypeScript (on Node.js) codebase demonstrates how to use Gemini's context caching feature. 
This demo uses a Gemini model through Google Cloud's [Vertex AI](https://cloud.google.com/vertex-ai).

To run this on your own machine:
1. Install the Node.js (JavaScript) dependencies: `npm install`
1. Compile the TypeScript code into JavaScript: `npm run compile-typescript`
1. In a separate terminal, run the demo: `npm run start`

## Check or fix code style

We use ESLint to enforce consistent code style.
ESLint is configured inside `eslint.config.js`.
Reminder: It's not about adopting the "right" code styles, it about being consistent.

To check code style using ESLint, run:
```
npm run check-code-style
```

To fix some of the issues raised by ESLint, run:
```
npm run fix-code-style
```

Each file should contain a comment summarizing the purpose of the file to someone new to the file.
