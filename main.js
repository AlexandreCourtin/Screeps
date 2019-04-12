var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

const maxHarvesters = 1;
const maxUpgraders = 1;
const maxBuilders = 1;

module.exports.loop = function () {

	/*var tower = Game.getObjectById('TOWER_ID');
	if (tower) {
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		});
		if (closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (closestHostile) {
			tower.attack(closestHostile);
		}
	}*/

	//INIT
	var numbersOfHarvesters = 0;
	var numbersOfUpgraders = 0;
	var numbersOfBuilders = 0;

	//SCREEPS ROLES
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			numbersOfHarvesters++;
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			numbersOfUpgraders++;
			roleUpgrader.run(creep);
		}
		if (creep.memory.role == 'builder') {
			numbersOfBuilders++;
			roleBuilder.run(creep);
		}
	}

	//SPAWN CREEPS
	for (var i = numbersOfHarvesters ; i < maxHarvesters ; i++) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvey' + i,
			{memory: {role: 'harvester'}});
	}
	for (var i = numbersOfUpgraders ; i < maxUpgraders ; i++) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgray' + i,
			{memory: {role: 'harvester'}});
	}
	for (var i = numbersOfBuilders ; i < maxBuilders ; i++) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Bob' + i,
			{memory: {role: 'harvester'}});
	}
}
