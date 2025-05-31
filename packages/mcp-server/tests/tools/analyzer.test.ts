import { StructureAnalyzer, FileAnalyzer } from '../../src/tools/analyze/analyzer';
import { mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('StructureAnalyzer', () => {
  let analyzer: StructureAnalyzer;
  let testDir: string;

  beforeEach(() => {
    analyzer = new StructureAnalyzer();
    testDir = join(tmpdir(), `test-component-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it('should detect all required files', () => {
    const componentName = testDir.split('/').pop() || 'TestComponent';
    
    // Create test files
    writeFileSync(join(testDir, `${componentName}.tsx`), '// Component');
    writeFileSync(join(testDir, `${componentName}.css`), '/* Styles */');
    writeFileSync(join(testDir, `${componentName}.test.tsx`), '// Tests');
    writeFileSync(join(testDir, `${componentName}.stories.tsx`), '// Stories');
    writeFileSync(join(testDir, 'index.ts'), '// Index');
    
    const result = analyzer.analyze(testDir);
    
    expect(result.hasStyles).toBe(true);
    expect(result.hasTests).toBe(true);
    expect(result.hasStories).toBe(true);
    expect(result.hasIndex).toBe(true);
    expect(result.files).toHaveLength(5);
  });

  it('should detect missing files', () => {
    writeFileSync(join(testDir, 'Component.tsx'), '// Component');
    
    const result = analyzer.analyze(testDir);
    
    expect(result.hasStyles).toBe(false);
    expect(result.hasTests).toBe(false);
    expect(result.hasStories).toBe(false);
    expect(result.hasIndex).toBe(false);
    expect(result.files).toHaveLength(1);
  });

  it('should handle non-existent directory', () => {
    const result = analyzer.analyze('/non/existent/path');
    
    expect(result.hasStyles).toBe(false);
    expect(result.hasTests).toBe(false);
    expect(result.hasStories).toBe(false);
    expect(result.hasIndex).toBe(false);
    expect(result.files).toEqual([]);
  });
});

describe('FileAnalyzer', () => {
  let analyzer: FileAnalyzer;
  let testDir: string;

  beforeEach(() => {
    analyzer = new FileAnalyzer();
    testDir = join(tmpdir(), `test-files-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it('should analyze file types correctly', () => {
    // Create various file types
    writeFileSync(join(testDir, 'Component.tsx'), '// Component');
    writeFileSync(join(testDir, 'Component.css'), '/* Styles */');
    writeFileSync(join(testDir, 'Component.test.tsx'), '// Test');
    writeFileSync(join(testDir, 'Component.stories.tsx'), '// Story');
    writeFileSync(join(testDir, 'README.md'), '# Readme');
    
    const result = analyzer.analyze(testDir);
    
    expect(result.files).toHaveLength(5);
    
    const filesByType = result.files.reduce((acc, file) => {
      acc[file.name] = file.type;
      return acc;
    }, {} as Record<string, string>);
    
    expect(filesByType['Component.tsx']).toBe('component');
    expect(filesByType['Component.css']).toBe('style');
    expect(filesByType['Component.test.tsx']).toBe('test');
    expect(filesByType['Component.stories.tsx']).toBe('story');
    expect(filesByType['README.md']).toBe('other');
  });

  it('should handle empty directory', () => {
    const result = analyzer.analyze(testDir);
    expect(result.files).toEqual([]);
  });
});