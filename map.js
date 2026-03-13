// map.js
// Renders a graphical grid map in the chat panel.
// To expand the map, edit MAP_GRID and MAP_ROOMS below.

// ── MAP LAYOUT ──
// Each cell: { id: "room-id" } or null for empty space.
// Grid is read top-to-bottom, left-to-right.
// Adjust MAP_COLS if you add more columns.

const MAP_COLS = 5;

const MAP_GRID = [
  null,              { id: "path-nw" },       { id: "billboard-north" }, { id: "path-ne" },       null,
  { id: "billboard-west" }, null,              { id: "fountain" },        null,              { id: "billboard-east" },
  null,              { id: "path-sw" },       { id: "billboard-south" }, { id: "path-se" },       null,
];

// ── CELL DISPLAY ──
// symbol: what to draw in the cell
// label:  short name shown below the grid (optional)
const MAP_ROOMS = {
  "fountain":        { symbol: "( )" },
  "billboard-north": { symbol: "[B]" },
  "billboard-south": { symbol: "[B]" },
  "billboard-east":  { symbol: "[B]" },
  "billboard-west":  { symbol: "[B]" },
  "path-ne":         { symbol: "[-]" },
  "path-nw":         { symbol: "[-]" },
  "path-se":         { symbol: "[-]" },
  "path-sw":         { symbol: "[-]" },
};

// ── CONNECTORS ──
// Pairs of [gridIndex, gridIndex] that should be visually connected.
// Horizontal adjacency draws "-", vertical adjacency draws "|".
const MAP_CONNECTIONS = [
  // fountain <-> billboards
  [7, 2],   // fountain - billboard-north  (vertical)
  [7, 12],  // fountain - billboard-south  (vertical)
  [7, 6],   // fountain - billboard-west   (horizontal)
  [7, 8],   // fountain - billboard-east   (horizontal)
  // billboards <-> corner paths
  [2, 1],   // billboard-north - path-nw   (horizontal)
  [2, 3],   // billboard-north - path-ne   (horizontal)
  [12, 11], // billboard-south - path-sw   (horizontal)
  [12, 13], // billboard-south - path-se   (horizontal)
  [6, 11],  // billboard-west  - path-sw   (vertical)
  [6, 1],   // billboard-west  - path-nw   (vertical)
  [8, 3],   // billboard-east  - path-ne   (vertical)
  [8, 13],  // billboard-east  - path-se   (vertical)
];

// ── RENDER ──
function renderMap(currentRoom) {
  const panel = document.getElementById("map-panel");
  if (!panel) return;

  const rows = Math.ceil(MAP_GRID.length / MAP_COLS);

  // Build a 2D array of display rows.
  // Each grid row becomes 3 display lines: connector-top, cell, connector-bottom.
  // We merge connector-bottom of row N with connector-top of row N+1.

  // Index helper
  const idx = (r, c) => r * MAP_COLS + c;

  // Build connector lookup for quick access
  const connSet = new Set(MAP_CONNECTIONS.map(([a, b]) => `${Math.min(a,b)}-${Math.max(a,b)}`));
  const connected = (a, b) => connSet.has(`${Math.min(a,b)}-${Math.max(a,b)}`);

  let lines = [];

  for (let r = 0; r < rows; r++) {
    // Cell row
    let cellLine = "";
    // Vertical connector row (between this row and next)
    let vLine = "";

    for (let c = 0; c < MAP_COLS; c++) {
      const i = idx(r, c);
      const cell = MAP_GRID[i];
      const right = c < MAP_COLS - 1 ? MAP_GRID[idx(r, c + 1)] : null;
      const below = r < rows - 1 ? MAP_GRID[idx(r + 1, c)] : null;

      // Cell symbol
      let sym = "   "; // 3 spaces for empty
      if (cell) {
        const def = MAP_ROOMS[cell.id];
        sym = def ? def.symbol : "[?]";
        if (cell.id === currentRoom) {
          // Mark current room: replace middle char with @
          sym = sym[0] + "@" + sym[2];
        }
      }
      cellLine += sym;

      // Horizontal connector to the right
      if (c < MAP_COLS - 1) {
        const hConn = cell && right && connected(i, idx(r, c + 1));
        cellLine += hConn ? "-" : " ";
      }

      // Vertical connector below
      const vConn = cell && below && connected(i, idx(r + 1, c));
      // Center of cell is char index 1 (0-indexed) in a 3-char symbol
      vLine += vConn ? " | " : "   ";
      if (c < MAP_COLS - 1) vLine += " "; // spacer to match horizontal gap
    }

    lines.push(cellLine);
    if (r < rows - 1) lines.push(vLine);
  }

  panel.textContent = lines.join("\n");
}
