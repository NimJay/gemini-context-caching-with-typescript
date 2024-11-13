# Gemini's context caching with TypeScript

This TypeScript (on Node.js) codebase demonstrates how to use Gemini's context caching feature.
This demo uses a Gemini model through Google Cloud's [Vertex AI](https://cloud.google.com/vertex-ai).

To run this on your own machine:
1. Install the Node.js (JavaScript) dependencies: `npm install`
1. Compile the TypeScript code into JavaScript: `npm run compile-typescript`
1. In a separate terminal, run the demo: `npm run start`

## What is this demo?

In this demo, we cache the source code of an [example codebase](https://github.com/GoogleCloudPlatform/terraform-ecommerce-microservices-on-gke), and ask Gemini a question about that codebase:
```typescript
// Cache the source code of some codebase
const allFileContentsOfRepo = fs.readFileSync(
    'all-file-contents-terraform-ecommerce-microservices-on-gke.txt', { encoding: 'utf8' },
);
const textToCache = `You are a software engineer. Your goal is to answer questions about a codebase.
Here are the contents of the files in the codebase:
${allFileContentsOfRepo}`;
const cachedContent = await createCachedContent(
    PROJECT_ID, LOCATION, MODEL_VERSION, textToCache,
);

...

// Ask Gemini a question
const generatedContent = await generateContent(
    PROJECT_ID, LOCATION, MODEL_VERSION, cachedContent, 'Summarize the contents of this codebase.',
);
```

The output of this demo looks like:
```
Running demo...
Asking Gemini a question using the CachedContent...
{
  generatedContent: 'This codebase implements a Terraform module that deploys an e-commerce application (Cymbal Shops) across three Google Kubernetes Engine (GKE) clusters (two in the US, one in Europe) using Multi-Cluster Ingress.  The application consists of approximately ten microservices, each in its own repository.  The module manages the infrastructure, including the GKE clusters, networking (including a static IP address for public access), and a shared Redis database for shopping carts.\n' +
    '\n' +
    'The repository includes:\n' +
    '\n' +
    '* **Terraform code (in `infra/`):** This is the core of the module, defining the infrastructure as code.  It uses multiple providers (Google, Google Beta, Kubernetes, Helm) and manages resources like GKE clusters, networks, global IP addresses, service accounts, IAM bindings, GKE Hub memberships, and deploys Kubernetes manifests and Helm charts. The manifests deploy the microservices and related components to the GKE clusters.  A `simple_example` directory provides a minimal usage example.\n' +
    '\n' +
...
```

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
