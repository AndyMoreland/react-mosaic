var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ChunksConstants = require('../constants/ChunksConstants'),
    ChunksActions = {
        mount : function(coords){
            AppDispatcher.dispatch({ action : ChunksConstants.ACTION_MOUNT, coords : coords });
        },
        shuffle : function() {
            AppDispatcher.dispatch({ action : ChunksConstants.ACTION_SHUFFLE, depth : ChunksConstants.SHUFFLE_DEPTH });
        },
        crawl : function(coords){
            AppDispatcher.dispatch({ action : ChunksConstants.ACTION_CRAWL, coords : coords });
        }
    };

module.exports = ChunksActions;
