<!-- contributed by Yaelle Fany Borghini [yaellefany@gmail.com]  -->


The `menuPopup` API provides a simple way to create
[menuPopup](https://developer.mozilla.org/en/XUL/menuPopup), 
they can be placed inside a menu , menulist , toolbarbutton , or a button.
A menu popup can, then, be filled with singles menuitem and/or submenu

## Example ##

    exports.main = function(options) {
	
		// Creation of a toolbarButton to host the menu
		var toolbarbuttonTest = toolbarbutton.ToolbarButton({
			id: "toolbarbutton_test",
			label: "click me",
			tooltip: "click me",
			image: data.url('img/test.png'),
			// association of the menuPopup onClick
			onCommand: function() {
				menuPP.openPopup({
					idAnchor:"toolbarbutton_test",
					idMenu: "menuPP-test",
					posParent: "bottomleft",
					posMenu: "topleft"
				});
			}			
		});
		    
		// Put the button in the navigation bar
		toolbarbuttonTest.moveTo({
			toolbarID: "nav-bar",
			forceMove: false
		});
	
		// The popup menu associated
		var menuPP = require("menupopup").menupopup({
			id: "menuPP-test",
			parentid: "toolbarbutton_test",
			position: "after_start",
			onShow: "alert('show')",
			onHide: "alert('hide')"
		});
    };
	
	// test a menu in the 
		var testMenu = require("menu").Menu({
			id: "menu_test",
			menuid: "placesContext",
			separator: "yes",			
			label: "my Menu",
			onCommand: function() {
			}
		});

		
		// The popup menu associated
		var menuPP = require("menupopup").menupopup({
			id: "menuPP_test",
			parentid: "menu_test",
			position: "end_before",
			onShow: "alert('show')",
			onHide: "alert('hide')"
		});

	// filled with one menu item
		menuItems.Menuitem ({
		id: "menuItem_test",
		menuid: "menuPP_test",
		label: "my item",
		onCommand: function() {
		}
	});


<api name="menuPopup">
@class

Module exports `menuPopup` constructor allowing users to create a menuPopup.

<api name="menuPopup">
@constructor
Creates a menuPopup.

@param options {Object}
  Options for the menuPopup, with the following parameters:

@prop id {String}
A id for the menuPopup, this should be namespaced.

@prop parentid {String}
Specified the parent of the menuPopup, it define where the menu is anchored.

@prop [position] {String}
A position for the menuPopup, see [here](https://developer.mozilla.org/en/XUL/Attribute/popup.position) for the list of positions available.
Default set to 'after_start'.

@prop [onShow] {String}
 A option function that is invoked when the menuPopup is about to be shown.

@prop [onHide] {String}
 A option function that is invoked when the menuPopup is about to be hidden.
</api>

<api name="openPopup">
@method
 Display the menuPopup

@param options {Object}
Options which describe the position where to show the menuPopup (it can be totally elsewhere than where defined), with the
following parameters:

@prop idAnchor {String}
The id of the parent which you want to anchored the menuPopup to.

@prop idMenu {String}
The id of the menuPopup itself.

@prop [posparent] {String}
The corner of the parent where you want to anchored the menuPopup.
Default value is 'bottomleft'.

@prop [posMenu] {String}
The corner of the menuPopup to be anchored to the parent corner.
Default value is 'topleft'.

</api>
</api>
