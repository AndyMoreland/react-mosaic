var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    ChunksConstants = require('../constants/ChunksConstants'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    data = {
        chunks : [],
        hole : PaneConstants.START_HOLE,
        matrix : []
    };

var ChunksStore = merge(EventEmitter.prototype,{
    getChunk : function(coords){
        return data.chunks[coords[0]][coords[1]];
    }
});

ChunksStore.setMaxListeners(9999);

function setMatrix(matrix){
    data.matrix = matrix;
}

function mount(coords){
    if (data.chunks[coords[0]] === undefined) data.chunks[coords[0]] = [];
    data.chunks[coords[0]][coords[1]] = {
        point : [coords[0],coords[1]],
        isHome : true,
        isCrawable : isCrawable([coords[0],coords[1]],data.hole)
    }
}

function shuffle(){
    var crawlCount = 0,
        crawableChunks = [],
        rndIndex = null,
        hotChunk = null,
        intervalId;

    intervalId = setInterval(function(){
        crawableChunks = [];
        data.chunks.forEach(function(arr,x){
            arr.forEach(function(chunk,y){
                if (chunk.isCrawable && (hotChunk===null || (x!=hotChunk[0] || y!=hotChunk[1]))) {
                    crawableChunks.push([x,y]);
                }
            });
        });
        rndIndex = Math.floor(Math.random() * crawableChunks.length);
        crawl([crawableChunks[rndIndex][0],crawableChunks[rndIndex][1]]);
        hotChunk = [crawableChunks[rndIndex][0],crawableChunks[rndIndex][1]];
        crawlCount++;
        ChunksStore.emit('change');
        if (crawlCount === ChunksConstants.SHUFFLE_DEPTH) clearInterval(intervalId);
    },ChunksConstants.ANIMATION_DURATION);
}

function crawl(coords){
    var newHole;
    if (data.chunks[coords[0]][coords[1]].isCrawable) {
        // !!!! ATTENTION TO BINDINGS
        newHole = data.chunks[coords[0]][coords[1]].point;
        data.chunks[coords[0]][coords[1]] = {
            point : data.hole,
            isHome : isHome(coords),
            isCrawable : isCrawable([coords[0],coords[1]],newHole)
        };
        data.hole = newHole;
    }
    actualizeChunks();
    checkComplete();
}

function isHome(coords){
    return (coords[0] === data.chunks[coords[0]][coords[1]].point[0] &&
            coords[1] === data.chunks[coords[0]][coords[1]].point[1]);
}

function isCrawable(coords,hole){
    return (Math.abs(hole[0] - coords[0]) + Math.abs(hole[1] - coords[1]) === 1);
}

function actualizeChunks() {
    data.chunks.forEach(function(arr,x){
        arr.forEach(function(chunk,y){
            data.chunks[x][y].isHome = isHome([x,y]);
            data.chunks[x][y].isCrawable = isCrawable(chunk.point,data.hole);
        });
    });
}

function checkComplete() {

}

AppDispatcher.register(function(payload){
    var coords, matrix;

    switch (payload.actionType){
        case 'SET_MATRIX':
            matrix = payload.matrix;
            setMatrix(matrix);
            break;
        case 'CHUNK_MOUNT':
            coords = payload.coords;
            mount(coords);
            break;
        case 'CHUNKS_SHUFFLE':
            shuffle();
            return true;
            break;
        case 'CHUNK_CRAWL':
            coords = payload.coords;
            crawl(coords);
            break;
        default:
            return true;
    }

    ChunksStore.emit('change');

    return true;
});

module.exports = ChunksStore;