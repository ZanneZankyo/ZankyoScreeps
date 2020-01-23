var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsRepairer = {
    run: function (creep) {
        if (creep.memory.target == undefined) {
            this.findTarget(creep);
        }
        else {
            this.doWork(creep);
        }
    },
    findTarget: function (creep) {
        if (creep.store.getUsedCapacity() < creep.store.getFreeCapacity()) {
            creepsUniversal.findNearestStoreHasEnergy(creep);
            if(creep.memory.target == undefined) {
                creepsUniversal.findSource(creep);
            }
            console.log(creep.name+' repair found resource' + creep.memory.target);   
        }
        else {
            creep.memory.target = utilsRooms.getMyLowestHitsStructure(creep.room);
            if(creep.memory.target == undefined) {
                var constructionSites = utilsRooms.getAllMyConstructionSites(creep.room);
                for (var key in constructionSites) {
                    creep.memory.target = constructionSites[key];
                    break;
                }
            }
        }
    },
    doWork: function (creep) {
        var ret = undefined;

        ret = creep.harvest(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
                creep.memory.log = 'Harvest full';
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
                creep.memory.log = 'Moving to harvest';
            }
            return;
        }

        ret = creep.pickup(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
                creep.memory.log = 'Picked up';
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
                creep.memory.log = 'Moving for picking up';
            }
            return;
        }
        
        ret = creep.withdraw(Game.getObjectById(creep.memory.target.id),RESOURCE_ENERGY);
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
                creep.memory.log = 'Withdraw done';
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
                creep.memory.log = 'Moving for withdraw';
            }
            return;
        }

        ret = creep.repair(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE || ret == ERR_NOT_ENOUGH_ENERGY) {
            if (ret == ERR_NOT_ENOUGH_RESOURCES) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }

        ret = creep.build(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE || ret == ERR_NOT_ENOUGH_ENERGY) {
            if (ret == ERR_NOT_ENOUGH_RESOURCES) {
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
}

module.exports = creepsRepairer;