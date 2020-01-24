var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsHarvester = {
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
            creepsUniversal.findSource(creep);
        }
        else {    
            creep.memory.target = creep.room.controller;
        }
    }
}

module.exports = creepsHarvester;