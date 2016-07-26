(function(app){
	var injectParams = ['$scope', '$filter', '$mdDialog', '$mdMedia'];
	var EventsController = function ($scope, $filter, $mdDialog, $mdMedia) {
		$scope.evento = 'Sera que está ok?';

		var separattor = '||';

		$scope.events = [];
		$scope.currentEvent = null;
		$scope.EventModel = app.models.Event;

		/**
		 * Create a new event and sets it as the current
		 */
		$scope.createEvent = function createEventF () {
			$scope.currentEvent = new app.models.Event();
		};

		/**
		 * List all events saved
		 * 
		 * @return {Event[]}
		 */
		$scope.listEvents = function listEventsF () {
			if (!$scope.events.length) {
				var tempEvents = localStorage.getItem('events');

				if (tempEvents) {
					tempEvents = tempEvents.split(separattor);
					tempEvents = tempEvents.map(function (event) {
						return new app.models.Event(JSON.parse(event));
					});

					$scope.events = tempEvents;
				}
			}

			return $scope.events;
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

			return new app.models.Event($scope.events[index]);
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
				event.setSavedState(savedState);

			if (!event.id || !$filter('filter')($scope.events, {id: event.id}).length) {
				$scope.events.push(event);
			}

			var tempEvents = [];
			$scope.events.forEach(function(event) {
				tempEvents.push(event.stringify());
			}, this);

			localStorage.setItem('events', tempEvents.join(separattor));
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

			console.log(angular.element(document.getElementsByClassName('view-content')[0]));

			$mdDialog.show({
				controller: 'EventFormController',
				templateUrl: 'public/template/events/event-form.template.html',
				parent: angular.element(document.getElementsByClassName('view-content')[0]),
				targetEvent: $event,
				clickOutsideToClose: true,
				fullscreen: $mdMedia('sm') || $mdMedia('xs'),
				locals: {
					currentEvent: eventObject
				}
			});
		};

		$scope.listEvents();
	};

	EventsController.$inject = injectParams;

	app.controller('EventsController', EventsController);
})(app);