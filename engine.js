// engine.js
const worldOutput = document.getElementById("world-output");
function print(text) {
  const line = document.createElement("div");
  line.innerHTML = text;
  worldOutput.appendChild(line);
  worldOutput.scrollTop = worldOutput.scrollHeight;
}

// ── STATE ──
let currentRoom = null;

// ── INIT ──
function init() {
  const firstTime = !localStorage.getItem("seen-billboard-hint");
  currentRoom = SPAWN_ROOMS[Math.floor(Math.random() * SPAWN_ROOMS.length)];
  showRoom(currentRoom);
  if (firstTime) {
    print("try: read billboard");
    localStorage.setItem("seen-billboard-hint", "1");
  }
}

// ── SHOW ROOM ──
function showRoom(roomId) {
  const room = ROOMS[roomId];
  if (!room) return;
  print("");
  print(room.name);
  print(room.desc);
  showExits(room);
}

const DIR_FULL = { n: "NORTH", s: "SOUTH", e: "EAST", w: "WEST", u: "UP", d: "DOWN" };

function showExits(room) {
  const dirs = Object.keys(room.exits);
  if (dirs.length === 0) { print("There are no exits."); return; }
  print("");
  for (const dir of dirs) {
    const label = DIR_FULL[dir] || dir.toUpperCase();
    print(label + " -- " + room.exits[dir].desc);
  }
}

// ── MOVEMENT ──
const DIR_ALIASES = { n:"n", north:"n", s:"s", south:"s", e:"e", east:"e", w:"w", west:"w", u:"u", up:"u", d:"d", down:"d" };

function move(dir) {
  const room = ROOMS[currentRoom];
  if (!room.exits[dir]) { print("You cannot go that way."); return; }
  const dest = room.exits[dir].to;
  if (!ROOMS[dest]) { print("That path leads nowhere yet."); return; }
  currentRoom = dest;
  showRoom(currentRoom);
}

// ── EXAMINE ──
function examine(target) {
  const room = ROOMS[currentRoom];

  // Check room nodes first
  if (room.nodes) {
    for (const nodeId of room.nodes) {
      const node = NODES[nodeId];
      if (node && node.name.toLowerCase() === target) {
        print("");
        print(node.desc);
        return;
      }
    }
  }

  // Check billboard
  if (target === "billboard") {
    if (!room.billboard) { print("There is no billboard here."); return; }
    print("");
    print(BILLBOARD_EXAMINE);
    return;
  }

  print("You don't see that here.");
}

// ── COMMAND HANDLER ──
function handleCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  print("> " + raw);

  if (DIR_ALIASES[cmd] !== undefined) { move(DIR_ALIASES[cmd]); return; }
  if (cmd === "look" || cmd === "l") { showRoom(currentRoom); return; }
  if (cmd === "exits") { showExits(ROOMS[currentRoom]); return; }

  if (cmd === "read billboard") {
    const room = ROOMS[currentRoom];
    if (!room.billboard) { print("There is no billboard here."); return; }
    print("");
    print(BILLBOARD_TEXT);
    return;
  }

  if (cmd.startsWith("examine ") || cmd.startsWith("ex ")) {
    const target = cmd.replace(/^(examine|ex)\s+/, "").trim();
    examine(target);
    return;
  }

  print("Unknown command.");
}

init();
