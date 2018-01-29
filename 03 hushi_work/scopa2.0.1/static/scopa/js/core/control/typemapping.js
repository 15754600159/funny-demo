define(function(require, exports, module) {
	var typeMapping = {
		"person_petition": "person",
		"person_drug": "person",
		"person_offender": "person",
		"person_common": "person",
		"person_outlaw": "person",
		"person": "person",
		"car": "car",
		"vehicle_other": "car",
		"vehicle": "car"
	};

	module.exports = function(data) {
		return typeMapping[data] || '';
	}

});