(function(app){
	var injectParams = ['$scope'];
	var EventsController = function ($scope) {
		$scope.evento = 'Sera que está ok?';
	};

	EventsController.$inject = injectParams;

	app.controller('EventsController', EventsController);
})(app);