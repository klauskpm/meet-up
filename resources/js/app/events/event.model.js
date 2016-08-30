(function(app){
	app.models = app.models || {};

	// var LOG_TAG = 'Event.Model';

	/**
	 * Event model
	 */
	var Event = {
		STATE_DRAFT: 1,
		STATE_PUBLISHED: 2,

		storageName: 'events',

		init: function () {
			this.listEventsFromStorage();
		},

		/**
		 * Create a new event
		 * 
		 * Sets the default saved state as draft
		 */
		create: function createF (event) {
			var newEvent = {};
			newEvent.id = event.id || new Date().getTime();

			if (event.title)
				newEvent.title = event.title;

			if (event)
				newEvent.savedState = event.savedState || Event.STATE_DRAFT;

			if (Object.keys(newEvent).length > 1) {
				this.events.push(newEvent);
				this.updateStorage();
			}

			return newEvent;
		},

		/**
		 * Events list
		 */
		events: [],

		get: function getF (index) {
			return this.events[index];
		},

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

		updateStorage: function updateStorageF () {
			localStorage.setItem(this.storageName, this.stringify());
		},

		/**
		 * Save event
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
					savedState: event.savedState
				});
			});

			return JSON.stringify(tempEvents);
		}
	};

	app.models.Event = Event;
})(app);