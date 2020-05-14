const sketchGrid = document.querySelector("#sketchGrid");
const newGridButton = document.querySelector("#newGrid");

function getDarkenedRGBAcolor(RGBAarray) {
  return `rgba(${RGBAarray[0]}, ${RGBAarray[1]}, ${RGBAarray[2]}, ${
    RGBAarray[3] - 0.1
  })`;
}

function getRGBAarrayFromBackgroundColor(RGBstring) {
  let RGBAarray = [];

  if (/rgba/.test(RGBstring)) {
    RGBAarray = extractRGBvalues(RGBstring);
  } else {
    RGBAarray = extractRGBvalues(convertRGBtoRGBA(RGBstring));
  }

  return RGBAarray;
}

function determineNewColor(cell) {
  if (!cell.style.backgroundColor) {
    return getRandomColor();
  }

  const RGBAarray = getRGBAarrayFromBackgroundColor(cell.style.backgroundColor);
  if (RGBAarray[3] > 0) {
    return getDarkenedRGBAcolor(RGBAarray);
  }
}

function changeCellColor(e) {
  const cell = e.currentTarget;
  cell.style.backgroundColor = determineNewColor(cell);
}

function convertRGBtoRGBA(RGBstring) {
  let RGBAString = "";
  RGBAString = RGBstring.replace(/rgb/, "rgba");
  RGBAString = RGBAString.replace(/\)/, ", 1)");
  return RGBAString;
}

function extractRGBvalues(RBGstring) {
  return RBGstring.match(/\d+, \d+, \d+, \d+\.*\d*/)
    .toString()
    .split(", ");
}

function deleteGrid() {
  sketchGrid.innerHTML = "";
}

function buildGrid(gridSize = 16) {
  for (i = 0; i < gridSize; i++) {
    let row = document.createElement("div");

    row.classList.add("row");
    row.style.height = `${(1 / gridSize) * 100}%`;

    for (j = 0; j < gridSize; j++) {
      let cell = document.createElement("div");

      cell.classList.add("cell");
      cell.style.width = `${(1 / gridSize) * 100}%`;
      cell.addEventListener("mouseover", changeCellColor);

      row.appendChild(cell);
    }
    sketchGrid.appendChild(row);
  }
}

function getRandomColor() {
  let RGBstring = "rgb(";
  for (let i = 0; i < 3; i++) {
    if (i < 2) {
      RGBstring += `${Math.floor(Math.random() * 255)},`;
    } else if (i < 3) {
      RGBstring += `${Math.floor(Math.random() * 255)})`;
    }
  }

  return RGBstring;
}

newGridButton.addEventListener("click", (e) => {
  let gridSize = prompt(
    "How many squares per side do you want in your new Grid?"
  );
  deleteGrid();
  buildGrid(gridSize);
});

buildGrid();
