var Nunjucks = require("nunjucks");

Nunjucks.configure("server/views");

module.exports = {
    module: {

        compile: function(template, options) {

            return function(context,options) {
                return Nunjucks.renderString(template, context);
            }

        }
    }
}