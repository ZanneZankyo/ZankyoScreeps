var utilsRoles = require('utils.Roles');
var utilsRooms = require('utils.Rooms');
var config = require('config');

var utilsSpawns = {
    checkAndSpawn: function (spawn) {
        if(spawn.spawning){
            return;
        }
        var checklist = config.spawnCheckOrder();
        spawn.memory.nextSpawn = undefined;
        for(var index in checklist) {
            var role = checklist[index];
            var roleDef = config.roles[role];
            if(roleDef.shouldSpawn(spawn.room)){
                spawn.memory.nextSpawn = role;
                this.spawnCreep(spawn, roleDef);
                break;
            }
        }
    },
    spawnCreep: function (spawn, creepDef) {
        spawn.spawnCreep(
            creepDef.body(),
            creepDef.role() + '_' + Math.random().toString(36).substr(2, 3),
            {
                memory: { role: creepDef.role() }
            }
        );
    },
}

module.exports = utilsSpawns;