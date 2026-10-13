import type { PropsWithChildren } from 'react';
import { createDesignTokens } from '../styles/tokens';
import '../styles/global.css';
import '../styles/polish.css';
export function AppShell({ children, theme = 'light' }: PropsWithChildren<{ theme?: 'light' | 'dark' }>) { return <main className="app-shell" style={createDesignTokens(theme)}>{children}</main>; }
