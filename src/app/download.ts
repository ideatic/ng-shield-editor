export function downloadData(filename: string, content: string | Blob, mime: boolean | string = 'application/octet-stream', includeBOM = false) {
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.rel = 'noopener'; // tabnabbing

  if (typeof content == 'string') {
    content = includeBOM ? (decodeURIComponent('%ef%bb%bf') + content) : content;

    if (/[\x00-\x1F]/.test(content)) { // Cadena binaria
      const base64 = btoa(_utf8Encode(content)); // https://stackoverflow.com/a/26603875/528065
      downloadLink.href = mime === false || mime === undefined ? base64 : `data:${mime};base64,${base64}`;
    } else {
      downloadLink.href = mime === false || mime === undefined ? content : `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
    }
  } else {
    if (includeBOM) {
      throw new Error('Unable to include BOM on blob data');
    }

    downloadLink.href = URL.createObjectURL(content);
    setTimeout(() => URL.revokeObjectURL(downloadLink.href), 4E4);
  }

  document.body.appendChild(downloadLink);

  setTimeout(function () {
    downloadLink.click();
    downloadLink.remove();
  });
}


function _utf8Encode(string) {
  let utfText = '';
  string = string.replace(/\r\n/g, '\n');

  const fromCharCode = String.fromCharCode;

  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n);

    if (c < 128) {
      utfText += fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utfText += fromCharCode((c >> 6) | 192);
      utfText += fromCharCode((c & 63) | 128);
    } else {
      utfText += fromCharCode((c >> 12) | 224);
      utfText += fromCharCode(((c >> 6) & 63) | 128);
      utfText += fromCharCode((c & 63) | 128);
    }

  }

  return utfText;
}
