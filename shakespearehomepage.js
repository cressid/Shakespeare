var shakeswindow = (function() {
	var exports = {};

	function setup(div){
		var tragedies = [["Antony and Cleopatra", "cleopatra", 5, 7, 13, 15, 2], ["Coriolanus", "coriolanus", 10, 3, 3, 7, 6], ["Hamlet", "hamlet", 5, 2, 4, 7, 2], ["Julius Caesar", "julius_caesar", 3, 4, 3, 3, 5], ["King Lear", "lear", 5, 4, 7, 7, 3], ["Macbeth", "macbeth", 7, 4, 6, 3, 8], ["Othello", "othello", 3, 3, 4, 3, 2], ["Romeo and Juliet", "romeo_juliet", 5, 6, 5, 5, 3], ["Timon of Athens", "timon", 2, 2, 6, 3, 4], ["Titus Andronicus", "titus", 1, 4, 2, 3]];
		var shakesTrag = $("#shakesTrag");
		var shakelink = $(".shakelink");
		
		console.log(tragedies.length);
		var currentPlay;
		var currentDrop;
		//append dem tragedies
		for (var i=0; i<tragedies.length; i++){
			currentPlay = tragedies[i][0];
			currentDrop = $("<li class='dropdown-submenu'>");
			currentLink = "http://shakespeare.mit.edu/"+tragedies[i][1]+"/full.html";
			currentTitle = $("<a href="+currentLink+">"+currentPlay+"</a>")
			currentDrop.append(currentTitle);
			shakesTrag.append(currentDrop);		
		};
		
		shakelink.bind("click", function(){
			var shakesframe =$(".shakesframe");
			shakesframe.remove();
			var linkylink = $(this);
			var link_val = String(linkylink.attr("id"));
			var container = $(".container");
			console.log(link_val);
			shakesframe = $("<iframe class='shakesframe' width='935px' src="+link_val+" height='500px'></iframe>");
			
			container.append(shakesframe);
		});
	};
	
	exports.setup = setup;
	
	return exports;
})();


$(document).ready(function() {
    $('.shakeswindow').each(function() {
        shakeswindow.setup(this);  
    });
});

//http://shakespeare.mit.edu/allswell/allswell.1.1.html

//<iframe src="" width=935 height=500 class="shakespage" border=0px></iframe>