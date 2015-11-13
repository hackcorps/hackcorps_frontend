MilestoneModel = Backbone.Model.extend({});

MilestonesCollection = Backbone.Collection.extend({
  model: MilestoneModel
});

/*milestonesCollection = MilestonesCollection([
  { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
  { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
  { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
]);*/