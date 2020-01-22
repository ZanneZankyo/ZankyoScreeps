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
            creepsUniversal.findSource(creep);
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
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }

        ret = creep.repair(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getUsedCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }

        ret = creep.build(Game.getObjectById(creep.memory.target.id));
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
}

module.exports = creepsRepairer;