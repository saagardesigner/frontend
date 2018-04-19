(function() {

var arr = [[0,"",""],["","",""],["","",""]];
var len = arr.length;
console.log(arr);

function insertNum(x,y){
    var newArray = arr.map(function(arr) {
        return arr.slice();
    });
    if(newArray[x][y] == ""){
        newArray[x][y] = "x";
        console.log(newArray);
    }
}
for(var i=0;i<len;i++){
    for(var k=0;k<3;k++){
        insertNum(i,k);
    }
}


})();