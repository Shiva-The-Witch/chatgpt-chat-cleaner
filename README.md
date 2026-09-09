# ChatGPT Chat Cleaner & Organizer

A lightweight browser extension for organizing, filtering, marking, exporting, and selectively removing ChatGPT conversations.

**Built and maintained by [Shiva Dehghan](https://github.com/Shiva-The-Witch).**

> **Status:** Active development  
> **Current version:** 1.3.0  
> **Platform:** Chromium-based browsers / Manifest V3

## Features

- Scan active and archived ChatGPT conversations
- Search and filter conversation history
- Multi-select conversations
- Mark conversations as articles
- Create and manage local projects
- Discover and sync Projects already defined in ChatGPT
- Assign one or multiple conversations to projects
- Filter by article status or project
- Detect generic conversation titles
- Select older duplicate-title conversations
- Export the full catalog or selected conversation IDs as JSON
- Import a previous JSON selection
- Selectively delete conversations with an explicit confirmation step
- Light and dark themes with a ChatGPT-inspired neutral interface
- Bilingual interface: English and Persian (RTL/LTR) with a persistent language switch
- No external runtime dependencies or build step

## Installation

This project is currently distributed as an unpacked Chrome extension.

1. Download or clone this repository.
2. Open `chrome://extensions` in a Chromium-based browser.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository folder containing `manifest.json`.
6. Open `https://chatgpt.com/`.
7. Click the extension icon and choose **Open cleaner**.

## How organization data works

Article marks and project assignments are stored locally in the browser using `localStorage` on the ChatGPT origin. They are not synchronized across browsers or devices.

The extension does not currently operate its own backend.

## ChatGPT access

To list and manage conversations, the extension interacts with endpoints used by the ChatGPT web application. When required, the current browser session is used only for requests to the ChatGPT origin.

The extension does not intentionally transmit conversation data or session credentials to third-party servers.

See [PRIVACY.md](PRIVACY.md) for details.

## Important limitations

This is an unofficial third-party project. Some functionality depends on internal ChatGPT web endpoints that are not a documented public API. Changes to ChatGPT may therefore require updates to this extension.

Bulk deletion is destructive and cannot be undone. The extension requires explicit confirmation before deletion, but users remain responsible for the conversations they select.

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

and that `manifest.json` is valid JSON.

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
