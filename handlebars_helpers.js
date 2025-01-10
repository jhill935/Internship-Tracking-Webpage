/**
 * @param {Handlebars} hbs 
 */
function main(hbs){

    // simple comparison
    hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    });

    // make date time pretty
    hbs.registerHelper('formatDate', function(date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    });
}

module.exports = main