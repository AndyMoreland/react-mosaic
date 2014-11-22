var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneConstants = require('../constants/PaneConstants'),
    PaneActions = {
        setImage : function(image) {
            AppDispatcher.dispatch({action : PaneConstants.ACTION_SET_IMAGE, image : image});
        },
        gameStart : function() {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_GAME_START });
        },
        setMatrix : function(matrix) {
            AppDispatcher.dispatch({ action : PaneConstants.ACTION_SET_MATRIX, matrix : matrix });
        }
    };

module.exports = PaneActions;
