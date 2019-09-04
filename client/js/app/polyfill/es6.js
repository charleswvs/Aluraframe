'use strict';

<<<<<<< HEAD
if (!Array.prototype.includes) {
    console.log('Polyfill para Array.includes aplicado.');
    Array.prototype.includes = function (elemento) {
        return this.indexOf(elemento) != -1;
    };
}
=======
System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            if (!Array.prototype.includes) {
                console.log('Polyfill para Array.includes aplicado.');
                Array.prototype.includes = function (elemento) {
                    return this.indexOf(elemento) != -1;
                };
            }
        }
    };
});
>>>>>>> ed5569818220276a8b8743340bcdc735af4f9fb8
//# sourceMappingURL=es6.js.map