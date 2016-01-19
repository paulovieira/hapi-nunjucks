in async mode

1) we give a function compile(str, options, cb) (should part of the exported method from the template lib, or we have to create a wrapper module around the compile lib that exports this compile function)

2) hapi will call this compile function (engine.compileFunc = engine.module.compile;, line 536); it passes the callback:

function (err, compiled) {
            debugger;
            if (err) {
                return callback(Boom.wrap(err));
            }

            if (engine.cache) {
                engine.cache[template] = compiled;
            }

            return callback(null, compiled);
        }

3) the compile function must call the callback from 2) after "the processing is done" (which might involve some async call); but what is "compiled"? it is a compiled template, that is, a function(ctx, options) that we call to obtain the final html (with a given context)

However the compilation of the template is not asyncronous. What is asyncronous is only the execution of the compiled template.

So the compile function could be something like this:

exports.compile = function(templateString, compileOptions, callback){
    
    debugger;
    var compiled = null;
    try {
        compiled = Nunjucks.compile(str, opt);
    }
    catch (err) {
        return next(err);
    }




    // do async stuff (fetch from the db, etc)
    doAsyncStuff(templateString, compileOptions, function(err, callback2){


    })
}

do sync 