var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsTemplate = {
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

        }
        else{
            
        }
    },
};

module.exports = creepsTemplate;