export const appConfig = {
  extensionName: 'Local Library', collectionName: 'Collection', itemName: 'Item', noteName: 'Note', tagName: 'Tag', textCardName: 'Text card', defaultCollectionName: 'Unsorted',
  animationDuration: 180, animationEasing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', hoverAnimationDuration: 120,
  borderRadius: { small: 8, medium: 12, large: 18, pill: 999 },
  spacingScale: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48 },
  typographyScale: { label: 11, body: 13, title: 18, display: 26, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  lightColors: { canvas: '#f9f8f4', surface: '#fffefa', surfaceRaised: '#ffffff', ink: '#25251f', mutedInk: '#797970', accent: '#ffb4d9', accentInk: '#6b4a3a', border: '#dcdad2', focus: '#ff7aa6', danger: '#ae4b42', captureSurface: '#fff1f8', captureBorder: '#ffb4d9' },
  darkColors: { canvas: '#1c1b19', surface: '#252320', surfaceRaised: '#2d2a27', ink: '#f3eee7', mutedInk: '#b5ada4', accent: '#dca0bb', accentInk: '#321f29', border: '#47423c', focus: '#f0b8d0', danger: '#e68d83', captureSurface: '#352630', captureBorder: '#805166' },
  shadowPresets: { subtle: '0 1px 2px rgba(20, 28, 21, 0.05)', raised: '0 10px 30px rgba(20, 28, 21, 0.08)', button: '0 3px 0 rgba(21, 47, 33, 0.85)' },
  buttonDepth: 3, gridGap: 16, defaultGridColumns: 2, maxPinnedTags: 6,
  keyboardShortcuts: { open: 'Alt+Shift+L', newItem: 'Alt+Shift+N', search: 'Alt+Shift+F' },
  supportedImageFormats: ['image/png', 'image/jpeg', 'image/webp'],
  storage: { databaseName: 'local-library', databaseVersion: 2, objectStores: { collections: 'collections', inspirationItems: 'inspiration-items', stickyNotes: 'sticky-notes', textCards: 'text-cards', tags: 'tags', settings: 'settings', shareCardSettings: 'share-card-settings' }, maxItemCount: 10000, maxAttachmentBytes: 5242880 },
  performance: { thumbnailMaxEdge: 360, gridVirtualizationThreshold: 120, gridVirtualizationPageSize: 72, searchDebounceMs: 120, imageDecodeConcurrency: 4 },
  popup: { width: 390, minHeight: 520 },
  interface: { collectionListWidth: 192, compactCollectionListWidth: 56, cardMinWidth: 148, cardImageHeight: 174, gridColumns: { compact: 1, standard: 2, wide: 3 }, itemHoverScale: 1.015, dragOpacity: 0.55, maxCollectionNameLength: 48, maxCollectionDescriptionLength: 180 },
  shareCard: { layouts: ['portrait', 'square', 'landscape'], aspectRatios: { portrait: '4 / 5', square: '1 / 1', landscape: '16 / 9' }, paddingOptions: [16, 24, 32], fontSizeOptions: [16, 20, 26], defaultPadding: 24, defaultFontSize: 20 },
  zIndex: { tooltip: 30, toast: 40, modal: 50 },
} as const;

export type AppConfig = typeof appConfig;