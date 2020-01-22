var utilsRooms = require('utils.Rooms');

var creepsHarvester = {
    run: function (creep) {
        if (creep.memory.target == undefined) {
            this.findTarget(creep);
            return;
        }
        else {
            this.doWork(creep);
        }
    },
    findTarget: function (creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) < creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
            var controller = creep.room.controller;
            var path = PathFinder.search(creep.pos, { pos: controller.pos, range: 1 });
            creep.memory.target = controller;
            creep.memory.path = path;
        }
        else {
            var sources = utilsRooms.getAllAvailableSources(creep.room);
            var minCost = 99999;
            for (var key in sources) {
                var source = sources[key];
                var path = PathFinder.search(creep.pos, { pos: source.pos, range: 1 });
                if (path.incomplete) {
                    continue;
                }
                if (path.cost < minCost) {
                    creep.memory.target = source;
                    creep.memory.path = path;
                    minCost = path.cost;
                }
            }
        }
    },
    doWork: function(creep){
        var ret = undefined;

        ret = creep.harvest(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if(ret == OK && creep.store.getFreeCapacity() == 0){
                creep.memory.target = undefined;
            }
            if(ret == ERR_NOT_IN_RANGE){
                this.moveToTarget(creep);
            }
            return;
        }

        ret = creep.upgradeController(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if(ret == OK && creep.store.getUsedCapacity() == 0){
                creep.memory.target = undefined;
            }
            if(ret == ERR_NOT_IN_RANGE){
                this.moveToTarget(creep);
            }
            return;
        }

        console.log('unexpect retuen: ' + ret);
        creep.memory.target = undefined;
    },
    moveToTarget: function(creep){
        var ret = creep.moveTo(Game.getObjectById(creep.memory.target.id));
        if(ret==ERR_NO_PATH){
            console.log(creep.name + ' can not find path to ' + creep.memory.target.pos + ', find another target...');
            this.findTarget(creep);
        }
    }
}

module.exports = creepsHarvester;