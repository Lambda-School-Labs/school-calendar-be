const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");
module.exports = {
	get,
	getByCalendarEventsId,
	getByUuid,
	getById,
	getAllEvents,
	add,
	remove,
	update
};

function get(calendarId) {
	return db("calendarEvents as ce")
		.join("calendars as c", "c.id", "ce.calendarId")
		.join("events as e", "e.id", "ce.eventId")
		.where({ "c.id": calendarId });
	// .join("events", "eventsId", "events.id")
	// .select(
	// 	"events",
	// 	"eventTitle",
	// 	"eventNote",
	// 	"eventLocation",
	// 	"startDate",
	// 	"endDate",
	// 	"startTime",
	// 	"endTime",
	// 	"isAllDayEvent",
	// 	"isRepeatingEvent",
	// 	"eventColor",
	// 	"uuid"
	// );
}
function getAllEvents() {
	return db("users");
}

function getByCalendarEventsId(calendarEventsId) {
	return db("calendarEvents as ce")
		.where({ "ce.id": calendarEventsId })
		.join("events", "ce.eventsId", "events.id")
		.select(
			"events.id",
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		)
		.first();
}
function getById(id) {
	return db("events")
		.where({ id })
		.select(
			"id",
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		);
}
function getByUuid(uuid) {
	return db("events")
		.where({ uuid })
		.select(
			"id",
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		)
		.first();
}
function add(calendarId, event) {
	event.uuid = uuidv1();

	return db("events")
		.insert(event)
		.then(events => {
			return db("calendarEvents")
				.insert({ calendarid: calendarId, eventsId: events[0] })
				.then(calendarEvents => {
					return getByCalendarEventsId(calendarEvents[0]);
				});
		});
}

function remove(eventId) {
	return db("events")
		.where({ id: eventId })
		.del();
}

function update(eventId, changes) {
	return db("events")
		.where({ id: eventId })
		.update(changes);
}
