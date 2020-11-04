function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let random = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[random];
        array[random] = tmp;
    }

    return array;
}

async function rollBingo (number){
        console.log(number);

        if(!isNaN(number)){
            let runAroundMax = 75+number;

            const sleep = (ms)=>{
                return new Promise((f)=>{
                    setTimeout(f,ms);
                })
            };

            for(let i =1;i<=runAroundMax+1;i++){
                await sleep((Math.pow(i/runAroundMax,4)*200));
                $(`#${i%76}`).addClass("run-around");
                $(`#${i%76 ==  1 ? maxBingoNum :i%76-1}`).removeClass("run-around");
            }
            
            async function twinkleNumber(number){
                await sleep(500);
                for(let i=0;i<3;i++){
                    $(`#${number}`).removeClass("run-around");
                    await sleep(500);
                    $(`#${number}`).addClass("run-around");
                    await sleep(300);
                }
            };

            await twinkleNumber(number);
            
            $(".last-number").addClass("used-number");
            $(".last-number").removeClass("last-number");

            $(".table-number").removeClass("run-around");
            $(`#${number}`).addClass("last-number");
        }
}
function generateTable(rowLength,maximum){
    let table="";
    let  column= Math.ceil(maximum/rowLength);

    for(let i=0;i<column;i++){
        table+="<div class=\"row\">"
        for(let k = 1;k<=rowLength;k++){
            let bingoNumber = (i==column-1 && k>5) ? "" : i*10+k;
            let numberClass = (i==column-1 && k>5) ? "padding-cell" : "table-number";
            table+=`<h1 class="col ${numberClass} " id="${bingoNumber}">${bingoNumber}</h1>`;
        }
        table+="</div>"
    }
    $("#table").append(table);
}
const maxBingoNum=75;

window.onload=async()=>{
    let numbers=[...Array(maxBingoNum).keys()].map(i=>++i);
    shuffle(numbers);
    $("#start_bingo").click(async()=>{
        let n = numbers[0];
        numbers.shift();
        console.log("clicked");
        await rollBingo(n);
    });
    generateTable(10,maxBingoNum);
}