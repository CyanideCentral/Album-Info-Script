// ==UserScript==
// @name         Album information script
// @namespace    https://greasyfork.org/users/238956
// @version      0.1
// @description  Generate album information from Wikipedia page
// @author       CyanideCentral
// @match        https://en.wikipedia.org/wiki/*
// @require      https://cdn.staticfile.org/jquery/2.1.4/jquery.js
// @require      https://code.jquery.com/jquery-migrate-1.0.0.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var tb = $('th.summary.album');
    if (tb.length == 0) return;
    else {
        $(":root").append("<div style='position:absolute; top:0; left:-9999px;'><textarea id='temp_area' type='text' rows='1' cols='2'></textarea></div>");
        $("#siteSub").append("\xa0\xa0<a id='getInfo'>Album Info</a>");
        //$("#siteSub").append("\xa0\xa0<a id='getTracks'>Track List</a>");
        $("#getInfo").click(function () {
            var it = tb.text() + '\nArtist: ' + $('.contributor').text() + '\nLabel: ';
            var lt = $("a[title='Record label']").parent().next().text();
            lt = lt.trim();
            it += lt.split("\n").join(", ") + '\nRelease date: ';
            it += $(".published:first").text();
            var th = $("th:contains('Professional ratings')");
            if (th.length > 0) {
                var pr = th.parent().parent();
                var mt = pr.find("a[title='Metacritic']").parent().next().text();
                var pf = pr.find("a[title='Pitchfork (website)']").parent().parent().next().text();
                if (mt != '' || pf != '') {
                    it += '\nRating: ';
                    if (mt != '') {
                        it += 'Metacritic ' + mt.split('/')[0];
                    }
                    if (pf != '') {
                        if (mt != '') it += ', ';
                        it += 'Pitchfork ' + pf.split('/')[0];
                    }
                }
            }
            it += '\n\n      ';
            var pp = $("div.mw-parser-output").children("p:contains('e')").first().text();
            it += pp.trim().replace(/\[(\d)+\]/g, '').trim() + " (Wikipedia)";
            $("#temp_area").text(it);
            $("#temp_area").focus();
            $("#temp_area").select();
            document.execCommand('copy');
        });
    }
})();