var rhit = rhit || {};


//this is set up for localhost stuff, switch it when you actually deploy
rhit.swapPage = function(href) {
	var req = new XMLHttpRequest();
	req.open("GET",
			 "http://localhost:5000/" + href,
			 false);
	req.send(null);
	if (req.status == 200) {
		document.getElementById("pageHolder").innerHTML = req.responseText;
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
	//make this a class instead of an id, so we can have many of these page changers passed through. make sure they all have a data-link value though
	//let loginBtn = document.getElementById("login");
	let historyPushers = document.querySelectorAll(".historyPusher");
	historyPushers.forEach(rhit.addClicker);
	//rhit.addClicker(document.getElementById("login"));
	//console.log(loginBtn.dataset.link);
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
