var creepsHarvester = require('creeps.Harvester');
var creepUpgrader = require('creeps.Upgrader');

var config = {
    roles: {
        harvester: {
            role: 'harvester',
            num: 2,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepsHarvester.run(creep)
        },
        upgrader: {
            role: 'upgrader',
            num: 0,
            body: [WORK, CARRY, MOVE],
            run: (creep) => creepUpgrader.run(creep)
        }
    }
}

module.exports = config;