function setupTable(rowLength,maximum){
    let table=""
    let  column= Math.ceil(maximum/rowLength);
    console.log(column);
    for(let i=0;i<column;i++){
        table+="<div class=\"row\">"
        for(let k = 1;k<rowLength;k++){
            let bingoNumber = (i==column-1 && k>5) ? "":i*10+k;
            table+=`<h1 class=\"col\" id=\"${bingoNumber}\">${bingoNumber}</h1>`;
        }
        table+="</div>"
    }
    $("#table").append(table);
}



function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let random = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[random];
        array[random] = tmp;
    }

    return array;
}

function setRandomizedNumber(array){
    let number = array[0];
    console.log(number);
    $(`#${number}`).addClass("used-number");
    array.shift();
    return array;
}
const maxBingo=75;
window.onload=()=>{
    let numbers=[...Array(maxBingo).keys()].map(i=>++i);
    shuffle(numbers);
    $("#start_bingo").click(()=>{
        console.log("clicked");
        numbers = setRandomizedNumber(numbers);
    });
    setupTable(10,maxBingo);
}