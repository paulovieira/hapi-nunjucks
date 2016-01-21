var Path = require("path");
var Nunjucks = require("nunjucks");

var internals = {};
internals.env = Nunjucks.configure();

// all the exported properties from Nunjucks module are available in the wrapper
// Object.keys(Nunjucks).forEach(function(key){

//     module.exports[key] = Nunjucks[key];
// });

// redefine Nunjucks.compile to be compliant with the Hapi/Vision API
// module.exports.compileOriginal = Nunjucks.compile;
// module.exports.configureOriginal = Nunjucks.configure;
// module.exports.renderOriginal = Nunjucks.render;

module.exports.configure = function(templatesPath, opts) {
    internals.env = Nunjucks.configure(templatesPath, opts);
    return internals.env;
};

module.exports.compile = function(str, compileOptions, next){

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

            //return Nunjucks.render(Path.basename(compileOptions.filename), ctx);
            return internals.env.render(Path.basename(compileOptions.filename), ctx);
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
            internals.env.render(Path.basename(compileOptions.filename), ctx, callback);
            
            return;
        };

        next(null, compiled);
        return;        
    }

};

module.exports.render = function(name, ctx, cb) {
    return internals.env.render(name, ctx, cb);
};

module.exports.renderString = function(src, ctx, cb) {
    return internals.env.renderString(src, ctx, cb);
};

module.exports.precompile = Nunjucks.precompile.precompile;
module.exports.precompileString = Nunjucks.precompile.precompileString;


module.exports.getCompile = function(env){

    return function(str, compileOptions, next){

        var compileMode = "sync";
        if(next){
            compileMode = "async";
        }

        var compiled = null;

        if(compileMode === "sync"){

            compiled = function(ctx, runtimeOptions){
                return env.render(Path.basename(compileOptions.filename), ctx);
            };

            return compiled;           
        }
        else{

            compiled = function(ctx, runtimeOptions, callback){
                env.render(Path.basename(compileOptions.filename), ctx, callback);
                return;
            };

            next(null, compiled);
            return;        
        }
    };
    
}
