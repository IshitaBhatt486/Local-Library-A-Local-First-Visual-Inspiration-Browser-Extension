import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it } from 'vitest';
import { appConfig } from '../config/appConfig';
import { getDatabase, resetDatabaseConnectionForTests } from './database';
import { collectionRepository, inspirationItemRepository } from './repositories';

async function resetStorage(): Promise<void> { await resetDatabaseConnectionForTests(); await new Promise<void>((resolve, reject) => { const request = indexedDB.deleteDatabase(appConfig.storage.databaseName); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); }
afterEach(resetStorage);
describe('local repositories', () => {
  it('creates, updates and reads typed records', async () => { const created = await collectionRepository.create({ id: 'collection-1', name: 'Saved', itemOrder: [] }); expect(created.createdAt).toBeTruthy(); const updated = await collectionRepository.update('collection-1', { description: 'Local only' }); expect(updated.description).toBe('Local only'); expect((await collectionRepository.get('collection-1'))?.name).toBe('Saved'); });
  it('searches, filters and orders inspiration items', async () => { await inspirationItemRepository.bulkPut([{ id: 'one', pageTitle: 'Warm minimal room', collectionIds: ['c'], tagIds: ['home'], position: 2 }, { id: 'two', pageTitle: 'Editorial poster', collectionIds: ['c'], tagIds: ['print'], position: 1 }]); const found = await inspirationItemRepository.list({ search: 'editorial', searchFields: ['pageTitle'], orderBy: 'position' }); expect(found.map(item => item.id)).toEqual(['two']); const filtered = await inspirationItemRepository.list({ filter: item => item.tagIds.includes('home'), orderBy: 'position' }); expect(filtered.map(item => item.id)).toEqual(['one']); });
  it('removes records in bulk', async () => { await collectionRepository.bulkPut([{ id: 'one', name: 'One', itemOrder: [] }, { id: 'two', name: 'Two', itemOrder: [] }]); await collectionRepository.bulkRemove(['one', 'two']); expect(await collectionRepository.list()).toEqual([]); });
  it('creates all configured stores during migration', async () => { const database = await getDatabase(); expect([...database.objectStoreNames]).toEqual(expect.arrayContaining(Object.values(appConfig.storage.objectStores))); });
});
