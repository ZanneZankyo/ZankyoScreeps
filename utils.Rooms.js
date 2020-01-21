var utilsRooms = {
    getAllSources: function(room){
        var sources = room.find(FIND_SOURCES_ACTIVE);
        return sources;
    },
    getAllAvailableSources: function(room) {
        var sources = room.find(FIND_SOURCES_ACTIVE);
        var availableSources = _.filter(sources, (source) => source.energy > 0);
        return availableSources;
    }
}

module.exports = utilsRooms;