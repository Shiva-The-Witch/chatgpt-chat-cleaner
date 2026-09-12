# ChatGPT Chat Cleaner & Organizer

A source-available browser extension for organizing, filtering, reviewing, moving, exporting, and selectively removing ChatGPT conversations.

**Built and maintained by [Shiva Dehghan](https://github.com/Shiva-The-Witch).**

> **Status:** Active development  
> **Current version:** 1.4.1  
> **Platform:** Chromium-based browsers / Manifest V3

## Features

- Scan active and archived ChatGPT conversations
- Include conversations that already live inside ChatGPT Projects
- Discover and synchronize Projects from the signed-in ChatGPT account
- Create new Projects in ChatGPT from the extension
- Move one or many eligible conversations into real ChatGPT Projects
- Move conversations directly through the current user’s ChatGPT session without opening conversation pages
- Generate smart project suggestions from project names, existing project conversations, conversation titles, and short local context samples
- Review suggested destinations before any conversations are moved
- Search and filter conversation history
- Mark conversations as articles
- Filter by article status or project
- Detect generic conversation titles
- Select older duplicate-title conversations
- Export the full catalog or selected conversation IDs as JSON
- Import a previous JSON selection
- Selectively delete conversations with an explicit confirmation step
- Light and dark themes with a ChatGPT-inspired neutral interface
- Bilingual interface: English and Persian with RTL/LTR switching
- No external runtime dependencies or build step

## Native ChatGPT Projects

Version 1.4.0 changes Projects from a local-only organizer feature into a ChatGPT-aware workflow.

The extension reads the Projects available to the current ChatGPT account and loads conversations already stored in those Projects. Creating a Project from the Project Manager now creates it in ChatGPT instead of creating only a local label.

Moving conversations no longer navigates through conversation pages. The extension sends the same account-scoped project assignment directly to ChatGPT using the browser session of the person currently signed in on `chatgpt.com`.

Moves are processed sequentially with a conservative delay and automatic backoff when ChatGPT returns a rate-limit or temporary server response. No API key belonging to the extension author is embedded or shared.

## Smart project suggestions

Smart suggestions are computed locally in the browser. The extension builds a lightweight profile for each existing ChatGPT Project from:

- the Project name;
- titles of conversations already inside that Project;
- snippets returned with Project conversations; and
- a short sample of user-authored context from recent unorganized conversations when available.

Suggestions are shown for review before moving anything. The current implementation does **not** send conversation content to an external AI service or third-party categorization backend.

## Installation

1. Download or clone this repository.
2. Open `chrome://extensions` in a Chromium-based browser.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository folder containing `manifest.json`.
6. Refresh any already-open `chatgpt.com` tabs after installing or updating the extension.
7. Open ChatGPT, click the extension icon, and choose **Open cleaner**.

## How local metadata works

Article marks and legacy local organizer metadata are stored in `localStorage` on the ChatGPT origin. Native ChatGPT Project membership is treated as the source of truth when it can be read from ChatGPT.

Older local projects created by previous extension versions may still appear as legacy local entries. New projects created in version 1.4.0 are created in ChatGPT.

## ChatGPT access

The extension uses the currently signed-in browser session for requests to the ChatGPT origin. Every user therefore operates on their own ChatGPT account, conversations, and Projects. The extension does not use Shiva Dehghan’s account, API key, or session for other users.

It does not require a separate ChatGPT password and does not copy session credentials into project files.

See [PRIVACY.md](PRIVACY.md) for details.

## Important limitations

This is an unofficial third-party project. Some functionality depends on ChatGPT web endpoints and interface controls that are not a documented public extension API. Changes to ChatGPT may therefore require compatibility updates.

Project moves rely on internal ChatGPT web endpoints rather than a documented public extension API. If those endpoints change, a compatibility update may be required.

Bulk deletion is destructive and cannot be undone. The extension requires explicit confirmation before deletion.

## Project structure

```text
.
├── manifest.json
├── background.js
├── page-app.js
├── popup.html
├── popup.css
├── popup.js
├── icons/
│   └── icon.png
├── _locales/
│   ├── en/messages.json
│   └── fa/messages.json
├── README.md
├── CHANGELOG.md
├── PRIVACY.md
├── SECURITY.md
├── CONTRIBUTING.md
├── COMMERCIAL-LICENSE.md
└── LICENSE
```

## Development

There is no build process and there are no third-party JavaScript dependencies.

Before submitting changes, verify that:

```bash
node --check background.js
node --check popup.js
node --check page-app.js
```

and that `manifest.json` and locale files are valid JSON.

## Author

**Shiva Dehghan**

- GitHub: [@Shiva-The-Witch](https://github.com/Shiva-The-Witch)
- Email: [redwitch1294@gmail.com](mailto:redwitch1294@gmail.com)

## License

This project is **source available** under the [PolyForm Noncommercial License 1.0.0](LICENSE).

Non-commercial use, modification, and redistribution are permitted according to the license terms. Commercial use requires a separate license from the author.

See [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md) for commercial licensing inquiries.

Copyright © 2026 Shiva Dehghan.

## Disclaimer

This project is an independent third-party browser extension and is not affiliated with, endorsed by, sponsored by, or officially associated with OpenAI.

OpenAI and ChatGPT are trademarks of their respective owners.
