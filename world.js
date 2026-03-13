// world.js

const ROOMS = {

  "fountain": {
    name: "The Central Fountain",
    desc: "A wide basin of pale stone dominates the heart of the park, water rising in a slow arc before falling back with a soft, continuous sound. The air here is cooler than the surrounding paths, and the light catches the surface in shifting patterns. Paths lead off toward each edge of the park.",
    exits: {
      n: { to: "billboard-north", desc: "The path leads north to the north billboard." },
      s: { to: "billboard-south", desc: "The path leads south to the south billboard." },
      e: { to: "billboard-east",  desc: "The path leads east to the east billboard." },
      w: { to: "billboard-west",  desc: "The path leads west to the west billboard." }
    }
  },

  "billboard-north": {
    name: "North Billboard",
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands here at the north edge of the park, its painted surface faded but still legible. The fountain lies to the south. Paths branch to the northeast and northwest.",
    exits: {
      s: { to: "fountain",  desc: "The path leads south to the fountain." },
      e: { to: "path-ne",   desc: "The path curves northeast." },
      w: { to: "path-nw",   desc: "The path curves northwest." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-south": {
    name: "South Billboard",
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands at the south edge of the park, its frame weathered from seasons of sun and rain. The fountain lies to the north. Paths branch to the southeast and southwest.",
    exits: {
      n: { to: "fountain",  desc: "The path leads north to the fountain." },
      e: { to: "path-se",   desc: "The path curves southeast." },
      w: { to: "path-sw",   desc: "The path curves southwest." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-east": {
    name: "East Billboard",
    desc: "A tall wooden <span class=\"n-object\">billboard</span> marks the eastern edge of the park. Beyond it the grounds give way to open land. The fountain lies to the west. Paths branch to the northeast and southeast.",
    exits: {
      w: { to: "fountain",  desc: "The path leads west to the fountain." },
      n: { to: "path-ne",   desc: "The path curves northeast." },
      s: { to: "path-se",   desc: "The path curves southeast." }
    },
    billboard: true,
    spawn: true
  },

  "billboard-west": {
    name: "West Billboard",
    desc: "A tall wooden <span class=\"n-object\">billboard</span> stands at the western edge of the park, half-shaded by nearby trees. The fountain lies to the east. Paths branch to the northwest and southwest.",
    exits: {
      e: { to: "fountain",  desc: "The path leads east to the fountain." },
      n: { to: "path-nw",   desc: "The path curves northwest." },
      s: { to: "path-sw",   desc: "The path curves southwest." }
    },
    billboard: true,
    spawn: true
  },

  "path-ne": {
    name: "Northeast Path",
    desc: "A gravel path curves through the northeast corner of the park, the grass here open and unhurried. A plain wooden <span class=\"n-object\">bench</span> sits to one side. The north <span class=\"n-object\">billboard</span> is visible to the west, the east <span class=\"n-object\">billboard</span> to the south.",
    exits: {
      w: { to: "billboard-north", desc: "The path leads west to the north billboard." },
      s: { to: "billboard-east",  desc: "The path leads south to the east billboard." }
    },
    nodes: ["bench-ne"]
  },

  "path-nw": {
    name: "Northwest Path",
    desc: "A gravel path winds through the northwest corner of the park. The tree line is close here, and the air carries a faint smell of bark and earth. The north <span class=\"n-object\">billboard</span> is visible to the east, the west <span class=\"n-object\">billboard</span> to the south.",
    exits: {
      e: { to: "billboard-north", desc: "The path leads east to the north billboard." },
      s: { to: "billboard-west",  desc: "The path leads south to the west billboard." }
    }
  },

  "path-se": {
    name: "Southeast Path",
    desc: "A gravel path curves through the southeast corner of the park. The grass grows a little longer here, brushing the edges of the walkway. A large <span class=\"n-object\">oak tree</span> stands nearby, its canopy broad enough to throw real shade across the ground. The east <span class=\"n-object\">billboard</span> is visible to the north, the south <span class=\"n-object\">billboard</span> to the west.",
    exits: {
      n: { to: "billboard-east",  desc: "The path leads north to the east billboard." },
      w: { to: "billboard-south", desc: "The path leads west to the south billboard." }
    },
    nodes: ["oak-tree"]
  },

  "path-sw": {
    name: "Southwest Path",
    desc: "A gravel path runs through the southwest corner of the park, the ground here soft and slightly uneven underfoot. A wooden <span class=\"n-object\">bench</span> sits beside the path, half in shadow. The south <span class=\"n-object\">billboard</span> is visible to the east, the west <span class=\"n-object\">billboard</span> to the north.",
    exits: {
      e: { to: "billboard-south", desc: "The path leads east to the south billboard." },
      n: { to: "billboard-west",  desc: "The path leads north to the west billboard." }
    },
    nodes: ["bench-sw"]
  }

};

const NODES = {

  "bench-ne": {
    name: "bench",
    desc: "A plain wooden bench beside the northeast path, the slats worn smooth and pale from years of weather and use. Someone has carved initials into one of the armrests, though they're too faded now to read clearly."
  },

  "bench-sw": {
    name: "bench",
    desc: "A wooden bench half-tucked into the shade at the southwest corner. The seat is cool to the touch and faintly damp. A good place to sit and watch the path without being easily noticed."
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
