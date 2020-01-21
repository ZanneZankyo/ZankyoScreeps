var config = require('config');

var utilsRoles = {
    getCreepsOfEachRole: function () {
        var creepsOfEachRole = [];
        for (var key in config.roles) {
            var roleDef = config.roles[key];
            var creepsOfThisRole = _.filter(Game.creeps, (creep) => creep.memory.role == roleDef.name);
            creepsOfEachRole[roleDef.name] = creepsOfThisRole.length;
        }
        return creepsOfEachRole;
    }
}

module.exports = utilsRoles;