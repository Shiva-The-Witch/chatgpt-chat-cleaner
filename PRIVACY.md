# Privacy

## Overview

ChatGPT Chat Cleaner & Organizer is designed to run locally in the browser and does not currently operate an external backend, analytics service, advertising system, or telemetry service.

## Data the extension accesses

When the panel is opened on `chatgpt.com` or `chat.openai.com`, the extension may access the conversation list available to the currently signed-in ChatGPT account so it can display, filter, organize, export, and selectively manage those conversations.

For requests to the ChatGPT web application, the extension may read the current session from `/api/auth/session`. If an access token is present, it is used only for requests to the ChatGPT origin.

## Data stored locally

Project definitions, article marks, and project assignments are stored in `localStorage` on the ChatGPT origin.

The extension does not intentionally persist ChatGPT access tokens or cookies in `localStorage`, `chrome.storage`, or project files.

## Third-party transmission

The current version does not intentionally send conversation content, account information, analytics, or session credentials to third-party domains.

## Deletion

Conversation deletion is destructive. The extension includes an explicit confirmation step before bulk deletion. Users are responsible for reviewing their selection before confirming the operation.

## Internal ChatGPT endpoints

This extension uses endpoints associated with the ChatGPT web interface. These endpoints are not a documented public API and may change without notice.

## Contact

For privacy questions, contact **Shiva Dehghan** at [redwitch1294@gmail.com](mailto:redwitch1294@gmail.com).
