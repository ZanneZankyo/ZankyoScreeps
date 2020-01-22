var utilsRoles = require('utils.Roles');
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
    spawnCreeps: function () {
        var creepsOfEachRole = utilsRoles.getCreepsOfEachRole();
        for (var role in config.roles) {
            var roleDef = config.roles[role];
            if (creepsOfEachRole[role] < roleDef.num) {
                this.spawnCreep(roleDef);
                //console.log('spawn a new ' + role + ', current num: ' + creepsOfEachRole[role]);
            }
        }
    }
}

module.exports = utilsSpawns;