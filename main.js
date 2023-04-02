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
    
    let search = `${Lokal.id}:`;

    Lokal.save = function(values) {
        for(let key in values) {
            let val = values[key];
            if(typeof val == "object") try {
                val = JSON.stringify(val);
            } catch {};
            
            localStorage.setItem(`${Lokal.id}:${key}`, val);
        }
    };

    Lokal.load = function(object) {
        object ??= window;

        for(let key in localStorage) {
            if(key.indexOf(search) == 0) {
                let val = localStorage.getItem(key);
                try {
                    val = JSON.parse(val);
                } catch {};
                
                object[key.substring(search.length)] = val;
            }
        }
    };

    Lokal.get = function() {
        let items = {};
        for(let key in localStorage) {
            if(key.indexOf(search) == 0) {
                let val = localStorage.getItem(key);
                try {
                    val = JSON.parse(val);
                } catch {};
                
                items[key.substring(search.length)] = val;
            }
        }
        return items;
    };

    Lokal.clear = function() {
        for(let key in localStorage) {
            if(key.indexOf(search) == 0) {
                localStorage.removeItem(key);
            }
        }
    };
    
    Object.freeze(Lokal);

    return Lokal;
})();
