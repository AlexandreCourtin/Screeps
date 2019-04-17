var basicCommand = require('basic.command');

var roleRepairer = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			//creep.say('harvesting');
		}
		else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			//creep.say('repairing');
		}
		if (creep.memory.repairing) {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax
			});
			var i = 0;
			var registeredI = -1;
			var minHits = 30000;
			if (targets.length > 0) {
				while (i < targets.length) {
					if (targets[i].hits < minHits) {
						minHits = targets[i].hits;
						registeredI = i;
					}
					i++;
				}
				if (registeredI != -1) {
					if (creep.repair(targets[registeredI]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[registeredI], {visualizePathStyle: {stroke: '#ffffff'}});
					}
				} else {
					basicCommand.goToRest(creep);
				}
			} else if (creep.carry.energy != creep.carryCapacity) {
				basicCommand.harvestSource(creep);
			} else {
				basicCommand.goToRest(creep);
			}
		} else {
			basicCommand.harvestSource(creep);
		}
	}
};

module.exports = roleRepairer;
