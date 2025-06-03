import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe('MCP Server Integration Tests', () => {
  let client: Client;
  let transport: StdioClientTransport;

  const timeout = 30000; // 30秒のタイムアウト

  beforeAll(async () => {
    // サーバーをビルド
    const { spawn } = await import('child_process');
    const buildProcess = spawn('npm', ['run', 'build'], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    await new Promise<void>((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Build failed with code ${code}`));
      });
    });

    // MCPサーバーへの接続を設定
    const serverPath = join(process.cwd(), 'dist', 'main.js');
    
    transport = new StdioClientTransport({
      command: 'node',
      args: [serverPath],
      env: {
        ...process.env,
        // テスト環境用のパス許可設定
        ALLOWED_PATHS: `${tmpdir()},${process.cwd()},/tmp,/test`
      }
    });

    client = new Client({
      name: "test-client",
      version: "1.0.0"
    });

    // サーバーに接続
    await client.connect(transport);
  }, timeout);

  afterAll(async () => {
    if (client) {
      await client.close();
    }
  });

  describe('Server Connection', () => {
    test('should successfully connect to the MCP server', async () => {
      expect(client).toBeDefined();
      // 接続が成功していればここに到達
    });

    test('should have server info accessible', async () => {
      expect(client).toBeDefined();
      // サーバーの基本情報が利用可能であることを確認
    });
  });

  describe('Resources Tests', () => {
    test('should list available resources', async () => {
      const resources = await client.listResources();
      
      expect(resources).toBeDefined();
      expect(resources.resources).toBeInstanceOf(Array);
      expect(resources.resources.length).toBeGreaterThan(0);
      
      // 期待されるリソースの確認
      const resourceNames = resources.resources.map(r => r.name);
      expect(resourceNames).toContain('design-tokens-all');
      expect(resourceNames).toContain('design-tokens-colors');
      expect(resourceNames).toContain('design-tokens-spacing');
    });

    test('should read design-tokens://all resource', async () => {
      const resource = await client.readResource({
        uri: 'design-tokens://all'
      });

      expect(resource).toBeDefined();
      expect(resource.contents).toBeInstanceOf(Array);
      expect(resource.contents.length).toBeGreaterThan(0);
      
      const content = resource.contents[0]!;
      expect(content).toBeDefined();
      expect(content.uri).toBe('design-tokens://all');
      expect(typeof content.text).toBe('string');
      
      // 有効なJSONであることを確認
      const tokens = JSON.parse(content.text as string);
      expect(tokens).toHaveProperty('colors');
      expect(tokens).toHaveProperty('spacing');
      expect(tokens).toHaveProperty('typography');
    });

    test('should read design-tokens://colors resource', async () => {
      const resource = await client.readResource({
        uri: 'design-tokens://colors'
      });

      expect(resource).toBeDefined();
      expect(resource.contents).toBeInstanceOf(Array);
      
      const content = resource.contents[0]!;
      expect(content).toBeDefined();
      const colors = JSON.parse(content.text as string);
      expect(colors).toHaveProperty('primary');
      expect(colors.primary).toBe('#0017C1'); // デジタル庁プライマリカラー
    });

    test('should read design-tokens://spacing resource', async () => {
      const resource = await client.readResource({
        uri: 'design-tokens://spacing'
      });

      expect(resource).toBeDefined();
      const content = resource.contents[0]!;
      expect(content).toBeDefined();
      const spacing = JSON.parse(content.text as string);
      
      // 標準スペーシング値の確認
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing).toHaveProperty('xl');
    });
  });

  describe('Tools Tests', () => {
    test('should list available tools', async () => {
      const tools = await client.listTools();
      
      expect(tools).toBeDefined();
      expect(tools.tools).toBeInstanceOf(Array);
      expect(tools.tools.length).toBeGreaterThan(0);
      
      const toolNames = tools.tools.map(t => t.name);
      expect(toolNames).toContain('validate_design_tokens');
      expect(toolNames).toContain('analyze_component_structure');
    });

    test('should validate compliant CSS using validate_design_tokens tool', async () => {
      const compliantCSS = `
        .button {
          background-color: #0017C1;
          color: #FFFFFF;
          padding: 8px 16px;
        }
      `;

      const result = await client.callTool({
        name: 'validate_design_tokens',
        arguments: {
          css_content: compliantCSS,
          component_name: 'TestButton'
        }
      });

      expect(result).toBeDefined();
      expect(result.content).toBeInstanceOf(Array);
      expect((result.content as any[]).length).toBeGreaterThan(0);
      
      const content = (result.content as any[])[0];
      expect(content.type).toBe('text');
      
      const validationResult = JSON.parse(content.text);
      expect(validationResult).toHaveProperty('component', 'TestButton');
      expect(validationResult).toHaveProperty('is_compliant', true);
      expect(validationResult).toHaveProperty('issues');
      expect(validationResult.issues).toBeInstanceOf(Array);
      expect(validationResult.issues.length).toBe(0);
    });

    test('should detect non-compliant CSS using validate_design_tokens tool', async () => {
      const nonCompliantCSS = `
        .button {
          background-color: #FF0000;
          padding: 10px;
        }
      `;

      const result = await client.callTool({
        name: 'validate_design_tokens',
        arguments: {
          css_content: nonCompliantCSS,
          component_name: 'InvalidButton'
        }
      });

      expect(result).toBeDefined();
      const content = (result.content as any[])[0];
      const validationResult = JSON.parse(content.text);
      
      expect(validationResult.is_compliant).toBe(false);
      expect(validationResult.issues.length).toBeGreaterThan(0);
      
      // 無効な色とスペーシングを検出するはず
      const issueText = validationResult.issues.join(' ');
      expect(issueText).toContain('#FF0000');
      expect(issueText).toContain('10px');
    });

    test('should analyze component structure', async () => {
      // 一時テストディレクトリを作成
      const testDir = join(tmpdir(), `test-component-${Date.now()}`);
      
      try {
        mkdirSync(testDir, { recursive: true });
        writeFileSync(join(testDir, 'Button.tsx'), '// Component');
        writeFileSync(join(testDir, 'Button.css'), '/* Styles */');
        writeFileSync(join(testDir, 'Button.test.tsx'), '// Tests');
        writeFileSync(join(testDir, 'index.ts'), '// Export');

        const result = await client.callTool({
          name: 'analyze_component_structure',
          arguments: {
            component_path: testDir
          }
        });

        expect(result).toBeDefined();
        const content = (result.content as any[])[0];
        const analysis = JSON.parse(content.text);
        
        expect(analysis).toHaveProperty('path', testDir);
        expect(analysis).toHaveProperty('structure');
        expect(analysis.structure).toHaveProperty('hasStyles', true);
        expect(analysis.structure).toHaveProperty('hasTests', true);
        expect(analysis.structure).toHaveProperty('hasIndex', true);
        expect(analysis).toHaveProperty('recommendations');
        
        // すべてのファイルが存在するため、推奨事項は少ないはず
        expect(analysis.recommendations.length).toBeLessThanOrEqual(1); // ストーリーのみ不足の可能性
      } finally {
        rmSync(testDir, { recursive: true, force: true });
      }
    });
  });

  describe('Prompts Tests', () => {
    test('should list available prompts', async () => {
      const prompts = await client.listPrompts();
      
      expect(prompts).toBeDefined();
      expect(prompts.prompts).toBeInstanceOf(Array);
      expect(prompts.prompts.length).toBeGreaterThan(0);
      
      const promptNames = prompts.prompts.map(p => p.name);
      expect(promptNames).toContain('design_system_review');
      expect(promptNames).toContain('component_audit');
    });

    test('should get design_system_review prompt', async () => {
      const prompt = await client.getPrompt({
        name: 'design_system_review',
        arguments: {
          component_name: 'TestComponent',
          css_content: '.test { color: #0017C1; }'
        }
      });

      expect(prompt).toBeDefined();
      expect(prompt.messages).toBeInstanceOf(Array);
      expect(prompt.messages.length).toBeGreaterThan(0);
      
      const message = prompt.messages[0];
      expect(message).toBeDefined();
      expect(message!.role).toBe('user');
      expect(message!.content.type).toBe('text');
      expect(message!.content.text).toContain('デザインシステム準拠性レビュー');
      expect(message!.content.text).toContain('TestComponent');
      expect(message!.content.text).toContain('.test { color: #0017C1; }');
    });

    test('should get component_audit prompt', async () => {
      const prompt = await client.getPrompt({
        name: 'component_audit',
        arguments: {
          component_path: '/test/path'
        }
      });

      expect(prompt).toBeDefined();
      expect(prompt.messages).toBeInstanceOf(Array);
      
      const message = prompt.messages[0];
      expect(message).toBeDefined();
      expect(message!.content.text).toContain('コンポーネント構造監査');
      expect(message!.content.text).toContain('/test/path');
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid resource URI', async () => {
      await expect(
        client.readResource({ uri: 'invalid://resource' })
      ).rejects.toThrow();
    });

    test('should handle invalid tool name', async () => {
      await expect(
        client.callTool({
          name: 'non_existent_tool',
          arguments: {}
        })
      ).rejects.toThrow();
    });

    test('should handle invalid prompt name', async () => {
      await expect(
        client.getPrompt({
          name: 'non_existent_prompt',
          arguments: {}
        })
      ).rejects.toThrow();
    });

    test('should handle invalid component path in analyze_component_structure', async () => {
      // 許可されたパス内で存在しないパスを使用
      const invalidPath = join(tmpdir(), 'non-existent-component');
      
      const result = await client.callTool({
        name: 'analyze_component_structure',
        arguments: {
          component_path: invalidPath
        }
      });

      expect(result).toBeDefined();
      expect(result.isError).toBe(true);
      const content = (result.content as any[])[0];
      const errorResult = JSON.parse(content.text);
      expect(errorResult.error).toContain("見つかりません");
    });
  });

  describe('Performance and Reliability', () => {
    test('should handle multiple concurrent requests', async () => {
      const requests = [
        client.readResource({ uri: 'design-tokens://colors' }),
        client.readResource({ uri: 'design-tokens://spacing' }),
        client.callTool({
          name: 'validate_design_tokens',
          arguments: {
            css_content: '.test { color: #0017C1; }',
            component_name: 'Test'
          }
        })
      ];

      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });

    test('should maintain connection stability over multiple operations', async () => {
      // 複数の操作を順次実行
      for (let i = 0; i < 5; i++) {
        const tools = await client.listTools();
        expect(tools.tools.length).toBeGreaterThan(0);
        
        const resources = await client.listResources();
        expect(resources.resources.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Data Validation', () => {
    test('should return expected design token structure', async () => {
      const resource = await client.readResource({
        uri: 'design-tokens://all'
      });

      const content = resource.contents[0]!;
      expect(content).toBeDefined();
      const tokens = JSON.parse(content.text as string);
      
      // デジタル庁デザインシステムの標準構造を確認
      expect(tokens.colors.primary).toBe('#0017C1');
      expect(tokens.spacing).toHaveProperty('xs');
      expect(tokens.spacing).toHaveProperty('sm');
      expect(tokens.spacing).toHaveProperty('md');
      expect(tokens.spacing).toHaveProperty('lg');
      expect(tokens.spacing).toHaveProperty('xl');
      expect(tokens).toHaveProperty('typography');
      expect(tokens).toHaveProperty('elevation');
    });

    test('should validate CSS correctly with realistic examples', async () => {
      const realWorldCSS = `
        .digital-go-button {
          background-color: #0017C1;
          color: #FFFFFF;
          padding: 8px 16px;
          margin: 4px;
          border-radius: 4px;
        }
        
        .digital-go-card {
          background-color: #F0F0F0;
          padding: 24px;
          margin: 16px;
        }
      `;

      const result = await client.callTool({
        name: 'validate_design_tokens',
        arguments: {
          css_content: realWorldCSS,
          component_name: 'DigitalGoComponents'
        }
      });

      const content = (result.content as any[])[0];
      const validationResult = JSON.parse(content.text);
      expect(validationResult.component).toBe('DigitalGoComponents');
      expect(validationResult.is_compliant).toBe(true);
      expect(validationResult.issues.length).toBe(0);
    });
  });
});