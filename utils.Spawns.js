var utilsRoles = require('utils.Roles');
var config = require('config');

var utilsSpawns = {
    spawnCreep: function (creepDef) {
        for (var key in Game.spawns) {
            var spawn = Game.spawns[key];
            spawn.spawnCreep(
                creepDef.body, 
                creepDef.name + '_' + Math.random().toString(36).substr(2, 3),
                {
                    memory: {def: creepDef}
                }
            );
            break;
        }
    },
    spawnCreeps: function () {
        var creepsOfEachRole = utilsRoles.getCreepsOfEachRole();
        for (var key in config.roles) {
            var roleDef = config.roles[key];
            if (creepsOfEachRole[roleDef.name] < roleDef.num) {
                this.spawnCreep(roleDef);
            }
        }
    }
}

module.exports = utilsSpawns;