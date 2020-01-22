var creepsHarvester = require('creeps.Harvester');
var creepsUpgrader = require('creeps.Upgrader');
var creepsBuilder = require('creeps.Builder');
var creepsRepairer = require('creeps.Repairer');

var config = {
    ROLE_HARVESTER: 'harvester',
    ROLE_UPGRADER: 'upgrader',
    ROLE_BUILDER: 'builder',
    ROLE_REPAIRER: 'repairer',
    roles: {
        harvester: {
            role: 'harvester',
            num: 5,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepsHarvester.run(creep)
        },
        upgrader: {
            role: 'upgrader',
            num: 0,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepsUpgrader.run(creep)
        },
        builder: {
            role: 'builder',
            num: 1,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepsBuilder.run(creep)
        },
        repairer: {
            role: 'repairer',
            num: 1,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepsRepairer.run(creep)
        }
    }
}

module.exports = config;