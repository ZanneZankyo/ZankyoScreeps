var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsBuilder = {
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
        }
        else {
            var constructionSites = utilsRooms.getAllMyConstructionSites(creep.room);
            for (var key in constructionSites) {
                creep.memory.target = constructionSites[key];
                return;
            }
            creep.memory.target = utilsRooms.getMyLowestHitsStructure(creep.room);
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

        ret = creep.pickup(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }
        
        ret = creep.withdraw(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            //console.log(creep.name,' did pickup');
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
            //console.log(creep.name,' did build');
            return;
        }

        ret = creep.repair(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE || ret == ERR_NOT_ENOUGH_ENERGY) {
            if (ret == ERR_NOT_ENOUGH_RESOURCES) {
                creep.memory.target = undefined;
                console.log(creep.name,' did repair: no resource');
            }
            if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
                console.log(creep.name,' did repair move');
            }
            return;
        }

        console.log(creep.name + ': unexpect retuen: ' + ret);
        creep.memory.target = undefined;
    }
}

module.exports = creepsBuilder;