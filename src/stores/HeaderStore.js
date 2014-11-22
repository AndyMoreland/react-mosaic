var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    data = {};

var HeaderStore = merge(EventEmitter.prototype,{

});

AppDispatcher.register(function(payload){
    switch (payload.actionType){
        case 'HEADER_MENU_TOGGLE':
            HeaderStore.emit('menuToggle');
            break;
        default:
            return true;
    }

    return true;
});

module.exports = HeaderStore;