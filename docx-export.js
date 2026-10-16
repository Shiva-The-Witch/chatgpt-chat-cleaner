(() => {
  "use strict";

  const encoder = new TextEncoder();
  const bytes = (value) => encoder.encode(String(value));
  const xml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  function paragraph(value, bold = false) {
    const lines = String(value ?? "").split(/\r?\n/);
    return lines.map((line) => '<w:p><w:pPr><w:bidi/></w:pPr><w:r>' +
      (bold ? '<w:rPr><w:b/></w:rPr>' : '') +
      '<w:t xml:space="preserve">' + xml(line) + '</w:t></w:r></w:p>').join("");
  }

  function documentXml(chats) {
    let body = "";
    chats.forEach((chat, index) => {
      if (index) body += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      body += paragraph((index + 1) + ". " + chat.title, true);
      body += paragraph("Conversation ID: " + chat.id);
      if (chat.createdAt) body += paragraph("Created: " + chat.createdAt);
      if (chat.updatedAt) body += paragraph("Updated: " + chat.updatedAt);
      body += paragraph("https://chatgpt.com/c/" + chat.id);
      body += paragraph(" ");
      for (const message of chat.messages) {
        body += paragraph(message.role + (message.date ? " — " + message.date : ""), true);
        body += paragraph(message.text);
        body += paragraph(" ");
      }
    });
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      '<w:body>' + body + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>' +
      '<w:pgMar w:top="1000" w:right="1000" w:bottom="1000" w:left="1000"/></w:sectPr>' +
      '</w:body></w:document>';
  }

  const contentTypes = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '</Types>';
  const packageRels = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';
  const documentRels = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>';

  const crcTable = Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit++) value = (value & 1) ? (0xEDB88320 ^ (value >>> 1)) : value >>> 1;
    return value >>> 0;
  });
  function crc32(data) {
    let value = 0xFFFFFFFF;
    for (const byte of data) value = crcTable[(value ^ byte) & 255] ^ (value >>> 8);
    return (value ^ 0xFFFFFFFF) >>> 0;
  }
  function header(size, writes) {
    const buffer = new Uint8Array(size);
    const view = new DataView(buffer.buffer);
    writes(view);
    return buffer;
  }

  function makeZip(entries) {
    const parts = [];
    const central = [];
    let offset = 0;
    for (const [filename, text] of entries) {
      const name = bytes(filename);
      const data = bytes(text);
      const crc = crc32(data);
      const local = header(30, (view) => {
        view.setUint32(0, 0x04034b50, true);
        view.setUint16(4, 20, true);
        view.setUint16(6, 0x0800, true);
        view.setUint16(8, 0, true);
        view.setUint32(14, crc, true);
        view.setUint32(18, data.length, true);
        view.setUint32(22, data.length, true);
        view.setUint16(26, name.length, true);
      });
      parts.push(local, name, data);
      const record = header(46, (view) => {
        view.setUint32(0, 0x02014b50, true);
        view.setUint16(4, 20, true);
        view.setUint16(6, 20, true);
        view.setUint16(8, 0x0800, true);
        view.setUint32(16, crc, true);
        view.setUint32(20, data.length, true);
        view.setUint32(24, data.length, true);
        view.setUint16(28, name.length, true);
        view.setUint32(42, offset, true);
      });
      central.push(record, name);
      offset += local.length + name.length + data.length;
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = header(22, (view) => {
      view.setUint32(0, 0x06054b50, true);
      view.setUint16(8, entries.length, true);
      view.setUint16(10, entries.length, true);
      view.setUint32(12, centralSize, true);
      view.setUint32(16, offset, true);
    });
    return new Blob([...parts, ...central, end], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
  }

  function create(chats) {
    if (!Array.isArray(chats) || !chats.length) throw new Error("Nothing to export");
    if (chats.some((chat) => !chat.id || !Array.isArray(chat.messages) || !chat.messages.length)) {
      throw new Error("A conversation is incomplete; export cancelled");
    }
    return makeZip([
      ["[Content_Types].xml", contentTypes],
      ["_rels/.rels", packageRels],
      ["word/_rels/document.xml.rels", documentRels],
      ["word/document.xml", documentXml(chats)]
    ]);
  }

  globalThis.ChatCleanerDocx = Object.freeze({ create });
})();
