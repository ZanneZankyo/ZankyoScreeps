var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsHarvester = {
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
            creep.memory.target = creep.room.controller;
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
                this.moveToTarget(creep);
            }
            return;
        }

        ret = creep.upgradeController(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getUsedCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                this.moveToTarget(creep);
            }
            return;
        }

        console.log(creep.name + ': unexpect retuen: ' + ret);
        creep.memory.target = undefined;
    },
    moveToTarget: function (creep) {
        var ret = creep.moveTo(Game.getObjectById(creep.memory.target.id));
        if (ret == ERR_NO_PATH) {
            console.log(creep.name + ' can not find path to [' + creep.memory.target.pos.x + ',' + creep.memory.target.pos.y + '] find another target...');
            this.findTarget(creep);
        }
    }
}

module.exports = creepsHarvester;