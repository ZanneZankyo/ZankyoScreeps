var utilsRooms = {
    ROOM_OBJ_SOURCE: 'room_obj_source',
    ROOM_OBJ_CONTROLLER: 'room_obj_controller',
    ROOM_OBJ_SPAWN: 'room_obj_spawn',
    ROOM_OBJ_CONSTRUCTIONSITE: 'room_obj_constructionsite',
    ROOM_OBJ_OTHER: 'room_obj_other',
    getAllSources: (room) => room.find(FIND_SOURCES),
    getAllAvailableSources: (room) => room.find(FIND_SOURCES_ACTIVE),
    getAllMyConstructionSites: (room) => room.find(FIND_MY_CONSTRUCTION_SITES),
    getAllMyEnergyContainer: (room) => room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}),
    getMySpawn: (room) => room.find(FIND_MY_SPAWNS)[0],
    getMyLowestHitsStructure: (room) => {
        var structures = room.find(FIND_MY_STRUCTURES);
        var minHits = 100000000;
        var minHitsStruct = null;
        for (var key in structures) {
            var structure = structures[key];
            if (structure.hits == structure.hitsMax) {
                continue;
            }
            if (structure.hits < minHits) {
                minHits = structure.hits;
                minHitsStruct = structure;
            }
        }
        return minHitsStruct;
    },
    getRoomObjectType: (obj) => {
        if(obj.energy != undefined){
            return this.ROOM_OBJ_SOURCE;
        }
        if(obj.level != undefined){
            return this.ROOM_OBJ_CONTROLLER;
        }
        if(obj.spawning != undefined){
            return this.ROOM_OBJ_SPAWN;
        }
        if(obj.progress != undefined){
            return this.ROOM_OBJ_CONSTRUCTIONSITE;
        }
        return this.ROOM_OBJ_OTHER;
    }
}

module.exports = utilsRooms;