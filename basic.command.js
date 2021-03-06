var basicCommand = {

	/** @param {Creep} creep **/
	harvestSource: function(creep) {
		var source = creep.pos.findClosestByRange(FIND_SOURCES);
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
		}
	},

	/** @param {Creep} creep **/
	goToRest: function(creep) {
		creep.moveTo(Game.flags['Rest'], {visualizePathStyle: {stroke: '#0000ff'}});
	}
};

module.exports = basicCommand;
