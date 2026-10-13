import { createRoot } from 'react-dom/client';
import { AppShell } from '../../components/AppShell';
import { LibraryWorkspace } from '../../features/library/LibraryWorkspace';
import { appConfig } from '../../config/appConfig';
createRoot(document.getElementById('root')!).render(<AppShell><LibraryWorkspace /></AppShell>);
document.title = appConfig.extensionName;
