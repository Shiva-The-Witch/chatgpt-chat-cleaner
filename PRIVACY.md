# Privacy

## Overview

ChatGPT Chat Cleaner & Organizer runs in the browser and does not currently operate an external analytics service, advertising system, telemetry service, or AI categorization backend.

## Data the extension accesses

When used on `chatgpt.com` or `chat.openai.com`, the extension may access data available to the currently signed-in ChatGPT account in order to provide its features, including:

- conversation IDs, titles, timestamps, archive state, and available snippets;
- ChatGPT Project names and identifiers;
- conversations already associated with ChatGPT Projects; and
- a short sample of user-authored conversation context when Smart suggestions are explicitly opened.

For requests to the ChatGPT web application, the extension may read the current session from `/api/auth/session`. If an access token is present, it is used only for requests to the ChatGPT origin.

## Smart suggestions

Smart project suggestions are computed locally in the browser. The current version does not send conversation titles, snippets, conversation content, account information, or suggestion data to a third-party AI provider.

Short context samples used for suggestions are kept in the in-memory organizer state for the current page session and are not intentionally written to extension project files or an external server.

## Data stored locally

The extension may store the following in `localStorage` on the ChatGPT origin:

- article marks and legacy local organizer metadata;
- theme and language preferences;
- a temporary Project-move queue so a multi-chat move can continue across ChatGPT page navigations; and
- the most recent move result long enough to display a completion summary.

The extension does not intentionally persist ChatGPT access tokens or cookies in `localStorage`, `chrome.storage`, or project files.

## Native Project operations

Creating Projects and reading Project membership use the active ChatGPT browser session. Conversation moves use the Project controls exposed by the ChatGPT web interface and are processed one at a time.

## Third-party transmission

The current version does not intentionally send conversation content, account information, analytics, or session credentials to third-party domains.

## Deletion

Conversation deletion is destructive. The extension includes an explicit confirmation step before bulk deletion. Users are responsible for reviewing their selection before confirming the operation.

## Internal ChatGPT endpoints and interface controls

This extension depends on parts of the ChatGPT web application that are not a documented public extension API and may change without notice.

## Contact

For privacy questions, contact **Shiva Dehghan** at [redwitch1294@gmail.com](mailto:redwitch1294@gmail.com).
