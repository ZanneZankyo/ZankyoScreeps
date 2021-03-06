var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsUpgrader = {
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
            creepsUniversal.findNearestStoreHasEnergy(creep);
            if(creep.memory.target == undefined) {
                creepsUniversal.findSource(creep);
            }
        }
        else {    
            creep.memory.target = creep.room.controller;
        }
    }
}

module.exports = creepsUpgrader;