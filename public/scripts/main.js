var rhit = rhit || {};

//this is set up for localhost stuff, switch it when you actually deploy
rhit.baseLink = "http://localhost:5000/";
rhit.PAGE_HOLDER_ID = "pageHolder";
rhit.player = null;

// this function gets called when API is ready to use
//FOR ANY OF THIS TO WORK THE EMBED URL NEEDS TO HAVE enablejsapi=1 ADDED AS A URL PARAM
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  console.log("youtubeAPI created");
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
	console.log("onPlayerREady");
  
	// bind events
	var playButton = document.getElementById("playMusic");
	playButton.addEventListener("click", function() {
		document.querySelector("#pauseMusic").style.display = "inline";
		document.querySelector("#playMusic").style.display = "none";
	  	player.playVideo();
	});
	
	var pauseButton = document.getElementById("pauseMusic");
	pauseButton.addEventListener("click", function() {
		document.querySelector("#pauseMusic").style.display = "none";
		document.querySelector("#playMusic").style.display = "inline";
	  player.pauseVideo();
	});
	
}

rhit.realignCheck = function() {
	if (document.querySelector("#"+rhit.PAGE_HOLDER_ID+" playback")) {
		let badElem = document.querySelector("#"+rhit.PAGE_HOLDER_ID+" playback");
		badElem.parentNode.removeChild(badElem);
	}

	if (document.querySelector("#playmode")) {
		console.log("adding center");
		document.querySelector("#playback").style.position = "static";
		document.querySelector("#playback").style.margin = "auto";
	} else {
		console.log("adding corner");
		document.querySelector("#playback").style.position = "absolute";
		document.querySelector("#playback").style.margin = "0";
	}
};

rhit.swapPage = function(href) {
	var req = new XMLHttpRequest();
	req.open("GET",
			 rhit.baseLink + href,
			 false);
	req.send(null);
	if (req.status == 200) {
		document.getElementById(rhit.PAGE_HOLDER_ID).innerHTML = req.responseText;
		rhit.realignCheck();
		rhit.setupHistoryClicks();
		return true;
	  }
	  return false;
};

rhit.addClicker = function(link) {
	link.addEventListener("click", function(e) {
		rhit.swapPage(link.dataset.link);
		history.pushState(null, null, link.dataset.link);
		e.preventDefault();
	}, false);
};

rhit.setupHistoryClicks = function() {
	//make sure all items of class historyPusher have a "data-link" attribute to an html page with all the stuff they want thrown onto the main page
	let historyPushers = document.querySelectorAll(".historyPusher");
	historyPushers.forEach(rhit.addClicker);
};

rhit.main = function () {
	console.log("Ready");

	rhit.setupHistoryClicks();

	window.addEventListener("popstate", function(e) {
		rhit.swapPage(location.pathname);
	});

	//for testing purposes
	if (document.querySelector("#login")) {
		document.querySelector("#login").onclick = (event) => {
			window.location.href = "/playmode.html";
			rhit.setupHistoryClicks();
		};
	}
	
};

rhit.main();

// add scrub bar
//change current song color
