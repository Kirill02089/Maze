
var stroke = {
    space: [],
    side: []
};

var matrix = [];

var width = [],
    lower = [],
    side = [];

function MadeSideMatrix(shirina,kolStr) {

    //for (var a = 0; a < width.length; a++) {
    //    if (( width[a] != width[a + 1] ) && rand()) {
    //        width[a + 1] = width[a];
    //    }
    //}

    shirina -= shirina/2;
    kolStr -= kolStr/2;

    SetShirina(shirina);

    while (kolStr) {

        for (var a = 0; a < width.length; a++) {
            if( width[a] == width[a + 1] ){
                side.push(a);
            } else if (rand()) {
                width[a + 1] = width[a];
            }
        }

        for (var b = 0; b < width.length; b++) {
            if (( width[b] != width[b + 1] ) && ( width[b] == width[b - 1] || width[b + 1] == width[b + 2])) {
                side.push(b);
            }
        }

        for (var c = 0; c < width.length; c++) {
            if (( width[c] == width[c + 1] ) && rand()) {
                lower.push(c);
            }
        }

        matrix.push(new Stroke(side, lower, width));

        for (var i = 0; i<lower.length; i++){
            width[lower[i]]= -1;
        }

        side = [];
        lower = [];

        for (var f = 0 ; f< width.length-1; f++){

            if(width[f] == -1){
                findPred(f);
            } else if (width[f] != width[f+1]){
                width[f+1] = width[f] + 1;
            }
        }


        kolStr--;

    }
    //console.log(matrix);

    return matrix;

}

function SetShirina(s){
    for (var t = 0; t < s; t++){
        width.push(t);
    }
}

function findPred(p){

    for (var k = p; k < width.length; k++){
        if(width[k] != -1){
            width[p] = width[k] - 1;
            break;
        }
    }

}

function rand() {
    var a = Math.floor(Math.random() * 2 + 0.4);
    return a < 0 ? 0 : a;
}


var Stroke  = function (side, space, s){
    return stroke = {
        space: space,
        side: side
    };
};


module.exports = MadeSideMatrix;