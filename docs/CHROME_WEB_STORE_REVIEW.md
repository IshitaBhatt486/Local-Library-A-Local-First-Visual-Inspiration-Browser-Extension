# Chrome Web Store review metadata

## Single purpose

Local Library captures user-selected page regions and organizes them entirely in the browser.

## Permission justifications

- `storage`: stores captures, collections, settings, and backups locally.
- `activeTab`: permits a user-initiated capture only on the active tab.
- `scripting`: injects the selection overlay after capture is requested.
- `contextMenus`: adds the user-requested capture action.

## Privacy

The extension has no backend, analytics, advertising, account system, or remote data transfer. Captures and metadata remain in browser IndexedDB unless the user exports a local backup.
