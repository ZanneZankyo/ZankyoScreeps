var utilsRooms = require('utils.Rooms');

var creepsUniversal = {
    renew: function (creep) {
        
    },
    moveToTarget: function (creep) {
        var ret = creep.moveTo(Game.getObjectById(creep.memory.target.id));
        if (ret == ERR_NO_PATH) {
            console.log(creep.name + ' can not find path to ' + creep.memory.target.pos + ', find another target...');
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
    }
}

module.exports = creepsUniversal;