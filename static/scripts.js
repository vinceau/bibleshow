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

