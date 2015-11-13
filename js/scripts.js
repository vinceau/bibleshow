function getlines(first, last) {
    var sel = '';
    for (var i = first; i < last; i++) {
        sel += '.line' + i + ', ';
    }
    if (first <= last) {
        sel += '.line' + last;
    }
    return sel;
}

function hidelines(sel, first, last) {
    $(sel).find(getlines(first, last)).hide();
}

function showlines(sel, first, last) {
    $(sel).find(getlines(first, last)).show();
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

function inc_fontsize() {
    var s = parseFloat($('#content').css('font-size')) * 1.1;
    $('#content').css('font-size', s);
    reset();
    Cookies.set('fontsize', s);
}

function dec_fontsize() {
    var s = parseFloat($('#content').css('font-size')) * 0.9;
    $('#content').css('font-size', s);
    reset();
    Cookies.set('fontsize', s);
}

function inc_margin() {
    var m = parseFloat($('#content').css('margin-right')) * 1.1;
    $('#content').css('margin-left', m);
    $('#content').css('margin-right', m);
    reset();
    Cookies.set('margin', m);
}

function dec_margin() {
    var m = parseFloat($('#content').css('margin-right')) * 0.9;
    $('#content').css('margin-left', m);
    $('#content').css('margin-right', m);
    reset();
    Cookies.set('margin', m);
}

function inc_lineheight() {
    var l = parseFloat($('#content').css('line-height')) * 1.1;
    $('#content').css('line-height', l + 'px');
    reset();
    Cookies.set('lineheight', l);
}

function dec_lineheight() {
    var l = parseFloat($('#content').css('line-height')) * 0.9;
    $('#content').css('line-height', l + 'px');
    reset();
    Cookies.set('lineheight', l);
}

jQuery.fn.fits = function(){
    var bounds = this.offset(); //Coordinates of current element
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return ($(window).height() >= bounds.bottom && $(window).width() >= bounds.right);
}
