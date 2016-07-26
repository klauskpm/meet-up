(function(app){
	var injectParams = ['$scope', '$mdDialog', 'currentEvent'];
	var EventFormController = function ($scope, $mdDialog, currentEvent) {
		$scope.currentEvent = currentEvent;

		var autocomplete;

		if (!$scope.currentEvent.guestList || !$scope.currentEvent.guestList.length)
			$scope.currentEvent.guestList = [];

		$scope.geolocate = function () {
			autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('location')),
				{types: ['geocode']}
			);

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					autocomplete.setBounds(circle.getBounds());
				});
			}
		};
	};

	EventFormController.$inject = injectParams;
	app.controller('EventFormController', EventFormController);
})(app);