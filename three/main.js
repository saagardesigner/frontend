(function() {

    var heights = 3;
    var playerCount = 3;
    var boardArr = [];
    var cellArr = [];
    var playerState;
    var playerArr = [];
    var gameStart = false;
    var gameEnd = false;
    var filledSpace = 0;
    var availbleSpace;
    var tempStatus;
    var oldscore = 0;
    var nextmarker;
    var bestVal = {y:'',x:''};
    
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
       // if(!gameEnd){
            filledSpace = 0;
            for(var key in cellArr){
                for(var g=0;g<heights;g++){
                    if(cellArr[key][g] !== ""){
                        filledSpace++;
                        availbleSpace = (heights*heights)-filledSpace;
                    }
                }
            }

            
            if(filledSpace == heights*heights){
                gameEnd = true;
                document.getElementById("result").innerHTML = "The game is a draw."
                }
            }
            tempStatus = playerState;
            
            
            if(nextmarker == playerArr[playerArr.length-1].marker){
                nextmarker = 0; 
            }else{
                nextmarker = playerArr[playerState+1].marker;
            }
            var marker = playerArr[playerState].marker
            
            if(playerState+1 == playerArr.length-1){
                playerState = playerState+1;
                var moves = [];
                moves = getBaseArr(cellArr);
                cellArr = moves;
                minMax(moves,availbleSpace,nextmarker,marker);
                move(bestVal.x,bestVal.y,playerArr[playerState]);
            }
       // }
    }

    function getBaseArr(arr){
        var newArr = arr.map(function(arr) {
            return arr.slice();
        });
        return newArr;
    }
    
    
    function minMax(boaArr,depth,cMarker,marker){
        if(tempStatus < playerArr.length-1){
            tempStatus++
            marker = playerArr[tempStatus].marker;
        }else if(tempStatus == playerArr.length-1){
            tempStatus = 0;
            marker = playerArr[tempStatus].marker;
        }
        var score = 0;
        var moves = [];
        
        var availableMoves = 0;
        for(var k=0;k<boaArr.length;k++){
            for(var i=0;i<heights;i++){
                
                if(boaArr[k][i] !== ""){
                }else{
                        moves = getNewArr(boaArr,k,i,marker);
                        var tempscore = checkStatus(moves,cMarker,marker);
                        //
                        if(tempscore == 1){
                            score = score+tempscore;
                            if(score >= oldscore){
                                bestVal.y = k;
                                bestVal.x = i;
                            }
                        }else{
                            bestVal.y = k;
                            bestVal.x = i;
                        }
                        
                        oldscore = score;
                            
                        if(depth > -1000){
                            depth++;
                            minMax(moves,depth,cMarker,marker);
                        }
                    }
                      
            }
    }
    
    
    function checkStatus(arr,cMarker,marker){
        
        var score;
        for(var row in arr) {
            for(var j=0; j<heights;j++){
                if(arr[row][j] !== '' && arr[row][j+1] !== '' && arr[row][j] === arr[row][j+1]){
                    if(j+1 == heights-1){
                        
                        if(arr[row][j] == cMarker){
                            //console.log("winner"+arr[row][j]);
                            score = 1;
                            //console.log("player"+player.marker+"is winner");
                        }else{
                            score = -1;
                        }
                        
                    }
                }else{
                    break;
                }
            }
        }
        
        // check vertical
        for(var col in arr) {
            for(var j=0; j<heights-1;j++){
                if(arr[j][col] !== '' && arr[j+1][col] !== '' && arr[j][col] === arr[j+1][col]){
                    
                    if(j+1 == heights-1){
                        if(arr[j+1][col] == cMarker){
                            //console.log("player"+player.marker+"is winner");
                            score = 1;
                        }else{
                            score = -1;
                        }
                    }
                }else{
                    break;
                }
            }
        }
    
        // check top diagonal
        for(var k=0;k<heights-1;k++){
            if(arr[k][k] !== '' && arr[k+1][k+1] !== '' && arr[k][k] === arr[k+1][k+1]){    
                if(k+1 == heights-1){
                    if(arr[k][k] == cMarker){
                        score = 1;
                        //console.log("player"+player.marker+"is winner");
                    }else{
                        score = -1;
                    }
                }
            }else{
                break;
            }
        }
    
        // check bottom diagonal
        var count = 1;
        for(var k=0;k<heights-1;k++){
            if(arr[k][heights-(k)-1] !== '' && arr[k+1][heights-(k+1)-1] !== '' && arr[k][heights-(k)-1] === arr[k+1][heights-(k+1)-1]){
                
                if(count >= heights-1){
                    if(arr[k][k] == cMarker){
                        score = 1;
                        //console.log("player"+player.marker+"is winner");else
                    }else{
                        score = -1;
                    }
                }
            }
        }
        return score;
    }
    
    function getNewArr(arr,x,y,marker){
        var newArray = arr.map(function(arr) {
            return arr.slice();
        });
        if(newArray[x][y] == ""){
            newArray[x][y] = marker;
        }
        return newArray;
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
}
    var newBoard = Board(heights,playerCount);   
    

})();