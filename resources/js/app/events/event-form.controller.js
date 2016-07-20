(function(app){
	var injectParams = ['$scope', '$mdDialog', 'currentEvent'];
	var EventFormController = function ($scope, $mdDialog, currentEvent) {
		$scope.currentEvent = currentEvent;
	};

	EventFormController.$inject = injectParams;
	app.controller('EventFormController', EventFormController);
})(app);