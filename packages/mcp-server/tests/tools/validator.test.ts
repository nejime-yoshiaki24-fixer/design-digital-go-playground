import { DesignTokenValidator } from '../../src/tools/validate/validator';

describe('DesignTokenValidator', () => {
  let validator: DesignTokenValidator;

  beforeEach(() => {
    const validColors = new Set(['#0017C1', '#1A1A1C', '#FFFFFF']);
    const validSpacing = new Set(['4px', '8px', '16px']);
    validator = new DesignTokenValidator(validColors, validSpacing);
  });

  it('should pass validation for valid tokens', () => {
    const cssContent = `
      .button {
        background-color: #0017C1;
        color: #FFFFFF;
        padding: 8px 16px;
      }
    `;
    
    const issues = validator.validate(cssContent);
    expect(issues).toEqual([]);
  });

  it('should detect invalid colors', () => {
    const cssContent = `
      .button {
        background-color: #FF0000;
        color: #00FF00;
      }
    `;
    
    const issues = validator.validate(cssContent);
    expect(issues).toContain("未承認の色 '#FF0000' が使用されています");
    expect(issues).toContain("未承認の色 '#00FF00' が使用されています");
  });

  it('should detect invalid spacing', () => {
    const cssContent = `
      .button {
        padding: 10px;
        margin: 5px;
      }
    `;
    
    const issues = validator.validate(cssContent);
    expect(issues).toContain("未承認のスペーシング '10px' が使用されています");
    expect(issues).toContain("未承認のスペーシング '5px' が使用されています");
  });

  it('should remove duplicate issues', () => {
    const cssContent = `
      .button {
        background-color: #FF0000;
        border-color: #FF0000;
      }
    `;
    
    const issues = validator.validate(cssContent);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toBe("未承認の色 '#FF0000' が使用されています");
  });

  it('should handle empty CSS content', () => {
    const issues = validator.validate('');
    expect(issues).toEqual([]);
  });
});