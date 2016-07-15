var app = {};

(function(app) {
	app.models = {};

	app.models.Event = function EventClass () {
		this.name = 'Evento';
	};
})(app);

var evento = new app.models.Event();
console.log(evento.name);