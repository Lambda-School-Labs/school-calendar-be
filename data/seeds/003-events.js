exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("events")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("events").insert([
				{ 
					eventName: "event 1", 
					eventInfo: "first event",
					startDate: '2019-11-11'
				},
				{ 
					eventName: "event 2", 
					eventInfo: "second event",
					startDate: '2019-11-12'

				},
				{ 
					eventName: "event 3", 
					eventInfo: "third event",
					startDate: '2019-11-12'

				}
			]);
		});
};
