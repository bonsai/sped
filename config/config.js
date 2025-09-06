const fs = require('fs').promises;
const path = require('path');

async function readGeminiConfig() {
    try {
        const geminiConfigPath = path.join(__dirname, 'gemini.txt');
        const configContent = await fs.readFile(geminiConfigPath, 'utf8');
        
        // 設定ファイルの内容をパースするロジックをここに追加
        // 例: キー=値 形式の設定ファイルを想定
        const config = {};
        const lines = configContent.split('\n');
        
        for (const line of lines) {
            // コメント行と空行をスキップ
            if (!line.trim() || line.startsWith('#')) continue;
            
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                config[key.trim()] = valueParts.join('=').trim();
            }
        }
        
        return config;
    } catch (error) {
        console.error('❌ gemini.txtの読み込み中にエラーが発生しました:', error);
        throw error;
    }
}

// 環境変数に設定をセット
async function setupGeminiConfig() {
    try {
        const config = await readGeminiConfig();
        
        // 環境変数に設定をセット
        for (const [key, value] of Object.entries(config)) {
            if (!process.env[key]) {
                process.env[key] = value;
                console.log(`✅ 環境変数に設定しました: ${key}=${value.replace(/./g, '*')}`);
            }
        }
        
        return config;
    } catch (error) {
        console.error('❌ 設定のセットアップ中にエラーが発生しました:', error);
        throw error;
    }
}

module.exports = {
    readGeminiConfig,
    setupGeminiConfig
};
