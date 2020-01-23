var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');


var creepsStarter = {
    run: function (creep) {
        if (creep.memory.target == undefined) {
            this.findTarget(creep);
            return;
        }
        else {
            this.doWork(creep);
        }
    },
    findTarget: function (creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
            creepsUniversal.findSource(creep);
        }
        else {    
            var spawn = utilsRooms.getMySpawn(creep.room);
            console.log('spawn free: ' + spawn.store.getFreeCapacity(RESOURCE_ENERGY));
            if(spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                creep.memory.target = spawn;
            }
            else{
                creep.memory.target = creep.room.controller;
            }
        }
    },
    doWork: function (creep) {
        var ret = undefined;

        ret = creep.harvest(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }

        ret = creep.transfer(Game.getObjectById(creep.memory.target.id), RESOURCE_ENERGY, creep.store.getUsedCapacity(RESOURCE_ENERGY));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getUsedCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }

        console.log(creep.name + ': unexpect retuen: ' + ret);
        creep.memory.target = undefined;
    }
};

module.exports = creepsStarter;