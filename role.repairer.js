var roleRepairer = {

	/** @param {Creep} creep **/
	run: function(creep) {

		console.log(creep.carry.energy +' '+creep.carryCapacity);
		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			creep.say('harvesting');
		}
		else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			creep.say('repairing');
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
				console.log('step1');
				if (registeredI != -1) {
					if (creep.repair(targets[registeredI]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[registeredI], {visualizePathStyle: {stroke: '#ffffff'}});
					}
				} else if (creep.carry.energy != creep.carryCapacity) {
					console.log('step2');
					harvestSources(creep);
				} else {
					goToRest(creep);
				}
				console.log('step3');
			} else {
				goToRest(creep);
			}
		} else {
			harvestSources(creep);
		}
	}
};

function harvestSources(creep) {
	var source = creep.pos.findClosestByRange(FIND_SOURCES);
	if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
	}
}

function goToRest(creep) {
	creep.moveTo(Game.flags['Rest'], {visualizePathStyle: {stroke: '#0000ff'}});
}

module.exports = roleRepairer;
