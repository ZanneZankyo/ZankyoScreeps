var types = require('types');
var config = require('config');
var utilsRooms = require('utils.Rooms');

var actionCreep = {
    run: function (creep) {
        if (creep.spawning) {
            return;
        }
        if(creep.memory.role == undefined || config.roles[creep.memory.role] == undefined || config.roles[creep.memory.role].run == undefined)
        {
            creep.memory.role = types.ROLE_HARVESTER;
            /*var spawn = utilsRooms.getMySpawn(creep.room);
            if(spawn.recycleCreep(creep) != OK){
                spawn.moveTo(spawn);
            }*/
        }
        //console.log(config.roles[creep.memory.role].run);
        config.roles[creep.memory.role].run(creep);
        //creep.memory.run(creep);
    }
}

module.exports = actionCreep;