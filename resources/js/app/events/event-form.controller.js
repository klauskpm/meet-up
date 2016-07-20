(function(app){
	var injectParams = ['$scope', '$mdDialog', 'currentEvent'];
	var EventFormController = function ($scope, $mdDialog, currentEvent) {
		$scope.currentEvent = currentEvent;

		if (!$scope.currentEvent.guestList || !$scope.currentEvent.guestList.length)
			$scope.currentEvent.guestList = [];
	};

	EventFormController.$inject = injectParams;
	app.controller('EventFormController', EventFormController);
})(app);