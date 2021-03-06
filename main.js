//HOW TO
//SPAWN = Spawn1
//REST = Rest

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

const maxHarvesters = 1;
const maxUpgraders = 1;
const maxBuilders = 1;
const maxRepairers = 0;

module.exports.loop = function () {

	//INIT
	var numbersOfHarvesters = 0;
	var numbersOfUpgraders = 0;
	var numbersOfBuilders = 0;
	var numbersOfRepairers = 0;

	//SCREEPS ROLES
	console.log("----");
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		console.log("name: " + name + " ticksToLive: " + creep.ticksToLive);
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

	//SPAWN CREEPS -- WORK 100 CARRY 50 MOVE 50
	if (numbersOfHarvesters < maxHarvesters) {
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvey',
			{memory: {role: 'harvester'}});
	} else if (numbersOfUpgraders < maxUpgraders) {
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Upgray',
			{memory: {role: 'upgrader'}});
	} else if (numbersOfBuilders < maxBuilders) {
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Bob',
			{memory: {role: 'builder'}});
	} else if (numbersOfRepairers < maxRepairers) {
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'Reparo',
			{memory: {role: 'repairer'}});
	}

	//TOWERS
	for (var name in Game.rooms) {
		var towers = Game.rooms[name].find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_TOWER
		});

		for (var i = 0 ; i < towers.length ; i++) {
			var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax
			});
			var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if (closestDamagedStructure) {
				towers[i].repair(closestDamagedStructure);
			}
			else if (closestHostile) {
				towers[i].attack(closestHostile);
			}
		}
	}

	//LOG
	/*console.log('h: '+numbersOfHarvesters+'/'+maxHarvesters
		+' u: '+numbersOfUpgraders+'/'+maxUpgraders
		+' b: '+numbersOfBuilders+'/'+maxBuilders
		+' r: '+numbersOfRepairers+'/'+maxRepairers);*/
}
