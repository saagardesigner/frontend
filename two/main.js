(function() {

var heights = 3;
var playerCount = 2;
var boardArr = [];
var cellArr = [];
var playerState;
var playerArr = [];
var markers = ["x",];
var gameStart = false;
var gameEnd = false;
var availableSpace = 0;

var player = {
    name: "player"+playerState+"selected",
    marker: 0,
    status
};
    
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
                        gameStart = true;
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
            for(var row in cellArr) {
                for(var j=0; j<heights;j++){
                    if(cellArr[row][j] !== '' && cellArr[row][j+1] !== '' && cellArr[row][j] === cellArr[row][j+1]){
                        if(j+1 == heights-1){
                            //console.log("player"+player.marker+"is winner");
                            document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                            draw = false;
                            gameEnd = true;
                        }
                    }else{
                        break;
                    }
                }
            }
            
            // check vertical
            for(var col in cellArr) {
                for(var j=0; j<heights;j++){
                    if(cellArr[j][col] !== '' && cellArr[j+1][col] !== '' && cellArr[j][col] === cellArr[j+1][col]){
                        if(j+1 == heights-1){
                            //console.log("player"+player.marker+"is winner");
                            document.getElementById("result").innerHTML = "player"+player.marker+"won the game."
                            draw = false;
                            gameEnd = true;
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
                    count++;
                }
            }
            
        }
        availableSpace++;
        console.log(availableSpace);
        if(availableSpace == heights*heights){
            gameEnd = true;
            document.getElementById("result").innerHTML = "The game is a draw."
        }
    }
}

var newBoard = Board(heights,playerCount);

})();




