var types = require('types');
var creepsStarter = require('creeps.Starter');
var creepsHarvester = require('creeps.Harvester');
var creepsUpgrader = require('creeps.Upgrader');
var creepsBuilder = require('creeps.Builder');
var creepsRepairer = require('creeps.Repairer');
var creepsStaticHarvester = require('creeps.StaticHarvester');
var creepsCarrier = require('creeps.Carrier');

var config = {
    roles: {
        starter: {
            role: () => types.ROLE_STARTER,
            shouldSpawn: (room) => config.shouldSpawnStarter(room),
            body: () => [WORK, CARRY, MOVE],
            run: (creep) => creepsStarter.run(creep)
        },
        harvester: {
            role: () => types.ROLE_HARVESTER,
            shouldSpawn: (room) => config.shouldSpawnHarvester(room),
            body: () => [WORK, CARRY, MOVE],
            run: (creep) => creepsHarvester.run(creep)
        },
        upgrader: {
            role: () => types.ROLE_UPGRADER,
            shouldSpawn: (room) => config.shouldSpawnUpgrader(room),
            body: () => [WORK, CARRY, MOVE],
            run: (creep) => creepsUpgrader.run(creep)
        },
        builder: {
            role: () => types.ROLE_BUILDER,
            shouldSpawn: (room) => config.shouldSpawnBuilder(room),
            body: () => [WORK, CARRY, MOVE],
            run: (creep) => creepsBuilder.run(creep)
        },
        repairer: {
            role: () => types.ROLE_REPAIRER,
            shouldSpawn: (room) => config.shouldSpawnRepairer(room),
            body: () => [WORK, CARRY, MOVE],
            run: (creep) => creepsRepairer.run(creep)
        },
        staticHarvester: {
            role: () => types.ROLE_STATIC_HARVESTER,
            shouldSpawn: (room) => config.shouldSpawnStaticHarvester(room),
            body: () => [WORK, WORK, MOVE],
            run: (creep) => creepsStaticHarvester.run(creep)
        },
        carrier: {
            role: () => types.ROLE_CARRIER,
            shouldSpawn: (room) => config.shouldSpawnCarrier(room),
            body: () => [CARRY, CARRY, CARRY, MOVE],
            run: (creep) => creepsCarrier.run(creep)
        }
    },
    spawnCheckOrder: () => [
        types.ROLE_STARTER, 
        types.ROLE_STATIC_HARVESTER,
        types.ROLE_HARVESTER, 
        types.ROLE_CARRIER,
        types.ROLE_REPAIRER,
        types.ROLE_UPGRADER, 
        types.ROLE_BUILDER, 
    ],
    shouldSpawnStarter: (room) => room.find(FIND_MY_CREEPS).length == 0,
    shouldSpawnHarvester: (room) => room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length > 0
                                 && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_STATIC_HARVESTER}).length
                                  < room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length
                                 && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_HARVESTER}).length < 6,
    shouldSpawnUpgrader: (room) => room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length > 0
                                && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_UPGRADER}).length < 3,
    shouldSpawnBuilder: (room) => room.find(FIND_MY_CONSTRUCTION_SITES).length > 0
                               && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_BUILDER}).length < 2,
    shouldSpawnRepairer: (room) => room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax}).length > 0
                                && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_REPAIRER}).length < 2,
    shouldSpawnStaticHarvester: (room) => room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length > 0
                                       && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_STATIC_HARVESTER}).length
                                        < room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length,
    shouldSpawnCarrier: (room) => room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER}).length > 0
                               && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types.ROLE_CARRIER}).length < 1
};

module.exports = config;