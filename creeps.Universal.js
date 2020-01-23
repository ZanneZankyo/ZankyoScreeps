var types = require('types');
var utilsRooms = require('utils.Rooms');

var creepsUniversal = {
    renew: function (creep) {
        
    },
    doWork: function (creep) {
        var targetType = utilsRooms.getRoomObjectType(creep.memory.target);
        var resetTarget = false;
        var ret = undefined;
        switch(targetType){
            case types.ROOM_OBJ_SOURCE: {
                ret = creep.harvest(Game.getObjectById(creep.memory.target.id));
                if (ret == OK || ret == ERR_NOT_IN_RANGE) {
                    if (ret == OK && creep.store.getFreeCapacity() == 0) {
                        creep.memory.target = undefined;
                    }
                    if (ret == ERR_NOT_IN_RANGE) {
                        this.moveToTarget(creep);
                    }
                    break;
                }
            }
            case types.ROOM_OBJ_CONTROLLER: {
                ret = creep.upgradeController(Game.getObjectById(creep.memory.target.id));
                if (ret == OK || ret == ERR_NOT_IN_RANGE) {
                    if (ret == OK && creep.store.getUsedCapacity() == 0) {
                        creep.memory.target = undefined;
                    }
                    if (ret == ERR_NOT_IN_RANGE) {
                        this.moveToTarget(creep);
                    }
                    break;
                }
            }
            case types.ROOM_OBJ_CONSTRUCTIONSITE: {

            }
        }
    },
    moveToTarget: function (creep) {
        if(creep.memory.target == undefined){
            console.log(creep.name,' is trying to move to an undefined target!');
            return;
        }
        var ret = creep.moveTo(Game.getObjectById(creep.memory.target.id));
        if (ret == ERR_NO_PATH) {
            console.log(creep.name + ' can not find path to [' + creep.memory.target.pos.x + ',' + creep.memory.target.pos.y + '] find another target...');
            creep.memory.target = undefined;
        }
    },
    recycle: function (creep) {
        var spawn = utilsRooms.getMySpawn(creep.room);
        if(spawn.recycleCreep(creep) != OK){
            spawn.moveTo(spawn);
        }
    },
    findSource: function (creep) {
        var sources = utilsRooms.getAllAvailableSources(creep.room);
        var minCost = 99999;
        for (var key in sources) {
            var source = sources[key];
            
            var path = PathFinder.search(creep.pos, { pos: source.pos, range: 1 });
            if (path.incomplete) {
                console.log('Path incomplete:' + source.name);
                continue;
            }
            if (path.cost < minCost) {
                creep.memory.target = source;
                creep.memory.path = path;
                minCost = path.cost;
            }
        }
    },
    findNearestStoreHasEnergy: function (creep) {
        var storesHasEnergy = utilsRooms.getStoresHasEnergy(creep.room);
        var minCost = 99999;
        for (var key in storesHasEnergy) {
            var stores = storesHasEnergy[key];
            var path = PathFinder.search(creep.pos, { pos: stores.pos, range: 1 });
            if (path.incomplete) {
                console.log('Path incomplete:' + stores.name);
                continue;
            }
            if (path.cost < minCost) {
                creep.memory.target = stores;
                creep.memory.path = path;
                minCost = path.cost;
            }
        }
    }
}

module.exports = creepsUniversal;