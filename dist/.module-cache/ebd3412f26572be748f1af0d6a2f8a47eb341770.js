var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    localImageProvider = require('../imageProviders/localImageProvider'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    data = 
    {
        image: localImageProvider.getDefaultImage(), 
        chunks: [],
        hole: PaneConstants.START_HOLE,
        matrix: [4,4],
        isGame: false,
        isLoading: false
    };

var PaneStore = merge(EventEmitter.prototype,{
    getImage: function() {
        return data.image;
    },
    getMatrixData: function() {
        return data.matrix;
    },
    isGame: function(){
        return data.isGame;
    },
    getChunk: function(coords){
        return data.chunks[coords[0]][coords[1]];
    },
    isLoading: function(){
        return data.isLoading;
    }
});

PaneStore.setMaxListeners(9999);

function setImage(image){
    data.image = image;
}

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

function unmount(coords){
    delete data.chunks[coords[0]][coords[1]];
    actualizeChunks();
}

function gameStart(){
    shuffle();
}

function shuffle(){
    var crawlCount = 0,
        crawableChunks = [],
        rndIndex = null,
        hotChunk = null,
        intervalId;

    intervalId = setInterval(function(){
        crawableChunks = [];
        iterateChunks(function(x,y){
            if (this.isCrawable && (hotChunk===null || (x!=hotChunk[0] || y!=hotChunk[1]))) {
                crawableChunks.push([x,y]);
            }
        });
        rndIndex = Math.floor(Math.random() * crawableChunks.length);
        crawl([crawableChunks[rndIndex][0],crawableChunks[rndIndex][1]]);
        hotChunk = [crawableChunks[rndIndex][0],crawableChunks[rndIndex][1]];
        crawlCount++;
        PaneStore.emit('change');
        if (crawlCount === PaneConstants.SHUFFLE_DEPTH) clearInterval(intervalId);
    },PaneConstants.ANIMATION_DURATION);
}

function crawl(coords){
    var newHole;
    if (data.chunks[coords[0]][coords[1]].isCrawable)
    {
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
    actualizeChunks();
}

function rollback(){
    iterateChunks(function(x,y){
        data.chunks[x][y].point = [x,y];
    });
    data.hole = PaneConstants.START_HOLE;
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
    iterateChunks(function(x,y){
        data.chunks[x][y].isHome = isHome([x,y]);
        data.chunks[x][y].isCrawable = isCrawable(this.point,data.hole);
    });
}

function checkComplete() {
    var isDone = true;
    iterateChunks(function(){
        if (!this.isHome) isDone = false;
    });
    if (isDone) {
        PaneStore.emit('done');
    }
}

function iterateChunks(f){
    if (typeof f === 'function') {
        data.chunks.forEach(function(arr,x){
            arr.forEach(function(chunk,y){
                f.call(chunk,x,y);
            });
        });
    }
}

PaneStore.on('done',function(){
    data.isGame = false;
    PaneStore.emit('change');
});

AppDispatcher.register(function(payload){
    var image, coords;

    switch (payload.action){
        case PaneConstants.ACTION_SET_IMAGE:
            image = payload.image;
            setImage(image);
            break;
        case PaneConstants.ACTION_GAME_START:
            data.isGame = true;
            shuffle();
            break;
        case PaneConstants.ACTION_SET_MATRIX:
            data.matrix = payload.matrix;
            break;
        case PaneConstants.ACTION_MOUNT:
            coords = payload.coords;
            mount(coords);
            break;
        case PaneConstants.ACTION_UNMOUNT:
            coords = payload.coords;
            unmount(coords);
            break;
        // case PaneConstants.ACTION_SHUFFLE:
        //     shuffle();
        //     return true;
        //     break;
        case PaneConstants.ACTION_CRAWL:
            coords = payload.coords;
            crawl(coords);
            break;
        case PaneConstants.ACTION_GAME_ROLLBACK:
            rollback();
            break;
        case PaneConstants.ACTION_START_LOADING:
            data.isLoading = true;
            break;
        case PaneConstants.ACTION_STOP_LOADING:
            data.isLoading = false;
            break;
        case PaneConstants.ACTION_SPY_START:
            data.isGame = false;
            break;
        case PaneConstants.ACTION_SPY_STOP:
            data.isGame = true;
            break;
        default:
            return true;
    }

    PaneStore.emit('change');

    return true;
});

module.exports = PaneStore;