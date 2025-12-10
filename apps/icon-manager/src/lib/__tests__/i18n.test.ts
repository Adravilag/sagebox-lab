/**
 * Tests for i18n functionality
 */
import { describe, it, expect } from 'vitest';
import { t, SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_NAMES, type Locale } from '../i18n';

describe('Internationalization (i18n)', () => {
  describe('SUPPORTED_LOCALES', () => {
    it('should include English, Spanish and Catalan', () => {
      expect(SUPPORTED_LOCALES).toContain('en');
      expect(SUPPORTED_LOCALES).toContain('es');
      expect(SUPPORTED_LOCALES).toContain('ca');
    });

    it('should have English as default locale', () => {
      expect(DEFAULT_LOCALE).toBe('en');
    });
  });

  describe('LOCALE_NAMES', () => {
    it('should have names for all supported locales', () => {
      expect(LOCALE_NAMES.en).toBe('English');
      expect(LOCALE_NAMES.es).toBe('Español');
      expect(LOCALE_NAMES.ca).toBe('Català');
    });
  });

  describe('t() translation function', () => {
    it('should return English translations for header elements', () => {
      expect(t('header.add', 'en')).toBe('Add Icon');
      expect(t('header.import', 'en')).toBe('Import Set');
    });

    it('should return Spanish translations for header elements', () => {
      expect(t('header.add', 'es')).toBe('Añadir');
      expect(t('header.import', 'es')).toBe('Importar');
    });

    it('should return key for unknown translations', () => {
      const result = t('unknown.key.that.does.not.exist' as any, 'en');
      expect(result).toBe('unknown.key.that.does.not.exist');
    });

    it('should translate search placeholders', () => {
      const enResult = t('header.search.placeholder', 'en');
      const esResult = t('header.search.placeholder', 'es');
      
      expect(enResult).toContain('Search');
      expect(esResult).toContain('Buscar');
    });

    it('should translate sidebar sections', () => {
      expect(t('sidebar.all_icons', 'en')).toBe('All Icons');
      expect(t('sidebar.all_icons', 'es')).toBe('Todos');
      
      expect(t('sidebar.my_project', 'en')).toBe('My Project');
      expect(t('sidebar.my_project', 'es')).toBe('Mi Proyecto');
    });

    it('should translate sidebar categories', () => {
      expect(t('sidebar.categories', 'en')).toBe('Categories');
      expect(t('sidebar.icon_sets', 'en')).toBe('Icon Sets');
    });

    it('should translate view modes', () => {
      expect(t('view.grid', 'en')).toBe('Grid view');
      expect(t('view.list', 'en')).toBe('List view');
    });
  });

  describe('Locale type', () => {
    it('should accept valid locales', () => {
      const validLocales: Locale[] = ['en', 'es', 'ca'];
      
      validLocales.forEach(locale => {
        expect(SUPPORTED_LOCALES).toContain(locale);
      });
    });
  });
});
