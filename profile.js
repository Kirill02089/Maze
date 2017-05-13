'use strict';
require('./css/style.css');

var madeSides = require('./modules/generatorSide.js');
var painter = require('./modules/drawingLine.js');
var user = require('./modules/userDraw.js');
user.draw();

var matrix = [
    {
        side: [0, 3, 5, 7, 9],
        space: [0, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    }
];



//var mat = madeSides(10,9);

//painter.oneLine(matrix, matrix.length, matrix.length);
