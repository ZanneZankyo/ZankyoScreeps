var types = require('types');

var utilsRooms = {
    getAllSources: (room) => room.find(FIND_SOURCES),
    getAllAvailableSources: (room) => room.find(FIND_SOURCES_ACTIVE),
    getAllMyConstructionSites: (room) => room.find(FIND_MY_CONSTRUCTION_SITES),
    getAllContainers: (room) => room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER }),
    getMySpawn: (room) => room.find(FIND_MY_SPAWNS)[0],
    getMyLowestHitsStructure: (room) => {
        var structures = room.find(FIND_STRUCTURES);
        var minHits = 1.0;
        var minHitsStruct = null;
        for (var key in structures) {
            var structure = structures[key];
            if (structure.hits == structure.hitsMax) {
                continue;
            }
            if (parseFloat(structure.hits)/parseFloat(structure.hitsMax) < minHits) {
                minHits = parseFloat(structure.hits)/parseFloat(structure.hitsMax);
                minHitsStruct = structure;
            }
        }
        return minHitsStruct;
    },
    getRoomObjectType: (obj) => {
        if (obj.energy != undefined) {
            return types.ROOM_OBJ_SOURCE;
        }
        if (obj.level != undefined) {
            return types.ROOM_OBJ_CONTROLLER;
        }
        if (obj.progress != undefined) {
            return types.ROOM_OBJ_CONSTRUCTIONSITE;
        }
        if (obj.spawning != undefined) {
            return types.ROOM_OBJ_SPAWN;
        }
        if(obj.store != undefined) {
            return types.ROOM_OBJ_STORE;
        }

        return types.ROOM_OBJ_OTHER;
    },
    getNonOccupiedContainerBesideSource: (room) => {
        var containers = room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER });//this.getAllContainers(room);
        for (var key in containers) {
            var container = containers[key];
            if(room.lookForAt(LOOK_CREEPS, container).length == 0 
            && room.lookForAtArea(LOOK_SOURCES, container.pos.y - 1, container.pos.x -1, container.pos.y + 1, container.pos.x + 1, true).length > 0){
                return container;
            }
        }
        return undefined;
    },
    getStoresHasEnergy: (room) => {
        var stores = [];
        stores.push(...room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => resource.resourceType == RESOURCE_ENERGY}));
        stores.push(...room.find(FIND_STRUCTURES, 
                            {filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) 
                                 && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 }));
        stores.push(...room.find(FIND_RUINS, {filter: (ruin) => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0}));
        stores.push(...room.find(FIND_TOMBSTONES, {filter: (tomb) => tomb.store.getUsedCapacity(RESOURCE_ENERGY) > 0}));
        return stores;
    }
}

module.exports = utilsRooms;