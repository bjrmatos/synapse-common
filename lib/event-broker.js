'use strict';

var mediator = require('./mediator'),
    EventBroker, __slice = [].slice;

EventBroker = {
    subscribeEvent: function(type, handler) {
        if (typeof type !== 'string') {
            throw new TypeError('EventBroker#subscribeEvent: ' + 'type argument must be a string');
        }

        if (typeof handler !== 'function') {
            throw new TypeError('EventBroker#subscribeEvent: ' + 'handler argument must be a function');
        }

        mediator.unsubscribe(type, handler, this);

        return mediator.subscribe(type, handler, this);
    },

    unsubscribeEvent: function(type, handler) {
        if (typeof type !== 'string') {
            throw new TypeError('EventBroker#unsubscribeEvent: ' + 'type argument must be a string');
        }

        if (typeof handler !== 'function') {
            throw new TypeError('EventBroker#unsubscribeEvent: ' + 'handler argument must be a function');
        }

        return mediator.unsubscribe(type, handler);
    },

    unsubscribeAllEvents: function() {
        return mediator.unsubscribe(null, null, this);
    },

    publishEvent: function() {
        var args, type;

        type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        if (typeof type !== 'string') {
            throw new TypeError('EventBroker#publishEvent: ' + 'type argument must be a string');
        }

        return mediator.publish.apply(mediator, [type].concat(__slice.call(args)));
    }
};

if (typeof Object.freeze === "function") {
    Object.freeze(EventBroker);
}

module.exports = EventBroker;