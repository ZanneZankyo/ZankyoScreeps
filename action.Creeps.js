var utilsRooms = require('utils.Rooms');
var config = require('config');

var actionCreep = {
    run: function (creep) {
        if (creep.spawning) {
            return;
        }
        config.roles[creep.memory.def.role].run(creep);
        //creep.memory.run(creep);
    }
}

module.exports = actionCreep;