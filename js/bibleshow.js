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

function set_font(font) {
    if (!$('#content-wrapper').hasClass(font)) {
        $('#content-wrapper').removeClass('serif sans-serif').addClass(font);
        reset();
    }
    Cookies.set('font', font);
}

//declare globals
var st, max_lines, start, end;
var total_lines = [];

var blocks = []; //list of passages e.g. 'Gen 1', 'Gen 2'
var curr_block; //index of current passage

var last_start, last_end;

function set_prev(enabled) {
    if (!enabled) {
        $('#prev').addClass('inactive');
    } else {
        $('#prev').removeClass('inactive');
    }
}

function set_next(enabled) {
    if (!enabled) {
        $('#next').addClass('inactive');
    } else {
        $('#next').removeClass('inactive');
    }
}

function check() {
    set_prev(start > 1 || curr_block > 0 );
    set_next(end < total_lines[curr_block] || curr_block < blocks.length - 1);
    var f = $('#full .glyphicon');
    if (currentlyFullscreen()) {
        f.removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');
    } else {
        f.removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');
    }
}

function next() {
    if (end < total_lines[curr_block]) {
        hidelines('#block' + curr_block, start, end);
        start += max_lines;
        end += max_lines;
        showlines('#block' + curr_block, start, end);
        check();
    }
    else if (curr_block < blocks.length - 1) {
        set_block(curr_block + 1);
        go_to_start();
    }
}

function prev() {
    if (start > 1) {
        hidelines('#block' + curr_block, start, end);
        start -= max_lines;
        end -= max_lines;
        showlines('#block' + curr_block, start, end);
        check();
    }
    else if (curr_block > 0) {
        set_block(curr_block - 1);
        go_to_end();
    }
}

function go_to_start() {
    /* Goes to the first slide of the current block */
    $('#block' + curr_block + ' div').show();
    start = 1;
    end = total_lines[curr_block];
    for (var i = 1; i <= end; i++) {
        var el = $('#block' + curr_block + ' .line' + i);
        if (el.fits()) {
            continue;
        }
        //i is the first element that's hidden completely
        //so subtract one to specify the last shown line
        end = i - 1;
        break;
    }
    hidelines('#block' + curr_block, end + 1, total_lines[curr_block]);
    max_lines = end;
}


function go_to_end() {
    /* Goes to the last slide of the current block */
    if (total_lines[curr_block] % max_lines == 0) {
        start = total_lines - max_lines + 1;
    } else {
        start = Math.floor(total_lines[curr_block] / max_lines) * max_lines + 1;
    }
    end = start + max_lines - 1;
    hidelines('#block' + curr_block, 1, start - 1);
    showlines('#block' + curr_block, start, end);
    check();
}

function reset(hard) {
    $('.passage').show();
    if (hard) {
        console.log('hard reset');
        //create a new SplitText object with current text
        st = new SplitText("#text_body div.passage", {
            type: "lines",
            linesClass: "line line++",
        });
    } else {
        console.log('soft reset');
        //resplit the current text without creating new SplitText object
        st.split();
    }
    var lines = st.lines;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].nextSibling) {
            //only create justify-fix if it's not the last verse in a block
            var span = document.createElement('span');
            span.className = 'justify-fix';
            lines[i].appendChild(span);
        }
    }
    for (var i = 0; i < blocks.length; i++) {
        total_lines[i] = $('#block' + i + ' div').length;
    }
    set_block(curr_block);
    go_to_start();
    check();
    fix_align();
}

function set_block(index) {
    $('.passage').hide();
    curr_block = index;
    $('#header').html(blocks[index]);
    $('#block' + index).show();
}

function load_passage(passage) {
    blocks = [];
    var success = function(d) {
        console.log("data: ", d);
        console.log("Successfully data recived");
        var text = '';
        for (var i = 0; i < d.passages.length; i++ ) {
            data = d.passages[i];
            blocks.push(data.title);
            text += '<div id="block'+ i +'" class="passage">';
            $.each(data.verses, function(k, v) {
                text += k + ' ' + v + ' ';
            });
            text += '</div>';
        }
        curr_block = 0;
        $('#header').html(blocks[0]);
        $('#text_body').html(text);
        reset(true);
        set_block(0);
        Cookies.set('passage', passage);
    };
    var fail = function() {
        $('#header').html('Error');
        $('#text_body').html('Couldn\'t find passage: ' + passage);
    };
    get_passage(passage, success, fail);
}

window.Bindings = Keys.Bindings;
window.Combo    = Keys.Combo;
window.Key      = Keys.Key;

// Initialize application-wide bindings manager
window.bindings = new Bindings();

bindings.load({
    nextPage: {
        bind: [
            new Combo(Key.Spacebar),
            new Combo(Key.Right),
            new Combo(Key.Down)
            ],
        handler: next
    },
    prevPage: {
        bind: [
            new Combo(Key.Backspace),
            new Combo(Key.Left),
            new Combo(Key.Up)
            ],
        handler: prev
    }
});

$(window).on('resize', debounce(function() {
    reset();
}, 200));

$('#search_form').submit(function(e) {
    e.preventDefault();
    load_passage($('#search').val());
    $('#search').blur();
});

$("#next").click(function() {
    next();
});
$("#prev").click(function() {
    prev();
});

$('#full').click(function() {
    toggleFullscreen();
    reset();
});

$('#lh-dec-btn').click(function() {
    dec_lineheight();
});

$('#lh-inc-btn').click(function() {
    inc_lineheight();
});

$('#mg-dec-btn').click(function() {
    dec_margin();
});

$('#mg-inc-btn').click(function() {
    inc_margin();
});

$('#ft-dec-btn').click(function() {
    dec_fontsize();
});

$('#ft-inc-btn').click(function() {
    inc_fontsize();
});

$('.align-btn').click(function() {
    var align = $(this).data('keyword');
    $('.line').css('text-align', align);
    Cookies.set('align', align);
});

$('#font-select').change(function() {
    set_font($(this).val());
});

function invert_colours() {
    $('body').toggleClass('black-on-white');
    var colour = $('body').hasClass('black-on-white') ? 'black-on-white' : 'white-on-black';
    Cookies.set('colour', colour);
}

$('#invert-btn').click(function() {
    invert_colours();
    $(this).find('span').toggleClass('white-on-black');
});

$('#reset-btn').click(function() {
    reset_settings();
});

function restore_settings() {
    var font = Cookies.get('font');
    if (font) {
        $('#content-wrapper').removeClass('serif sans-serif').addClass(font);
        $('#font-select').val(font);
    }
    var passage = Cookies.get('passage');
    if (!passage) {
        passage = 'Gen 1';
    }
    load_passage(passage);
    $('#search').val(passage);
    var css = {};
    var margin = parseFloat(Cookies.get('margin'));
    if (margin) {
        css['margin-left'] = margin;
        css['margin-right'] = margin;
    }
    var fontsize = parseFloat(Cookies.get('fontsize'));
    if (fontsize) {
        css['font-size'] = fontsize;
    }
    var lineheight = parseFloat(Cookies.get('lineheight'));
    if (lineheight) {
        css['line-height'] = lineheight + 'px';
    }
    $('#content').css(css);
    var colour = Cookies.get('colour');
    if (colour == 'black-on-white') {
        $('body').removeClass('white-on-black').addClass(colour);
        $('#invert-btn span').removeClass('white-on-black');
    }
    console.log('finished restoring settings!');
}

function fix_align() {
    var align = Cookies.get('align');
    if (align) {
        $('.line').css('text-align', align);
    }
}

function reset_settings() {
    Cookies.remove('margin');
    Cookies.remove('fontsize');
    Cookies.remove('lineheight');
    Cookies.remove('align');
    $('#content').css({
        'margin-left': '',
        'margin-right': '',
        'font-size': '',
        'line-height': '',
    });
    reset();
}

$(document).ready(function() {
    restore_settings();
    var b = $("#container"),
        c = $("#trigger-menu"),
        d = $("#trigger-menu .title");
    function a() {
        b.hasClass("menu-open") ? d.text("menu") : d.text("close");
    }
    c.click(function() {
        a();
        b.toggleClass("menu-open");
        $(this).toggleClass("active");
    });
    $("#content-wrapper").click(function() {
        if (b.hasClass("menu-open")) {
            a();
            c.removeClass("active");
            b.removeClass("menu-open");
        }
    })
    $('.menu').show();
});
