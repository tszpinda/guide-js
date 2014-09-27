console.log('tutorial.js loading...');

var TutThem = function(){
    this.host = "http://localhost:5000"; //where is the js coming from
    this.apiHost = "http://localhost:3000";

};

TutThem.prototype.findDomain = function(url){
	var matches = url.match(/^https?\:\/\/([^\/?#]+)/i);
	var domain = matches && matches[1];
	if(!domain) {
		console.error('unable to verify your domain, please contact support:', url);
		return null;
	}
	return domain;
}
TutThem.prototype.insertScripts = function(){
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = this.host + "/tooltip-init-without-jq.js"; // file contains alert("hello!");
    document.body.appendChild(s);
}
TutThem.prototype.insertCss = function(){
    var s = document.createElement('link');
    s.rel= "stylesheet";
    s.href= this.host + "/tooltip.css"
    s.type = "text/css";
    document.body.appendChild(s);
}
TutThem.prototype.autoExecute = function() {
    this.insertCss();
    this.insertScripts();
}

TutThem.prototype.fetch = function(apiUrl, callbackOk, callbackErr) {
    console.log("fetch", apiUrl);
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            // Success!
            payload= JSON.parse(request.responseText);
            callbackOk(payload);
        } else {
            // We reached our target server, but it returned an error
            console.error("error status", request);
            callbackErr();
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.error("onerror");
        callbackErr();
    };

    request.send();
}

TutThem.init = function(config){
	if(!config.apiKey)
		throw Error('missing apiKey');
    if(!config.page)
        throw Error('missing page');
	var t = new TutThem();
	var domain = t.findDomain(window.location.href);
	if(!domain)return;

    console.log('tutthem config:', config.apiKey, config.page, domain);

	//var apiUrl = 'http://{host}:{port}/xtutorials/{apiKey}/{domain}/{page}';
	var apiUrl = t.apiHost + '/xtutorials/' + config.apiKey + '/' + domain + '/' + config.page;

   t.fetch(apiUrl, function(payload){
        console.log("Cool we have some data");
        if(!payload.tutorials || payload.tutorials.length < 1){
            return;
        }
        var tutorial = payload.tutorials[0];
        var options = tutorial.options;
        if(options && options.length > 0) {
            var intro = introJs();
            intro.setOptions({steps: options});
            intro.start();
        }
    }, function(){
        console.log("oops error");
    });
/*
	$.getJSON(apiUrl).then(function(payload) {
		if(!payload.tutorials || payload.tutorials.length < 1){
			return;
		}
		var tutorial = payload.tutorials[0];
		var options = tutorial.options;
		if(options && options.length > 0) {
			var intro = introJs();
			intro.setOptions({steps: options});
   		    intro.start();
		}
		return payload;
   }, function(err){
		console.log(err)
		alert('ups error loading stuff');
	});

   intro.setOptions({
   	steps: [
              {
                intro: "Hello world!"
              },
              {
                element: document.querySelector('#email'),
                intro: "This is a tooltip."
              },
              {
                element: document.querySelector('[data-tooltip]'),
                intro: "Enter the email address used when you created your account."
              },
              {
                element: document.querySelectorAll('#step2')[0],
                intro: "Ok, wasn't that fun?",
                position: 'right'
              },
              {
                element: '#password',
                intro: 'More features, more fun.',
                position: 'left'
              },
              {
                element: '#step4',
                intro: "Another step.",
                position: 'bottom'
              },
              {
                element: '#step5',
                intro: 'Get it, use it.'
              }
      ]
	});
*/
}

window.tut = new TutThem();
tut.autoExecute();
console.log('tutorial.js loaded');
