/* ***** BEGIN LICENSE BLOCK *****
 * Version: MIT/X11 License
 * 
 * Copyright (c) 2012 Yaëlle Fany Borghini
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Contributor(s):
 *   Yaëlle Fany Borghini <yaellefany@gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */
 
const windowUtils = require("sdk/deprecated/window-utils");
const NS_XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

exports.Menu = function Menu(options) {
  new windowUtils.WindowTracker({
    onTrack: function (window) {
      if ("chrome://browser/content/browser.xul" != window.location) return;

      var onCmd = function() {
        options.onCommand && options.onCommand();
      };

      // add the new menu
      var menu = window.document.createElementNS(NS_XUL, "menu");
      menu.setAttribute("id", options.id);
      menu.setAttribute("label", options.label);
      if (options.image) {
        menu.setAttribute("class", "menu-iconic");
        menu.style.listStyleImage = "url('" + options.image + "')";
      }
	  if (options.checked) {
        menu.setAttribute("class", "menuitem-iconic");
		menu.setAttribute("checked", options.checked);
	  }
	  if (options.disabled) 
		menu.setAttribute("disabled", options.disabled);
		
      menu.addEventListener("command", onCmd, true);

      if (options.menuid) {
        let ($ = function(id) window.document.getElementById(id)) {
			if (options.insertbefore)
				$(options.menuid).insertBefore(menu, $(options.insertbefore));				
			else
				$(options.menuid).appendChild(menu);
			if (options.separator) {
				var menuseparator = window.document.createElementNS(NS_XUL, "menuseparator");
				$(options.menuid).insertBefore(menuseparator, menu);
			}
        }
      }

      // add unloader
      require("pathfinder/addon/unload").unload(function() {
        menu.parentNode.removeChild(menu);
      }, window);
    }
  });
};
