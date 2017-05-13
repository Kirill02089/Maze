//var $ = require('jquery');
//var canvas = require('jcanvas');

var can = $('#lines'),
    sss = {},
    lsize = 0;

var oneCell,
    width,
    height,
    xB, yB;

var Painter = {
    setStroke: function(stroke, size){ sss=stroke; lsize = size},
    oneLine: function (matrix, params) {

        oneCell = params.width/matrix.length;
        width = params.width;
        height = params.height;
        xB = params.x;
        yB = params.y;
        console.log('Begin maze cords',xB,yB);
        //console.log(oneCell)


        for (var k = 0; k < matrix.length; k++){

            for (var i = 0; i <     matrix[k].side.length; i++){
                can.drawLine(new sideOf(matrix[k].side[i],k))
            }

            for (var j = 0; j < matrix[k].space.length; j++){
                can.drawLine(new spaceOf(matrix[k].space[j], k));
            }

        }

    },
    con: function (sss,a){
        console.log(sss,a);
    }
};


var sideOf = function (side, position) {
    var x = side * oneCell + xB,
        y = oneCell*position + yB;

    return {
        layer:true,
        groups: ['maze'],
        strokeStyle: 'black',
        strokeWidth: 3,
        x1: x, y1: y,
        x2: x, y2: y+oneCell
    }

};

var spaceOf = function (space, position) {
    var x = space * oneCell + xB,
        y = oneCell * (position+1) + yB;


    return {
        layer:true,
        groups: ['maze'],
        strokeStyle: 'black',
        strokeWidth: 3,
        x1: x, y1: y,
        x2: x+oneCell, y2: y
    }
};

module.exports = Painter;