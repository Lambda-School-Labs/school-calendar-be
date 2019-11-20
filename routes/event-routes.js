const router = require("express").Router();

// const authenticateUser = require("../auth/authenticate-middleware");
// const verifyUser = require("../auth/verify-user-middleware");
// const verifyCalendar = require("../middleware/verify-calendar-uuid-middleware");
// const verifyEvent = require("../middleware/verify-event-uuid-middleware");

const Events = require("./event-model");

router.get(
	"/:cal_uuid/events/",
	// [authenticateUser, verifyUser, verifyCalendar],
	(req, res) => {
		var calendarId = req.params.id;
		Events.getById(calendarId)
			.then(event => {
				res.status(200).json({ event });
			})
			.catch(err =>
				console.log("can not get calendar /:cal_uuid/events/ ", err)
			);
	}
);

router.get("/events", (req, res) => {
	console.log("res");
	Events.getAllEvents()
		.then(event => {
			res.status(200).json({ event });
		})
		.catch(err => console.log("it will give me an eror", err));
});

router.get("/:cal_id/events/:id", async (req, res) => {
	try {
		const { cal_id, id } = req.params;
		const response = await Events.getById(cal_id, id);

		res.status(200).json(response);
	} catch (err) {
		console.log("event GET BY ID error", err);
		res.status(400).json({
			message: "error fetching event",
			error: `${err}`
		});
	}
});

router.post(
	"/:cal_uuid/events/",
	// [authenticateUser, verifyUser, verifyCalendar],
	async (req, res) => {
		try {
			const eventId = await Events.add(req.body);
			const calendarEvent = await Events.addCalendarEvents(
				req.calendarId,
				eventId
			);

			res.status(200).json(calendarEvent);
		} catch (err) {
			console.log("event POST error", err);
			res.status(400).json({
				message: "error adding event",
				error: `${err}`
			});
		}
	}
);

router.delete(
	"/events/:event_uuid",
	[authenticateUser, verifyUser, verifyEvent],
	async (req, res) => {
		try {
			const response = await Events.remove(req.eventId);

			res.status(200).json(response);
		} catch (err) {
			console.log("event DELETE error", err);
			res.status(400).json({
				message: "error deleting event",
				error: `${err}`
			});
		}
	}
);

router.put(
	"/events/:id",
	// [authenticateUser, verifyUser, verifyEvent],
	(req, res) => {
		const updated = req.body;
		const { id } = req.params;
		Events.update(id, updated)
			.then(response => {
				if (response > 0) {
					console.log("it gets here", response);
					Events.getById(id).then(result => {
						res.status(200).json({ result });
					});
				} else {
					res.status(404).json({ message: "cannot updated" });
				}
			})
			.catch(err => {
				console.log("server err", err);
			});
	}
);

module.exports = router;
