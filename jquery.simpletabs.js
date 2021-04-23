/**
 * Simple tabs plugin for jQuery, showing bigger tags in the center
 * @version    1.2.0
 * @release    2021-04-23
 * @repository https://github.com/peterthoeny/jquery.simpletabs
 * @author     Peter Thoeny, https://twiki.org/ & https://github.com/peterthoeny
 * @copyright  2021 Peter Thoeny, https://github.com/peterthoeny
 * @license    MIT, https://opensource.org/licenses/mit-license
 */
(function($) {

    'use strict';

    let debug = false;

    function debugLog(msg) {
        if(debug) {
           console.log('- simpleTabs: ' + msg);
        }
    }

    $.fn.simpleTabs = function(options, activeTab) {
        let self = $(this);
        self.addClass('jqSimpleTabsContainer');
        let addLink = options && options.tag && options.tag.format ? false : true;
        options = $.extend({}, $.fn.simpleTabs.defaults, options);
        if(options.debug != undefined) {
           debug = options.debug;
        }
        if(activeTab) {
            options.activeTab = activeTab;
        }
        debugLog('options: ' + JSON.stringify(options, null, ''));
        var tabs = [];
        options.tabs.forEach(function(item, idx) {
            var html = '';
            var spacers = parseInt(item.spacers, 10);
            if(Number.isNaN(spacers) && idx > 0) {
                spacers = 1;
            }
            var classes = [ 'jqSimpleTabsSpacer' ];
            if(item.spacerClass) {
                item.spacerClass.split(/\s+/).forEach(function(c) {
                    classes.push(c);
                });
            }
            for(var n = 0; n < spacers; n++) {
                html += '<td class="' + classes.join(' ') + '"></td>';
            }
            classes = [ 'jqSimpleTabsTab' ];
            var label = item.label;
            if(item.id === options.activeTab) {
                classes.push('jqSimpleTabsActive');
            } else {
                classes.push('jqSimpleTabsInactive');
                label = '<a href="' + item.url + '">' + label + '</a>';
            }
            if(item.tabClass) {
                item.tabClass.split(/\s+/).forEach(function(c) {
                    classes.push(c);
                });
            }
            var attrs = [];
            attrs.push('class="' + classes.join(' ') + '"');
            attrs.push('id="' + item.id + '"');
            if(item.tooltip) {
               attrs.push('title="' + item.tooltip + '"');
            }
            html += '<td ' + attrs.join(' ') + '>' + label + '</td>';
            tabs.push(html);
        });
        var html = '<table class="jqSimpleTabsTable"><tr><td class="jqSimpleTabsBefore"></td>'
            + tabs.join('')
            + '<td class="jqSimpleTabsAfter"></td></tr></table>';
        self.html(html);
    };

    $.fn.simpleTabs.defaults = {
        tabs: [
            { id: 'demoTab1', label: 'Demo Tab 1', url: '#demoTab1' },
            { id: 'demoTab2', label: 'Demo Tab 2', url: '#demoTab2' }
        ]
    };

})(jQuery);
