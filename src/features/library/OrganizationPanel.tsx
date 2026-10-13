import { useEffect, useState } from 'react';
import { appConfig } from '../../config/appConfig';
import { createLocalId } from '../../lib/ids';
import { stickyNoteRepository, tagRepository, textCardRepository } from '../../storage/repositories';
import type { InspirationItem, Tag } from '../../types/domain';
import { Button } from '../../components/ui/Button';
import './organization.css';

export function OrganizationPanel({ collectionId, items, tags, onFilterChange, onChanged }: { collectionId?: string; items: InspirationItem[]; tags: Tag[]; onFilterChange: (ids: string[]) => void; onChanged: () => void }) {
  const [active, setActive] = useState<string[]>([]); const [draft, setDraft] = useState(''); const [manage, setManage] = useState(false);
  useEffect(() => onFilterChange(active), [active, onFilterChange]);
  const toggle = (id: string) => setActive(value => value.includes(id) ? value.filter(x => x !== id) : [...value, id]);
  const addTag = async () => { if (!draft.trim()) return; await tagRepository.create({ id: createLocalId(), name: draft.trim() }); setDraft(''); onChanged(); };
  const addCard = async () => { await textCardRepository.create({ id: createLocalId(), collectionId, text: 'A quiet thought', position: Date.now(), typography: { fontFamily: 'Georgia', fontSize: 18, textAlign: 'left' } }); onChanged(); };
  const addNote = async () => { await stickyNoteRepository.create({ id: createLocalId(), text: 'A small note', associatedItemId: items[0]?.id, position: Date.now(), size: { width: 150, height: 84 } }); onChanged(); };
  const pinned = tags.slice(0, appConfig.maxPinnedTags); const rest = tags.slice(appConfig.maxPinnedTags);
  return <><div className="tag-slicer"><div>{pinned.map(tag => <button className={active.includes(tag.id) ? 'active' : ''} key={tag.id} onClick={() => toggle(tag.id)}>#{tag.name}</button>)}{rest.length > 0 && <select onChange={e => e.target.value && toggle(e.target.value)} defaultValue=""><option value="">More tags</option>{rest.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}</select>}</div><div className="tag-create"><input value={draft} onChange={e => setDraft(e.target.value)} placeholder={`New ${appConfig.tagName}`} /><button onClick={() => void addTag()}>+</button><button onClick={() => setManage(!manage)}>⚙</button></div></div>{manage && <div className="tag-manager">{tags.map(tag => <div key={tag.id}><input value={tag.name} onChange={e => void tagRepository.update(tag.id, { name: e.target.value }).then(onChanged)} /><button onClick={() => void tagRepository.remove(tag.id).then(onChanged)}>×</button></div>)}</div>}<div className="organization-strip"><Button className="secondary-button" onClick={() => void addCard()}>+ Text card</Button><Button className="secondary-button" onClick={() => void addNote()}>+ Sticky note</Button></div></>;
}
