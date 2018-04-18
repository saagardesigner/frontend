// input {(195°, 11%, 12%), (37°, 13%, 76%), (15°, 11%, 12%)}


var inputArr = [[195,11,12],[37,13,76],[15,11,12],[190,11,12],[10,11,12]];
var outputArr = [];

for(var i=0; i < inputArr.length;i++){
    for(var j=0;j<inputArr.length;j++){
        complementaryColor(inputArr[i],inputArr[j]);
    }   
}

function complementaryColor(first, second){
        if((first[0] - 180) == second[0]) {
            outputArr.push(first);
            outputArr.push(second);
        }
        console.log(outputArr);
}




