var AppDispatcher = require('../dispatcher/AppDispatcher'),
    HeaderConstants = require('../constants/HeaderConstants'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge')
    data = {
        isOpen : false
    };

var MenuStore = merge(EventEmitter.prototype,{
    isOpen : function(){ return data.isOpen }
});

AppDispatcher.register(function(payload){
    switch (payload.action){
        case HeaderConstants.ACTION_MENU_TOGGLE:
            data.isOpen = !data.isOpen;
            MenuStore.emit('toggle');
            break;
        default:
            return true;
    }

    return true;
});

module.exports = MenuStore;