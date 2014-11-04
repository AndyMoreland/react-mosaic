var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ChunksConstants = require('../constants/ChunksConstants'),
    ChunksActions = {
        mount : function(coords){
            AppDispatcher.dispatch({
                actionType : 'CHUNK_MOUNT',
                coords : coords
            });
        },
        setMatrix : function(matrix) {
            AppDispatcher.dispatch({
                actionType : 'CHUNKS_SET_MATRIX',
                matrix : matrix
            });
        },
        shuffle : function() {
            AppDispatcher.dispatch({
                actionType : 'CHUNKS_SHUFFLE',
                depth : ChunksConstants.SHUFFLE_DEPTH
            });
        },
        crawl : function(coords){
            AppDispatcher.dispatch({
                actionType : 'CHUNK_CRAWL',
                coords : coords
            });
        }
    };

module.exports = ChunksActions;
