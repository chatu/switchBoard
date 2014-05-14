/*jslint white: true */
/*global module, String, require, console */

/**
 * @author brian@bevey.org
 * @fileoverview Unit test for deviceState.js
 */

State = {};

exports.deviceState = {
  newState : function(test) {
    'use strict';

    var deviceState   = require('../../../lib/deviceState'),
        newFauxDevice = deviceState.newState('faux-device', {}),
        newDevice     = deviceState.newState('foo-device',  { markup : '<div>foo</div>', controller : { inputs : ['text', 'command'], keymap : ['Up', 'Left', 'Down'] } });

    test.equal(State['faux-device'].markup,                   undefined, 'No markup was defined for the faux device');
    test.equal(State['faux-device'].controller,               false,     'No controller was defined for the faux device');
    test.notEqual(parseInt(State['faux-device'].updated, 10), NaN,       'Timestamp should return a number.');

    test.equal(State['foo-device'].markup,         '<div>foo</div>', 'Markup defined for the device');
    test.deepEqual(State['foo-device'].controller, { inputs : ['text', 'command'], keymap : ['Up', 'Left', 'Down'] }, 'Controller should only contain input types and keymaps');
    test.notEqual(parseInt(State['foo-device'].updated, 10), NaN, 'Timestamp should return a number.');

    test.done();
  },

  updateState : function(test) {
    'use strict';

    State['faux-device']     = {};
    State['existing-device'] = { value : 50 };

    var deviceState = require('../../../lib/deviceState'),
        device      = deviceState.updateState('faux-device', { state : 'ok', value : 100 }),
        existing    = deviceState.updateState('existing-device', {});

    test.equal(State['faux-device'].state, 'ok', 'Device state should have been set to ok');
    test.equal(State['faux-device'].value, 100,  'Device value should have been set to 100');
    test.notEqual(parseInt(State['faux-device'].updated, 10), NaN, 'Timestamp should return a number.');

    test.equal(State['existing-device'].state, 'err', 'Device state should have been set to err since no ok had been sent');
    test.equal(State['existing-device'].value, 50,    'Device value should have been kept at 50 since no updated had been made');
    test.notEqual(parseInt(State['existing-device'].updated, 10), NaN, 'Timestamp should return a number.');

    test.done();
  }
};