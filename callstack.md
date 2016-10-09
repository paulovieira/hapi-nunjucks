reply.view
...
internals.Manager.prototype._response
internals.prepare

    [skip all this!]
internals.Manager.prototype._prepare (pass a callback)
internals.Manager.prototype._prepareTemplates (pass a callback)
internals.Manager.prototype._path (pass a callback)
internals.path
(callback given to Item.serial)
(callback given to Fs.stat)
(callback given to internals.Manager.prototype._path)
internals.Manager.prototype._compile (pass a callback)

    (callback given to Fs.readFile)
    engine.compileFunc (defined inside the constructor, as we are using syncronous templates; pass a next callback)
    (callback given to engine.compileFunc)

(callback given to internals.Manager.prototype._compile)
(callback given to internals.Manager.prototype._prepare)

    [get to here directly!]
internals.marshal
internals.Manager.prototype._render (pass a callback)  [should be simplified]
'renderer' function (defined inside 'engine.compileFunc')
(callback given to 'compiled.template') [should be simplified]
(callback given to internals.Manager.prototype._render)







-no need for the cache provided by vision, as nunjucks already has a internal cache
-no need for all the templates/partials machinery. Nunjucks can handle all of that complexity
-similar api: we should be able to override the options when calling reply.view

erros to handle
- next(Boom.badImplementation('View file not found: `' + template + '`. Locations searched: [' + paths.join(',') + ']'));



