const sketchGrid = document.querySelector("#sketchGrid");
let gridSize = 16;

for (i = 0; i < gridSize; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (j = 0; j < gridSize; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", (e) => {
      cell.style.background = "black";
    });
    row.appendChild(cell);
  }
  sketchGrid.appendChild(row);
}

function setGridColors (color) {

}

function deleteGrid () {
  sketchGrid.innerHTML = "";
}