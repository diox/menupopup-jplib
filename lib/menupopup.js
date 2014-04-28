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

var {unload} = require("pathfinder/addon/unload");

exports.menupopup = function menupopup(options) {
  new windowUtils.WindowTracker({
    onTrack: function (window) {
	
      if ("chrome://browser/content/browser.xul" != window.location) return;
	  
		let doc = window.document;
		function $(id) doc.getElementById(id);
		function xul(type) doc.createElementNS(NS_XUL, type);
		
	  
      // create the new menupopup 
      let menupopup = xul("menupopup");
      menupopup.setAttribute("id", options.id);
      menupopup.setAttribute("type", "menu");
      if (options.position) 
        menupopup.setAttribute("position", options.position);
	  else
		menupopup.setAttribute("position", "after_start");		
      if (options.onShow)
	    menupopup.setAttribute("onpopupshowing", options.onShow);	
      if (options.onHide)
	    menupopup.setAttribute("onpopuphidden", options.onHide);
		
      if (options.parentid) {
		var parent = $(options.parentid);
        parent.appendChild(menupopup);			  
      }
	  
	  // add unloader
		require("pathfinder/addon/unload").unload(function() {
        menupopup.parentNode.removeChild(menupopup);
      }, window);
	  
    },
 
	onUntrack: function (window) {}
 });
 
	return {
		openPopup: function(opts) {
		
			for each (var window in windowUtils.windowIterator()) {
				
				let doc = window.document;
				let $ = function (id) doc.getElementById(id);
			
				var anc = $(opts.idAnchor);
				var menu = $(opts.idMenu);
				var posParent = (opts.posparent)? opts.posparent : "bottomleft" ;
				var posMenu = (opts.posMenu)? opts.posMenu : "topleft" ;
				
				menu.showPopup( anc, -1, -1, "menu", posParent, posMenu );
				//menu.openPopup( anc , opts.position , -1 , -1 , false, true, opts.triggerEvent ); 
			};
		},
		
		clearMenu: function(params) {
			for each (var window in windowUtils.windowIterator()) {
				
				let doc = window.document;
				let $ = function (id) doc.getElementById(id);
			
				var menu = $(params.idMenu);
				var length = menu.children.length;
				for  (var i = length; i > 0 ; i--) {
					menu.removeChild(menu.children[i-1]);
				}	
			}				
		}
		
		/*
		addChild: function(param) {
			
			for each (var window in windowUtils.windowIterator()) {
				
				let doc = window.document;
				let $ = function (id) doc.getElementById(id);
				function xul(type) doc.createElementNS(NS_XUL, type);
				
				var menu = $(param.menuid);
				var onCmd = function() {
					param.onCommand && param.onCommand();
				};
				
				let menuitem = xul("menuitem");
				menuitem.setAttribute("id", param.id);
				menuitem.setAttribute("label", param.label);
				if (param.accesskey)
				menuitem.setAttribute("accesskey", param.accesskey);
				if (param.key)
					menuitem.setAttribute("key", param.key);
				if (param.image) {
					menuitem.setAttribute("class", "menuitem-iconic");
					menuitem.style.listStyleImage = "url('" + param.image + "')";
				}
				menuitem.addEventListener("command", onCmd, true);

				menu.appendChild(menuitem);
				
			};
		}
		*/
	}
 
};


      
