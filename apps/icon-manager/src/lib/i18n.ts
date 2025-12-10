/**
 * Internationalization (i18n) for Icon Manager
 * Supports: English (en), Spanish (es), Catalan (ca)
 */

export type Locale = 'en' | 'es' | 'ca';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'ca'];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català'
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  ca: 'CA'
};

// Country codes for flag icons
export const LOCALE_COUNTRY_CODES: Record<Locale, string> = {
  en: 'gb',
  es: 'es',
  ca: 'es-ct' // Catalonia
};

export const DEFAULT_LOCALE: Locale = 'en';

// Translation keys
export interface Translations {
  // Header
  'header.search.placeholder': string;
  'header.search.placeholder_online': string;
  'header.search.local': string;
  'header.search.online': string;
  'header.add': string;
  'header.import': string;
  'header.icons': string;
  'header.of': string;
  'header.language': string;

  // View modes
  'view.grid': string;
  'view.list': string;

  // Sort options
  'sort.name': string;
  'sort.name_desc': string;
  'sort.category': string;
  'sort.recent': string;
  'sort.sort_by': string;

  // Sidebar
  'sidebar.categories': string;
  'sidebar.all_icons': string;
  'sidebar.favorites': string;
  'sidebar.my_project': string;
  'sidebar.custom': string;
  'sidebar.animated': string;
  'sidebar.icon_sets': string;
  'sidebar.shortcuts': string;
  'sidebar.total': string;
  'sidebar.icons': string;
  'sidebar.scroll_to_set': string;

  // Shortcuts
  'shortcut.search': string;
  'shortcut.close': string;
  'shortcut.add': string;
  'shortcut.import': string;

  // Selection bar
  'selection.selected': string;
  'selection.select_all': string;
  'selection.clear': string;
  'selection.add_to_project': string;
  'selection.add_to_library': string;
  'selection.remove_from_project': string;
  'selection.export': string;
  'selection.delete': string;

  // Actions
  'action.copy_svg': string;
  'action.copy_name': string;
  'action.favorite': string;
  'action.favorited': string;
  'action.rename': string;
  'action.delete': string;
  'action.edit': string;
  'action.build': string;
  'action.export': string;

  // Modals
  'modal.add.title': string;
  'modal.add.subtitle': string;
  'modal.add.name': string;
  'modal.add.name_placeholder': string;
  'modal.add.name_hint': string;
  'modal.add.category': string;
  'modal.add.category_custom': string;
  'modal.add.category_animated': string;
  'modal.add.svg': string;
  'modal.add.svg_placeholder': string;
  'modal.add.preview': string;
  'modal.add.cancel': string;
  'modal.add.submit': string;
  'modal.add.detected_animated': string;
  'modal.add.paste': string;
  'modal.add.clear': string;
  'modal.add.optimize': string;

  'modal.import.title': string;
  'modal.import.description': string;
  'modal.import.search': string;
  'modal.import.search_placeholder': string;
  'modal.import.search_sets': string;
  'modal.import.limit': string;
  'modal.import.selected': string;
  'modal.import.cancel': string;
  'modal.import.submit': string;
  'modal.import.style': string;
  'modal.import.style_all': string;
  'modal.import.style_outline': string;
  'modal.import.style_solid': string;
  'modal.import.style_duotone': string;
  'modal.import.style_linear': string;
  'modal.import.loading': string;
  'modal.import.icons_available': string;
  'modal.import.load_error': string;
  'modal.import.no_results': string;
  'modal.import.popular': string;
  'modal.import.all_sets': string;
  'modal.import.static_sets': string;
  'modal.import.animated_sets': string;
  'modal.import.set': string;
  'modal.import.select_set': string;
  'modal.import.button': string;
  'modal.import.already_imported': string;
  'modal.import.animated_only': string;
  'modal.import.all_icons': string;
  'modal.import.of': string;

  // Common
  'modal.cancel': string;
  'sidebar.selectAll': string;

  // Preview modal
  'preview.category': string;
  'preview.size': string;

  // Toast messages
  'toast.copied_svg': string;
  'toast.copied_name': string;
  'toast.added_favorites': string;
  'toast.removed_favorites': string;
  'toast.icon_added': string;
  'toast.icon_renamed': string;
  'toast.icon_deleted': string;
  'toast.added_to_project': string;
  'toast.removed_from_project': string;
  'toast.exported': string;
  'toast.build_success': string;
  'toast.build_error': string;
  'toast.import_success': string;
  'toast.drop_svg_only': string;
  'toast.pasted_svg': string;

  // Confirmations
  'confirm.delete_icon': string;
  'confirm.delete_icons': string;
  'confirm.rename_icon': string;
  'confirm.rename_icon_placeholder': string;

  // Empty states
  'empty.no_icons': string;
  'empty.no_icons_hint': string;
  'empty.no_favorites': string;
  'empty.no_project_icons': string;

  // Drag & Drop
  'drop.title': string;
  'drop.subtitle': string;

  // Icon card
  'card.animated_svg': string;
}

const en: Translations = {
  // Header
  'header.search.placeholder': 'Search icons... (use /regex/ for patterns)',
  'header.search.placeholder_online': 'Search online icons...',
  'header.search.local': 'Library',
  'header.search.online': 'Online',
  'header.add': 'Add Icon',
  'header.import': 'Import Set',
  'header.icons': 'icons',
  'header.of': 'of',
  'header.language': 'Language',

  // View modes
  'view.grid': 'Grid view',
  'view.list': 'List view',

  // Sort options
  'sort.name': 'Name (A-Z)',
  'sort.name_desc': 'Name (Z-A)',
  'sort.category': 'Category',
  'sort.recent': 'Recent',
  'sort.sort_by': 'Sort by',

  // Sidebar
  'sidebar.categories': 'Categories',
  'sidebar.all_icons': 'All Icons',
  'sidebar.favorites': 'Favorites',
  'sidebar.my_project': 'My Project',
  'sidebar.custom': 'Custom',
  'sidebar.animated': 'Animated',
  'sidebar.icon_sets': 'Icon Sets',
  'sidebar.shortcuts': 'Keyboard Shortcuts',
  'sidebar.total': 'Total',
  'sidebar.icons': 'icons',
  'sidebar.scroll_to_set': 'Scroll to set',

  // Shortcuts
  'shortcut.search': 'Search',
  'shortcut.close': 'Close modal',
  'shortcut.add': 'Add icon',
  'shortcut.import': 'Import set',

  // Selection bar
  'selection.selected': 'icons selected',
  'selection.select_all': 'Select All',
  'selection.clear': 'Clear',
  'selection.add_to_project': 'Add to Project',
  'selection.add_to_library': 'Add to Library',
  'selection.remove_from_project': 'Remove from Project',
  'selection.export': 'Export',
  'selection.delete': 'Delete',

  // Actions
  'action.copy_svg': 'Copy SVG',
  'action.copy_name': 'Copy Name',
  'action.favorite': 'Favorite',
  'action.favorited': 'Favorited',
  'action.rename': 'Rename',
  'action.delete': 'Delete',
  'action.edit': 'Edit',
  'action.build': 'Build for sg-icon',
  'action.export': 'Export JSON',

  // Modals
  'modal.add.title': 'Add New Icon',
  'modal.add.subtitle': 'Add a custom SVG icon to your collection',
  'modal.add.name': 'Icon Name',
  'modal.add.name_placeholder': 'e.g., my-icon or mdi:account',
  'modal.add.name_hint': 'Only letters, numbers, dashes and underscores',
  'modal.add.category': 'Category',
  'modal.add.category_custom': 'Custom',
  'modal.add.category_animated': 'Animated (auto-detected)',
  'modal.add.svg': 'SVG Code',
  'modal.add.svg_placeholder': 'Paste your SVG code here...',
  'modal.add.preview': 'Preview',
  'modal.add.cancel': 'Cancel',
  'modal.add.submit': 'Add Icon',
  'modal.add.detected_animated': 'Animated SVG detected!',
  'modal.add.paste': 'Paste from clipboard',
  'modal.add.clear': 'Clear',
  'modal.add.optimize': 'Optimize SVG',

  'modal.import.title': 'Import Icon Set',
  'modal.import.description': 'Select an icon set to import from Iconify',
  'modal.import.search': 'Search filter (optional)',
  'modal.import.search_placeholder': 'e.g., arrow, home, user',
  'modal.import.search_sets': 'Search sets...',
  'modal.import.limit': 'Max icons',
  'modal.import.selected': 'Selected:',
  'modal.import.cancel': 'Cancel',
  'modal.import.submit': 'Import Icons',
  'modal.import.style': 'Style',
  'modal.import.style_all': 'All',
  'modal.import.style_outline': 'Outline',
  'modal.import.style_solid': 'Solid',
  'modal.import.style_duotone': 'Duotone',
  'modal.import.style_linear': 'Linear',
  'modal.import.loading': 'Loading icons...',
  'modal.import.icons_available': 'icons available',
  'modal.import.load_error': 'Failed to load icons. Please try again.',
  'modal.import.no_results': 'No icons found matching your filters.',
  'modal.import.popular': 'Popular',
  'modal.import.all_sets': 'All Sets',
  'modal.import.static_sets': 'Static',
  'modal.import.animated_sets': 'Animated',
  'modal.import.set': 'Icon Set',
  'modal.import.select_set': 'Select a set to browse icons',
  'modal.import.button': 'Import',
  'modal.import.already_imported': 'Already imported',
  'modal.import.animated_only': 'Animated only',
  'modal.import.all_icons': 'All icons',
  'modal.import.of': 'of',

  // Common
  'modal.cancel': 'Cancel',
  'sidebar.selectAll': 'Select All',

  // Preview modal
  'preview.category': 'Category',
  'preview.size': 'Size',

  // Toast messages
  'toast.copied_svg': 'SVG copied to clipboard',
  'toast.copied_name': 'Name copied to clipboard',
  'toast.added_favorites': 'Added to favorites',
  'toast.removed_favorites': 'Removed from favorites',
  'toast.icon_added': 'Icon added successfully',
  'toast.icon_renamed': 'Icon renamed successfully',
  'toast.icon_deleted': 'Icon deleted',
  'toast.added_to_project': 'icons added to project',
  'toast.removed_from_project': 'icons removed from project',
  'toast.exported': 'icons exported',
  'toast.build_success': 'icons built to sg-icon component!',
  'toast.build_error': 'Build failed',
  'toast.import_success': 'icons imported from',
  'toast.drop_svg_only': 'Please drop SVG files only',
  'toast.pasted_svg': 'SVG pasted from clipboard',

  // Confirmations
  'confirm.delete_icon': 'Delete icon',
  'confirm.delete_icons': 'Delete icons?',
  'confirm.rename_icon': 'Enter new name for',
  'confirm.rename_icon_placeholder': 'new-icon-name',

  // Empty states
  'empty.no_icons': 'No icons found',
  'empty.no_icons_hint': 'Add your first icon or import an icon set to get started',
  'empty.no_favorites': 'No favorite icons yet',
  'empty.no_project_icons': 'No icons in project. Select icons and click "Add to Project"',

  // Drag & Drop
  'drop.title': 'Drop SVG files here',
  'drop.subtitle': 'to add them to your library',

  // Icon card
  'card.animated_svg': 'Animated SVG'
};

const es: Translations = {
  // Header
  'header.search.placeholder': 'Buscar iconos... (usa /regex/ para patrones)',
  'header.search.placeholder_online': 'Buscar iconos online...',
  'header.search.local': 'Biblioteca',
  'header.search.online': 'Online',
  'header.add': 'Añadir',
  'header.import': 'Importar',
  'header.icons': 'iconos',
  'header.of': 'de',
  'header.language': 'Idioma',

  // View modes
  'view.grid': 'Vista cuadrícula',
  'view.list': 'Vista lista',

  // Sort options
  'sort.name': 'Nombre (A-Z)',
  'sort.name_desc': 'Nombre (Z-A)',
  'sort.category': 'Categoría',
  'sort.recent': 'Recientes',
  'sort.sort_by': 'Ordenar por',

  // Sidebar
  'sidebar.categories': 'Categorías',
  'sidebar.all_icons': 'Todos',
  'sidebar.favorites': 'Favoritos',
  'sidebar.my_project': 'Mi Proyecto',
  'sidebar.custom': 'Personalizados',
  'sidebar.animated': 'Animados',
  'sidebar.icon_sets': 'Sets de iconos',
  'sidebar.shortcuts': 'Atajos de teclado',
  'sidebar.total': 'Total',
  'sidebar.icons': 'iconos',
  'sidebar.scroll_to_set': 'Ir al set',

  // Shortcuts
  'shortcut.search': 'Buscar',
  'shortcut.close': 'Cerrar modal',
  'shortcut.add': 'Añadir icono',
  'shortcut.import': 'Importar set',

  // Selection bar
  'selection.selected': 'iconos seleccionados',
  'selection.select_all': 'Seleccionar todo',
  'selection.clear': 'Limpiar',
  'selection.add_to_project': 'Añadir al Proyecto',
  'selection.add_to_library': 'Añadir a Biblioteca',
  'selection.remove_from_project': 'Quitar del Proyecto',
  'selection.export': 'Exportar',
  'selection.delete': 'Eliminar',

  // Actions
  'action.copy_svg': 'Copiar SVG',
  'action.copy_name': 'Copiar Nombre',
  'action.favorite': 'Favorito',
  'action.favorited': 'En favoritos',
  'action.rename': 'Renombrar',
  'action.delete': 'Eliminar',
  'action.edit': 'Editar',
  'action.build': 'Generar para sg-icon',
  'action.export': 'Exportar JSON',

  // Modals
  'modal.add.title': 'Añadir Nuevo Icono',
  'modal.add.subtitle': 'Añade un icono SVG personalizado a tu colección',
  'modal.add.name': 'Nombre del icono',
  'modal.add.name_placeholder': 'ej: mi-icono o mdi:account',
  'modal.add.name_hint': 'Solo letras, números, guiones y guiones bajos',
  'modal.add.category': 'Categoría',
  'modal.add.category_custom': 'Personalizado',
  'modal.add.category_animated': 'Animado (auto-detectado)',
  'modal.add.svg': 'Código SVG',
  'modal.add.svg_placeholder': 'Pega tu código SVG aquí...',
  'modal.add.preview': 'Vista previa',
  'modal.add.cancel': 'Cancelar',
  'modal.add.submit': 'Añadir Icono',
  'modal.add.detected_animated': '¡SVG animado detectado!',
  'modal.add.paste': 'Pegar del portapapeles',
  'modal.add.clear': 'Limpiar',
  'modal.add.optimize': 'Optimizar SVG',

  'modal.import.title': 'Importar Set de Iconos',
  'modal.import.description': 'Selecciona un set de iconos para importar desde Iconify',
  'modal.import.search': 'Filtro de búsqueda (opcional)',
  'modal.import.search_placeholder': 'ej: arrow, home, user',
  'modal.import.search_sets': 'Buscar sets...',
  'modal.import.limit': 'Máx. iconos',
  'modal.import.selected': 'Seleccionado:',
  'modal.import.cancel': 'Cancelar',
  'modal.import.submit': 'Importar Iconos',
  'modal.import.style': 'Estilo',
  'modal.import.style_all': 'Todos',
  'modal.import.style_outline': 'Línea',
  'modal.import.style_solid': 'Sólido',
  'modal.import.style_duotone': 'Duotono',
  'modal.import.style_linear': 'Linear',
  'modal.import.loading': 'Cargando iconos...',
  'modal.import.icons_available': 'iconos disponibles',
  'modal.import.load_error': 'Error al cargar iconos. Inténtalo de nuevo.',
  'modal.import.no_results': 'No se encontraron iconos con los filtros actuales.',
  'modal.import.popular': 'Populares',
  'modal.import.all_sets': 'Todos',
  'modal.import.static_sets': 'Estáticos',
  'modal.import.animated_sets': 'Animados',
  'modal.import.set': 'Set de Iconos',
  'modal.import.select_set': 'Selecciona un set para ver iconos',
  'modal.import.button': 'Importar',
  'modal.import.already_imported': 'Ya importado',
  'modal.import.animated_only': 'Solo animados',
  'modal.import.all_icons': 'Todos los iconos',
  'modal.import.of': 'de',

  // Common
  'modal.cancel': 'Cancelar',
  'sidebar.selectAll': 'Seleccionar Todo',

  // Preview modal
  'preview.category': 'Categoría',
  'preview.size': 'Tamaño',

  // Toast messages
  'toast.copied_svg': 'SVG copiado al portapapeles',
  'toast.copied_name': 'Nombre copiado al portapapeles',
  'toast.added_favorites': 'Añadido a favoritos',
  'toast.removed_favorites': 'Eliminado de favoritos',
  'toast.icon_added': 'Icono añadido correctamente',
  'toast.icon_renamed': 'Icono renombrado correctamente',
  'toast.icon_deleted': 'Icono eliminado',
  'toast.added_to_project': 'iconos añadidos al proyecto',
  'toast.removed_from_project': 'iconos eliminados del proyecto',
  'toast.exported': 'iconos exportados',
  'toast.build_success': 'iconos generados para sg-icon!',
  'toast.build_error': 'Error al generar',
  'toast.import_success': 'iconos importados de',
  'toast.drop_svg_only': 'Por favor, arrastra solo archivos SVG',
  'toast.pasted_svg': 'SVG pegado desde el portapapeles',

  // Confirmations
  'confirm.delete_icon': '¿Eliminar icono',
  'confirm.delete_icons': '¿Eliminar iconos?',
  'confirm.rename_icon': 'Introduce el nuevo nombre para',
  'confirm.rename_icon_placeholder': 'nuevo-nombre-icono',

  // Empty states
  'empty.no_icons': 'No se encontraron iconos',
  'empty.no_icons_hint': 'Añade tu primer icono o importa un set para comenzar',
  'empty.no_favorites': 'Aún no tienes iconos favoritos',
  'empty.no_project_icons': 'No hay iconos en el proyecto. Selecciona iconos y haz clic en "Añadir al Proyecto"',

  // Drag & Drop
  'drop.title': 'Suelta archivos SVG aquí',
  'drop.subtitle': 'para añadirlos a tu librería',

  // Icon card
  'card.animated_svg': 'SVG animado'
};

const ca: Translations = {
  // Header
  'header.search.placeholder': 'Cercar icones... (usa /regex/ per patrons)',
  'header.search.placeholder_online': 'Cercar icones online...',
  'header.search.local': 'Biblioteca',
  'header.search.online': 'Online',
  'header.add': 'Afegir',
  'header.import': 'Importar',
  'header.icons': 'icones',
  'header.of': 'de',
  'header.language': 'Idioma',

  // View modes
  'view.grid': 'Vista quadrícula',
  'view.list': 'Vista llista',

  // Sort options
  'sort.name': 'Nom (A-Z)',
  'sort.name_desc': 'Nom (Z-A)',
  'sort.category': 'Categoria',
  'sort.recent': 'Recents',
  'sort.sort_by': 'Ordenar per',

  // Sidebar
  'sidebar.categories': 'Categories',
  'sidebar.all_icons': 'Totes',
  'sidebar.favorites': 'Preferides',
  'sidebar.my_project': 'El Meu Projecte',
  'sidebar.custom': 'Personalitzades',
  'sidebar.animated': 'Animades',
  'sidebar.icon_sets': 'Sets d\'icones',
  'sidebar.shortcuts': 'Dreceres de teclat',
  'sidebar.total': 'Total',
  'sidebar.icons': 'icones',
  'sidebar.scroll_to_set': 'Anar al set',

  // Shortcuts
  'shortcut.search': 'Cercar',
  'shortcut.close': 'Tancar modal',
  'shortcut.add': 'Afegir icona',
  'shortcut.import': 'Importar set',

  // Selection bar
  'selection.selected': 'icones seleccionades',
  'selection.select_all': 'Seleccionar tot',
  'selection.clear': 'Netejar',
  'selection.add_to_project': 'Afegir al Projecte',
  'selection.add_to_library': 'Afegir a Biblioteca',
  'selection.remove_from_project': 'Treure del Projecte',
  'selection.export': 'Exportar',
  'selection.delete': 'Eliminar',

  // Actions
  'action.copy_svg': 'Copiar SVG',
  'action.copy_name': 'Copiar Nom',
  'action.favorite': 'Preferida',
  'action.favorited': 'A preferides',
  'action.rename': 'Canviar nom',
  'action.delete': 'Eliminar',
  'action.edit': 'Editar',
  'action.build': 'Generar per sg-icon',
  'action.export': 'Exportar JSON',

  // Modals
  'modal.add.title': 'Afegir Nova Icona',
  'modal.add.subtitle': 'Afegeix una icona SVG personalitzada a la teva col·lecció',
  'modal.add.name': 'Nom de la icona',
  'modal.add.name_placeholder': 'ex: la-meva-icona o mdi:account',
  'modal.add.name_hint': 'Només lletres, números, guions i guions baixos',
  'modal.add.category': 'Categoria',
  'modal.add.category_custom': 'Personalitzada',
  'modal.add.category_animated': 'Animada (auto-detectat)',
  'modal.add.svg': 'Codi SVG',
  'modal.add.svg_placeholder': 'Enganxa el teu codi SVG aquí...',
  'modal.add.preview': 'Vista prèvia',
  'modal.add.cancel': 'Cancel·lar',
  'modal.add.submit': 'Afegir Icona',
  'modal.add.detected_animated': 'SVG animat detectat!',
  'modal.add.paste': 'Enganxar del porta-retalls',
  'modal.add.clear': 'Netejar',
  'modal.add.optimize': 'Optimitzar SVG',

  'modal.import.title': 'Importar Set d\'Icones',
  'modal.import.description': 'Selecciona un set d\'icones per importar des d\'Iconify',
  'modal.import.search': 'Filtre de cerca (opcional)',
  'modal.import.search_placeholder': 'ex: arrow, home, user',
  'modal.import.search_sets': 'Cercar sets...',
  'modal.import.limit': 'Màx. icones',
  'modal.import.selected': 'Seleccionat:',
  'modal.import.cancel': 'Cancel·lar',
  'modal.import.submit': 'Importar Icones',
  'modal.import.style': 'Estil',
  'modal.import.style_all': 'Tots',
  'modal.import.style_outline': 'Línia',
  'modal.import.style_solid': 'Sòlid',
  'modal.import.style_duotone': 'Duoton',
  'modal.import.style_linear': 'Lineal',
  'modal.import.loading': 'Carregant icones...',
  'modal.import.icons_available': 'icones disponibles',
  'modal.import.load_error': 'Error en carregar icones. Torna-ho a provar.',
  'modal.import.no_results': 'No s\'han trobat icones amb els filtres actuals.',
  'modal.import.popular': 'Populars',
  'modal.import.all_sets': 'Tots',
  'modal.import.static_sets': 'Estàtics',
  'modal.import.animated_sets': 'Animats',
  'modal.import.set': 'Set d\'Icones',
  'modal.import.select_set': 'Selecciona un set per veure icones',
  'modal.import.button': 'Importar',
  'modal.import.already_imported': 'Ja importat',
  'modal.import.animated_only': 'Només animats',
  'modal.import.all_icons': 'Totes les icones',
  'modal.import.of': 'de',

  // Common
  'modal.cancel': 'Cancel·lar',
  'sidebar.selectAll': 'Seleccionar Tot',

  // Preview modal
  'preview.category': 'Categoria',
  'preview.size': 'Mida',

  // Toast messages
  'toast.copied_svg': 'SVG copiat al porta-retalls',
  'toast.copied_name': 'Nom copiat al porta-retalls',
  'toast.added_favorites': 'Afegit a preferides',
  'toast.removed_favorites': 'Eliminat de preferides',
  'toast.icon_added': 'Icona afegida correctament',
  'toast.icon_renamed': 'Icona canviada de nom correctament',
  'toast.icon_deleted': 'Icona eliminada',
  'toast.added_to_project': 'icones afegides al projecte',
  'toast.removed_from_project': 'icones eliminades del projecte',
  'toast.exported': 'icones exportades',
  'toast.build_success': 'icones generades per sg-icon!',
  'toast.build_error': 'Error en generar',
  'toast.import_success': 'icones importades de',
  'toast.drop_svg_only': 'Si us plau, arrossega només fitxers SVG',
  'toast.pasted_svg': 'SVG enganxat des del porta-retalls',

  // Confirmations
  'confirm.delete_icon': 'Eliminar icona',
  'confirm.delete_icons': 'Eliminar icones?',
  'confirm.rename_icon': 'Introdueix el nou nom per a',
  'confirm.rename_icon_placeholder': 'nou-nom-icona',

  // Empty states
  'empty.no_icons': 'No s\'han trobat icones',
  'empty.no_icons_hint': 'Afegeix la teva primera icona o importa un set per començar',
  'empty.no_favorites': 'Encara no tens icones preferides',
  'empty.no_project_icons': 'No hi ha icones al projecte. Selecciona icones i fes clic a "Afegir al Projecte"',

  // Drag & Drop
  'drop.title': 'Deixa anar fitxers SVG aquí',
  'drop.subtitle': 'per afegir-los a la teva llibreria',

  // Icon card
  'card.animated_svg': 'SVG animat'
};

export const translations: Record<Locale, Translations> = { en, es, ca };

export function getLocale(request?: Request): Locale {
  // 1. Check URL parameter
  if (request) {
    const url = new URL(request.url);
    const langParam = url.searchParams.get('lang');
    if (langParam && SUPPORTED_LOCALES.includes(langParam as Locale)) {
      return langParam as Locale;
    }
  }

  // 2. Check cookie (set by client-side localStorage sync)
  if (request) {
    const cookie = request.headers.get('cookie');
    if (cookie) {
      const langRegex = /saged-icon-lang=(\w+)/;
      const match = langRegex.exec(cookie);
      if (match && SUPPORTED_LOCALES.includes(match[1] as Locale)) {
        return match[1] as Locale;
      }
    }
  }

  // 3. Check Accept-Language header
  if (request) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
      if (SUPPORTED_LOCALES.includes(preferred as Locale)) {
        return preferred as Locale;
      }
    }
  }

  return DEFAULT_LOCALE;
}

export function t(key: keyof Translations, locale: Locale = DEFAULT_LOCALE): string {
  return translations[locale][key] || translations[DEFAULT_LOCALE][key] || key;
}

export function createT(locale: Locale) {
  return (key: keyof Translations) => t(key, locale);
}
