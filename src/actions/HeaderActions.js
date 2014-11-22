var AppDispatcher = require('../dispatcher/AppDispatcher'),
    HeaderConstants = require('../constants/HeaderConstants'),
    HeaderActions = {
        menuToggle : function(){
            AppDispatcher.dispatch({ action : HeaderConstants.ACTION_MENU_TOGGLE });
        }
    };

module.exports = HeaderActions;
