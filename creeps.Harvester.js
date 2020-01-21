var utilsRooms = require('utils.Rooms');

var creepsHarvester = {
    run: function(creep) {
        if(creep.memory.target == undefined){
            if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
                var sources = utilsRooms.getAllAvailableSources(creep.room);
                var minCost = 99999;
                for(var key in sources) {
                    var source = sources[key];
                    var path = PathFinder.search(creep.pos, {pos: source.pos, range: 1});
                    if(path.incomplete) {
                        continue;
                    }
                    if(path.cost < minCost)
                    {
                        creep.memory.target = source;
                        creep.memory.path = path;
                        minCost = path.cost;
                    }
                }
            }
            if(creep.store.getFreeCapacity() == 0){
                var controller = creep.room.controller;
                var path = PathFinder.search(creep.pos, {pos: controller.pos, range: 1});
                creep.memory.target = controller;
                creep.memory.path = path;
            }
        }
        else
        {
            if(creep.harvest(Game.getObjectById(creep.memory.target.id))!=OK 
            && creep.upgradeController(Game.getObjectById(creep.memory.target.id))!=OK){
                creep.moveTo(Game.getObjectById(creep.memory.target.id), {reusePath: true});
            }
            if(creep.store.getFreeCapacity() == 0 || creep.store.getFreeCapacity() == creep.store.getCapacity()){
                creep.memory.target = undefined;
            }
        }
    }
}

module.exports = creepsHarvester;