// world.js

const ROOMS = {

  "fountain": {
    name: "The Central Fountain",
    desc: "A wide basin of pale stone dominates the heart of the park, water rising in a slow arc before falling back with a soft, continuous sound. The air here is cooler than the surrounding paths, and the light catches the surface in shifting patterns. Gravel paths lead off in each direction through the grass.",
    exits: {
      n: { to: "path-north", desc: "The path leads north through the grass." },
      s: { to: "path-south", desc: "The path leads south into the shade." },
      e: { to: "path-east",  desc: "The path leads east along the open ground." },
      w: { to: "path-west",  desc: "The path leads west toward the trees." }
    }
  },

  "path-north": {
    name: "North Path",
    desc: "A gravel path runs north through open grass, the crunch of stone underfoot carrying in the quiet air. A plain wooden <span class=\"n-object\">bench</span> sits to one side, worn smooth by years of use. To the south the fountain is audible; to the north, a <span class=\"n-object\">billboard</span> stands at the path's end.",
    exits: {
      n: { to: "billboard-north", desc: "The path leads north to the billboard." },
      s: { to: "fountain",        desc: "The path leads south to the fountain." },
      e: { to: "billboard-east",  desc: "The path curves east toward the east billboard." },
      w: { to: "billboard-west",  desc: "The path curves west toward the west billboard." }
    },
    nodes: ["bench-north"]
  },

  "path-south": {
    name: "South Path",
    desc: "The gravel path winds south through grass that grows a little longer here, brushing the edges of the walkway. A large <span class=\"n-object\">oak tree</span> stands beside the path, its canopy broad enough to throw real shade across the ground. A <span class=\"n-object\">billboard</span> is visible further south.",
    exits: {
      s: { to: "billboard-south", desc: "The path leads south to the billboard." },
      n: { to: "fountain",        desc: "The path leads north to the fountain." },
      e: { to: "billboard-east",  desc: "The path curves east toward the east billboard." },
      w: { to: "billboard-west",  desc: "The path curves west toward the west billboard." }
    },
    nodes: ["oak-tree"]
  },

  "path-east": {
    name: "East Path",
    desc: "The path runs east through open ground, the grass on either side cropped short and even. There is little shade here and the light falls flat and direct. A <span class=\"n-object\">billboard</span> marks the eastern edge of the park.",
    exits: {
      e: { to: "billboard-east",  desc: "The path leads east to the billboard." },
      w: { to: "fountain",        desc: "The path leads west to the fountain." },
      n: { to: "billboard-north", desc: "The path curves north toward the north billboard." },
      s: { to: "billboard-south", desc: "The path curves south toward the south billboard." }
    }
  },

  "path-west": {
    name: "West Path",
    desc: "A gravel path runs west toward the tree line, the air here carrying a faint smell of earth and bark. A wooden <span class=\"n-object\">bench</span> sits beside the path, half in shadow. A <span class=\"n-object\">billboard</span> stands at the western edge.",
    exits: {
      w: { to: "billboard-west",  desc: "The path leads west to the billboard." },
      e: { to: "fountain",        desc: "The path leads east to the fountain." },
      n: { to: "billboard-north", desc: "The path curves north toward the north billboard." },
      s: { to: "billboard-south", desc: "The path curves south toward the south billboard." }
    },
    nodes: ["bench-west"]
  },

  "billboard-north": {
    name: "North Billboard",
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands at the north end of the park, its painted surface faded but still legible. The fountain is visible to the south, and the paths curve away east and west.",
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
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands at the south end of the park, its frame weathered from seasons of sun and rain. The fountain is visible to the north, and the paths branch east and west from here.",
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
    desc: "A tall wooden <span class=\"n-object\">billboard</span> marks the eastern boundary of the park. Beyond it, the grounds give way to open land. The fountain lies to the west, and the paths run north and south along the park's edge.",
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
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands at the western edge of the park, half-shaded by nearby trees. The fountain is visible to the east, and the paths curve north and south from here.",
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
    name: "bench",
    desc: "A plain wooden bench beside the north path, the slats worn smooth and pale from years of weather and use. Someone has carved initials into one of the armrests, though they're too faded now to read clearly."
  },

  "bench-west": {
    name: "bench",
    desc: "A wooden bench half-tucked into the shade of the nearby trees. The seat is cool to the touch and faintly damp. A good place to sit and watch the path without being easily noticed."
  },

  "oak-tree": {
    name: "oak tree",
    desc: "A broad oak tree, old enough that the bark has grown deeply grooved and dark. Its lower branches spread wide and low, and it wouldn't take much effort to pull yourself up into them. The shade beneath is deep and still."
  }

};

const BILLBOARD_TEXT = `<pre>WELCOME TO THE PARK
-------------------
You are here. The fountain is at the center.

MOVEMENT
  north / n
  south / s
  east  / e
  west  / w

BASIC COMMANDS
  look             -- look around
  examine [thing]  -- examine something
  exits            -- list exits

More to come.</pre>`;

const BILLBOARD_EXAMINE = `The billboard is made of planks of painted wood mounted on a heavy post sunk into the ground. The paint has faded and cracked at the edges, but the lettering at the center remains clear and deliberate, as if repainted not long ago. Someone has taken care to keep it legible.`;

const SPAWN_ROOMS = ["billboard-north", "billboard-south", "billboard-east", "billboard-west"];
