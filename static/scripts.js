//method for :offscreen method
jQuery.expr.filters.offscreen = function(el) {
    return (
            (el.offsetLeft + el.offsetWidth) < 0 
            || (el.offsetTop + el.offsetHeight) < 0
            || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
           );
};

function getlines(first, last) {
    var sel = '';
    for (var i = first; i < last; i++) {
        sel += '.line' + i + ', ';
    }
    if (first < last) {
        sel += '.line' + last;
    }
    return sel;
}

function hidelines(first, last) {
    $(getlines(first, last)).hide();
}

function showlines(first, last) {
    $(getlines(first, last)).show();
}

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
