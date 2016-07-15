var app = angular.module('MeetUpApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('light-green');
});