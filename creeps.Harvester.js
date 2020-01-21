var utilsRooms = require('utils.Rooms');

var creepsHarvester = {
    run: function(creep) {
        if(creep.memory.target == undefined){
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                var controller = creep.room.controller;
                var path = PathFinder.search(creep.pos, {pos: controller.pos, range: 1});
                creep.memory.target = controller;
                creep.memory.path = path;
            }
            //else if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            else{
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
            return;
        }
        else{
            if(creep.harvest(Game.getObjectById(creep.memory.target.id))!=OK 
            && creep.upgradeController(Game.getObjectById(creep.memory.target.id))!=OK){
                creep.moveTo(Game.getObjectById(creep.memory.target.id)/*, {reusePath: true}*/);
            }
            else{
                if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 || creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.target = undefined;
                    console.log(creep.name + ' target cleared, FreeCapacity:' + creep.store.getFreeCapacity(RESOURCE_ENERGY) + ', UsedCapacity:' + creep.store.getUsedCapacity(RESOURCE_ENERGY));
                    return;
                }
            }
        }
    }
}

module.exports = creepsHarvester;