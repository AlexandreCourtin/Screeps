var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

const maxHarvesters = 1;
const maxUpgraders = 1;
const maxBuilders = 1;
const maxRepairers = 1;

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
	var numbersOfRepairers = 0;

	//SCREEPS ROLES
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			numbersOfHarvesters++;
			roleHarvester.run(creep);
		}
		else if (creep.memory.role == 'upgrader') {
			numbersOfUpgraders++;
			roleUpgrader.run(creep);
		}
		else if (creep.memory.role == 'builder') {
			numbersOfBuilders++;
			roleBuilder.run(creep);
		}
		else if (creep.memory.role == 'repairer') {
			numbersOfRepairers++;
			roleRepairer.run(creep);
		}
	}

	//SPAWN CREEPS
	if (numbersOfHarvesters < maxHarvesters) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvey',
			{memory: {role: 'harvester'}});
	} else if (numbersOfUpgraders < maxUpgraders) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgray',
			{memory: {role: 'upgrader'}});
	} else if (numbersOfBuilders < maxBuilders) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Bob',
			{memory: {role: 'builder'}});
	} else if (numbersOfRepairers < maxRepairers) {
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Reparo',
			{memory: {role: 'repairer'}});
	}
	/*console.log('h: '+numbersOfHarvesters+'/'+maxHarvesters
		+' u: '+numbersOfUpgraders+'/'+maxUpgraders
		+' b: '+numbersOfBuilders+'/'+maxBuilders
		+' r: '+numbersOfRepairers+'/'+maxRepairers);*/
}
