var Lokal = (() => {
    let ka = location.host == "www.kasandbox.org";
    if(!ka) throw "Lokal.js cannot be used outside Khan Academy";
    
    let vIndex = location.href.indexOf("&v=") + 3;
    let hostIndex = location.href.indexOf("&host=");
    
    let Lokal = {};
    
    Lokal.author = "99TheDark";
    Lokal.github = "https://github.com/99TheDark/Lokal.js";
    
    Lokal.id = `lokal.js-storage-${location.href.substring(vIndex, hostIndex)}`;
    Lokal.first = !Object.keys(localStorage).includes(Lokal.id);
    let search = `${Lokal.id}-`;
    
    Lokal.save = function(values) {
        for(let val in values) {
            localStorage.setItem(`${Lokal.id}-${val}`, values[val]);
        }
    };
    
    Lokal.load = function(object) {
        object ??= window;
        
        let searchLen = search.length;
        for(let key in localStorage) {
            if(key.indexOf(search) == 0) {
                object[key.substring(searchLen)] = localStorage.getItem(key);
            }
        }
    };
    
    Lokal.get = function() {
        let items = {};
        let searchLen = search.length;
        for(let key in localStorage) {
            if(key.indexOf(search) == 0) {
                items[key.substring(searchLen)] = localStorage.getItem(key);
            }
        }
        return items;
    };
    
    Lokal.clear = function() {
        for(let key in localStorage) {
            if(key.indexOf(`${Lokal.id}-`) == 0) {
                localStorage.removeItem(key);
            }
        }
    };
    
    return Lokal;
})();
