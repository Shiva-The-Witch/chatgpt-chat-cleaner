# Contributing

Issues, bug reports, and focused pull requests are welcome.

## Before opening a pull request

- Keep the change focused and easy to review.
- Do not commit access tokens, cookies, API keys, passwords, or private account data.
- Do not remove the explicit confirmation step from destructive bulk deletion.
- Avoid adding third-party network requests unless their purpose and privacy impact are clearly documented.
- Keep `manifest.json` valid JSON.
- Ensure all JavaScript files pass a syntax check.

## Manual test checklist

At minimum, verify that:

1. The extension installs with **Load unpacked**.
2. The popup opens the panel on `chatgpt.com`.
3. Conversation scanning works.
4. Search and filters work.
5. Article marks persist after refresh.
6. Projects can be created, renamed, assigned, and removed.
7. Light and dark themes work.
8. Bulk deletion runs only after explicit confirmation.

## Bug reports

Please include:

- Browser and browser version
- Extension version
- Reproduction steps
- Console errors, when relevant

Never include authentication tokens, cookies, or private conversation content in an issue.

## Licensing note

Contributions become part of a source-available project distributed under the repository's current license. If broader contributor licensing terms become necessary for future commercial licensing or distribution, the contribution process may be updated before accepting such changes.

## Localization checks

When changing interface copy or layout, verify both English and Persian modes, including LTR/RTL behavior and confirmation dialogs.
