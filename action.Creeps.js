var utilsRooms = require('utils.Rooms');
var config = require('config');

var actionCreep = {
    run: function (creep) {
        if (creep.spawning) {
            return;
        }
        if(creep.memory.def == undefined || config.roles[creep.memory.def.role] == undefined || config.roles[creep.memory.def.role].run == undefined)
        {
            var spawn = utilsRooms.getMySpawn(creep.room);
            if(spawn.recycleCreep(creep) != OK){
                spawn.moveTo(spawn);
            }
        }
        config.roles[creep.memory.def.role].run(creep);
        //creep.memory.run(creep);
    }
}

module.exports = actionCreep;