var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    data = {
        image : {
            src : 'img/covers/main4.jpg',
            width : 600,
            height : 600
        },
        matrix : [3,3]
    };

var PaneStore = merge(EventEmitter.prototype,{
    getImageData : function(){
        return data.image;
    },
    getMatrixData : function() {
        return data.matrix;
    }
});

function setImage(image){
    data.image = image;
}

function setMatrix(matrix){
    data.matrix = matrix;
}

AppDispatcher.register(function(payload){
    var image, matrix;

    switch (payload.actionType){
        case 'PANE_SET_IMAGE':
            image = payload.image;
            setImage(image);
            break;
        case 'PANE_SET_MATRIX':
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