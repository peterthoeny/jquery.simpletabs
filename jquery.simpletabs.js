/**
 * jquery.simpletabs jQuery plugin
 * @version    1.2.4
 * @release    2024-09-11
 * @repository https://github.com/peterthoeny/jquery.simpletabs
 * @author     Peter Thoeny, https://twiki.org/ & https://github.com/peterthoeny
 * @copyright  2021-2024 Peter Thoeny, https://github.com/peterthoeny
 * @license    MIT, https://opensource.org/licenses/mit-license
 */

/**
 * Documentation of .simpletabs(config) properties with example:
 * {
 *   tabs: [
 *     {
 *       id:       'demoTab1',         // HTML ID of tab, must be unique per page, required
 *       label:    'Demo Tab 1',       // tab label, required
 *       tooltip:  'This is a demo',   // tooltip message for tab, optional
 *       url:      'demo-tab-1.html',  // page/anchor URL, required
 *       spacers:  2,                  // number of spacers preceeding tab, optional, default: 1
 *       tabClass: 'forAdminOnly',     // add classes to tab, optional, default: 'jqSimpleTabsTab'
 *       spacerClass: 'forAdminOnly'   // add classes to spacer, optional, default: 'jqSimpleTabsSpacer'
 *     },
 *     // etc...
 *   ],
 *   debug: false
 * }
 */

(function($) {

    'use strict';

    function entityEncode(val) {
        val = val.toString()
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
        return val;
    }

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
        debugLog('options: ' + JSON.stringify(options, null, ''));
        if(options.debug != undefined) {
           debug = options.debug;
        }

        // set active tab
        if(activeTab) {
            options.activeTab = activeTab;
        }

        // define array of tabs, each tab is preceded by a spacer
        let tabs = [];
        options.tabs.forEach(function(item, idx) {
            let html = '';

            // add one ore more spacers before the tab:
            let spacers = parseInt(item.spacers, 10);
            if(Number.isNaN(spacers) && idx > 0) {
                // default is 1 spacer
                spacers = 1;
            }
            let classes = [ 'jqSimpleTabsSpacer' ];
            if(item.spacerClass) {
                // add tab spacer classes if defined
                item.spacerClass.split(/\s+/).forEach(function(c) {
                    classes.push(c);
                });
            }
            for(let n = 0; n < spacers; n++) {
                html += '<td class="' + classes.join(' ') + '"></td>';
            }

            // add tab
            classes = [ 'jqSimpleTabsTab' ];
            let label = item.label;
            if(item.id === options.activeTab) {
                // show tab as active
                classes.push('jqSimpleTabsActive');
            } else {
                // show tab as inactive
                classes.push('jqSimpleTabsInactive');
                label = '<a href="' + item.url + '">' + label + '</a>';
            }
            if(item.tabClass) {
                // add tab classes if defined
                item.tabClass.split(/\s+/).forEach(function(c) {
                    classes.push(c);
                });
            }
            let attrs = [];
            attrs.push('class="' + classes.join(' ') + '"');
            attrs.push('id="' + item.id + '"');
            if(item.tooltip) {
                // add tooltip if defined
                attrs.push('title="' + entityEncode(item.tooltip) + '"');
            }
            html += '<td ' + attrs.join(' ') + '>' + label + '</td>';
            tabs.push(html);
        });

        // build tabs table from tabs array
        let html = '<table class="jqSimpleTabsTable"><tr><td class="jqSimpleTabsBefore"></td>'
            + tabs.join('')
            + '<td class="jqSimpleTabsAfter"></td></tr></table>';
        self.html(html);
    };

    $.fn.simpleTabs.defaults = {
        tabs: [
            {
                id:     'demoTab1',
                label:  'Demo Tab 1',
                url:    '#demoTab1'
            },
            {
                id:     'demoTab2',
                label:  'Demo Tab 2',
                url:    '#demoTab2'
            }
        ]
    };

})(jQuery);
