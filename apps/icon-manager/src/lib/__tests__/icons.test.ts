/**
 * Tests for Icon Manager core library functions
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// Mock modules before importing
vi.mock('node:fs');
vi.mock('node:os');

// Import after mocking
import {
  getIconsPath,
  getLibraryPath,
  getOutputPath,
  setOutputPath,
  getProjectIconsPath,
  readProjectIconNames,
  parseSVG,
  toKebabCase,
  ICON_SETS,
} from '../icons';

describe('Icon Manager Library', () => {
  const mockHomeDir = '/mock/home';
  const mockAppData = '/mock/appdata';

  beforeEach(() => {
    vi.resetAllMocks();
    
    // Mock os.homedir
    vi.mocked(os.homedir).mockReturnValue(mockHomeDir);
    
    // Mock process.env
    vi.stubEnv('APPDATA', mockAppData);
    vi.stubEnv('ICONS_PATH', '');
    vi.stubEnv('WORKSPACE_PATH', '');
    
    // Default fs mocks
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.mkdirSync).mockReturnValue(undefined);
    vi.mocked(fs.writeFileSync).mockReturnValue(undefined);
    vi.mocked(fs.readFileSync).mockReturnValue('[]');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('getLibraryPath', () => {
    it('should return AppData path on Windows', () => {
      vi.stubGlobal('process', { ...process, platform: 'win32' });
      
      const result = getLibraryPath();
      
      expect(result).toContain('sagebox-icon-manager');
    });
  });

  describe('ICON_SETS', () => {
    it('should have Lucide icon set defined', () => {
      expect(ICON_SETS['lucide']).toBeDefined();
      expect(ICON_SETS['lucide'].name).toBe('Lucide');
      expect(ICON_SETS['lucide'].license).toBe('ISC');
    });

    it('should have animated icon sets marked', () => {
      expect(ICON_SETS['svg-spinners']?.animated).toBe(true);
      expect(ICON_SETS['line-md']?.animated).toBe(true);
    });

    it('should have all required properties for each set', () => {
      Object.entries(ICON_SETS).forEach(([key, set]) => {
        expect(set.name).toBeDefined();
        expect(set.color).toBeDefined();
        expect(set.license).toBeDefined();
      });
    });
  });

  describe('parseSVG', () => {
    it('should extract viewBox from SVG', () => {
      const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 12"/></svg>';
      const result = parseSVG(svg);
      
      expect(result.viewBox).toBe('0 0 24 24');
    });

    it('should extract paths from SVG', () => {
      const svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 12"/><path d="M2 12L12 22"/></svg>';
      const result = parseSVG(svg);
      
      expect(result.paths).toHaveLength(2);
      expect(result.paths[0]).toBe('M12 2L2 12');
      expect(result.paths[1]).toBe('M2 12L12 22');
    });

    it('should extract fill-rule from SVG', () => {
      const svg = '<svg viewBox="0 0 24 24" fill-rule="evenodd"><path d="M12 2"/></svg>';
      const result = parseSVG(svg);
      
      expect(result.fillRule).toBe('evenodd');
    });

    it('should use default viewBox when not specified', () => {
      const svg = '<svg><path d="M12 2"/></svg>';
      const result = parseSVG(svg);
      
      expect(result.viewBox).toBe('0 0 24 24');
    });

    it('should handle SVG with single quotes', () => {
      const svg = "<svg viewBox='0 0 48 48'><path d='M12 2'/></svg>";
      const result = parseSVG(svg);
      
      expect(result.viewBox).toBe('0 0 48 48');
      expect(result.paths[0]).toBe('M12 2');
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(toKebabCase('iconName')).toBe('icon-name');
      expect(toKebabCase('myIconSet')).toBe('my-icon-set');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(toKebabCase('IconName')).toBe('icon-name');
      expect(toKebabCase('MyIconSet')).toBe('my-icon-set');
    });

    it('should convert spaces to hyphens', () => {
      expect(toKebabCase('icon name')).toBe('icon-name');
      expect(toKebabCase('my icon set')).toBe('my-icon-set');
    });

    it('should convert underscores to hyphens', () => {
      expect(toKebabCase('icon_name')).toBe('icon-name');
      expect(toKebabCase('my_icon_set')).toBe('my-icon-set');
    });

    it('should handle mixed formats', () => {
      expect(toKebabCase('myIcon_name Set')).toBe('my-icon-name-set');
    });

    it('should return lowercase', () => {
      expect(toKebabCase('ICON')).toBe('icon');
      expect(toKebabCase('IconNAME')).toBe('icon-name');
    });
  });

  describe('readProjectIconNames', () => {
    it('should return empty Set when file does not exist', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      
      const result = await readProjectIconNames();
      
      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(0);
    });

    it('should return Set of icon names from file', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify([
        'lucide:home',
        'tabler:settings',
        'mdi:account'
      ]));
      
      const result = await readProjectIconNames();
      
      expect(result).toBeInstanceOf(Set);
      expect(result.has('lucide:home')).toBe(true);
      expect(result.has('tabler:settings')).toBe(true);
      expect(result.has('mdi:account')).toBe(true);
    });

    it('should handle invalid JSON gracefully', async () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('invalid json');
      
      const result = await readProjectIconNames();
      
      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(0);
    });
  });
});

describe('Output Path Management', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(false);
  });

  describe('setOutputPath and getOutputPath', () => {
    it('should persist and retrieve output path', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        outputPath: '/test/project/src/icons'
      }));
      
      // After setting, the cached value should be returned
      setOutputPath('/test/project/src/icons');
      const result = getOutputPath();
      
      expect(result).toBe('/test/project/src/icons');
    });
  });
});
