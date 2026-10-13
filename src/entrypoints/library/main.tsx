import { createRoot } from 'react-dom/client';
import { AppShell } from '../../components/AppShell';
import { LibraryWorkspace } from '../../features/library/LibraryWorkspace';
const collectionId = new URLSearchParams(location.search).get('collectionId') ?? undefined;
createRoot(document.getElementById('root')!).render(<AppShell><LibraryWorkspace initialCollectionId={collectionId} /></AppShell>);
