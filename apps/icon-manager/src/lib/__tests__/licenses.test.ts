/**
 * Tests for license generation functionality
 */
import { describe, it, expect } from 'vitest';
import {
  generateLicenseFile,
  generateIndividualLicenses,
  ICON_SET_LICENSES,
} from '../licenses';

describe('License Generation', () => {
  describe('ICON_SET_LICENSES', () => {
    it('should have license info for common icon sets', () => {
      const requiredSets = ['lucide', 'heroicons', 'tabler', 'mdi', 'feather'];
      
      requiredSets.forEach(set => {
        expect(ICON_SET_LICENSES[set]).toBeDefined();
        expect(ICON_SET_LICENSES[set].name).toBeDefined();
        expect(ICON_SET_LICENSES[set].type).toBeDefined();
        expect(ICON_SET_LICENSES[set].url).toBeDefined();
        expect(ICON_SET_LICENSES[set].text).toBeDefined();
      });
    });

    it('should have valid license types', () => {
      const validTypes = ['MIT', 'ISC', 'Apache 2.0', 'CC BY 4.0'];
      
      Object.values(ICON_SET_LICENSES).forEach(license => {
        expect(validTypes).toContain(license.type);
      });
    });
  });

  describe('generateLicenseFile', () => {
    it('should generate empty content for empty prefixes', () => {
      const result = generateLicenseFile([]);
      
      expect(result).toContain('# Icon Licenses');
    });

    it('should generate license content for single prefix', () => {
      const result = generateLicenseFile(['lucide']);
      
      expect(result).toContain('Lucide');
      expect(result).toContain('ISC');
    });

    it('should generate license content for multiple prefixes', () => {
      const result = generateLicenseFile(['lucide', 'tabler', 'mdi']);
      
      expect(result).toContain('Lucide');
      expect(result).toContain('Tabler');
      expect(result).toContain('Material Design Icons');
    });

    it('should deduplicate prefixes', () => {
      const result = generateLicenseFile(['lucide', 'lucide', 'lucide']);
      
      // Should only contain Lucide section once
      const lucideCount = (result.match(/## Lucide/g) || []).length;
      expect(lucideCount).toBe(1);
    });

    it('should skip unknown prefixes gracefully', () => {
      const result = generateLicenseFile(['lucide', 'unknown-set', 'tabler']);
      
      expect(result).toContain('Lucide');
      expect(result).toContain('Tabler');
      expect(result).not.toContain('unknown-set');
    });
  });

  describe('generateIndividualLicenses', () => {
    it('should return empty object for empty prefixes', () => {
      const result = generateIndividualLicenses([]);
      
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should generate individual license files with uppercase names', () => {
      const result = generateIndividualLicenses(['lucide']);
      
      expect(result['LICENSE-LUCIDE']).toBeDefined();
      expect(result['LICENSE-LUCIDE']).toContain('Lucide');
    });

    it('should generate multiple license files for multiple prefixes', () => {
      const result = generateIndividualLicenses(['lucide', 'tabler', 'mdi']);
      
      expect(Object.keys(result)).toHaveLength(3);
      expect(result['LICENSE-LUCIDE']).toBeDefined();
      expect(result['LICENSE-TABLER']).toBeDefined();
      expect(result['LICENSE-MDI']).toBeDefined();
    });

    it('should deduplicate prefixes in individual files', () => {
      const result = generateIndividualLicenses(['lucide', 'lucide']);
      
      expect(Object.keys(result)).toHaveLength(1);
    });

    it('should include license type and source URL', () => {
      const result = generateIndividualLicenses(['lucide']);
      
      expect(result['LICENSE-LUCIDE']).toContain('License:');
      expect(result['LICENSE-LUCIDE']).toContain('Source:');
    });
  });
});
