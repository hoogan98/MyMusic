var rhit = rhit || {};

//this is set up for localhost stuff, switch it when you actually deploy
rhit.baseLink = "http://localhost:5000/";
rhit.PAGE_HOLDER_ID = "pageHolder";

rhit.swapPage = function(href) {
	var req = new XMLHttpRequest();
	req.open("GET",
			 rhit.baseLink + href,
			 false);
	req.send(null);
	if (req.status == 200) {
		document.getElementById(rhit.PAGE_HOLDER_ID).innerHTML = req.responseText;
		rhit.setupHistoryClicks();
		return true;
	  }
	  return false;
}

rhit.addClicker = function(link) {
	link.addEventListener("click", function(e) {
	  rhit.swapPage(link.dataset.link);
	  history.pushState(null, null, link.dataset.link);
	  e.preventDefault();
	}, false);
}

rhit.setupHistoryClicks = function() {
	//make sure all items of class historyPusher have a "data-link" attribute to an html page with all the stuff they want thrown onto the main page
	let historyPushers = document.querySelectorAll(".historyPusher");
	historyPushers.forEach(rhit.addClicker);
}

rhit.main = function () {
	console.log("Ready");

	rhit.setupHistoryClicks();

	window.addEventListener("popstate", function(e) {
		rhit.swapPage(location.pathname);
	});

	//for testing purposes
	// document.querySelector("#login").onclick = (event) => {
	// 	window.location.href = "/playmode.html";
	// };
};

rhit.main();

// add scrub bar
//change current song color
