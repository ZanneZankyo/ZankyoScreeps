var utilsRoles = require('utils.Roles');
var utilsRooms = require('utils.Rooms');
var config = require('config');

var utilsSpawns = {
    spawnCreep: function (creepDef) {
        for (var name in Game.spawns) {
            var spawn = Game.spawns[name];
            if (spawn.spawning) {
                continue;
            }
            spawn.spawnCreep(
                creepDef.body,
                creepDef.role + '_' + Math.random().toString(36).substr(2, 3),
                {
                    memory: { def: creepDef }
                }
            );
            break;
        }
    },
    spawnCreeps: function (spawn) {
        var creepsOfEachRole = utilsRoles.getCreepsOfEachRole();
        for (var role in config.roles) {
            var roleDef = config.roles[role];
            if (creepsOfEachRole[role] < roleDef.num) {
                /*if(role == config.ROLE_BUILDER && utilsRooms.getAllMyConstructionSites(spawn.room).length == 0){
                    continue;
                }
                if(role == config.ROLE_REPAIRER && utilsRooms.getMyLowestHitsStructure(spawn.room) == undefined) {
                    continue;
                }*/
                this.spawnCreep(roleDef);
                //console.log('spawn a new ' + role + ', current num: ' + creepsOfEachRole[role]);
            }
        }
    }
}

module.exports = utilsSpawns;