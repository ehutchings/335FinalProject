function insertScore(dataTable, data)
{
    for(scores of data)
    {
        tableScore = document.createElement("tableScore");
        tableScore.textContent = scores.score;
        tableName = document.createElement("tableName");
        tableName.textContent = scores.name;
        dataTable.appendChild(tableName);
        dataTable.appendChild(tableScore);
        dataTable.innerHTML += "<br>";
    }
}

function buildScoreBoard()
{
    fetch("/loadScoreboard")
        .then(response =>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const dataTable = document.getElementById("scoreboard");
            insertScore(dataTable, data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

window.addEventListener('load', buildScoreBoard());
