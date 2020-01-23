var utilsRooms = require('utils.Rooms');
var creepsUniversal = require('creeps.Universal');

var creepsStaticHarvester = {
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
        var sources = creep.room.lookForAtArea(LOOK_SOURCES, creep.pos.y - 1, creep.pos.x -1, creep.pos.y + 1, creep.pos.x + 1, true);
        if(sources.length > 0 
            && _.filter(creep.room.lookForAt(LOOK_STRUCTURES, creep), (structure) => structure.structureType == STRUCTURE_CONTAINER).length > 0
        ){
            //console.log('srouces',sources[0].source);
            creep.memory.target = sources[0].source;//sources[/*Math.floor(Math.random() * sources.length)*/0].source;
        }
        else {    
            creep.memory.target = utilsRooms.getNonOccupiedContainerBesideSource(creep.room);
        }
    },
    doWork: function (creep) {
        var ret = undefined;

        ret = creep.harvest(Game.getObjectById(creep.memory.target.id));
        if (ret == OK || ret == ERR_NOT_IN_RANGE) {
            if (ret == OK && creep.store.getFreeCapacity() == 0) {
                creep.memory.target = undefined;
            }
            else if (ret == ERR_NOT_IN_RANGE) {
                creepsUniversal.moveToTarget(creep);
            }
            return;
        }
        creepsUniversal.moveToTarget(creep);
        //console.log(creep.pos.x + ',' + creep.pos.y + '|' + creep.memory.target.pos.x + ',' + creep.memory.target.pos.y+ ':' + (creep.pos.x == creep.memory.target.pos.x && creep.pos.y == creep.memory.target.pos.y).toString());
        if(creep.pos.x == creep.memory.target.pos.x && creep.pos.y == creep.memory.target.pos.y){
            creep.memory.target = undefined;
        }
    }
};

module.exports = creepsStaticHarvester;