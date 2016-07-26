var app=angular.module("MeetUpApp",["ngMaterial"]);app.config(function($mdThemingProvider){$mdThemingProvider.theme("default").primaryPalette("teal").accentPalette("light-green").backgroundPalette("grey")}),function(app){var injectParams=["$scope","$mdDialog","currentEvent"],EventFormController=function($scope,$mdDialog,currentEvent){$scope.currentEvent=currentEvent;var autocomplete;$scope.currentEvent.guestList&&$scope.currentEvent.guestList.length||($scope.currentEvent.guestList=[]),$scope.geolocate=function(){autocomplete=new google.maps.places.Autocomplete(document.getElementById("location"),{types:["geocode"]}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(position){var geolocation={lat:position.coords.latitude,lng:position.coords.longitude},circle=new google.maps.Circle({center:geolocation,radius:position.coords.accuracy});autocomplete.setBounds(circle.getBounds())})}};EventFormController.$inject=injectParams,app.controller("EventFormController",EventFormController)}(app),function(app){app.models=app.models||{};var Event=function(event){this.init(event)};Event.STATE_DRAFT=1,Event.STATE_PUBLISHED=2,Event.prototype={init:function(event){event?(this.id=event.id||(new Date).getTime(),this.setTitle(event.title),this.setSavedState(event.savedState)):this.setSavedState(Event.STATE_DRAFT)},setSavedState:function(state){return this.state=state,this},getSavedState:function(){return this.state},setTitle:function(title){return this.title=title,this},getTitle:function(){return this.title},stringify:function(){var eventObject={id:this.id,title:this.getTitle(),savedState:this.getSavedState()};return JSON.stringify(eventObject)}},app.models.Event=Event}(app),function(app){var injectParams=["$scope","$filter","$mdDialog","$mdMedia"],EventsController=function($scope,$filter,$mdDialog,$mdMedia){function saveEvent(event,savedState){if(event){savedState&&event.setSavedState(savedState),event.id&&$filter("filter")($scope.events,{id:event.id}).length||$scope.events.push(event);var tempEvents=[];$scope.events.forEach(function(event){tempEvents.push(event.stringify())},this),localStorage.setItem("events",tempEvents.join(separattor))}}$scope.evento="Sera que está ok?";var separattor="||";$scope.events=[],$scope.currentEvent=null,$scope.EventModel=app.models.Event,$scope.createEvent=function(){$scope.currentEvent=new app.models.Event},$scope.listEvents=function(){if(!$scope.events.length){var tempEvents=localStorage.getItem("events");tempEvents&&(tempEvents=tempEvents.split(separattor),tempEvents=tempEvents.map(function(event){return new app.models.Event(JSON.parse(event))}),$scope.events=tempEvents)}return $scope.events},$scope.getEvent=function(index){return $scope.events.length?new app.models.Event($scope.events[index]):null},$scope.saveEventAsDraft=function(event){saveEvent(event,app.models.Event.STATE_DRAFT)},$scope.saveEventAsPublished=function(event){saveEvent(event,app.models.Event.STATE_PUBLISHED)},$scope.publishEvent=$scope.saveEventAsPublished,$scope.openForm=function($event,eventObject){$scope.currentEvent=eventObject,$mdDialog.show({controller:"EventFormController",templateUrl:"public/template/events/event-form.template.html",parent:angular.element(document.body),targetEvent:$event,clickOutsideToClose:!0,fullscreen:$mdMedia("sm")||$mdMedia("xs"),locals:{currentEvent:eventObject}})},$scope.listEvents()};EventsController.$inject=injectParams,app.controller("EventsController",EventsController)}(app);