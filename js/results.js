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

    console.log(list)
    return list;
}

window.onload = function() {
    loadTable()
};