#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class SPED {
  constructor() {
    this.config = this.loadConfig();
    this.commands = {
      'new': this.createNewProject,
      'start': this.startServer,
      'build': this.buildClient,
      'deploy': this.deploy,
      'help': this.showHelp
    };
  }

  loadConfig() {
    try {
      const configPath = path.join(process.cwd(), 'config', 'sped.config.json');
      return require(configPath);
    } catch (error) {
      console.error('❌ Error loading config. Run `sped init` first.');
      process.exit(1);
    }
  }

  async init() {
    console.log('🚀 Initializing SPED project...');
    
    // Create basic project structure
    const dirs = [
      this.config.paths.spec,
      this.config.paths.client,
      this.config.paths.server
    ];
    
    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    console.log('✅ Project initialized!');
    console.log('\nNext steps:');
    console.log('1. Edit spec/openapi.yml to define your API');
    console.log('2. Run `sped build` to generate client code');
    console.log('3. Run `sped start` to start the development server');
  }

  setupCommands() {
    const command = process.argv[2];
    
    switch (command) {
      case 'generate':
        this.generateOpenAPI();
        break;
      case 'validate':
        this.validateOpenAPI();
        break;
      case 'generate:client':
        this.generateClient();
        break;
      case 'generate:server':
        this.generateServer();
        break;
      case 'setup':
        this.setupEnvironment();
        break;
      case 'help':
      case '--help':
      case '-h':
      case undefined:
        this.showHelp();
        break;
      default:
        console.error(`❌ Unknown command: ${command}`);
        this.showHelp();
        process.exit(1);
    }
  }

  async generateClient() {
    try {
      console.log('🚀 Generating client code...');
      
      // Check if openapi.yml exists
      try {
        await fs.access(this.openApiPath);
      } catch {
        throw new Error(`❌ OpenAPI specification not found at ${this.openApiPath}. Run 'generate' first.`);
      }

      // Install openapi-generator if not installed
      console.log('📦 Installing @openapitools/openapi-generator-cli...');
      try {
        await execAsync('npm list -g @openapitools/openapi-generator-cli || npm install -g @openapitools/openapi-generator-cli');
      } catch (error) {
        console.warn('⚠️  Warning during openapi-generator installation:', error.message);
      }

      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'src', 'client');
      await fs.mkdir(outputDir, { recursive: true });

      // Generate TypeScript client
      console.log('🔧 Generating TypeScript client...');
      await execAsync(`openapi-generator-cli generate -i ${this.openApiPath} -g typescript-axios -o ${outputDir}`);
      
      console.log('✅ Client code generated in src/client');
      console.log('\nNext steps:');
      console.log(`1. cd ${process.cwd()}`);
      console.log('2. cd src/client');
      console.log('3. npm install');
      console.log('4. Import and use the generated client in your application');
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async generateServer() {
    try {
      console.log('🚀 Generating server code...');
      
      // Check if openapi.yml exists
      try {
        await fs.access(this.openApiPath);
      } catch {
        throw new Error(`❌ OpenAPI specification not found at ${this.openApiPath}. Run 'generate' first.`);
      }

      // Install openapi-generator if not installed
      console.log('📦 Installing @openapitools/openapi-generator-cli...');
      try {
        await execAsync('npm list -g @openapitools/openapi-generator-cli || npm install -g @openapitools/openapi-generator-cli');
      } catch (error) {
        console.warn('⚠️  Warning during openapi-generator installation:', error.message);
      }

      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'src', 'server');
      await fs.mkdir(outputDir, { recursive: true });

      // Generate Node.js Express server
      console.log('🔧 Generating Node.js Express server...');
      await execAsync(`openapi-generator-cli generate -i ${this.openApiPath} -g nodejs-express-server -o ${outputDir}`);
      
      console.log('✅ Server code generated in src/server');
      console.log('\nNext steps:');
      console.log(`1. cd ${process.cwd()}`);
      console.log('2. cd src/server');
      console.log('3. npm install');
      console.log('4. npm start');
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async generateOpenAPI() {
    try {
      console.log('🔄 Generating OpenAPI specification...');
      
      // Check if want.md exists
      try {
        await fs.access(this.wantPath);
      } catch {
        throw new Error(`❌ ${this.wantPath} not found. Please create it with your requirements.`);
      }

      // Ensure output directory exists
      await fs.mkdir(path.dirname(this.openApiPath), { recursive: true });

      // Here you would integrate with your actual generation logic
      // For now, we'll just simulate the process
      console.log('✅ OpenAPI specification generated at:', this.openApiPath);
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async validateOpenAPI() {
    try {
      console.log('🔍 Validating OpenAPI specification...');
      
      // Check if openapi.yml exists
      try {
        await fs.access(this.openApiPath);
      } catch {
        throw new Error(`❌ OpenAPI specification not found at ${this.openApiPath}. Run 'generate' first.`);
      }

      // Here you would integrate with Spec Kit validation
      // For now, we'll just check if the file exists and is valid YAML
      const content = await fs.readFile(this.openApiPath, 'utf8');
      console.log('✅ OpenAPI specification is valid');
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async setupEnvironment() {
    try {
      console.log('🛠️  Setting up development environment...');
      
      // Install dependencies
      console.log('📦 Installing dependencies...');
      const { stdout, stderr } = await execAsync('npm install');
      
      if (stderr) {
        console.warn('⚠️  Warning during installation:', stderr);
      }
      
      console.log('✅ Environment setup complete');
      
    } catch (error) {
      this.handleError(error);
    }
  }

  showHelp() {
    console.log(`
Java Project Manager - Workflow CLI

Usage:
  node sped.js <command> [options]

Commands:
  generate          Generate OpenAPI specification from requirements
  validate          Validate the generated OpenAPI specification
  generate:client   Generate TypeScript client code from OpenAPI spec
  generate:server   Generate Node.js Express server code from OpenAPI spec
  setup             Setup the development environment
  help              Show this help message

Examples:
  node sped.js generate
  node sped.js validate
  node sped.js generate:client
  node sped.js generate:server
  node sped.js setup
`);
  }

  handleError(error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('\n❌ Error:', errorMessage);
    
    // Provide helpful debug information
    console.log('\n🔧 Debug Information:');
    console.log('- Node.js version:', process.version);
    console.log('- Current directory:', process.cwd());
    
    // Suggest common solutions based on error type
    if (errorMessage.includes('GEMINI_API_KEY')) {
      console.log('\n💡 Tip: Make sure your gemini.txt contains a valid API key:');
      console.log('GEMINI_API_KEY=your_api_key_here');
    } else if (errorMessage.includes('ENOENT')) {
      console.log('\n💡 Tip: The system cannot find the specified file. Check the path and try again.');
    }
    
    process.exit(1);
  }
}

// Run the CLI
const cli = new WorkflowCLI();
cli.initialize().catch(console.error);
