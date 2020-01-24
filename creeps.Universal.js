var types = require('types');
var utilsRooms = require('utils.Rooms');

var creepsUniversal = {
    renew: function (creep) {
        var spawn = utilsRooms.getMySpawn(creep.room);
        var ret = spawn.renewCreep(creep);
        switch (ret) {
            case OK: {
                break;
            }
            case ERR_NOT_IN_RANGE: {
                spawn.moveTo(spawn);
                break;
            }
            case ERR_FULL:
            case ERR_NOT_ENOUGH_ENERGY:
            case ERR_BUSY: {
                creep.memory.isRenewing = false;
            }
            default: {
                console.log(creep.name + ' unexpect renew return:' + ret);
                creep.memory.isRenewing = false;
            }
        }
    },
    doWork: function (creep) {
        var targetType = utilsRooms.getRoomObjectType(creep.memory.target);
        var resetTarget = false;
        var ret = undefined;
        const target = Game.getObjectById(creep.memory.target.id);
        creep.memory.log = undefined;
        switch (targetType) {
            case types.ROOM_OBJ_SPAWN:
            case types.ROOM_OBJ_EXTENSION: {
                ret = creep.transfer(target, RESOURCE_ENERGY);
                creep.memory.log = 'SPWN:' + ret;
                break;
            }
            case types.ROOM_OBJ_SOURCE: {
                if(creep.memory.role == types.ROLE_CARRIER){
                    console.log(creep.name + ' is carrier!');
                }
                ret = creep.harvest(target);
                if (ret == OK && creep.store.getFreeCapacity() == 0 && creep.store.getCapacity() > 0) {
                    creep.memory.target = undefined;
                }
                creep.memory.log = 'HVST:' + ret;
                break;
            }
            case types.ROOM_OBJ_CONTROLLER: {
                ret = creep.upgradeController(target);
                if (ret == OK && creep.store.getUsedCapacity() == 0) {
                    creep.memory.target = undefined;
                }
                creep.memory.log = 'CTRL:' + ret;
                break;
            }
            case types.ROOM_OBJ_CONSTRUCTIONSITE: {
                ret = creep.build(target);
                creep.memory.log = 'BULD:' + ret;
                break;
            }
            case types.ROOM_OBJ_STORE: {
                if (creep.memory.isGathering) {
                    ret = creep.withdraw(target, RESOURCE_ENERGY);
                }
                else if (this.hasWorkParts(creep)) {
                    ret = creep.repair(target);
                    if(target.hits == target.hitsMax){
                        creep.memory.target = undefined;
                    }
                }
                else {
                    ret = creep.transfer(target, RESOURCE_ENERGY);
                }
                creep.memory.log = 'STOR:' + ret;
                break;
            }
            case types.ROOM_OBJ_DROP: {
                ret = creep.pickup(target, RESOURCE_ENERGY);
                creep.memory.log = 'DROP:' + ret;
                break;
            }
            case types.ROOM_OBJ_OTHER_STRUCTURE: {
                ret = creep.repair(target);
                if(target.hits == target.hitsMax){
                    creep.memory.target = undefined;
                }
                creep.memory.log = 'STRU:' + ret;
                break;
            }
            default: {
                creep.memory.log = 'UNKW:' + creep.memory.target;
                creep.memory.target = undefined;
                break;
            }
        }
        switch (ret) {
            case OK: {
                break;
            }
            case ERR_NOT_IN_RANGE: {
                this.moveToTarget(creep);
                break;
            }
            case ERR_NO_PATH:
            case ERR_NOT_ENOUGH_RESOURCES:
            case ERR_NOT_ENOUGH_ENERGY:
            case ERR_INVALID_TARGET:
            case ERR_FULL: {
                creep.memory.target = undefined;
                break;
            }
            default: {
                console.log(creep.name + ': unexpect return:' + ret + ', target:' + target);
                creep.memory.target = undefined;
                break;
            }
        }
    },
    moveToTarget: function (creep) {
        if (creep.memory.target == undefined) {
            console.log(creep.name, ' is trying to move to an undefined target!');
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
        if (spawn.recycleCreep(creep) != OK) {
            spawn.moveTo(spawn);
        }
    },
    findSource: function (creep) {
        var sources = utilsRooms.getAllAvailableSources(creep.room);
        //this.findNearestTarget(creep, sources);
        var randomIndex = Math.floor(Math.random() * sources.length);
        var randomSource = sources[randomIndex];
        //console.log('random source No'+randomIndex+':'+randomSource);
        creep.memory.target = randomSource;
    },
    findNearestStoreHasEnergy: function (creep) {
        var storesHasEnergy = utilsRooms.getStoresHasEnergy(creep.room);
        this.findNearestTarget(creep, storesHasEnergy);
    },
    findNearestStoreExceptStorageHasEnergy: function (creep) {
        var storesExceptStorageHasEnergy = utilsRooms.getStoresExceptStorageHasEnergy(creep.room);
        this.findNearestTarget(creep, storesExceptStorageHasEnergy);
    },
    findMyNearestExtensionNeedsEnergy: function(creep) {
        var extensionsNeedEnergy = utilsRooms.getMyExtensionsNeedEnergy(creep.room);
        this.findNearestTarget(creep, extensionsNeedEnergy);
    },
    findNearestTarget: function (creep, targets) {
        var minCost = 99999;
        for (var key in targets) {
            var target = targets[key];
            var path = PathFinder.search(creep.pos, { pos: target.pos, range: 1 });
            if (path.incomplete) {
                console.log('Path incomplete:' + target.name);
                continue;
            }
            if (path.cost < minCost) {
                creep.memory.target = target;
                minCost = path.cost;
            }
        }
    },
    decideGathering: function (creep) {
        creep.memory.isGathering = creep.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getUsedCapacity(RESOURCE_ENERGY);
    },
    hasWorkParts: function (creep) {
        for(var key in creep.body){
            var part = creep.body[key];
            if(part.type == WORK){
                return true;
            }
        }
        return false;
    }
}

module.exports = creepsUniversal;