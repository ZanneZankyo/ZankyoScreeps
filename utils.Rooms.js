var utilsRooms = {
    getAllSources: (room) => room.find(FIND_SOURCES),
    getAllAvailableSources: (room) => room.find(FIND_SOURCES_ACTIVE),
    getAllMyConstructionSites: (room) => room.find(FIND_MY_CONSTRUCTION_SITES),
    getAllMyEnergyContainer: function (room) {
        var storages = room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER });
    },
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
    }
}

module.exports = utilsRooms;