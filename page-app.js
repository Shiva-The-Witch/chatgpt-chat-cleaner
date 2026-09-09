(() => {
  "use strict";

  const ROOT_ID = "chat-cleaner-root";
  const existing = document.getElementById(ROOT_ID);
  if (existing) {
    existing.shadowRoot?.querySelector(".shell")?.classList.add("is-visible");
    return;
  }

  const STORAGE_KEY = "chat-cleaner-organizer-v1";
  const THEME_KEY = "chat-cleaner-theme-v1";
  const LANGUAGE_KEY = "chat-cleaner-language-v1";

  const TRANSLATIONS = {
    en: {
      appLabel: "ChatGPT Chat Cleaner & Organizer",
      appTitle: "Chat Cleaner",
      toggleTheme: "Toggle theme",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      lightMode: "Light mode",
      darkMode: "Dark mode",
      switchToPersian: "Switch to Persian",
      switchToEnglish: "Switch to English",
      close: "Close",
      searchPlaceholder: "Search conversation titles…",
      conversationScope: "Conversation scope",
      allConversations: "All conversations",
      activeOnly: "Active only",
      archivedOnly: "Archived only",
      olderThanDate: "Older than date",
      olderThanTitle: "Show conversations older than this date",
      contentType: "Content type",
      all: "All",
      articlesOnly: "Articles only",
      unmarked: "Unmarked",
      project: "Project",
      allProjects: "All projects",
      noProject: "No project",
      scan: "Scan",
      projects: "Projects",
      selectFiltered: "Select filtered",
      genericTitles: "Generic titles",
      olderDuplicates: "Older duplicates",
      clearSelection: "Clear selection",
      exportCatalog: "Export catalog",
      importSelection: "Import selection",
      foundLabel: "Found:",
      visibleLabel: "Visible:",
      selectedLabel: "Selected:",
      noConversationsLoaded: "No conversations loaded.",
      selectedSuffix: "selected",
      projectForSelected: "Project for selected conversations",
      moveSelectedTo: "Move selected to…",
      assignProject: "Assign project",
      exportSelection: "Export selection",
      deleteSelected: "Delete selected",
      scanning: "Scanning…",
      activeConversations: "active conversations",
      archivedConversations: "archived conversations",
      archivedUnavailable: "Archived conversations are unavailable.",
      conversationsFound: "{count} conversations found.",
      loadingLabel: "Loading {label}… {count}",
      untitled: "Untitled",
      noFilterMatches: "No conversations match the current filters.",
      selectConversation: "Select {title}",
      articleActive: "Article ✓",
      article: "Article",
      removeArticleMark: "Remove article mark",
      markAsArticle: "Mark as article",
      updated: "Updated: {date}",
      archived: "Archived",
      current: "Current",
      projectForConversation: "Project for {title}",
      open: "Open",
      filteredSelected: "Filtered conversations selected.",
      genericSelected: "{count} generic-title conversations selected.",
      duplicatesSelected: "{count} older duplicates selected.",
      catalogExported: "Catalog exported.",
      selectionExported: "Selection exported.",
      missingDeleteIds: "The selected file does not contain deleteIds.",
      selectionsImported: "{count} selections imported{skipped}.",
      skippedSuffix: "; {count} skipped",
      invalidSelectionFile: "Invalid selection file: {error}",
      unknownError: "Unknown error",
      deleteTitle: "Delete {count} conversations",
      deleteWarning: "Deletion cannot be undone. Type DELETE PERMANENTLY to confirm.",
      moreConversations: "… and {count} more conversations",
      deletePhrase: "DELETE PERMANENTLY",
      cancel: "Cancel",
      delete: "Delete",
      deleting: "Deleting…",
      deletingProgress: "Deleting {current} of {total}: {title}",
      sessionExpiredAfterDelete: "Your session expired. {count} conversations were deleted before the operation stopped.",
      endpointChangedAfterDelete: "The ChatGPT deletion endpoint appears to have changed. {count} conversations were deleted before the operation stopped.",
      deletionResult: "{count} conversations deleted{failures}.",
      failuresSuffix: "; {count} failed",
      unableSaveOrganization: "Unable to save local organization data.",
      projectName: "Project name",
      add: "Add",
      noProjects: "No projects yet.",
      syncProjects: "Sync ChatGPT projects",
      syncingProjects: "Syncing ChatGPT projects…",
      syncedProjects: "Synced {count} ChatGPT projects.",
      projectSyncFailed: "Could not load ChatGPT projects. Refresh ChatGPT and try again.",
      chatgptProject: "ChatGPT",
      save: "Save",
      conversationsAssigned: "{count} conversations assigned to the project.",
      authError: "Your ChatGPT session could not be detected. Refresh the page and try again.",
      rateLimitError: "ChatGPT is rate-limiting requests. Try again later.",
      interfaceChangedError: "The ChatGPT web interface appears to have changed. The operation was stopped.",
      loadError: "Unable to load conversations{detail}.",
      unknown: "Unknown"
    },
    fa: {
      appLabel: "پاک‌ساز و سامان‌دهنده چت ChatGPT",
      appTitle: "پاک‌ساز چت",
      toggleTheme: "تغییر حالت نمایش",
      switchToLight: "رفتن به حالت روشن",
      switchToDark: "رفتن به حالت تیره",
      lightMode: "حالت روشن",
      darkMode: "حالت تیره",
      switchToPersian: "تغییر زبان به فارسی",
      switchToEnglish: "تغییر زبان به انگلیسی",
      close: "بستن",
      searchPlaceholder: "جست‌وجو در عنوان چت‌ها…",
      conversationScope: "محدوده گفتگوها",
      allConversations: "همه چت‌ها",
      activeOnly: "فقط فعال‌ها",
      archivedOnly: "فقط آرشیوی‌ها",
      olderThanDate: "قدیمی‌تر از تاریخ",
      olderThanTitle: "فقط چت‌های قدیمی‌تر از این تاریخ",
      contentType: "نوع محتوا",
      all: "همه",
      articlesOnly: "فقط مقاله‌ها",
      unmarked: "مارک‌نشده‌ها",
      project: "پروژه",
      allProjects: "همه پروژه‌ها",
      noProject: "بدون پروژه",
      scan: "اسکن",
      projects: "پروژه‌ها",
      selectFiltered: "انتخاب فیلتر",
      genericTitles: "عنوان‌های عمومی",
      olderDuplicates: "تکراری‌های قدیمی",
      clearSelection: "پاک‌کردن انتخاب",
      exportCatalog: "خروجی فهرست",
      importSelection: "ورود لیست",
      foundLabel: "پیداشده:",
      visibleLabel: "نمایش:",
      selectedLabel: "انتخاب:",
      noConversationsLoaded: "فهرست خالی است.",
      selectedSuffix: "انتخاب",
      projectForSelected: "پروژه برای انتخاب‌ها",
      moveSelectedTo: "انتقال انتخاب‌ها به…",
      assignProject: "ثبت پروژه",
      exportSelection: "خروجی انتخاب",
      deleteSelected: "حذف انتخاب‌ها",
      scanning: "در حال اسکن…",
      activeConversations: "گفتگوهای فعال",
      archivedConversations: "گفتگوهای آرشیوی",
      archivedUnavailable: "آرشیو در دسترس نیست.",
      conversationsFound: "{count} چت پیدا شد.",
      loadingLabel: "در حال خواندن {label}… {count}",
      untitled: "بدون عنوان",
      noFilterMatches: "نتیجه‌ای نیست.",
      selectConversation: "انتخاب {title}",
      articleActive: "مقاله ✓",
      article: "مقاله",
      removeArticleMark: "برداشتن مارک مقاله",
      markAsArticle: "مارک به‌عنوان مقاله",
      updated: "آخرین تغییر: {date}",
      archived: "آرشیوی",
      current: "فعلی",
      projectForConversation: "پروژه {title}",
      open: "باز کردن",
      filteredSelected: "نتایج فیلتر انتخاب شد.",
      genericSelected: "{count} عنوان عمومی انتخاب شد.",
      duplicatesSelected: "{count} نسخه قدیمی انتخاب شد.",
      catalogExported: "فهرست ذخیره شد.",
      selectionExported: "انتخاب‌ها ذخیره شد.",
      missingDeleteIds: "در فایل، deleteIds پیدا نشد.",
      selectionsImported: "{count} انتخاب وارد شد{skipped}.",
      skippedSuffix: "؛ {count} رد شد",
      invalidSelectionFile: "فایل انتخابی معتبر نیست: {error}",
      unknownError: "خطای نامشخص",
      deleteTitle: "حذف {count} گفتگو",
      deleteWarning: "حذف قابل‌بازگشت نیست. برای تأیید «حذف دائمی» را بنویس.",
      moreConversations: "… و {count} گفتگوی دیگر",
      deletePhrase: "حذف دائمی",
      cancel: "انصراف",
      delete: "حذف",
      deleting: "در حال حذف…",
      deletingProgress: "در حال حذف {current} از {total}: {title}",
      sessionExpiredAfterDelete: "ورود منقضی شد. {count} چت حذف شد و ادامه متوقف شد.",
      endpointChangedAfterDelete: "ساختار حذف تغییر کرده. {count} چت حذف شد؛ عملیات متوقف شد.",
      deletionResult: "{count} چت حذف شد{failures}.",
      failuresSuffix: " و {count} مورد حذف نشد",
      unableSaveOrganization: "ذخیره دسته‌بندی انجام نشد.",
      projectName: "نام پروژه",
      add: "اضافه",
      noProjects: "پروژه‌ای نیست.",
      syncProjects: "همگام‌سازی پروژه‌های ChatGPT",
      syncingProjects: "در حال همگام‌سازی پروژه‌های ChatGPT…",
      syncedProjects: "{count} پروژه ChatGPT همگام شد.",
      projectSyncFailed: "پروژه‌های ChatGPT خوانده نشد. صفحه ChatGPT را تازه کن و دوباره امتحان کن.",
      chatgptProject: "ChatGPT",
      save: "ذخیره",
      conversationsAssigned: "{count} مورد ثبت شد.",
      authError: "ورود شناسایی نشد. صفحه را تازه کن.",
      rateLimitError: "محدودیت درخواست فعال است. بعداً دوباره امتحان کن.",
      interfaceChangedError: "ساختار ChatGPT تغییر کرده؛ عملیات متوقف شد.",
      loadError: "خواندن فهرست ناموفق بود{detail}.",
      unknown: "نامشخص"
    }
  };
  const state = {
    conversations: [],
    selected: new Set(),
    authHeaders: null,
    scanning: false,
    deleting: false,
    language: "en",
    currentConversationId: getCurrentConversationId(),
    organizer: loadOrganizer(),
    filter: {
      query: "",
      scope: "all",
      olderThan: "",
      article: "all",
      project: "all"
    }
  };

  const root = document.createElement("div");
  root.id = ROOT_ID;
  const shadow = root.attachShadow({ mode: "open" });
  document.documentElement.appendChild(root);

  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      * { box-sizing: border-box; }
      .shell {
        --bg: #ffffff;
        --surface: #f7f7f8;
        --surface-hover: #efefef;
        --surface-strong: #ececec;
        --input: #ffffff;
        --border: #e5e5e5;
        --border-strong: #d1d1d1;
        --text: #0d0d0d;
        --muted: #6b6b6b;
        --muted-2: #8e8e8e;
        --accent: #10a37f;
        --accent-hover: #0d8f6f;
        --accent-soft: rgba(16,163,127,.10);
        --danger: #d00e17;
        --danger-bg: #fff2f3;
        --danger-border: #f2b8bc;
        --overlay: rgba(0,0,0,.42);
        --shadow: 0 20px 60px rgba(0,0,0,.18);
        --scroll-thumb: #c7c7c7;
        position: fixed; inset: 0; z-index: 2147483646; display: grid;
        place-items: center; padding: 20px; direction: ltr; color-scheme: light;
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Tahoma, Arial, sans-serif;
        color: var(--text); background: var(--overlay); backdrop-filter: blur(6px);
      }
      .shell[data-lang="fa"] { direction: rtl; }
      .shell[data-lang="en"] { direction: ltr; }
      .shell[data-theme="dark"] {
        --bg: #212121;
        --surface: #2f2f2f;
        --surface-hover: #383838;
        --surface-strong: #171717;
        --input: #2f2f2f;
        --border: #424242;
        --border-strong: #565656;
        --text: #ececec;
        --muted: #b4b4b4;
        --muted-2: #8f8f8f;
        --accent: #10a37f;
        --accent-hover: #1ab48d;
        --accent-soft: rgba(16,163,127,.14);
        --danger: #ff6b6b;
        --danger-bg: #402022;
        --danger-border: #7d3539;
        --overlay: rgba(0,0,0,.58);
        --shadow: 0 24px 70px rgba(0,0,0,.55);
        --scroll-thumb: #555;
        color-scheme: dark;
      }
      .panel {
        width: min(1180px, 96vw); height: min(840px, 94vh); overflow: hidden;
        display: grid; grid-template-rows: auto auto 1fr auto;
        border: 1px solid var(--border); border-radius: 18px;
        background: var(--bg); box-shadow: var(--shadow);
      }
      .header {
        display: flex; align-items: center; gap: 12px; min-height: 68px;
        padding: 14px 18px; border-bottom: 1px solid var(--border);
      }
      .mark {
        display: grid; place-items: center; width: 38px; height: 38px; flex: 0 0 auto;
        border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
        color: var(--accent);
      }
      .mark svg { width: 22px; height: 22px; display: block; }
      .heading { min-width: 0; }
      h1 { margin: 0; font-size: 16px; line-height: 1.45; font-weight: 650; letter-spacing: -.1px; }
      .header-actions { display:flex; align-items:center; gap:8px; margin-inline-start:auto; }
      .icon-button { width: 38px; height: 38px; padding: 0; display:grid; place-items:center; font-size:17px; }
      .close { font-size: 21px; }
      button, input, select { font: inherit; }
      button {
        min-height: 38px; border: 1px solid var(--border-strong); border-radius: 9px; padding: 8px 12px;
        background: var(--bg); color: var(--text); cursor: pointer; transition: background .15s, border-color .15s, transform .05s;
      }
      button:hover { background: var(--surface-hover); border-color: var(--border-strong); }
      button:active { transform: translateY(1px); }
      button:disabled { opacity:.45; cursor:not-allowed; transform:none; }
      button.primary { border-color: var(--accent); background: var(--accent); color:#fff; font-weight:650; }
      button.primary:hover { border-color: var(--accent-hover); background: var(--accent-hover); }
      button.danger { border-color: var(--danger-border); background: var(--danger-bg); color: var(--danger); font-weight:650; }
      button.danger:hover { filter: brightness(.98); }
      button.ghost { background: transparent; }
      .controls { border-bottom: 1px solid var(--border); background: var(--bg); }
      .toolbar {
        display:grid; grid-template-columns:minmax(220px,1.55fr) repeat(4,minmax(135px,.72fr));
        gap:9px; padding:14px 18px 10px;
      }
      input, select {
        width:100%; min-height:40px; border:1px solid var(--border-strong); border-radius:9px;
        padding:9px 11px; background:var(--input); color:var(--text); outline:none;
      }
      input::placeholder { color: var(--muted-2); }
      input:focus, select:focus { border-color:var(--text); box-shadow:0 0 0 1px var(--text); }
      .actions {
        display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between;
        gap:10px; padding:0 18px 12px;
      }
      .action-group { display:flex; flex-wrap:wrap; gap:7px; }
      .action-group.secondary button { color:var(--muted); }
      .content { min-height:0; display:grid; grid-template-rows:auto 1fr; background:var(--bg); }
      .summary {
        display:flex; gap:18px; align-items:center; min-height:42px; padding:8px 18px;
        color:var(--muted); font-size:12px; border-bottom:1px solid var(--border);
      }
      .summary strong { color:var(--text); font-weight:650; }
      .status { margin-inline-start:auto; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .status.error { color:var(--danger); }
      .list { overflow:auto; padding:6px 10px 12px; scrollbar-color:var(--scroll-thumb) transparent; }
      .row {
        display:grid; grid-template-columns:auto auto minmax(0,1fr) minmax(150px,190px) auto; align-items:center; gap:10px;
        min-height:66px; margin:0; padding:10px 8px; border-bottom:1px solid var(--border); border-radius:0; background:transparent;
      }
      .row:hover { background:var(--surface); border-radius:10px; border-bottom-color:transparent; }
      .row.protected { opacity:.62; }
      .check { width:17px; height:17px; accent-color:var(--accent); }
      .title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text); font-size:13px; font-weight:520; }
      .meta { display:flex; flex-wrap:wrap; gap:6px; margin-top:5px; color:var(--muted); font-size:10px; }
      .badge { padding:2px 6px; border:1px solid var(--border); border-radius:999px; background:var(--bg); }
      .badge.archived { color:var(--muted); }
      .badge.protect { color:#9b6a00; border-color:#e4c26c; background:#fff8e7; }
      .shell[data-theme="dark"] .badge.protect { color:#f0c96a; border-color:#6f5c31; background:#322a18; }
      .badge.article { color:var(--accent); border-color:rgba(16,163,127,.35); background:var(--accent-soft); }
      .badge.project { color:var(--text); background:var(--surface); }
      .article-toggle { min-width:70px; padding:7px 9px; font-size:11px; }
      .article-toggle.active { border-color:var(--accent); background:var(--accent-soft); color:var(--accent); }
      .project-picker { min-width:0; min-height:36px; padding:7px 9px; font-size:11px; }
      .open-chat { color:var(--text); text-decoration:none; font-size:11px; padding:7px 9px; border-radius:8px; }
      .open-chat:hover { background:var(--surface-hover); }
      .empty { display:grid; place-items:center; min-height:220px; padding:50px 20px; text-align:center; color:var(--muted); font-size:13px; }
      .footer {
        display:flex; align-items:center; gap:9px; padding:12px 18px; border-top:1px solid var(--border); background:var(--surface-strong);
      }
      .footer .count { color:var(--muted); font-size:12px; white-space:nowrap; }
      .footer .spacer { flex:1; }
      .footer select { background:var(--bg); max-width:360px; }
      .modal-backdrop {
        position:fixed; inset:0; z-index:2147483647; display:grid; place-items:center; padding:18px;
        background:var(--overlay, rgba(0,0,0,.58));
        backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px);
        color:var(--text); direction:inherit; font-family:inherit;
      }
      .modal {
        width:min(560px,94vw); max-height:86vh; overflow:auto; border:1px solid var(--border);
        border-radius:16px; padding:18px; background-color:var(--bg, #212121); color:var(--text);
        box-shadow:var(--shadow); opacity:1; isolation:isolate;
      }
      .modal h2 { margin:0 0 8px; font-size:17px; color:var(--text); }
      .delete-modal h2 { color:var(--danger); }
      .modal p { color:var(--muted); font-size:12px; line-height:1.85; }
      .preview { max-height:180px; overflow:auto; margin:12px 0; padding:10px; border:1px solid var(--border); border-radius:10px; color:var(--muted); font-size:11px; line-height:1.8; background:var(--surface); }
      .modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:14px; }
      .progress { height:7px; overflow:hidden; margin-top:12px; border-radius:99px; background:var(--surface); }
      .progress > span { display:block; width:0; height:100%; background:var(--accent); transition:width .2s; }
      .file-input { display:none; }
      @media (max-width:900px) {
        .toolbar { grid-template-columns:1fr 1fr; }
        .toolbar .search { grid-column:1 / -1; }
      }
      @media (max-width:760px) {
        .shell { padding:0; }
        .panel { width:100vw; height:100vh; border:0; border-radius:0; }
        .header { padding:12px; }
        .toolbar { grid-template-columns:1fr; padding:12px; }
        .toolbar .search { grid-column:auto; }
        .actions { padding:0 12px 12px; align-items:stretch; }
        .action-group { width:100%; }
        .action-group button { flex:1 1 auto; }
        .summary { padding-inline:12px; gap:10px; flex-wrap:wrap; }
        .status { width:100%; margin:0; }
        .row { grid-template-columns:auto auto minmax(0,1fr); }
        .project-picker { grid-column:2 / -1; }
        .open-chat { grid-column:2 / -1; justify-self:start; }
        .footer { flex-wrap:wrap; padding:10px 12px; }
        .footer .spacer { display:none; }
        .footer select { flex:1 1 100%; max-width:none; }
      }
    </style>
    <section class="shell" data-i18n-aria-label="appLabel" aria-label="ChatGPT Chat Cleaner & Organizer">
      <div class="panel">
        <header class="header">
          <div class="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 5.5h10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H10l-3.5 3v-3h-2a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z"/>
              <path d="m15.5 16.5 4.2-4.2M17.3 18.3l2.4-2.4M14.3 19.2l4.9 1.3"/>
            </svg>
          </div>
          <div class="heading"><h1 data-i18n="appTitle">Chat Cleaner</h1></div>
          <div class="header-actions">
            <button class="language-toggle icon-button ghost" type="button" aria-label="Switch language" title="Switch language">فا</button>
            <button class="theme-toggle icon-button ghost" type="button" data-i18n-aria-label="toggleTheme" data-i18n-title="toggleTheme" aria-label="Toggle theme" title="Toggle theme">☾</button>
            <button class="close icon-button ghost" type="button" data-i18n-aria-label="close" data-i18n-title="close" aria-label="Close" title="Close">×</button>
          </div>
        </header>

        <div class="controls">
          <div class="toolbar">
            <input class="search" type="search" data-i18n-placeholder="searchPlaceholder" placeholder="Search conversation titles…" />
            <select class="scope" data-i18n-aria-label="conversationScope" aria-label="Conversation scope">
              <option value="all" data-i18n="allConversations">All conversations</option>
              <option value="active" data-i18n="activeOnly">Active only</option>
              <option value="archived" data-i18n="archivedOnly">Archived only</option>
            </select>
            <input class="older-than" type="date" data-i18n-aria-label="olderThanDate" data-i18n-title="olderThanTitle" aria-label="Older than date" title="Show conversations older than this date" />
            <select class="article-filter" data-i18n-aria-label="contentType" aria-label="Content type">
              <option value="all" data-i18n="all">All</option>
              <option value="articles" data-i18n="articlesOnly">Articles only</option>
              <option value="unmarked" data-i18n="unmarked">Unmarked</option>
            </select>
            <select class="project-filter" data-i18n-aria-label="project" aria-label="Project">
              <option value="all">All projects</option>
              <option value="none">No project</option>
            </select>
          </div>
          <div class="actions">
            <div class="action-group">
              <button class="scan primary" type="button" data-i18n="scan">Scan</button>
              <button class="manage-projects" type="button" data-i18n="projects">Projects</button>
              <button class="select-filtered" type="button" disabled data-i18n="selectFiltered">Select filtered</button>
              <button class="select-generic" type="button" disabled data-i18n="genericTitles">Generic titles</button>
              <button class="select-duplicates" type="button" disabled data-i18n="olderDuplicates">Older duplicates</button>
            </div>
            <div class="action-group secondary">
              <button class="clear-selection" type="button" disabled data-i18n="clearSelection">Clear selection</button>
              <button class="export-catalog" type="button" disabled data-i18n="exportCatalog">Export catalog</button>
              <button class="import-selection" type="button" disabled data-i18n="importSelection">Import selection</button>
              <input class="file-input" type="file" accept="application/json,.json" />
            </div>
          </div>
        </div>

        <div class="content">
          <div class="summary">
            <span><span data-i18n="foundLabel">Found:</span> <strong class="total">0</strong></span>
            <span><span data-i18n="visibleLabel">Visible:</span> <strong class="visible">0</strong></span>
            <span><span data-i18n="selectedLabel">Selected:</span> <strong class="selected-top">0</strong></span>
            <span class="status" role="status" aria-live="polite"></span>
          </div>
          <div class="list"><div class="empty" data-i18n="noConversationsLoaded">No conversations loaded.</div></div>
        </div>

        <footer class="footer">
          <span class="count"><strong class="selected-bottom">0</strong> <span data-i18n="selectedSuffix">selected</span></span>
          <span class="spacer"></span>
          <select class="bulk-project" data-i18n-aria-label="projectForSelected" aria-label="Project for selected conversations" disabled>
            <option value="">Move selected to…</option>
          </select>
          <button class="bulk-assign" type="button" disabled data-i18n="assignProject">Assign project</button>
          <button class="export-selection" type="button" disabled data-i18n="exportSelection">Export selection</button>
          <button class="delete danger" type="button" disabled data-i18n="deleteSelected">Delete selected</button>
        </footer>
      </div>
    </section>
  `;

  const ui = {
    shell: shadow.querySelector(".shell"),
    close: shadow.querySelector(".close"),
    languageToggle: shadow.querySelector(".language-toggle"),
    themeToggle: shadow.querySelector(".theme-toggle"),
    scan: shadow.querySelector(".scan"),
    search: shadow.querySelector(".search"),
    scope: shadow.querySelector(".scope"),
    olderThan: shadow.querySelector(".older-than"),
    articleFilter: shadow.querySelector(".article-filter"),
    projectFilter: shadow.querySelector(".project-filter"),
    manageProjects: shadow.querySelector(".manage-projects"),
    selectFiltered: shadow.querySelector(".select-filtered"),
    selectGeneric: shadow.querySelector(".select-generic"),
    selectDuplicates: shadow.querySelector(".select-duplicates"),
    clearSelection: shadow.querySelector(".clear-selection"),
    exportCatalog: shadow.querySelector(".export-catalog"),
    exportSelection: shadow.querySelector(".export-selection"),
    importSelection: shadow.querySelector(".import-selection"),
    fileInput: shadow.querySelector(".file-input"),
    bulkProject: shadow.querySelector(".bulk-project"),
    bulkAssign: shadow.querySelector(".bulk-assign"),
    deleteButton: shadow.querySelector(".delete"),
    total: shadow.querySelector(".total"),
    visible: shadow.querySelector(".visible"),
    selectedTop: shadow.querySelector(".selected-top"),
    selectedBottom: shadow.querySelector(".selected-bottom"),
    status: shadow.querySelector(".status"),
    list: shadow.querySelector(".list")
  };

  applyLanguage(getInitialLanguage(), false);
  applyTheme(getInitialTheme());
  syncNativeChatGPTProjects().catch(() => {});
  refreshProjectControls();
  bindEvents();

  function t(key, values = {}) {
    const table = TRANSLATIONS[state.language] || TRANSLATIONS.en;
    let text = table[key] ?? TRANSLATIONS.en[key] ?? key;
    Object.entries(values).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
    return text;
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === "fa" || saved === "en") return saved;
    } catch {}
    const preferred = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
    return preferred.startsWith("fa") ? "fa" : "en";
  }

  function applyLanguage(language, persist = true) {
    const value = language === "fa" ? "fa" : "en";
    state.language = value;
    ui.shell.dataset.lang = value;
    ui.shell.lang = value;
    ui.shell.dir = value === "fa" ? "rtl" : "ltr";

    shadow.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    shadow.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    shadow.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });
    shadow.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.title = t(element.dataset.i18nTitle);
    });

    ui.languageToggle.textContent = value === "fa" ? "EN" : "فا";
    ui.languageToggle.setAttribute("aria-label", value === "fa" ? t("switchToEnglish") : t("switchToPersian"));
    ui.languageToggle.title = value === "fa" ? t("switchToEnglish") : t("switchToPersian");
    updateThemeToggleLabel();

    if (persist) {
      try { localStorage.setItem(LANGUAGE_KEY, value); } catch {}
    }
  }

  function toggleLanguage() {
    applyLanguage(state.language === "fa" ? "en" : "fa");
    refreshProjectControls();
    render();
    setStatus("");
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return detectPageTheme();
  }

  function detectPageTheme() {
    if (document.documentElement.classList.contains("dark")) return "dark";
    try {
      const scheme = getComputedStyle(document.documentElement).colorScheme;
      if (scheme === "dark") return "dark";
      if (scheme === "light") return "light";
      const match = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g);
      if (match && match.length >= 3) {
        const [r, g, b] = match.slice(0, 3).map(Number);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance < 0.45 ? "dark" : "light";
      }
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    const value = theme === "dark" ? "dark" : "light";
    ui.shell.dataset.theme = value;
    ui.themeToggle.textContent = value === "dark" ? "☀" : "☾";
    updateThemeToggleLabel();
  }

  function updateThemeToggleLabel() {
    const dark = ui.shell.dataset.theme === "dark";
    ui.themeToggle.setAttribute("aria-label", dark ? t("switchToLight") : t("switchToDark"));
    ui.themeToggle.title = dark ? t("lightMode") : t("darkMode");
  }

  function toggleTheme() {
    const next = ui.shell.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  }

  function bindEvents() {
    ui.close.addEventListener("click", closeCleaner);
    ui.languageToggle.addEventListener("click", toggleLanguage);
    window.addEventListener("chat-cleaner-language-change", onExternalLanguageChange);
    ui.themeToggle.addEventListener("click", toggleTheme);
    ui.shell.addEventListener("click", (event) => {
      if (event.target === ui.shell && !state.deleting) closeCleaner();
    });
    document.addEventListener("keydown", onEscape, { capture: true });

    ui.scan.addEventListener("click", scanAll);
    ui.search.addEventListener("input", () => {
      state.filter.query = ui.search.value.trim();
      render();
    });
    ui.scope.addEventListener("change", () => {
      state.filter.scope = ui.scope.value;
      render();
    });
    ui.olderThan.addEventListener("change", () => {
      state.filter.olderThan = ui.olderThan.value;
      render();
    });
    ui.articleFilter.addEventListener("change", () => {
      state.filter.article = ui.articleFilter.value;
      render();
    });
    ui.projectFilter.addEventListener("change", () => {
      state.filter.project = ui.projectFilter.value;
      render();
    });
    ui.manageProjects.addEventListener("click", openProjectManager);
    ui.bulkAssign.addEventListener("click", assignSelectedToProject);
    ui.selectFiltered.addEventListener("click", selectFiltered);
    ui.selectGeneric.addEventListener("click", selectGenericTitles);
    ui.selectDuplicates.addEventListener("click", selectOlderDuplicates);
    ui.clearSelection.addEventListener("click", () => {
      state.selected.clear();
      render();
    });
    ui.exportCatalog.addEventListener("click", exportCatalog);
    ui.exportSelection.addEventListener("click", exportSelection);
    ui.importSelection.addEventListener("click", () => ui.fileInput.click());
    ui.fileInput.addEventListener("change", importSelectionFile);
    ui.deleteButton.addEventListener("click", openDeleteConfirmation);
  }

  function onExternalLanguageChange(event) {
    const language = event?.detail === "fa" ? "fa" : event?.detail === "en" ? "en" : null;
    if (!language || language === state.language) return;
    applyLanguage(language);
    refreshProjectControls();
    render();
    setStatus("");
  }

  function onEscape(event) {
    if (event.key !== "Escape" || state.deleting) return;
    closeCleaner();
  }

  function closeCleaner() {
    document.removeEventListener("keydown", onEscape, { capture: true });
    window.removeEventListener("chat-cleaner-language-change", onExternalLanguageChange);
    root.remove();
  }

  function getCurrentConversationId() {
    const match = location.pathname.match(/\/c\/([a-z0-9-]{20,})/i);
    if (match?.[1]) return match[1];
    const uuidMatches = location.pathname.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi);
    return uuidMatches?.at(-1) || null;
  }

  async function getHeaders() {
    if (state.authHeaders) return state.authHeaders;

    const headers = { Accept: "application/json" };
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        const session = await response.json();
        const token = session?.accessToken || session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Cookie-authenticated requests can still work without this optional header.
    }

    state.authHeaders = headers;
    return headers;
  }

  async function scanAll() {
    if (state.scanning || state.deleting) return;
    state.scanning = true;
    setControlsBusy(true);
    setStatus(t("scanning"));

    try {
      state.authHeaders = null;
      await getHeaders();
      const active = await fetchConversationPages(false, t("activeConversations"));

      let archived = [];
      try {
        archived = await fetchConversationPages(true, t("archivedConversations"));
      } catch (error) {
        if (error?.status === 401 || error?.status === 403) throw error;
        setStatus(t("archivedUnavailable"));
      }

      const activeIds = new Set(active.map((item) => String(item?.id || "")));
      const archivedOnly = archived.filter((item) => !activeIds.has(String(item?.id || "")));
      const byId = new Map();
      [...active, ...archivedOnly].forEach((item) => {
        if (!item?.id) return;
        const normalized = normalizeConversation(item);
        const previous = byId.get(normalized.id);
        byId.set(normalized.id, previous ? { ...previous, ...normalized } : normalized);
      });

      state.conversations = [...byId.values()].sort((a, b) => b.updateMs - a.updateMs);
      state.selected = new Set([...state.selected].filter((id) => byId.has(id)));
      setStatus(t("conversationsFound", { count: formatNumber(state.conversations.length) }));
      render();
    } catch (error) {
      const message = explainApiError(error);
      setStatus(message, true);
      state.conversations = [];
      state.selected.clear();
      render();
    } finally {
      state.scanning = false;
      setControlsBusy(false);
    }
  }

  async function fetchConversationPages(isArchived, label) {
    const results = [];
    const limit = 100;
    let offset = 0;
    let expectedTotal = Infinity;
    let page = 0;

    while (offset < expectedTotal && page < 200) {
      setStatus(t("loadingLabel", { label, count: formatNumber(results.length) }));
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(limit),
        order: "updated",
        is_archived: String(isArchived)
      });
      const response = await fetch(`/backend-api/conversations?${params}`, {
        credentials: "include",
        headers: await getHeaders()
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      expectedTotal = Number.isFinite(Number(data?.total)) ? Number(data.total) : offset + items.length;
      results.push(...items.map((item) => ({ ...item, is_archived: Boolean(isArchived || item?.is_archived) })));

      if (!items.length || items.length < limit) break;
      offset += items.length;
      page += 1;
    }

    return results;
  }

  function normalizeConversation(item) {
    const createMs = toMilliseconds(item.create_time || item.created_at);
    const updateMs = toMilliseconds(item.update_time || item.updated_at || item.create_time);
    return {
      id: String(item.id),
      title: String(item.title || t("untitled")),
      createMs,
      updateMs,
      isArchived: Boolean(item.is_archived),
      workspaceId: item.workspace_id || item.current_node || null
    };
  }

  function toMilliseconds(value) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric < 1e12 ? numeric * 1000 : numeric;
    const parsed = Date.parse(value || "");
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function filteredConversations() {
    const query = normalizeText(state.filter.query);
    const cutoff = state.filter.olderThan ? new Date(`${state.filter.olderThan}T00:00:00`).getTime() : null;
    return state.conversations.filter((conversation) => {
      if (state.filter.scope === "active" && conversation.isArchived) return false;
      if (state.filter.scope === "archived" && !conversation.isArchived) return false;
      const meta = getConversationMeta(conversation.id);
      if (state.filter.article === "articles" && !meta.article) return false;
      if (state.filter.article === "unmarked" && meta.article) return false;
      if (state.filter.project === "none" && meta.projectId) return false;
      if (state.filter.project !== "all" && state.filter.project !== "none" && meta.projectId !== state.filter.project) return false;
      if (query && !normalizeText(conversation.title).includes(query)) return false;
      if (cutoff && conversation.updateMs >= cutoff) return false;
      return true;
    });
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLocaleLowerCase("fa")
      .replace(/\s+/g, " ");
  }

  function render() {
    const visible = filteredConversations();
    ui.total.textContent = formatNumber(state.conversations.length);
    ui.visible.textContent = formatNumber(visible.length);
    ui.selectedTop.textContent = formatNumber(state.selected.size);
    ui.selectedBottom.textContent = formatNumber(state.selected.size);

    const hasData = state.conversations.length > 0;
    ui.selectFiltered.disabled = !visible.length || state.scanning || state.deleting;
    ui.selectGeneric.disabled = !hasData || state.scanning || state.deleting;
    ui.selectDuplicates.disabled = !hasData || state.scanning || state.deleting;
    ui.clearSelection.disabled = !state.selected.size || state.deleting;
    ui.exportCatalog.disabled = !hasData || state.deleting;
    ui.importSelection.disabled = !hasData || state.deleting;
    ui.exportSelection.disabled = !state.selected.size || state.deleting;
    ui.bulkProject.disabled = !state.selected.size || state.deleting;
    ui.bulkAssign.disabled = !state.selected.size || !ui.bulkProject.value || state.deleting;
    ui.deleteButton.disabled = !state.selected.size || state.deleting;

    ui.list.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = hasData ? t("noFilterMatches") : t("noConversationsLoaded");
      ui.list.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    visible.forEach((conversation) => fragment.appendChild(createRow(conversation)));
    ui.list.appendChild(fragment);
  }

  function createRow(conversation) {
    const protectedChat = conversation.id === state.currentConversationId;
    const metaData = getConversationMeta(conversation.id);
    const row = document.createElement("article");
    row.className = `row${protectedChat ? " protected" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    checkbox.checked = state.selected.has(conversation.id);
    checkbox.disabled = protectedChat || state.deleting;
    checkbox.setAttribute("aria-label", t("selectConversation", { title: conversation.title }));
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.selected.add(conversation.id);
      else state.selected.delete(conversation.id);
      updateSelectedCounters();
    });

    const articleButton = document.createElement("button");
    articleButton.type = "button";
    articleButton.className = `article-toggle${metaData.article ? " active" : ""}`;
    articleButton.textContent = metaData.article ? t("articleActive") : t("article");
    articleButton.title = metaData.article ? t("removeArticleMark") : t("markAsArticle");
    articleButton.addEventListener("click", () => {
      const current = getConversationMeta(conversation.id);
      setConversationMeta(conversation.id, current.article
        ? { article: false, projectId: "" }
        : { article: true });
      render();
    });

    const main = document.createElement("div");
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = conversation.title;
    title.title = conversation.title;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.appendChild(createBadge(t("updated", { date: formatDate(conversation.updateMs) })));
    if (conversation.isArchived) meta.appendChild(createBadge(t("archived"), "archived"));
    if (protectedChat) meta.appendChild(createBadge(t("current"), "protect"));
    if (metaData.article) meta.appendChild(createBadge(t("article"), "article"));
    const project = getProject(metaData.projectId);
    if (project) meta.appendChild(createBadge(project.name, "project"));
    main.append(title, meta);

    const projectPicker = document.createElement("select");
    projectPicker.className = "project-picker";
    fillProjectSelect(projectPicker, metaData.projectId, true);
    projectPicker.setAttribute("aria-label", t("projectForConversation", { title: conversation.title }));
    projectPicker.addEventListener("change", () => {
      const projectId = projectPicker.value || "";
      setConversationMeta(conversation.id, { projectId, article: projectId ? true : getConversationMeta(conversation.id).article });
      render();
    });

    const link = document.createElement("a");
    link.className = "open-chat";
    link.href = `${location.origin}/c/${encodeURIComponent(conversation.id)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t("open");

    row.append(checkbox, articleButton, main, projectPicker, link);
    return row;
  }

  function createBadge(text, className = "") {
    const badge = document.createElement("span");
    badge.className = `badge ${className}`.trim();
    badge.textContent = text;
    return badge;
  }

  function updateSelectedCounters() {
    ui.selectedTop.textContent = formatNumber(state.selected.size);
    ui.selectedBottom.textContent = formatNumber(state.selected.size);
    ui.clearSelection.disabled = !state.selected.size || state.deleting;
    ui.exportSelection.disabled = !state.selected.size || state.deleting;
    ui.bulkProject.disabled = !state.selected.size || state.deleting;
    ui.bulkAssign.disabled = !state.selected.size || !ui.bulkProject.value || state.deleting;
    ui.deleteButton.disabled = !state.selected.size || state.deleting;
  }

  function selectFiltered() {
    filteredConversations().forEach((conversation) => {
      if (conversation.id !== state.currentConversationId) state.selected.add(conversation.id);
    });
    render();
    setStatus(t("filteredSelected"));
  }

  function selectGenericTitles() {
    const exactGeneric = /^(new chat|temporary chat|untitled|hi|hello|test|question|\?+)$/i;
    let added = 0;
    state.conversations.forEach((conversation) => {
      const title = normalizeText(conversation.title);
      if (conversation.id !== state.currentConversationId && (exactGeneric.test(title) || title.length <= 2)) {
        if (!state.selected.has(conversation.id)) added += 1;
        state.selected.add(conversation.id);
      }
    });
    render();
    setStatus(t("genericSelected", { count: formatNumber(added) }));
  }

  function selectOlderDuplicates() {
    const groups = new Map();
    state.conversations.forEach((conversation) => {
      const key = normalizeText(conversation.title);
      if (!key) return;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(conversation);
    });

    let added = 0;
    groups.forEach((items) => {
      if (items.length < 2) return;
      items.sort((a, b) => b.updateMs - a.updateMs);
      items.slice(1).forEach((conversation) => {
        if (conversation.id === state.currentConversationId) return;
        if (!state.selected.has(conversation.id)) added += 1;
        state.selected.add(conversation.id);
      });
    });
    render();
    setStatus(t("duplicatesSelected", { count: formatNumber(added) }));
  }

  function exportCatalog() {
    const payload = {
      schema: "chat-cleaner/catalog-v2",
      generatedAt: new Date().toISOString(),
      source: location.origin,
      conversations: state.conversations.map((conversation) => ({
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.createMs ? new Date(conversation.createMs).toISOString() : null,
        updatedAt: conversation.updateMs ? new Date(conversation.updateMs).toISOString() : null,
        archived: conversation.isArchived,
        protectedCurrentChat: conversation.id === state.currentConversationId,
        article: getConversationMeta(conversation.id).article,
        project: getProject(getConversationMeta(conversation.id).projectId)?.name || null
      }))
    };
    downloadJson(payload, `chatgpt-chat-catalog-${isoDate()}.json`);
    setStatus(t("catalogExported"));
  }

  function exportSelection() {
    const byId = new Map(state.conversations.map((conversation) => [conversation.id, conversation]));
    const items = [...state.selected]
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((conversation) => ({ id: conversation.id, title: conversation.title }));
    downloadJson({
      schema: "chat-cleaner/selection-v1",
      generatedAt: new Date().toISOString(),
      deleteIds: items.map((item) => item.id),
      items
    }, `chatgpt-delete-selection-${isoDate()}.json`);
    setStatus(t("selectionExported"));
  }

  async function importSelectionFile() {
    const [file] = ui.fileInput.files || [];
    ui.fileInput.value = "";
    if (!file) return;

    try {
      const payload = JSON.parse(await file.text());
      const ids = Array.isArray(payload?.deleteIds)
        ? payload.deleteIds
        : Array.isArray(payload?.ids)
          ? payload.ids
          : [];
      if (!ids.length) throw new Error(t("missingDeleteIds"));

      const available = new Set(state.conversations.map((conversation) => conversation.id));
      let imported = 0;
      let skipped = 0;
      ids.forEach((rawId) => {
        const id = String(rawId);
        if (id === state.currentConversationId || !available.has(id)) {
          skipped += 1;
          return;
        }
        state.selected.add(id);
        imported += 1;
      });
      render();
      setStatus(t("selectionsImported", { count: formatNumber(imported), skipped: skipped ? t("skippedSuffix", { count: formatNumber(skipped) }) : "" }));
    } catch (error) {
      setStatus(t("invalidSelectionFile", { error: error?.message || t("unknownError") }), true);
    }
  }

  function downloadJson(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function openDeleteConfirmation() {
    if (!state.selected.size || state.deleting) return;
    const selectedItems = state.conversations.filter((conversation) => state.selected.has(conversation.id));
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";

    const card = document.createElement("section");
    card.className = "modal delete-modal";
    const title = document.createElement("h2");
    title.textContent = t("deleteTitle", { count: formatNumber(selectedItems.length) });
    const warning = document.createElement("p");
    warning.textContent = t("deleteWarning");
    const preview = document.createElement("ol");
    preview.className = "preview";
    selectedItems.slice(0, 20).forEach((conversation) => {
      const item = document.createElement("li");
      item.textContent = conversation.title;
      preview.appendChild(item);
    });
    if (selectedItems.length > 20) {
      const item = document.createElement("li");
      item.textContent = t("moreConversations", { count: formatNumber(selectedItems.length - 20) });
      preview.appendChild(item);
    }

    const phrase = document.createElement("input");
    phrase.type = "text";
    phrase.placeholder = t("deletePhrase");
    phrase.autocomplete = "off";
    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = t("cancel");
    const confirm = document.createElement("button");
    confirm.type = "button";
    confirm.className = "danger";
    confirm.textContent = t("delete");
    confirm.disabled = true;
    actions.append(cancel, confirm);
    card.append(title, warning, preview, phrase, actions);
    modal.appendChild(card);
    ui.shell.appendChild(modal);

    phrase.addEventListener("input", () => {
      confirm.disabled = phrase.value.trim() !== t("deletePhrase");
    });
    cancel.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.remove();
    });
    confirm.addEventListener("click", () => runDeletion(selectedItems, card, cancel, confirm, phrase));
    phrase.focus();
  }

  async function runDeletion(items, card, cancelButton, confirmButton, phraseInput) {
    state.deleting = true;
    cancelButton.disabled = true;
    confirmButton.disabled = true;
    phraseInput.disabled = true;
    setControlsBusy(true);

    const progress = document.createElement("div");
    progress.className = "progress";
    const progressBar = document.createElement("span");
    progress.appendChild(progressBar);
    const progressText = document.createElement("p");
    progressText.textContent = t("deleting");
    card.append(progress, progressText);

    let deleted = 0;
    const deletedIds = new Set();
    const failures = [];
    let fatalFailure = null;

    for (let index = 0; index < items.length; index += 1) {
      const conversation = items[index];
      progressText.textContent = t("deletingProgress", { current: formatNumber(index + 1), total: formatNumber(items.length), title: conversation.title });
      progressBar.style.width = `${Math.round((index / items.length) * 100)}%`;
      try {
        await deleteConversation(conversation.id);
        state.selected.delete(conversation.id);
        deletedIds.add(conversation.id);
        deleted += 1;
      } catch (error) {
        failures.push({ id: conversation.id, title: conversation.title, status: error?.status || null });
        if ([401, 403, 404, 405].includes(error?.status)) {
          fatalFailure = error.status;
          break;
        }
      }
      if (index < items.length - 1) await wait(220);
    }

    progressBar.style.width = "100%";
    state.conversations = state.conversations.filter((conversation) => !deletedIds.has(conversation.id));
    deletedIds.forEach((id) => delete state.organizer.conversations[id]);
    if (deletedIds.size) saveOrganizer();
    state.deleting = false;
    setControlsBusy(false);
    render();

    progressText.textContent = fatalFailure === 401 || fatalFailure === 403
      ? t("sessionExpiredAfterDelete", { count: formatNumber(deleted) })
      : fatalFailure === 404 || fatalFailure === 405
        ? t("endpointChangedAfterDelete", { count: formatNumber(deleted) })
      : t("deletionResult", { count: formatNumber(deleted), failures: failures.length ? t("failuresSuffix", { count: formatNumber(failures.length) }) : "" });
    cancelButton.disabled = false;
    cancelButton.textContent = t("close");
    confirmButton.remove();
    phraseInput.remove();
    setStatus(progressText.textContent, failures.length || Boolean(fatalFailure));
  }

  async function deleteConversation(id) {
    const response = await fetch(`/backend-api/conversation/${encodeURIComponent(id)}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        ...(await getHeaders()),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ is_visible: false })
    });

    if (response.status === 429) {
      await wait(1800);
      const retry = await fetch(`/backend-api/conversation/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          ...(await getHeaders()),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_visible: false })
      });
      if (retry.ok) return;
      const retryError = new Error(`HTTP ${retry.status}`);
      retryError.status = retry.status;
      throw retryError;
    }

    if (response.ok) return;
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  function loadOrganizer() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return {
        projects: Array.isArray(parsed?.projects) ? parsed.projects.filter((item) => item?.id && item?.name) : [],
        conversations: parsed?.conversations && typeof parsed.conversations === "object" ? parsed.conversations : {}
      };
    } catch {
      return { projects: [], conversations: {} };
    }
  }

  function saveOrganizer() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.organizer));
    } catch {
      setStatus(t("unableSaveOrganization"), true);
    }
  }

  function getConversationMeta(id) {
    const value = state.organizer.conversations[id] || {};
    return {
      article: Boolean(value.article),
      projectId: String(value.projectId || "")
    };
  }

  function setConversationMeta(id, patch) {
    const current = getConversationMeta(id);
    const next = { ...current, ...patch };
    if (!next.article && !next.projectId) delete state.organizer.conversations[id];
    else state.organizer.conversations[id] = next;
    saveOrganizer();
  }

  function getProject(projectId) {
    if (!projectId) return null;
    return state.organizer.projects.find((project) => project.id === projectId) || null;
  }

  function makeProjectId() {
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
    return `project-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function discoverNativeChatGPTProjectsFromDom() {
    const projects = [];
    const seen = new Set();
    const anchors = Array.from(document.querySelectorAll('a[href]'));

    for (const anchor of anchors) {
      let url;
      try {
        url = new URL(anchor.getAttribute('href') || anchor.href, location.origin);
      } catch {
        continue;
      }

      if (url.origin !== location.origin) continue;
      const match = url.pathname.match(/^\/g\/(g-p-[0-9a-f]{32})(?:-[^/]+)?(?:\/project)?\/?$/i);
      if (!match) continue;

      const nativeId = match[1];
      if (seen.has(nativeId)) continue;

      const name = normalizeText(anchor.textContent || '') || nativeId;
      if (!name || /^projects?$/i.test(name)) continue;

      seen.add(nativeId);
      projects.push({
        id: `chatgpt:${nativeId}`,
        nativeId,
        name,
        source: 'chatgpt',
        href: `/g/${nativeId}/project`
      });
    }

    return projects;
  }

  function normalizeNativeProject(item) {
    const outer = item?.gizmo ?? item;
    const project = outer?.gizmo ?? outer;
    const nativeId = String(project?.id || project?.gizmo_id || '');
    if (!/^g-p-[0-9a-f]{32}$/i.test(nativeId)) return null;

    const name = normalizeText(project?.display?.name || project?.name || nativeId);
    if (!name) return null;

    return {
      id: `chatgpt:${nativeId}`,
      nativeId,
      name,
      source: 'chatgpt',
      href: `/g/${nativeId}/project`,
      workspaceId: project?.workspace_id || null
    };
  }

  async function fetchNativeChatGPTProjectsFromApi() {
    const results = [];
    const seen = new Set();
    let cursor = null;
    let page = 0;

    do {
      const params = new URLSearchParams({
        owned_only: 'true',
        conversations_per_gizmo: '0'
      });
      if (cursor) params.set('cursor', cursor);

      const response = await fetch(`/backend-api/gizmos/snorlax/sidebar?${params}`, {
        credentials: 'include',
        headers: await getHeaders()
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      for (const item of items) {
        const project = normalizeNativeProject(item);
        if (!project || seen.has(project.nativeId)) continue;
        seen.add(project.nativeId);
        results.push(project);
      }

      cursor = typeof data?.cursor === 'string' && data.cursor ? data.cursor : null;
      page += 1;
    } while (cursor && page < 100);

    return results;
  }

  async function syncNativeChatGPTProjects({ announce = false } = {}) {
    let discovered;
    try {
      discovered = await fetchNativeChatGPTProjectsFromApi();
    } catch (error) {
      const fallback = discoverNativeChatGPTProjectsFromDom();
      if (!fallback.length) {
        if (announce) setStatus(t('projectSyncFailed'), true);
        throw error;
      }
      discovered = fallback;
    }

    // If the API returns an empty list, keep the user's local projects but remove
    // stale native project entries. This reflects the current ChatGPT account.
    const locals = state.organizer.projects.filter((project) => project.source !== 'chatgpt');
    const previousNative = new Map(
      state.organizer.projects
        .filter((project) => project.source === 'chatgpt')
        .map((project) => [project.id, project])
    );

    const native = discovered.map((project) => ({
      ...previousNative.get(project.id),
      ...project
    }));

    state.organizer.projects = [...locals, ...native];
    saveOrganizer();
    refreshProjectControls();
    if (announce) setStatus(t('syncedProjects', { count: formatNumber(native.length) }));
    return native.length;
  }

  function fillProjectSelect(select, selectedId = "", includeNone = false) {
    select.replaceChildren();
    if (includeNone) {
      const none = document.createElement("option");
      none.value = "";
      none.textContent = t("noProject");
      select.appendChild(none);
    }
    state.organizer.projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.name;
      option.selected = project.id === selectedId;
      select.appendChild(option);
    });
  }

  function refreshProjectControls() {
    const currentFilter = state.filter.project;
    ui.projectFilter.replaceChildren();
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = t("allProjects");
    const none = document.createElement("option");
    none.value = "none";
    none.textContent = t("noProject");
    ui.projectFilter.append(all, none);
    state.organizer.projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.name;
      ui.projectFilter.appendChild(option);
    });
    ui.projectFilter.value = [...ui.projectFilter.options].some((option) => option.value === currentFilter) ? currentFilter : "all";
    state.filter.project = ui.projectFilter.value;

    const bulkValue = ui.bulkProject.value;
    fillProjectSelect(ui.bulkProject, bulkValue, false);
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = t("moveSelectedTo");
    ui.bulkProject.prepend(placeholder);
    ui.bulkProject.value = [...ui.bulkProject.options].some((option) => option.value === bulkValue) ? bulkValue : "";
    ui.bulkAssign.disabled = !state.selected.size || !ui.bulkProject.value || state.deleting;
    ui.bulkProject.onchange = () => {
      ui.bulkAssign.disabled = !state.selected.size || !ui.bulkProject.value || state.deleting;
    };
  }

  function openProjectManager() {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    const card = document.createElement("section");
    card.className = "modal";

    const title = document.createElement("h2");
    title.textContent = t("projects");
    const newProject = document.createElement("div");
    newProject.style.cssText = "display:flex;gap:8px;margin:14px 0;";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = t("projectName");
    const add = document.createElement("button");
    add.type = "button";
    add.className = "primary";
    add.textContent = t("add");
    newProject.append(input, add);

    const sync = document.createElement("button");
    sync.type = "button";
    sync.textContent = t("syncProjects");
    sync.style.cssText = "margin-bottom:14px;";

    const list = document.createElement("div");
    list.style.cssText = "display:grid;gap:8px;";

    const draw = () => {
      list.replaceChildren();
      if (!state.organizer.projects.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.style.padding = "18px";
        empty.textContent = t("noProjects");
        list.appendChild(empty);
        return;
      }
      state.organizer.projects.forEach((project) => {
        const row = document.createElement("div");
        row.style.cssText = "display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px;align-items:center;";
        const name = document.createElement("input");
        name.value = project.name;
        const save = document.createElement("button");
        save.type = "button";
        save.textContent = project.source === "chatgpt" ? t("chatgptProject") : t("save");
        if (project.source === "chatgpt") {
          name.readOnly = true;
          save.disabled = true;
        } else {
          save.addEventListener("click", () => {
            const value = name.value.trim();
            if (!value) return;
            project.name = value;
            saveOrganizer();
            refreshProjectControls();
            render();
          });
        }
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "danger";
        remove.textContent = t("delete");
        if (project.source === "chatgpt") remove.disabled = true;
        remove.addEventListener("click", () => {
          state.organizer.projects = state.organizer.projects.filter((item) => item.id !== project.id);
          Object.keys(state.organizer.conversations).forEach((conversationId) => {
            if (state.organizer.conversations[conversationId]?.projectId === project.id) {
              state.organizer.conversations[conversationId].projectId = "";
            }
          });
          saveOrganizer();
          refreshProjectControls();
          draw();
          render();
        });
        row.append(name, save, remove);
        list.appendChild(row);
      });
    };

    sync.addEventListener("click", async () => {
      if (sync.disabled) return;
      sync.disabled = true;
      const previousText = sync.textContent;
      sync.textContent = t("syncingProjects");
      try {
        await syncNativeChatGPTProjects({ announce: true });
        draw();
      } catch {
        // syncNativeChatGPTProjects already reports a useful error when requested.
      } finally {
        sync.disabled = false;
        sync.textContent = previousText || t("syncProjects");
      }
    });

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = t("close");
    close.addEventListener("click", () => modal.remove());
    actions.appendChild(close);

    const addProject = () => {
      const name = input.value.trim();
      if (!name) return;
      const existing = state.organizer.projects.find((project) => normalizeText(project.name) === normalizeText(name));
      if (existing) {
        input.value = "";
        return;
      }
      state.organizer.projects.push({ id: makeProjectId(), name });
      input.value = "";
      saveOrganizer();
      refreshProjectControls();
      draw();
      render();
    };
    add.addEventListener("click", addProject);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") addProject();
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.remove();
    });

    card.append(title, newProject, sync, list, actions);
    modal.appendChild(card);
    ui.shell.appendChild(modal);
    draw();
    input.focus();

    // Always refresh from ChatGPT when the manager opens so the list reflects
    // the projects defined in the current account, even if the sidebar is collapsed.
    sync.disabled = true;
    sync.textContent = t("syncingProjects");
    syncNativeChatGPTProjects()
      .then(() => draw())
      .catch(() => {})
      .finally(() => {
        sync.disabled = false;
        sync.textContent = t("syncProjects");
      });
  }

  function assignSelectedToProject() {
    const projectId = ui.bulkProject.value;
    if (!projectId || !state.selected.size || !getProject(projectId)) return;
    state.selected.forEach((conversationId) => {
      const current = getConversationMeta(conversationId);
      state.organizer.conversations[conversationId] = { ...current, projectId, article: true };
    });
    saveOrganizer();
    render();
    setStatus(t("conversationsAssigned", { count: formatNumber(state.selected.size) }));
  }

  function setControlsBusy(busy) {
    ui.scan.disabled = busy;
    ui.search.disabled = busy;
    ui.scope.disabled = busy;
    ui.olderThan.disabled = busy;
    ui.articleFilter.disabled = busy;
    ui.projectFilter.disabled = busy;
    ui.manageProjects.disabled = busy;
    ui.bulkProject.disabled = busy || !state.selected.size;
    ui.bulkAssign.disabled = busy || !state.selected.size || !ui.bulkProject.value;
    if (busy) {
      ui.selectFiltered.disabled = true;
      ui.selectGeneric.disabled = true;
      ui.selectDuplicates.disabled = true;
      ui.clearSelection.disabled = true;
      ui.exportCatalog.disabled = true;
      ui.exportSelection.disabled = true;
      ui.importSelection.disabled = true;
      ui.deleteButton.disabled = true;
    } else {
      render();
    }
  }

  function setStatus(message, error = false) {
    ui.status.textContent = message;
    ui.status.classList.toggle("error", Boolean(error));
  }

  function explainApiError(error) {
    if (error?.status === 401 || error?.status === 403) return t("authError");
    if (error?.status === 429) return t("rateLimitError");
    if (error?.status === 404 || error?.status === 405) return t("interfaceChangedError");
    return t("loadError", { detail: error?.message ? `: ${error.message}` : "" });
  }

  function formatDate(milliseconds) {
    if (!milliseconds) return t("unknown");
    try {
      return new Intl.DateTimeFormat(state.language === "fa" ? "fa-IR" : "en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(milliseconds));
    } catch {
      return new Date(milliseconds).toLocaleDateString();
    }
  }

  function formatNumber(value) {
    try {
      return new Intl.NumberFormat(state.language === "fa" ? "fa-IR" : "en-US").format(Number(value) || 0);
    } catch {
      return String(value);
    }
  }

  function isoDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
})();
