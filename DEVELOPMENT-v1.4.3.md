# GPT Cleaner — chat safety pilot (v1.4.3)

This is a review branch based on the public v1.4.2 repository. It is **not** the later v2.0 codebase.

## Changes in this branch

- A per-conversation Protect/Unprotect control, stored locally in the current browser.
- Protected conversations and the currently open chat are excluded from bulk selection and deletion.
- Read preview: fetches actual chat messages on demand. The displayed excerpt is **not an AI-generated summary**.
- Export full Word: exports the text of selected chats in a single DOCX, with conversation headings, timestamps and speaker labels. Non-text attachments are marked as references; binary attachments are not embedded.
- Existing project filter + Select filtered can select an entire project's unprotected conversations for export or deletion.
- No changes to memory, library, Google Docs or GitHub versioning functionality.

## Important limitations and validation

- The extension relies on internal ChatGPT web endpoints which may change.
- The DOCX writer does not preserve rich multimodal attachments or every alternate message branch.
- A successful read of every selected conversation is required; failures cancel output rather than silently giving a partial archive.
- Previews are short extracts from user/assistant messages; read the full export before deleting anything important.
- The current branch has not yet undergone a live browser test with a real ChatGPT account. **Do not rely on it for deleting original conversations yet.**
- Existing v2.0 ZIP should be supplied before integrating these changes into the user's later work.
- Planned next: reliable project/topic grouping by content, mass folder selection UX, stronger protected-category defaults, full test coverage and independent Library/Memory tabs.

### Safety

Never delete chats without user review and explicit confirmation. Export is recommended before deletion.
