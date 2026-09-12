# Changelog

## 1.4.1 - 2026-09-12

### Changed
- Replaced page-by-page Project moves with direct account-scoped ChatGPT requests.
- Moving conversations no longer opens, navigates to, or reloads conversation pages.
- Every installation uses the session of the user currently signed in to ChatGPT; no author-owned API key or session is embedded.
- Added conservative sequential move pacing and exponential rate-limit backoff for HTTP 429 and temporary 5xx responses.
- Reduced Smart suggestion context-fetch concurrency to lower request pressure.
- Removed the persistent navigation queue and `queue-runner.js`.

### Privacy
- Project moves stay on the ChatGPT origin and use only the current user’s browser session.
- Move queues and move-result records are no longer persisted in `localStorage`.

## 1.4.0 - 2026-09-09

### Added
- Load conversations that already belong to native ChatGPT Projects and merge them into the main organizer catalog.
- Create real ChatGPT Projects directly from the extension Project Manager.
- Move individual or selected conversations into native ChatGPT Projects through a persistent visible move queue.
- Verify Project moves before continuing to the next queued conversation.
- Added **Smart suggestions** for matching unorganized conversations to existing ChatGPT Projects.
- Smart suggestions use Project names, existing Project chat titles/snippets, and short locally-read conversation context samples.
- Added native Project conversation counts when available.
- Added a **View chats** action in Project Manager to load a Project and immediately filter the organizer to its real ChatGPT conversations.
- Added project-aware conversation links for chats that already live inside a Project.

### Changed
- Native ChatGPT Project membership now overrides stale local organizer metadata.
- New Project creation is no longer local-only.
- Bulk **Assign project** behavior is now a real **Move to project** workflow for native ChatGPT Projects.
- Legacy local projects remain readable for backward compatibility but are not offered as native move destinations.

### Privacy
- Smart suggestions are computed locally and do not send conversation content to an external categorization service.

## 1.3.2 - 2026-09-06

- Fixed ChatGPT project discovery by loading native Projects directly from ChatGPT's project sidebar endpoint instead of relying only on rendered sidebar links.
- Added cursor-based pagination so all native Projects can be discovered, not only the currently visible sidebar entries.
- Fixed the missing **Sync ChatGPT projects** button in the Project Manager.
- Project Manager now refreshes native ChatGPT Projects automatically whenever it opens.
- Kept DOM discovery as a fallback if the internal project endpoint is temporarily unavailable.

## 1.3.1 - 2026-09-06

### Fixed

- ChatGPT native projects shown in the sidebar can now be synchronized into the organizer project list.
- Native ChatGPT projects are marked as read-only in the extension project manager to avoid accidentally renaming or deleting a project only inside local extension storage.

All notable changes to this project are documented here.

## 1.3.0 - 2026-09-06

### Added
- Added a bilingual English/Persian interface for the main cleaner panel.
- Added a language switch with persistent language preference.
- Added automatic RTL/LTR layout switching based on the selected language.
- Added localized number and date formatting for English and Persian.
- Added bilingual popup copy and localized launch errors.
- Added Chrome locale metadata for English and Persian.

### Changed
- Kept public project documentation in English while making the extension UI bilingual.

## 1.2.1 - 2026-09-06

### Fixed
- Fixed transparent confirmation and project-management modals.
- Ensured modals inherit the active light or dark theme.
- Added an opaque modal surface with a subtle blurred backdrop.

### Changed
- Prepared the project for its first public source-available release.
- Standardized public-facing interface and documentation in English.
- Added author and commercial licensing information for Shiva Dehghan.

## 1.2.0 - 2026-09-06

### Added
- Light and dark themes with an in-panel theme toggle.
- Theme preference persistence on ChatGPT.
- Extension icon assets.

### Changed
- Reworked the panel UI around neutral ChatGPT-inspired surfaces, spacing, controls, and green accent colors.
- Reorganized filter and action controls for clearer hierarchy.
- Updated popup styling to follow the browser or system light/dark preference.

## 1.1.0 - 2026-09-06

### Added
- Article marking for conversations.
- Local project creation and management.
- Assigning conversations to projects.
- Article and project filters.
- Bulk project assignment.

### Changed
- Simplified popup and interface copy.

## 1.0.1 - 2026-09-06

### Changed
- Cleaned the original interface and removed temporary personal labels.

## 1.0.0

### Added
- Conversation scanning.
- Search and filters.
- Multi-select.
- Bulk deletion with confirmation.
- JSON export and import utilities.
