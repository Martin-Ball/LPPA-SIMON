var records = [];
var sortDirection = "asc";
var sortColumn = null;

function loadTable() {
    var tabla = document.getElementById("table-history").getElementsByTagName('tbody')[0];

    var value = getLocalStorage();

    // Limpiar tabla
    tabla.innerHTML = "";

    // Ordenar los registros según la columna seleccionada
    records.sort(function(a, b) {
        if (sortDirection === "asc") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    });

    for (var i = 0; i < value.length; i++) {
        var row = tabla.insertRow(i);
        var nameCell = row.insertCell(0);
        var dateCell = row.insertCell(1);
        var levelCell = row.insertCell(2);
        var hitsCell = row.insertCell(3);

        nameCell.innerHTML = value[i].name;
        dateCell.innerHTML = value[i].date;
        levelCell.innerHTML = value[i].level;
        hitsCell.innerHTML = value[i].hits;
    }
}

function getLocalStorage(){
    var scoreLS = localStorage.getItem("score");
    if (!scoreLS) {
        return [];
    }
    var scores = JSON.parse(scoreLS);
    var list = [];
    for (var i = 0; i < scores.length; i++) {
        list.push(scores[i]);
    }
    return list;
}

document.addEventListener("DOMContentLoaded", function() {
    records = getLocalStorage();
    loadTable();

    var headers = document.querySelectorAll("#table-history th[data-sort]");
    headers.forEach(function(header) {
        header.addEventListener("click", function() {
            var key = this.getAttribute("data-sort");
            if (sortColumn === key) {
                // Cambiar la dirección de ordenamiento si se hace clic nuevamente en la misma columna
                sortDirection = sortDirection === "asc" ? "desc" : "asc";
            } else {
                sortDirection = "asc";
                sortColumn = key;
            }

            loadTable();
        });
    });
});

window.onload = function() {
    loadTable();
};