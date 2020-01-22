var config = require('config');

var utilsRoles = {
    getCreepsOfEachRole: function () {
        var creepsOfEachRole = [];
        for (var role in config.roles) {
            var roleDef = config.roles[role];
            var creepsOfThisRole = _.filter(Game.creeps, (creep) => creep.memory.def.role == role);
            creepsOfEachRole[role] = creepsOfThisRole.length;
        }
        return creepsOfEachRole;
    }
}

module.exports = utilsRoles;