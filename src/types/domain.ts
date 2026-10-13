export type EntityId = string;
export type ISODateString = string;
export type DataUrl = string;
export type ColorValue = string;
export interface Timestamped { createdAt: ISODateString; updatedAt: ISODateString; }
export interface OrderedEntity { position: number; }
export interface Collection extends Timestamped { id: EntityId; name: string; description?: string; coverImage?: DataUrl; itemOrder: EntityId[]; }
export interface InspirationItem extends Timestamped, OrderedEntity { id: EntityId; imageData?: DataUrl; thumbnailData?: DataUrl; sourceUrl?: string; pageTitle?: string; domain?: string; favicon?: DataUrl; collectionIds: EntityId[]; tagIds: EntityId[]; note?: string; color?: ColorValue; }
export interface StickyNote extends Timestamped, OrderedEntity { id: EntityId; text: string; associatedItemId?: EntityId; position: number; size: { width: number; height: number }; styling?: { backgroundColor?: ColorValue; textColor?: ColorValue; rotation?: number }; }
export interface TextCard extends Timestamped, OrderedEntity { id: EntityId; collectionId?: EntityId; text: string; typography: { fontFamily?: string; fontSize?: number; fontWeight?: number; textAlign?: 'left' | 'center' | 'right' }; styling?: { backgroundColor?: ColorValue; textColor?: ColorValue; borderColor?: ColorValue }; }
export interface Tag extends Timestamped { id: EntityId; name: string; color?: ColorValue; }
export interface AppSettings extends Timestamped { id: 'app-settings'; theme: 'light' | 'dark' | 'system'; lastOpenedCollectionId?: EntityId; onboardingComplete?: boolean; reduceMotion?: boolean; }
export interface ShareCardSettings extends Timestamped { id: 'share-card-settings'; includeSource: boolean; includeDate: boolean; includeTags: boolean; backgroundColor?: ColorValue; textColor?: ColorValue; layout?: 'portrait' | 'square' | 'landscape'; bottomText?: string; textAlign?: 'left' | 'center' | 'right'; padding?: number; fontSize?: number; imagePosition?: 'cover' | 'contain'; }
