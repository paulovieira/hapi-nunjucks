'use strict';


const Hapi = require('hapi');
var Nunjucks = require("nunjucks");

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

    server.views({
        //contentType: "text/",
        engine: require('handlebars'),
        renderer: function(path, context, renderNext) {
            debugger;
            let rendered = null;
            try {
                // compiled is the compiled function from the template engine
                rendered = Nunjucks.render(path, context);
            }
            catch (err) {
                return renderNext(err);
            }

            return renderNext(null, rendered);
        },

    });

    var nunjucksOptions = {
        throwOnUndefined: true
    };

    Nunjucks.configure(__dirname + '/templates', nunjucksOptions);


    server.route({
        method: 'GET',
        path: '/view',
        handler: function (request, reply) {

            debugger;
            var ctx = { message: 'hello' };
            var options = { contentType: 'text/plain' };
            //var options = {};

            reply.view('a.html', ctx, options);
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at: ' + server.info.uri);
    });

});