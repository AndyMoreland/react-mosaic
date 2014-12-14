var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    PaneActions = 
    {
        startLoading : function()
        {
            AppDispatcher.dispatch({action : PaneConstants.ACTION_START_LOADING});
        },

        stopLoading : function()
        {
            AppDispatcher.dispatch({action : PaneConstants.ACTION_STOP_LOADING});
        },

        setImage : function(image) 
        {
            AppDispatcher.dispatch({action : PaneConstants.ACTION_SET_IMAGE, image : image});
        },

        gameStart : function() 
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_GAME_START });
        },

        gameRollback : function()
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_GAME_ROLLBACK });
        },

        setMatrix : function(matrix) 
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_SET_MATRIX, matrix : matrix });
        },

        mount : function(coords)
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_MOUNT, coords : coords });
        },

        unmount : function(coords)
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_UNMOUNT, coords : coords });
        },

        shuffle : function() 
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_SHUFFLE, depth : PaneConstants.SHUFFLE_DEPTH });
        },

        crawl : function(coords)
        {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_CRAWL, coords : coords });
        }
    };

module.exports = PaneActions;
