(function(app){
	app.models = app.models || {};

	// var LOG_TAG = 'Event.Model';

	/**
	 * Event model
	 */
	var Event = {
		// Save states
		STATE_DRAFT: 1,
		STATE_PUBLISHED: 2,

		/**
		 * Event Model fields
		 */
		fields: [
			'id',
			'title',
			'location',
			'startDate',
			'startTime',
			'endDate',
			'endTime',
			'invited',
			'type',
			'host',
			'description',
			'savedState'
		],
		
		/**
		 * localStorage item name
		 */
		storageName: 'events',

		/**
		 * Initilizes the Event Model
		 * 
		 * * List all events from localStorage
		 */
		init: function () {
			this.listEventsFromStorage();
		},

		/**
		 * Create a new event
		 * 
		 * Sets the default saved state as draft
		 */
		create: function createF (event) {
			var tempEvent = {};

			if (!event) {
				tempEvent.id = new Date().getTime();
			} else if (event) {
				this.fields.forEach(function(field) {
					if (event[field])
						tempEvent[field] = event[field];
				});

				tempEvent.savedState = event.savedState || Event.STATE_DRAFT;
			}
			
			if (Object.keys(tempEvent).length > 1) {
				this.events.push(tempEvent);
				this.updateStorage();
			}

			return tempEvent;
		},

		/**
		 * Events list
		 */
		events: [],

		/**
		 * Get the event by it's index
		 */
		get: function getF (index) {
			return this.events[index];
		},

		/**
		 * List all events stored in localStorage
		 */
		listEventsFromStorage: function listEventsFromStorageF () {
			var self = this;
			var tempEvents = localStorage.getItem(self.storageName);

			if (tempEvents) {
				tempEvents = JSON.parse(tempEvents).map(function (event) {
					return self.create(event);
				});
				return self.events = tempEvents;
			}
				

			return self.events = [];
		},

		/**
		 * Update the localStorage
		 * 
		 * It stringifies the events data and replace the previous data
		 * set in localStorage
		 */
		updateStorage: function updateStorageF () {
			localStorage.setItem(this.storageName, this.stringify());
		},

		/**
		 * Save the event
		 * 
		 * Checks if there is another event with the same ID to update it.
		 * If this is a new one, it's added to the events list
		 */
		saveEvent: function saveEventF (event) {
			var tempEvent;

			this.events.forEach(function(oldEvent, index) {
				if (event.id == oldEvent.id)
					this.events[index] = tempEvent = event;
			});

			if (!tempEvent)
				this.events.push(event);

			this.updateStorage();
		},

		/**
		 * Turn the object into a string
		 */
		stringify: function stringifyF () {
			var tempEvents = [];
			this.events.forEach(function(event) {
				tempEvents.push({
					id: event.id,
					title: event.title,
					location: event.location,
					startDate: event.startDate,
					startTime: event.startTime,
					endDate: event.endDate,
					endTime: event.endTime,
					invited: event.invited,
					type: event.type,
					host: event.host,
					description: event.description,
					savedState: event.savedState
				});
			});

			return JSON.stringify(tempEvents);
		}
	};

	app.models.Event = Event;
})(app);