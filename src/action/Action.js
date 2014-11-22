"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Action = {
        call : function(action,payload){
            if (typeof payload === 'object')
                payload.action = action;
            else
                payload = {action : action};
            AppDispatcher.dispatch(payload);
        }
    };

module.exports = Action;