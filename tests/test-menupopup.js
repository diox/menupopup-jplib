
const windowUtils = require("window-utils");
const menupopup = require("menupopup");
const NS_XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

let window = windowUtils.activeBrowserWindow;
let document = window.document;
function $(id) document.getElementById(id);

function createMenuPopup(options, test) {
  test.assertEqual(!$(options.id), true);
  var menupp = menupopup.menupopup(options);
  test.assertEqual(!$(options.id), true);
  return menupp;
};

exports.testMenuPPExists = function(test) {
	
	require("widget").Widget({
		id: "mozilla-icon",
		label: "My Mozilla Widget",
		contentURL: "http://www.mozilla.org/favicon.ico",
		onClick: function() {
			menupp.openPopup({
				idAnchor:"mozilla-icon",
				idMenu: "test-menupp"});
		}
	});
	
  var options = {
    id: "test-menupp"
	parentid: "mozilla-icon",
	position: "end_before"
  };
  
  var menupp = createMenuPopup(options, test);
  exists($(options.id));
  test.assertEqual(!$(options.id), true);
};


