function loadTable() {
    var tabla = document.getElementById("table-history").getElementsByTagName('tbody')[0];

    var value = getLocalStorage();

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

function sortBy(key) {
    records.sort(function(a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });

    var tabla = document.getElementById("table-history").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    loadTable();
}

document.addEventListener("DOMContentLoaded", function() {
    records = getLocalStorage();
    loadTable();

    var headers = document.querySelectorAll("#table-history th[data-sort]");
    headers.forEach(function(header) {
        header.addEventListener("click", function() {
            var key = this.getAttribute("data-sort");
            sortBy(key);
        });
    });
});

window.onload = function() {
    loadTable();
};