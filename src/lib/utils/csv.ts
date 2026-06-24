function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          // Escaped quote
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ',') {
        row.push(field.trim());
        field = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        // Skip \r\n as a unit
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field.trim());
        field = '';
        if (row.some(f => f !== '')) rows.push(row);
        row = [];
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  // Flush last field/row
  if (field || row.length) {
    row.push(field.trim());
    if (row.some(f => f !== '')) rows.push(row);
  }

  return rows;
}

export async function fetchCSV(url: string): Promise<Record<string, string>[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
  const text = await res.text();

  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const headers = rows[0];
  return rows.slice(1)
    .filter(r => r.length >= headers.length / 2) // skip near-empty rows
    .map(values =>
      Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
    );
}
