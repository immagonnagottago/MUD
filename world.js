// world.js

const ROOMS = {

  "fountain": {
    name: "The Central Fountain",
    desc: "A wide stone fountain occupies the center of the park. Water rises and falls in the midday light. Paths lead north, south, east, and west through the grass.",
    exits: {
      n: { to: "path-north", desc: "The path leads north." },
      s: { to: "path-south", desc: "The path leads south." },
      e: { to: "path-east",  desc: "The path leads east." },
      w: { to: "path-west",  desc: "The path leads west." }
    }
  },

  "path-north": {
    name: "North Path",
    desc: "A gravel path through open grass. A wooden bench sits to one side. The fountain is to the south. A <span class=\"n-object\">billboard</span> is visible to the north.",
    exits: {
      n: { to: "billboard-north", desc: "The path leads north to the billboard." },
      s: { to: "fountain",        desc: "The path leads south to the fountain." },
      e: { to: "billboard-east",  desc: "The path curves east to the east billboard." },
      w: { to: "billboard-west",  desc: "The path curves west to the west billboard." }
    },
    nodes: ["bench-north"]
  },

  "path-south": {
    name: "South Path",
    desc: "A gravel path through open grass. A large oak tree stands beside the path, its shade falling across the gravel. The fountain is to the north. A <span class=\"n-object\">billboard</span> is visible to the south.",
    exits: {
      s: { to: "billboard-south", desc: "The path leads south to the billboard." },
      n: { to: "fountain",        desc: "The path leads north to the fountain." },
      e: { to: "billboard-east",  desc: "The path curves east to the east billboard." },
      w: { to: "billboard-west",  desc: "The path curves west to the west billboard." }
    },
    nodes: ["oak-tree"]
  },

  "path-east": {
    name: "East Path",
    desc: "A gravel path through open grass. The fountain is to the west. A <span class=\"n-object\">billboard</span> is visible to the east.",
    exits: {
      e: { to: "billboard-east",  desc: "The path leads east to the billboard." },
      w: { to: "fountain",        desc: "The path leads west to the fountain." },
      n: { to: "billboard-north", desc: "The path curves north to the north billboard." },
      s: { to: "billboard-south", desc: "The path curves south to the south billboard." }
    }
  },

  "path-west": {
    name: "West Path",
    desc: "A gravel path through open grass. A wooden bench sits beside the path. The fountain is to the east. A <span class=\"n-object\">billboard</span> is visible to the west.",
    exits: {
      w: { to: "billboard-west",  desc: "The path leads west to the billboard." },
      e: { to: "fountain",        desc: "The path leads east to the fountain." },
      n: { to: "billboard-north", desc: "The path curves north to the north billboard." },
      s: { to: "billboard-south", desc: "The path curves south to the south billboard." }
    },
    nodes: ["bench-west"]
  },

  "billboard-north": {
    name: "North Billboard",
    desc: "A <span class=\"n-object\">billboard</span> stands at the north end of the path. The fountain is visible to the south.",
    exits: {
      s: { to: "path-north", desc: "The path leads south toward the fountain." },
      e: { to: "path-east",  desc: "The path curves east toward the east billboard." },
      w: { to: "path-west",  desc: "The path curves west toward the west billboard." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-south": {
    name: "South Billboard",
    desc: "A <span class=\"n-object\">billboard</span> stands at the south end of the path. The fountain is visible to the north.",
    exits: {
      n: { to: "path-south", desc: "The path leads north toward the fountain." },
      e: { to: "path-east",  desc: "The path curves east toward the east billboard." },
      w: { to: "path-west",  desc: "The path curves west toward the west billboard." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-east": {
    name: "East Billboard",
    desc: "A <span class=\"n-object\">billboard</span> stands at the east end of the path. The fountain is visible to the west.",
    exits: {
      w: { to: "path-east",  desc: "The path leads west toward the fountain." },
      n: { to: "path-north", desc: "The path curves north toward the north billboard." },
      s: { to: "path-south", desc: "The path curves south toward the south billboard." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-west": {
    name: "West Billboard",
    desc: "A <span class=\"n-object\">billboard</span> stands at the west end of the path. The fountain is visible to the east.",
    exits: {
      e: { to: "path-west",  desc: "The path leads east toward the fountain." },
      n: { to: "path-north", desc: "The path curves north toward the north billboard." },
      s: { to: "path-south", desc: "The path curves south toward the south billboard." }
    },
    billboard: true,
    spawn: true
  }

};

const NODES = {

  "bench-north": {
    name: "Bench",
    desc: "A plain wooden bench beside the north path."
  },

  "bench-west": {
    name: "Bench",
    desc: "A plain wooden bench beside the west path."
  },

  "oak-tree": {
    name: "Oak Tree",
    desc: "A large oak tree beside the south path. Its branches look climbable."
  }

};

const BILLBOARD_TEXT = `WELCOME TO THE PARK
-------------------
You are here. The fountain is at the center.

MOVEMENT
  north / n
  south / s
  east  / e
  west  / w

BASIC COMMANDS
  look      -- look around
  examine   -- examine something
  exits     -- list exits

More to come.`;

const SPAWN_ROOMS = ["billboard-north", "billboard-south", "billboard-east", "billboard-west"];
