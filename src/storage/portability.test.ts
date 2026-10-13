import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it } from 'vitest';
import { appConfig } from '../config/appConfig';
import { resetDatabaseConnectionForTests } from './database';
import { importBackup } from './portability';
async function reset(){await resetDatabaseConnectionForTests();await new Promise<void>((resolve,reject)=>{const r=indexedDB.deleteDatabase(appConfig.storage.databaseName);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}afterEach(reset);
const valid=(data:unknown)=>JSON.stringify({format:'local-library-backup',version:1,scope:'all',exportedAt:new Date().toISOString(),data});
describe('backup import hardening',()=>{it('rejects malformed and incompatible imports',async()=>{await expect(importBackup('{')).rejects.toThrow();await expect(importBackup(valid({collections:[],items:[]} ).replace('"version":1','"version":99'))).rejects.toThrow()});it('bounds unsafe urls, images and text',async()=>{const result=await importBackup(valid({collections:[{id:'c',name:'x'.repeat(200),itemOrder:[]}],items:[{id:'i',imageData:'javascript:bad',sourceUrl:'javascript:bad',pageTitle:'x'.repeat(800),collectionIds:['c'],tagIds:[]}]}));expect(result.warnings.length).toBe(1)});it('rejects oversized backups',async()=>{await expect(importBackup('x'.repeat(10485761))).rejects.toThrow('too large')});it('handles duplicate tag ids without crashing the import transaction',async()=>{await expect(importBackup(valid({collections:[],items:[],tags:[{id:'tag',name:'a'},{id:'tag',name:'b'}]}))).resolves.toMatchObject({collections:0,items:0})});});
