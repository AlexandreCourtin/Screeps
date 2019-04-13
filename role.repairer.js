var roleRepairer = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			creep.say('harvesting');
		}
		else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			creep.say('repairing');
		}
		if (creep.memory.repairing) {
			var targets = creep.room.find(FIND_STRUCTURES);
			var i = 0;
			if (targets.length > 0) {
				while (i < targets.length) {
					if (targets[i].hits < targets[i].hitsMax) {
						console.log('break');
						break ;
					}
					i++;
				}
				console.log(targets[i] + ' nb: ' + i);
				if (i < targets.length) {
					if (creep.repair(targets[i]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#ffffff'}});
					}
				} else {
					creep.moveTo(Game.flags['Rest'], {visualizePathStyle: {stroke: '#0000ff'}});
				}
			} else {
				creep.moveTo(Game.flags['Rest'], {visualizePathStyle: {stroke: '#0000ff'}});
			}
		} else {
			var source = creep.pos.findClosestByRange(FIND_SOURCES);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
	}
};

module.exports = roleRepairer;
