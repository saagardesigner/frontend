(function() {

var heights = 5;
var playerCount = 5;
var boardArr = [];
var cellArr = [];
var playerState;
var playerArr = [];
var markers = ["x",];
var gameStart = false;
var gameEnd = false;
var filledSpace = 0;
var availbleSpace;
var emptyCellArr = [];
var maxValue = [];
var omaxValueMarker;
var maxValDir;
var maxValDirVal;
var emptyLineDir;
var compare = false;
var finalObj; 
var computerTurn = false;
var gamewon = false;


var player = {
    name: "player"+playerState+"selected",
    marker: 0,
    status
};

var emptyCell = {
    x:'',
    y:'',
    hor:'',
    ver:'',
    dia1:'',
    dia2:'',
    emptyNum:'',
    emptyLineDir: [],
    maxValMarker:'',
    maxValDir,
    maxValDirVal
}
    
function Board(height,playerCount){
    this.heights = height;
    
    for(var m=0;m<playerCount;m++){
        var player = new Object();
        player.name = "player"+(m);
        player.marker = m;    
        player.status = "selected";
        playerArr.push(player);
        var playerNode = document.createElement("p");
        var textNode = document.createTextNode(player.name);
        playerNode.appendChild(textNode);
        document.getElementById("player").appendChild(playerNode);
    }

    var drawCell = function(){
        for(var i=0;i<this.heights;i++){
            var tempArr = [];
            var tempArrCell = [];
            var node = document.createElement("ul");
            document.getElementById("board").appendChild(node);
            for(var j=0;j<this.heights;j++){
                var cellnode = document.createElement("li"); 
                node.appendChild(cellnode);
                tempArr.push(cellnode);
                tempArrCell.push("");
            }
            boardArr.push(tempArr);
            cellArr.push(tempArrCell);
        }
    }

    var ini = function(){
        playerState = 0;
    }

    drawCell();
    for (var i = 0, len = boardArr.length; i < len; i++) {
    for(var m=0;m<boardArr[i].length;m++){
        boardArr[i][m].addEventListener("click", function(){
            var cellPos = getXY(this);
            
            if(!boardArr[cellPos.y][cellPos.x].hasChildNodes()){
                if(!gameStart){
                    playerState = 0;
                    maxValue[0] = 0;
                    gameStart = true;
                    emptyLineDir = [];
                    
                }else{
                    if(playerState < playerCount-1){
                        playerState++;
                    }else{
                        playerState = 0;
                    }
                }
                move(cellPos.x,cellPos.y,playerArr[playerState]);
            }else{
                alert("invalid move");
            }
            var nextPlayer = playerState+1;
            //var selector = document.getElementById('player');
            //console.log(selector.length);
            
            if(playerState+1 == playerArr.length-1){;
                playerState++;
                move(finalObj.x,finalObj.y,playerArr[playerState]);
            }
        });
    }
    ini();
  }
}



function getXY(ele){
    var tempObj = [];
    for(var x=0;x<boardArr.length;x++){
        for(var l=0;l<boardArr[x].length;l++){
            if(boardArr[x][l] == ele){
                tempObj.x = l;
                tempObj.y = x;
                tempObj.selected = true;
            }
        }
    }
    return tempObj;
}

function move(x,y,player){

    if(!gameEnd){
            
            var valueNode = document.createTextNode(player.marker);
            cellArr[y][x] = player.marker;
            boardArr[y][x].appendChild(valueNode);

            var draw=true;
            // check horizontal

            checkType();

            for(var row in cellArr) {
                for(var j=0; j<heights;j++){
                    if(cellArr[row][j] !== '' && cellArr[row][j+1] !== '' && cellArr[row][j] === cellArr[row][j+1]){
                        
                        if(j+1 == heights-1){
                            //console.log("player"+player.marker+"is winner");
                            document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                            draw = false;
                            gameEnd = true;
                        }else{
                            draw = true;
                        }
                    }else{
                        break;
                    }
                }
            }
            
            // check vertical
            for(var col in cellArr) {
                for(var j=0; j<heights-1;j++){
                    if(cellArr[j][col] !== '' && cellArr[j+1][col] !== '' && cellArr[j][col] === cellArr[j+1][col]){
                        
                        if(j+1 == heights-1){
                            //console.log("player"+player.marker+"is winner");
                            document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                            draw = false;
                            gameEnd = true;
                        }else{
                            draw = true;
                        }
                    }else{
                        break;
                    }
                }
            }

            // check top diagonal
            for(var k=0;k<heights-1;k++){
                if(cellArr[k][k] !== '' && cellArr[k+1][k+1] !== '' && cellArr[k][k] === cellArr[k+1][k+1]){
                    
                    if(k+1 == heights-1){
                        //console.log("player"+player.marker+"is winner");
                        document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                        draw = false;
                        gameEnd = true;
                    }else{
                        draw = true;
                    }
                }else{
                    break;
                }
            }

            // check bottom diagonal
            var count = 1;
            for(var k=0;k<heights-1;k++){
            if(cellArr[k][heights-(k)-1] !== '' && cellArr[k+1][heights-(k+1)-1] !== '' && cellArr[k][heights-(k)-1] === cellArr[k+1][heights-(k+1)-1]){
                
                if(count >= heights-1){
                    //console.log("player"+player.marker+"is winner");
                    document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                    draw = false;
                    gameEnd = true;
                }else{
                    draw = true;
                    count++;
                }
            }
            
        }
        
        if(!gameEnd){
            filledSpace++;
            if(filledSpace == heights*heights){
                gameEnd = true;
                document.getElementById("result").innerHTML = "The game is a draw."
            }
        }
        checkEmptyCellStatus()
    }
}

function checkType(){

    // hor

    var horObj = new Object;
    var horFObj = new Object;
    for(var row in cellArr) {
        var cellA = [];
        for(var j=0; j<heights;j++){
            if(cellArr[row][j] !== ''){
                cellA.push(cellArr[row][j]);
            }
        }
        
        var testObj = printRepeating(cellA, cellA.length);
        
        if(testObj.count !== undefined && testObj.count !== null && testObj.count !== ''){
            if(testObj.count == -1){
                horFObj = testObj; 
            }else if(testObj.count == 0){
                horFObj = testObj;
            }else if(testObj.count > 0){
                if(verObj.count !== undefined){
                    if(testObj.count > horObj.count){
                        horFObj = testObj;
                    }else{ 
                        horFObj = horObj; 
                    }
                }else{
                    horFObj = horObj; 
                }
            }
        }
        horObj = testObj;
    }

    // col
    var verObj = new Object;
    var verFObj = new Object;
    for(var row in cellArr) {
        var cellA = [];
        for(var j=0; j<heights;j++){
            if(cellArr[j][row] !== ''){
                cellA.push(cellArr[j][row]);
            }
        }
        
        var testObj = printRepeating(cellA, cellA.length);
        
        if(testObj.count !== undefined && testObj.count !== null && testObj.count !== ''){
            
            if(testObj.count == -1){
                verFObj = testObj; 
            }else if(testObj.count == 0){
                verFObj = testObj;
            }else if(testObj.count > 0){
                if(verObj.count !== undefined){
                    if(testObj.count > verObj.count){
                        verFObj = testObj;
                    }else{ 
                        verFObj = verObj; 
                    }
                }else{
                    verFObj = verObj; 
                }
            }
        }
        verObj = testObj;
    }
    //console.log(horFObj.count, ": ",verFObj.count);
    if(horFObj.count == verFObj.count){
        maxValDir = "hor";
        omaxValueMarker = horFObj.num;
    }else if(horFObj.count > verFObj.count){
        maxValDir = "hor";
        omaxValueMarker = horFObj.num;
    }else{
        maxValDir = "ver";
        omaxValueMarker = verFObj.num;
    }
    
}

function printRepeating(arr,size)
{
  var obj = {num:'',count:''};
  var  i, j, count;
  count = 0;
  for(i = 0; i < size; i++){
    for(j = i+1; j < size; j++){
      if(arr[i] == arr[j]){
        obj.num = arr[i];
        obj.count = count++;
      }
    }
  }
  return obj;
}     
 


function checkEmptyCellStatus(){
    emptyCellArr = [];
    var Obj;
    for(var i=0;i<boardArr.length;i++){
        for(var k=0;k<boardArr.length;k++){
            if(!boardArr[i][k].hasChildNodes()){
                obj = getEmptyInfo(i,k);
                //console.log(obj);
                emptyCellArr.push(obj);
            }
        }
    }
    
    finalObj = getFinalValue(emptyCellArr);
    //getFinalValue(emptyCellArr);

       console.log("finalObj",finalObj);
    //console.log(finalObj);
}

function getFinalValue(arr){
    var obj; // = arr[0];
    
    for(var i=0;i<arr.length;i++){
        if(i < arr.length-1){
            obj = compareValue(arr[i],arr[i+1]);
        }else{
            obj = arr[arr.length-1];
            break;
        }
    }
    return obj;
}

function compareValue(obj1, obj2){
    var bestVal;
    var obj;
    try{
        if(obj2.emptyNum > obj1.emptyNum){
            obj = obj2;
        }else if(obj2.emptyNum == obj1.emptyNum){
           // console.log(obj2.maxValDir);
            if(obj2.maxValDir == "hor"){
                if(Number(obj2.maxValDirVal) == obj2.y){
                obj = obj2;
                }else{
                    obj = obj1;
                }
            }else if(obj2.maxValDir == "ver"){
                if(Number(obj2.maxValDirVal) == obj2.x){
                    obj = obj2;
                }else{
                    obj = obj1;
                }
            }
        }
     }catch(e){
        //console.log("YO",e,obj1, obj2);
     }
    
    return obj;
}

function maxVal(oldVal, newVal,marker){
    var maxVal = [];
    if(oldVal < newVal){
        maxVal[0] = newVal;
        maxVal[1] = marker;
    }else{
        maxVal[0] = oldVal;
    }
    return maxVal;
}

function getEmptyInfo(y,x){
    var counter = 0;
    var emptyLine = 0;
    emptyCellC = new Object();
    emptyCellC.y = y;
    emptyCellC.x = x;

    for(var k=0;k<heights;k++){
        if(!boardArr[y][k].hasChildNodes()){
            counter++;
            emptyCellC.hor = counter;
        }
    }

    if(counter == 5){
        emptyLine++;
       // emptyLineDir.push("hor");
    }

    counter = 0;
    for(var k=0;k<heights;k++){
        if(!boardArr[k][x].hasChildNodes()){
            counter++;
            emptyCellC.ver = counter;
        }
    }

    if(counter == 5){
        emptyLine++;
       // emptyLineDir.push("ver");
    }

    counter = 0;
    var tempy,tempx;
    tempy = y;
    tempx = x;
    var tempdiaArr = [];

    while(tempy > 0 && tempx > 0){
        tempy--;
        tempx--;
    }
    
    for(var k=0;k<heights;k++){
        if(boardArr[tempy+k]){
            if(boardArr[tempy+k][tempx+k]){
                if(!boardArr[tempy+k][tempx+k].hasChildNodes()){
                    counter++;
                    emptyCellC.dia1 = counter;
                    
                }
            }
        }
    }
    
    if(counter == 5){
        emptyLine++;
        //emptyLineDir.push("dia1");
    }
    counter = 0;
    var tempy,tempx;
    tempy = y;
    tempx = x;
    
    
    while(tempx < 4 && tempy > 0){
        tempy--;
        tempx++;
        
    }

    for(var k=0;k<heights;k++){
        if(boardArr[tempy+k]){
            if(boardArr[tempy+k][tempx-k]){
                if(!boardArr[tempy+k][tempx-k].hasChildNodes()){
                    counter++;
                    emptyCellC.dia2 = counter;
                }
            }
        }
    }
    if(counter == 5){
        emptyLine++;
        //emptyLineDir.push("dia2");    
    }
    
    emptyCellC.maxValDirVal = maxValDirVal;
    
    emptyCellC.maxValDir = maxValDir;
    emptyCellC.maxValMarker = omaxValueMarker;
    emptyCellC.emptyNum = emptyLine;
    emptyCellC.emptyLineDir = emptyLineDir;
    return emptyCellC;
}

var newBoard = Board(heights,playerCount);

})();