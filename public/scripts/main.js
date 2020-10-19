var rhit = rhit || {};

rhit.main = function () {
	console.log("Ready");

	//for testing purposes
	document.querySelector("#login").onclick = (event) => {
		console.log("CLICKED");
		window.location.href = "/playmode.html";
	};
};

rhit.main();

// add scrub bar
//change current song color
