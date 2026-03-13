// engine.js

const worldOutput = document.getElementById("world-output");

function print(text) {
  const line = document.createElement("div");
  line.innerHTML = text;
  worldOutput.appendChild(line);
  worldOutput.scrollTop = worldOutput.scrollHeight;
}
