const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateOpenAPI() {
    try {
        const requirements = await fs.readFile('want.md', 'utf8');
        
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        const prompt = `
以下の要件からOpenAPI 3.0仕様を生成してください。

要件:
${requirements}

出力はYAML形式でお願いします。
- RESTfulなAPI設計
- 適切なHTTPステータスコード
- リクエスト/レスポンススキーマ定義
- 認証方式の考慮
        `;
        
        const result = await model.generateContent(prompt);
        const openApiSpec = result.response.text();
        
        // YAML部分のみ抽出
        const yamlMatch = openApiSpec.match(/```yaml\n([\s\S]*?)\n```/);
        const cleanedSpec = yamlMatch ? yamlMatch[1] : openApiSpec;
        
        await fs.writeFile('spec/generated/openapi.yml', cleanedSpec);
        console.log('✅ OpenAPI仕様を生成しました');
        
    } catch (error) {
        console.error('❌ エラー:', error);
        process.exit(1);
    }
}

generateOpenAPI();