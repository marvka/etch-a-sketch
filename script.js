const sketchGrid = document.querySelector("#sketchGrid");
const newGridButton = document.querySelector("#newGrid");

function setGridColors (color) {

}

function deleteGrid () {
  sketchGrid.innerHTML = "";
}

function buildGrid (gridSize = 16) {
  for (i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `${1 / gridSize * 100}%`;
    for (j = 0; j < gridSize; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `${1 / gridSize * 100}%`;
      cell.addEventListener("mouseover", (e) => {
        cell.style.background = "black";
      });
      row.appendChild(cell);
    }
    sketchGrid.appendChild(row);
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

newGridButton.addEventListener("click", (e) => {
  let gridSize = prompt("How many squares per side do you want in your new Grid?");
  deleteGrid();
  buildGrid(gridSize);
});

buildGrid();