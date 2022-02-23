/**
 * Demo of jquery.simpletabs jQuery plugin: Configuration of demo tabs, used in demo pages
 * @version    1.2.3
 * @release    2022-02-22
 * @repository https://github.com/peterthoeny/jquery.simpletabs
 * @author     Peter Thoeny, https://twiki.org/ & https://github.com/peterthoeny
 * @copyright  2021-2022 Peter Thoeny, https://github.com/peterthoeny
 * @license    MIT, https://opensource.org/licenses/mit-license
 */

let tabsConfig = {
  tabs: [
    { id: 'demoTab1', label: 'Demo Tab 1', tooltip: 'This is demo tab 1', url: 'demo.html' },
    { id: 'demoTab2', label: 'Demo Tab 2', tooltip: 'This is demo tab 2', url: 'demo2.html' }
  ]
};

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

// EOF
