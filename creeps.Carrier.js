var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsCarrier = {
    run: function (creep) {
        if (creep.memory.target == undefined) {
            this.findTarget(creep);
            return;
        }
        else {
            creepsUniversal.doWork(creep);
        }
    },
    findTarget: function (creep) {
        creepsUniversal.decideGathering(creep);
        if (creep.memory.isGathering) {
            creepsUniversal.findNearestStoreExceptStorageHasEnergy(creep);
        }
        else {    
            var spawn = utilsRooms.getMySpawn(creep.room);
            //console.log(creep.name + ' spawn free capacity:' + spawn.store.getFreeCapacity(RESOURCE_ENERGY));
            if(spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                creep.memory.target = spawn;
                //console.log(creep.name + ' selects spawn');
            }
            else{
                //console.log(creep.name + ' is finding extensions');
                creepsUniversal.findMyNearestExtensionNeedsEnergy(creep);
                if(creep.memory.target == undefined){
                    //console.log(creep.name + ' is finding storages');
                    creep.memory.target = utilsRooms.getStorage(creep.room);
                }
            }
        }
        //console.log(creep.name+'\'s target:' + creep.memory.target);
    }
};

module.exports = creepsCarrier;