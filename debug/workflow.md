# Java Project Manager - Workflow Documentation

## Overview
This document outlines the workflow for using the Java Project Manager system, which includes generating OpenAPI specifications and managing Java projects through a VSCode extension.

## Prerequisites
- Node.js 18+
- Gemini API Key
- VSCode (for the extension)

## Setup

### 1. Environment Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `gemini.txt` file with your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Workflow

### 1. Generate OpenAPI Specification
1. Add your project requirements to `want.md`
2. Run the generator:
   ```bash
   node sped.js generate
   ```
3. The OpenAPI spec will be generated at `spec/generated/openapi.yml`

### 2. Validate the Specification
Use the CLI to validate the generated OpenAPI specification:
```bash
node sped.js validate
```

### 3. Generate Client Code
Generate a TypeScript client from your API specification:
```bash
node sped.js generate:client
```
This will create a TypeScript client in `src/client` that you can use in your frontend.

### 4. Generate Server Code
Generate a Node.js Express server from your API specification:
```bash
node sped.js generate:server
```
This will create a server implementation in `src/server` that you can extend with your business logic.

### 3. Available Commands

| Command | Description |
|---------|-------------|
| `node sped.js generate` | Generate OpenAPI specification from requirements |
| `node sped.js validate` | Validate the generated OpenAPI specification |
| `node sped.js generate:client` | Generate TypeScript client code |
| `node sped.js generate:server` | Generate Node.js Express server code |
| `node sped.js setup` | Setup development environment |

## Code Generation

### Client Usage (TypeScript)
```typescript
import { DefaultApi } from './src/client';

const api = new DefaultApi();
const project = await api.getProject();
```

### Server Implementation
1. After generating the server, implement the controller methods in `src/server/controllers`
2. Start the server:
   ```bash
   cd src/server
   npm install
   npm start
   ```

## Integration with VSCode Extension
1. Install the Java Project Manager extension in VSCode
2. Configure the extension to point to your API server
3. Use the command palette to access project management features

## Development Workflow
1. Make changes to the code
2. Run tests:
   ```bash
   npm test
   ```
3. Generate updated documentation:
   ```bash
   node scripts/generate-openapi.js
   ```

## Troubleshooting
- **API Key Issues**: Ensure your `gemini.txt` contains a valid API key
- **Model Not Found**: Verify you're using a valid model name in `generate-openapi.js`
- **Validation Errors**: Check the OpenAPI specification for syntax errors

## Best Practices
1. Keep `want.md` updated with current requirements
2. Commit generated OpenAPI specs to version control
3. Document any API changes in the specification

## Support
For issues and feature requests, please open an issue in the repository.
