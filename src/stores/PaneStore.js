var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    ChunksStore = require('../stores/ChunksStore'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    data = {
        image : {
            src : 'img/covers/snop.jpg',
            width : 600,
            height : 600
        },
        matrix : [4,4],
        isGame : false
    };

var PaneStore = merge(EventEmitter.prototype,{
    getImageData : function(){
        return data.image;
    },
    getMatrixData : function() {
        return data.matrix;
    },
    isGame:function(){
        return data.isGame;
    }
});

function setImage(image){
    data.image = image;
}

function setMatrix(matrix){
    data.matrix = matrix;
}

ChunksStore.on('done',function(){
console.log('ChunksStore.on(done)');
    data.isGame = false;
    PaneStore.emit('change');
});

AppDispatcher.register(function(payload){
    var image, matrix;

    switch (payload.action){
        case PaneConstants.ACTION_SET_IMAGE:
            image = payload.image;
            setImage(image);
            break;
        case PaneConstants.ACTION_GAME_START:
            data.isGame = true;
            break;
        case PaneConstants.ACTION_SET_MATRIX:
            matrix = payload.matrix;
            setImage(image);
            break;
        default:
            return true;
    }

    PaneStore.emit('change');

    return true;
});

module.exports = PaneStore;