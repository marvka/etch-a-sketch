const sketchGrid = document.querySelector("#sketchGrid");
const newGridButton = document.querySelector("#newGrid");

function darkenRGBAColor(rgba) {
  extractRGBValues(rgba);
}

// TODO implement function that darkens color that has already been filled with a random color
function setCellColor(e) {
  const cell = e.currentTarget;

  if (!cell.style.backgroundColor) {
    cell.style.backgroundColor = getRandomColor();
    return;
  }

  let RGBA_Array = [];
  if (/rgba/.test(cell.style.backgroundColor)) {
    RGBA_Array = extractRGBValues(cell.style.backgroundColor);
  } else {
    RGBA_Array = extractRGBValues(convertRGBtoRGBA(cell.style.backgroundColor));
  }

  if (RGBA_Array[3] > 0) {
    cell.style.backgroundColor = `rgba(${RGBA_Array[0]}, ${RGBA_Array[1]}, ${RGBA_Array[2]}, ${RGBA_Array[3] - 0.1})`;
  }

  console.log(cell.style.backgroundColor);
}

function convertRGBtoRGBA(RGBString) {
  let RGBAString = "";
  RGBAString = RGBString.replace(/rgb/, "rgba");
  RGBAString = RGBAString.replace(/\)/, ", 1)");
  return RGBAString;
}

function extractRGBValues(RBGString) {
  return RBGString.match(/\d+, \d+, \d+, \d+\.*\d*/)
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
      cell.addEventListener("mouseover", setCellColor);

      row.appendChild(cell);
    }
    sketchGrid.appendChild(row);
  }
}

function getRandomColor() {
  let RGBString = "rgb(";
  for (let i = 0; i < 3; i++) {
    if (i < 2) {
      RGBString += `${Math.floor(Math.random() * 255)},`;
    } else if (i < 3) {
      RGBString += `${Math.floor(Math.random() * 255)})`;
    }
  }

  return RGBString;
}

newGridButton.addEventListener("click", (e) => {
  let gridSize = prompt(
    "How many squares per side do you want in your new Grid?"
  );
  deleteGrid();
  buildGrid(gridSize);
});

buildGrid();
