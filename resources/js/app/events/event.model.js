(function(app){
	app.models = app.models || {};

	/**
	 * Event class
	 */
	var Event = function EventClass (event) {
		// Initializing through method for better maintenance
		this.init(event);
	};

	Event.STATE_DRAFT = 1;
	Event.STATE_PUBLISHED = 2;

	Event.prototype = {
		/**
		 * Initialize the event class
		 * 
		 * Sets the default saved state as draft
		 */
		init: function initF (event) {
			if (!event) {
				this.setSavedState(Event.STATE_DRAFT);
			} else {
				this.id = event.id || new Date().getTime();
				this.setTitle(event.title);
				this.setSavedState(event.savedState);
			}
		},

		/**
		 * Sets event saved state
		 * 
		 * @param {number} state Event saved state
		 * 
		 * @return {Event}
		 */
		setSavedState: function setSavedState (state) {
			this.state = state;
			return this;
		},

		/**
		 * Gets event saved state
		 * 
		 * @return {number} Event saved state
		 */
		getSavedState: function getSavedStateF () {
			return this.state;
		},

		/**
		 * Sets event title
		 * 
		 * @param {string} title Event Title
		 * 
		 * @return {Event}
		 */
		setTitle: function setTitleF (title) {
			this.title = title;

			return this;
		},

		/**
		 * Gets event title
		 * 
		 * @return {string} Event title
		 */
		getTitle: function getTitleF () {
			return this.title;
		},

		stringify: function stringifyF () {
			var eventObject = {
				id: this.id,
				title: this.getTitle(),
				savedState: this.getSavedState()
			};

			return JSON.stringify(eventObject);
		}
	};

	app.models.Event = Event;
})(app);