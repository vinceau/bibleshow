// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function get_passage(passage, scb, fcb) {
    //var bible_url = 'https://labs.bible.org/api/?callback=?&type=json&passage=';
    //var bible_url = 'https://api.biblia.com/v1/bible/content/LEB.json?key=fd37d8f28e95d3be8cb4fbc37e15e18e&style=simpleParagraphs&passage=';
    var bible_url = 'https://niv84api.appspot.com/api/?passage=';
    $.getJSON(bible_url + encodeURIComponent(passage), function(d) {
        scb(d);
    }).fail(function() {
        fcb();
    });
}

jQuery.fn.fits = function(){
    var bounds = this.offset(); //Coordinates of current element
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return ($(window).height() >= bounds.bottom && $(window).width() >= bounds.right);
}
