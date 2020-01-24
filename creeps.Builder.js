var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsBuilder = {
    run: function (creep) {
        if (creep.memory.target == undefined) {
            this.findTarget(creep);
        }
        else {
            creepsUniversal.doWork(creep);
        }
    },
    findTarget: function (creep) {
        creepsUniversal.decideGathering(creep);
        if (creep.memory.isGathering) {
            creepsUniversal.findNearestStoreHasEnergy(creep);
            if(creep.memory.target == undefined) {
                creepsUniversal.findSource(creep);
            }
            
        }
        else {
            var constructionSites = utilsRooms.getAllMyConstructionSites(creep.room);
            for (var key in constructionSites) {
                creep.memory.target = constructionSites[key];
                break;
            }
            if(creep.memory.target == undefined) {
                creep.memory.target = utilsRooms.getMyLowestHitsStructure(creep.room);
            }
            if(creep.memory.target == undefined) {
                creep.memory.target = utilsRooms.getMySpawn(creep.room);
            }
        }
    }
}

module.exports = creepsBuilder;