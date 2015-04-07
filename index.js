var Path = require('path');
var Nunjucks = require("nunjucks");

// get a default environment; the default seach path is the same directory where the
// main script was executed;
// the configure method should be set manually in the application code, passing the searchPath; 
var internals = {
	environment: Nunjucks.configure({ 
		watch: false
	})
}


module.exports = {

	compile: function(template, compileOptions){

//		template += ("date of compilation: " + new Date());

		var env = internals.environment,
			path = internals.environment.loaders[0].searchPaths;
	
		var compiledTemplate = Nunjucks.compile(template, env, path);

		return function(context, runtimeOptions){
			
			var html = compiledTemplate.render(context);
			return html;
		}

	},

	configure: function(path, opts){
		internals.environment = Nunjucks.configure(path, opts);
	},

	addFilter: function(name, filter){
		internals.environment.addFilter(name, filter);
	},

	addGlobal: function(name, value){
		internals.environment.addGlobal(name, value);
	}

}
