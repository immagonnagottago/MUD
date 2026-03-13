// world.js

const ROOMS = {

  "fountain": {
    name: "The Central Fountain",
    desc: "A wide stone fountain occupies the center of the park. Water rises and falls in the midday light. Paths lead north, south, east, and west through the grass.",
    exits: {
      n: { to: "path-north", desc: "The path leads north toward a billboard." },
      s: { to: "path-south", desc: "The path leads south toward a billboard." },
      e: { to: "path-east",  desc: "The path leads east toward a billboard." },
      w: { to: "path-west",  desc: "The path leads west toward a billboard." }
    }
  },

  "path-north": {
    name: "North Path",
    desc: "A gravel path running north through open grass. A wooden bench sits to one side. The fountain is behind you to the south. A billboard is visible ahead to the north.",
    exits: {
      n: { to: "billboard-north", desc: "The path continues north to the billboard." },
      s: { to: "fountain",        desc: "The path leads south back to the fountain." }
    },
    nodes: ["bench-north"]
  },

  "path-south": {
    name: "South Path",
    desc: "A gravel path running south through open grass. A large oak tree stands beside the path, its shade falling across the gravel. The fountain is behind you to the north. A billboard is visible ahead to the south.",
    exits: {
      s: { to: "billboard-south", desc: "The path continues south to the billboard." },
      n: { to: "fountain",        desc: "The path leads north back to the fountain." }
    },
    nodes: ["oak-tree"]
  },

  "path-east": {
    name: "East Path",
    desc: "A gravel path running east through open grass. The fountain is behind you to the west. A billboard is visible ahead to the east.",
    exits: {
      e: { to: "billboard-east", desc: "The path continues east to the billboard." },
      w: { to: "fountain",       desc: "The path leads west back to the fountain." }
    }
  },

  "path-west": {
    name: "West Path",
    desc: "A gravel path running west through open grass. A wooden bench sits beside the path. The fountain is behind you to the east. A billboard is visible ahead to the west.",
    exits: {
      w: { to: "billboard-west", desc: "The path continues west to the billboard." },
      e: { to: "fountain",       desc: "The path leads east back to the fountain." }
    },
    nodes: ["bench-west"]
  },

  "billboard-north": {
    name: "North Billboard",
    desc: "A large billboard stands at the north end of the path. The fountain is visible to the south.",
    exits: {
      s: { to: "path-north", desc: "The path leads south back toward the fountain." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-south": {
    name: "South Billboard",
    desc: "A large billboard stands at the south end of the path. The fountain is visible to the north.",
    exits: {
      n: { to: "path-south", desc: "The path leads north back toward the fountain." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-east": {
    name: "East Billboard",
    desc: "A large billboard stands at the east end of the path. The fountain is visible to the west.",
    exits: {
      w: { to: "path-east", desc: "The path leads west back toward the fountain." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-west": {
    name: "West Billboard",
    desc: "A large billboard stands at the west end of the path. The fountain is visible to the east.",
    exits: {
      e: { to: "path-west", desc: "The path leads east back toward the fountain." }
    },
    billboard: true,
    spawn: true
  }

};

// node spurs — attached to rooms but not on the main grid
const NODES = {

  "bench-north": {
    name: "Bench",
    desc: "A plain wooden bench beside the north path. A good place to sit and look at the fountain."
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
