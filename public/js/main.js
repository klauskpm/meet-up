var app=angular.module("MeetUpApp",["ngMaterial"]);app.config(function($mdThemingProvider){$mdThemingProvider.theme("default").primaryPalette("teal").accentPalette("light-green")}),function(app){var injectParams=["$scope"],EventsController=function($scope){$scope.evento="Sera que está ok?"};EventsController.$inject=injectParams,app.controller("EventsController",EventsController)}(app);