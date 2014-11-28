var Path = require('path');
var Hapi = require('hapi');

var Nunjucks = require("nunjucks");
//var config = require("./w/config.js");
var HapiNunjucks = require("./hapi-nunjucks.js");
//var HapiNunjucks2 = require("hapi-nunjucks-2");
var Handlebars = require('handlebars');
var Jade = require('jade');


var server = new Hapi.Server(3000);


server.views({
    engines: {
        'html': HapiNunjucks
    },
    path: Path.join(__dirname, 'templates'),
    compileOptions: {},
    runtimeOptions: {},
    context: {
    	global2: "qwerty"
    }  // global context
});


HapiNunjucks.configure(Path.join('/home/pvieira/jsLab/nunjucks/templates/zzz/'), {
	watch: true,  // reload the template if the template changes; more effective then restarting the server everytime the template changes
	autoescape: true 
	// tags: ...  // advanced option
});



HapiNunjucks.addGlobal("global1", {
	a: "aaa", 
	b: "bbb"
});

HapiNunjucks.addFilter("shorten", function(str, count) {
	return str.slice(0, count || 5);
});

HapiNunjucks.addFilter("now", function(str) {
	return (new Date()).toString();
});

/*
*/


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('page-1', { 
        	username: 'Paulo!',
        	title: 'Title of the website',
        	entity: "123456789",
        	now: Date.now
        });
    }
});



server.start(function () {
    console.log('Server running at:', server.info.uri);
});



