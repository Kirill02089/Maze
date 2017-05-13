'use strict';
var Painter = require('./drawingLine.js');
var Generater = require('./generatorSide.js');

var paramsUserRect = {};
var MazeLayer = '';
var matrix = [
    {
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

var can = $('#lines'),
    widthM = 0,
    heightM = 0,
    cell = 50;

var added = 0,
    userRect = {};

var DownFunc = {},
    MoveFunc = {},
    UpFunc = {};

var Menu = Palitra();

can.attr({
    height: window.innerHeight,
    width: window.innerWidth
});

widthM = can.attr('width');
heightM = can.attr('height');

var Main = {
    draw: function () {

        can.drawRect({
            layer: true,
            name: 'place',
            translateX: widthM/2-3,
            translateY: heightM/2-3,
            strokeWidth: 3,
            strokeStyle: 'black',
            height: heightM-50,
            width: widthM-50,

            mousedown: function DownS(layer) {
                can.drawLine({
                    index:0,
                    layer: true,
                    name: 'userRect',
                    strokeWidth:2,
                    strokeStyle: 'black',
                    x1: layer.eventX, y1: layer.eventY,
                    closed: true

                });
                 added = 1;
                DownFunc = DownS;
                userRect = can.getLayer('userRect');
            },
            mousemove: function MoveS(layer) {
                if(added) {
                    can.setLayer('userRect', {
                        x2: userRect.eventX , y2: userRect.y1,
                        x3: userRect.eventX, y3: userRect.eventY,
                        x4: userRect.x1, y4: userRect.eventY
                    });
                    MoveFunc = MoveS;
                }
            },

            mouseup : function UpS(layer){
                added = 0;
                UpFunc = UpS;

                var menuX = userRect.x3,
                    menuY = userRect.y3;
                if(userRect.x3 < userRect.x1 && userRect.y3 > userRect.y1) {
                    menuX = userRect.x1;
                    menuY = userRect.y1;
                }
                Menu.show(menuX, menuY);

                Place.clrProper();

                var xB, yB;

                    if(userRect.x3 < userRect.x1){
                       if(userRect.y3 < userRect.y1){
                           xB = userRect.x3;
                           yB = userRect.y3;
                       } else {
                           xB = userRect.x2;
                           yB = userRect.y2;
                       }
                    } else {
                        if(userRect.y3 < userRect.y1){
                            xB = userRect.x4;
                            yB = userRect.y4;
                        } else {
                            xB = userRect.x1;
                            yB = userRect.y1;
                        }
                    }

                    paramsUserRect = {
                    width : function () {
                      return Math.abs(userRect.x1 - userRect.x3)
                    }(),

                    height : function () {
                      return Math.abs(userRect.y1 - userRect.y3)
                    }(),

                    x: xB,
                    y: yB
                };
                //console.log(Generater(paramsUserRect.width, paramsUserRect.height));
                //matrix = Generater(paramsUserRect.width, paramsUserRect.height);
               // console.log(matrix);
                Painter.oneLine(matrix,paramsUserRect);
                MazeLayer = can.getLayerGroup('maze');
            }
        });
    },
    getRect:  userRect
};


var fl = 0;

function Palitra() {
    return {
        show: function (x, y) {

            var offsetX = 20;

            var cellH = 50,
                cellW = 50;

            var reset = this.resetTile(x,y),
                play = this.playTile(x,y),
                color = this.colorTile(x,y);
            //!added ? 1: Hide(0);

            can.addLayer(reset).addLayer(play).addLayer(color);


        },

        offsetX: 20,
        cellH: 50,

        resetTile: function(x, y) {
            var cell = this.cellH;

            return {
                type: 'image',
                name: 'reset',
                source: './img/reset.png',
                width: 30,
                height: 30,
                x: x + this.offsetX, y: y - this.offsetX,
                click: function (layer) {
                    Place.giveProper();
                    can.removeLayer('reset');
                    can.removeLayer('play');
                    can.removeLayer('userRect');
                    can.removeLayer('color');
                    cell = 50;
                    can.removeLayerGroup(MazeLayer);

                }
            }
        },

        playTile: function (x, y) {

            return {
               type: 'image',
               name: 'play',
               source: './img/play.png',
               width: 30,
               height: 30,
               x: x + this.offsetX, y: y - this.cellH,
               mousedown: function (layer) {
               }
           }
        },


        colorTile: function (x,y) {
            var color = 'green';
            return {
                type: 'rectangle',
                name: 'color',
                width: 30,
                height: 30,
                fillStyle: color,
                x: x+this.offsetX,
                y:y-this.cellH*2,
                click: function () {
                    can.getLayer('userRect').strokeStyle = color;
                    can.setLayerGroup(MazeLayer,{
                        strokeStyle: color
                    })
                }
            }
        }
    }
};


var Place = {

    clrProper: function () {
        var a = getPlace();
        a.mousemove = '';
        a.mousedown = '';
        a.mouseup= '';

    },

    giveProper: function(){
        var a = getPlace();
        a.mousedown = DownFunc;
        a.mousemove = MoveFunc;
        a.mouseup = UpFunc;
    }
};

function getPlace(){
    return can.getLayer('place');
}

module.exports = Main;