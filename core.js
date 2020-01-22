
var config = require('config');
var utilsRoles = require('utils.Roles');
var utilsSpawns = require('utils.Spawns');
var actionCreeps = require('action.Creeps');

var core = {
    loop: function () {
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            utilsSpawns.spawnCreeps(spawn);
        }
        for (var name in Memory.creeps) {
            var creep = Game.creeps[name];
            if (creep == undefined) {
                delete Memory.creeps[name];
                continue;
            }
            actionCreeps.run(creep);
        }
    }
}

module.exports = core;