var Path = require("path");
var Nunjucks = require("nunjucks");

var internals = {};
internals.env = {};
internals.env["default"] = Nunjucks.configure();

// all the exported properties from Nunjucks module are available in the wrapper
// Object.keys(Nunjucks).forEach(function(key){

//     module.exports[key] = Nunjucks[key];
// });

// redefine Nunjucks.compile to be compliant with the Hapi/Vision API
// module.exports.compileOriginal = Nunjucks.compile;
// module.exports.configureOriginal = Nunjucks.configure;
// module.exports.renderOriginal = Nunjucks.render;

module.exports.configure = function(templatesPath, opts) {
    debugger;
    var pluginName = opts.pluginName || "default";
    delete opts.pluginName;
    internals.env[pluginName] = Nunjucks.configure(templatesPath, opts);
    console.log("templatesPath", templatesPath);
    return internals.env[pluginName];
};

module.exports.compile = function(str, compileOptions, next){
debugger;
console.log("compileOptions\n: ", compileOptions);
//console.log("internals.env: ", Object.keys(internals.env))
    var pluginName = compileOptions.pluginName || "default";
    var compileMode = "sync";
    if(next){
        compileMode = "async";
    }

    var compiled = null;

    if(compileMode === "sync"){

        // compileMode is "sync" (the default); The Vision docs say:
        //   "the return value is a function [the compiled template] with signature 
        //   function(context, options), and the method is allowed to throw errors"

        compiled = function(ctx, runtimeOptions){
            
            console.log("inside the compiled, ", pluginName);
            //return Nunjucks.render(Path.basename(compileOptions.filename), ctx);
            //return internals.env.render(Path.basename(compileOptions.filename), ctx);
            //return internals.env.render(compileOptions.filename, ctx);
            return internals.env[pluginName].render(compileOptions.filename, ctx);
        };

        return compiled;           
    }
    else{
        // compileMode is "async"; The Vision docs say:
        //   "next has the signature function(err, compiled), where
        //     - compiled should be a function with signature function(context, options, callback)
        //     - callback has the signature function(err, rendered) "

        compiled = function(ctx, runtimeOptions, callback){

            //Nunjucks.render(Path.basename(compileOptions.filename), ctx, callback);
            //internals.env.render(Path.basename(compileOptions.filename), ctx, callback);
            //internals.env.render(compileOptions.filename, ctx, callback);
            internals.env[pluginName].render(compileOptions.filename, ctx, callback);
            
            return;
        };

        next(null, compiled);
        return;        
    }

};

module.exports.render = function(name, ctx, cb) {
    return internals.env["default"].render(name, ctx, cb);
};

module.exports.renderString = function(src, ctx, cb) {
    return internals.env["default"].renderString(src, ctx, cb);
};

module.exports.precompile = Nunjucks.precompile.precompile;
module.exports.precompileString = Nunjucks.precompile.precompileString;

/*
module.exports.getCompile = function(env){

    return function(str, compileOptions, next){
console.log("compileOptions\n: ", compileOptions);
console.log("internals.env: ", Object.keys(internals.env))
        var compileMode = "sync";
        if(next){
            compileMode = "async";
        }

        var compiled = null;

        if(compileMode === "sync"){

            compiled = function(ctx, runtimeOptions){
                //return env.render(Path.basename(compileOptions.filename), ctx);
                return env.render(compileOptions.filename, ctx);
            };

            return compiled;           
        }
        else{

            compiled = function(ctx, runtimeOptions, callback){
                //env.render(Path.basename(compileOptions.filename), ctx, callback);
                env.render(compileOptions.filename, ctx, callback);
                return;
            };

            next(null, compiled);
            return;        
        }
    };
    
}
*/
