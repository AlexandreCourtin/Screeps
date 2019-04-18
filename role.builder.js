var basicCommand = require('basic.command');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
			//creep.say('harvesting');
		}
		else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			//creep.say('building');
		}
		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			} else if (creep.carry.energy < creep.carryCapacity) {
				basicCommand.harvestSource(creep);
			} else {
				basicCommand.goToRest(creep);
			}
		} else {
			basicCommand.harvestSource(creep);
		}
	}
};

module.exports = roleBuilder;
