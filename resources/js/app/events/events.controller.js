(function(app){
	var injectParams = ['$scope', '$filter', '$mdDialog', '$mdMedia'];
	var EventsController = function ($scope, $filter, $mdDialog, $mdMedia) {
		app.models.Event.init();

		$scope.EventModel = app.models.Event;
		$scope.events = app.models.Event.events;
		$scope.currentEvent = null;

		/**
		 * Create a new event and sets it as the current
		 */
		$scope.createEvent = function createEventF () {
			$scope.currentEvent = app.models.Event.create();
		};

		/**
		 * Get an existing event
		 * 
		 * @param {number} index Index number to desired event
		 * 
		 * @return {Event|null}
		 */
		$scope.getEvent = function getEventF (index) {
			if (!$scope.events.length)
				return null;

			return app.models.Event.get(index);
		};

		/**
		 * Default save event method
		 * 
		 * @param {Event} event Event Class
		 * @param {number=} savedState Number for specific event saved state 
		 */
		function saveEvent (event, savedState) {
			if (!event)
				return;

			if (savedState)
				event.savedState = savedState;

			app.models.Event.saveEvent(event);
		}

		/**
		 * Save the event as draft
		 * 
		 * @param {Event} event Event object
		 */
		$scope.saveEventAsDraft = function saveEventAsDraftF (event) {
			saveEvent(event, app.models.Event.STATE_DRAFT);
		};

		/**
		 * Save the event as published
		 * 
		 * @param {Event} event Event object
		 */
		$scope.saveEventAsPublished = function saveEventAsPublishedF (event) {
			saveEvent(event, app.models.Event.STATE_PUBLISHED);
		};

		/**
		 * Alias function for saveEventAsPublished
		 */
		$scope.publishEvent = $scope.saveEventAsPublished;

		$scope.openForm = function($event, eventObject) {
			$scope.currentEvent = eventObject;

			$mdDialog.show({
				controller: 'EventFormController',
				templateUrl: 'public/template/events/event-form.template.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose: true,
				fullscreen: $mdMedia('sm') || $mdMedia('xs'),
				locals: {
					currentEvent: eventObject
				}
			});
		};
	};

	EventsController.$inject = injectParams;

	app.controller('EventsController', EventsController);
})(app);