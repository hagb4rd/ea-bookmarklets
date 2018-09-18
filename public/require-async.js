var requireAsync = (function() {

    var map = {
        
        webkit: 'https://unpkg.com/ea-webkit@latest/dist/webkit.min.js',
        github: 'https://unpkg.com/github-api/dist/GitHub.bundle.min.js',
        runkit: { url:'https://embed.runkit.com', shim: 'RunKit' },
        moment: 'https://momentjs.com/downloads/moment.min.js',
        ace: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js',
        hyperhtml: 'https://unpkg.com/hyperhtml',
        requirejs: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js',
        highlight: {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
            shim: (exports, module) => {
                module.exports = window.highlight;
                module.exports.stylesheet='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai.min.css';
                var link=document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', module.exports.stylesheet);
                if(document && document.head) {
                    document.head.appendChild(link);
                }
            }
        }
    }
    var unpkg=(moduleName,path)=>{
        var mapping = `https://unpkg.com/${moduleName}`;
        return mapping;
    }

    var path=new Map(Object.entries(map));
    var modules=new Map();
    var fetchMap=new Map();
    
    var fetchCode=async(moduleName)=> {
        var url, shim;
        if(path.has(moduleName)) {
            var mapped=path.get(moduleName);
            if(typeof(mapped)=="object") {
                url = mapped.url;
                
            } else {
                url=mapped;
            } 
        } else {
            if(['http','.','//'].some(s=>path.startsWith(s))) {
                url=moduleName;   
            } else {
                url=unpkg(moduleName);
            }
        }
        if(!fetchMap.has(moduleName)) {
            var promisedModuleCode = fetch(url).then(resp=>resp.text());
            fetchMap.set(moduleName, promisedModuleCode);
        }
        var code = await fetchMap.get(moduleName);
        return `(async function(require, exports, module, window, document, console) {
            ${code}
          })`;
    }
    
    var requireAsync = async(moduleName,shim) => {
    
        if(!modules.has(moduleName)) {
            var module={ exports:{}, shim: null, url: {} };
            var code  = await fetchCode(moduleName);
            var iife=eval(code);
            var window=window || {document:{}};
            iife(requireAsync,module.exports,module,window,window.document,console);
            
            module.shim = shim || (path.get(moduleName) && path.get(moduleName).shim);
            
            if(module.shim) {
                
                if(typeof(module.shim)=='function') {
                    var window=window || {};
                    module.shim(module.exports,module);
                } else if(typeof(module.shim)=='string') {
                    module.exports=window[module.shim];
                }
            }
            modules.set(moduleName, module);
        } 
        return modules.get(moduleName).exports;
    };
    requireAsync.unpkg = unpkg;
    requireAsync.path = path;
    requireAsync.modules = modules;
    requireAsync.fetchMap = fetchMap;
    requireAsync.fetchCode = fetchCode;
    return requireAsync;
})();

/*
Exception: SyntaxError: await is only valid in async functions and async generators
@Scratchpad/1:47
*/