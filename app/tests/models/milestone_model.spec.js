'use strict';

var MilestoneModel = require('../../pages/home/entities/milestone_model');

describe('A milestone', function() {
	it('should exist', function() {
		expect(MilestoneModel).toBeDefined();
	});

	it('should have urlRoot and paramRoot', function() {
		var milestone = new MilestoneModel();

		expect(milestone.urlRoot).toEqual('http://hackdashboard.herokuapp.com/api/v1/milestones');
		expect(milestone.paramRoot).toEqual('milestone');
	});

	it('should have certains default', function() {
		var milestone = new MilestoneModel();

		expect(milestone.get('name')).toEqual('');
		expect(milestone.get('percent_complete')).toEqual('');
		expect(milestone.get('data_started')).toEqual('');
		expect(milestone.get('due_date')).toEqual('');
		expect(milestone.get('cost')).toEqual('');
		expect(milestone.get('id')).toEqual(null);
	});
});