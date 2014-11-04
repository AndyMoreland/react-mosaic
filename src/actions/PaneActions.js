var AppDispatcher = require('../dispatcher/AppDispatcher'),
    PaneActions = {
        setImage : function(image) {
            AppDispatcher.dispatch({
                actionType : 'PANE_SET_IMAGE',
                image : image
            });
        },
        setHole : function(hole) {
            AppDispatcher.dispatch({
                actionType : 'PANE_SET_HOLE',
                hole : hole
            });
        }
    };

module.exports = PaneActions;
