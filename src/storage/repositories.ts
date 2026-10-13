import { appConfig } from '../config/appConfig';
import type { AppSettings, Collection, InspirationItem, ShareCardSettings, StickyNote, Tag, TextCard, Timestamped } from '../types/domain';
import { StorageError, type StoreName, runTransaction } from './database';
export interface QueryOptions<T> { filter?: (record: T) => boolean; search?: string; searchFields?: Array<keyof T>; orderBy?: keyof T; direction?: 'asc' | 'desc'; limit?: number; }
export type NewRecord<T extends { id: string; createdAt?: string; updatedAt?: string }> = Omit<T, 'createdAt' | 'updatedAt'> & Partial<Pick<T, 'createdAt' | 'updatedAt'>>;
export interface Repository<T extends { id: string; createdAt?: string; updatedAt?: string }> { create(record: NewRecord<T>): Promise<T>; get(id: string): Promise<T | undefined>; list(options?: QueryOptions<T>): Promise<T[]>; update(id: string, changes: Partial<Omit<T, 'id'>>): Promise<T>; remove(id: string): Promise<void>; bulkPut(records: NewRecord<T>[]): Promise<T[]>; bulkRemove(ids: string[]): Promise<void>; clear(): Promise<void>; }
const requestValue = <T>(request: IDBRequest<T>, message: string): Promise<T> => new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(new StorageError(message, request.error)); });
const normaliseText = (value: unknown) => String(value ?? '').toLocaleLowerCase();
const compareValues = (left: unknown, right: unknown) => normaliseText(left).localeCompare(normaliseText(right), undefined, { numeric: true });
export function createRepository<T extends { id: string } & Partial<Timestamped>>(storeName: StoreName): Repository<T> {
  const sanitize = (record: unknown): T | undefined => record && typeof record === 'object' && typeof (record as T).id === 'string' ? record as T : undefined;
  const stamp = <V extends Partial<Timestamped>>(record: V, isNew = false): V => ({ ...record, ...(isNew && !record.createdAt ? { createdAt: new Date().toISOString() } : {}), updatedAt: new Date().toISOString() });
  return {
    async create(record) { const safe = sanitize(record); if (!safe) throw new StorageError('Cannot save malformed local data.'); const next = stamp(safe, true) as T; await runTransaction(storeName, 'readwrite', async tx => { await requestValue(tx.objectStore(storeName).add(next), 'Unable to create local data.'); }); return next; },
    async get(id) { const result = await runTransaction(storeName, 'readonly', tx => requestValue(tx.objectStore(storeName).get(id), 'Unable to read local data.')); return sanitize(result); },
    async list(options = {}) { const raw = await runTransaction(storeName, 'readonly', tx => requestValue(tx.objectStore(storeName).getAll(), 'Unable to read local data.')); const records = raw.flatMap(value => { const safe = sanitize(value); return safe ? [safe] : []; }); const needle = options.search?.trim().toLocaleLowerCase(); const filtered = records.filter(record => (!options.filter || options.filter(record)) && (!needle || (options.searchFields ?? []).some(field => normaliseText(record[field]).includes(needle)))); if (options.orderBy) filtered.sort((a, b) => (options.direction === 'desc' ? -1 : 1) * compareValues(a[options.orderBy!], b[options.orderBy!])); return options.limit ? filtered.slice(0, options.limit) : filtered; },
    async update(id, changes) { const current = await this.get(id); if (!current) throw new StorageError('The requested local record no longer exists.'); const next = stamp({ ...current, ...changes, id }) as T; await runTransaction(storeName, 'readwrite', async tx => { await requestValue(tx.objectStore(storeName).put(next), 'Unable to update local data.'); }); return next; },
    async remove(id) { await runTransaction(storeName, 'readwrite', async tx => { await requestValue(tx.objectStore(storeName).delete(id), 'Unable to delete local data.'); }); },
    async bulkPut(records) { const safeRecords = records.flatMap(record => { const safe = sanitize(record); return safe ? [stamp(safe, !safe.createdAt) as T] : []; }); if (safeRecords.length !== records.length) throw new StorageError('Cannot save malformed local data.'); await runTransaction(storeName, 'readwrite', async tx => { await Promise.all(safeRecords.map(record => requestValue(tx.objectStore(storeName).put(record), 'Unable to save local data.'))); }); return safeRecords; },
    async bulkRemove(ids) { await runTransaction(storeName, 'readwrite', async tx => { await Promise.all(ids.map(id => requestValue(tx.objectStore(storeName).delete(id), 'Unable to delete local data.'))); }); },
    async clear() { await runTransaction(storeName, 'readwrite', async tx => { await requestValue(tx.objectStore(storeName).clear(), 'Unable to clear local data.'); }); },
  };
}
const stores = appConfig.storage.objectStores;
export const collectionRepository = createRepository<Collection>(stores.collections);
export const inspirationItemRepository = createRepository<InspirationItem>(stores.inspirationItems);
export const stickyNoteRepository = createRepository<StickyNote>(stores.stickyNotes);
export const textCardRepository = createRepository<TextCard>(stores.textCards);
export const tagRepository = createRepository<Tag>(stores.tags);
export const appSettingsRepository = createRepository<AppSettings>(stores.settings);
export const shareCardSettingsRepository = createRepository<ShareCardSettings>(stores.shareCardSettings);
