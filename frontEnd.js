var shakesData = function(){
	
		//called when selectAPlay is clicked
	// var selectExpand = function(selectAPlay) {
		// console.log("butts");
		// selectAPlay.css("width", "100px");
	// };
	
	var setup = function(){
		var div = $(".shakesData");
		var buttonDiv = $("<div class ='buttonDiv'></div>")
		var selectAPlay = $("<button class = 'btn btn-large selectAPlay'>Select A Play</button>");
		var selectData = $("<div><button class = 'btn btn-large selectData'>Select Data</button></div>");
		//selectAPlay.click(selectExpand(selectAPlay));
		buttonDiv.append(selectAPlay, selectData);
		div.append(buttonDiv);
		
		$('.selectAPlay').click(function(){
			console.log("kipper");
			$('.selectAPlay').animate({
			width: '100',
			"font-size": '18'}, 800, function(){}
			);
			$('.selectData').animate({width: '100px', "font-size": '18px'}, 800, function(){});
			$('.buttonDiv').animate({
					left: '0',
					top: '0'
					}, 800, function(){
					});
			$(".playDiv").remove();
			var playDiv = $("<div class = 'playDiv'></div>")
			var comButtons = $("<div class = 'ComedyButtons'><label class = 'checkbox'><input type='checkbox'>Comedies</label></div>");
			var allComs = [["AllsWellThatEndsWell", "All's Well That Ends Well"], ["AsYouLikeIt", "As You Like It"], ["ComedyOfErrors", "Comedy of Errors"],
				["LovesLaboursLost", "Love's Labours Lost"], ["MeasureForMeasure", "Measure For Measure"], ["MerryWivesOfWindsor", "The Merry Wives of Windsor"],
				["MerchantOfVenice", "The Merchant of Venice"], ["MidsummerNightsDream", "A Midsummer Night's Dream"], ["MuchAdoAboutNothing", "Much Ado About Nothing"],
				["Pericles", "Pericles"], ["TamingOfTheShrew", "Taming of the Shrew"], ["Tempest", "The Tempest"], ["TroilusAndCressida", "Troilus and Cressida"],
				["TwelfthNight", "Twelfth Night"], ["TwoGentlemenOfVerona", "The Two Gentlemen of Verona"], ["WintersTale", "The Winter's Tale"]];
			for (var i=0; i<allComs.length; i++){
				comButtons.append($("<label class='checkbox " + allComs[i][0] + "'><input type='checkbox'>" + allComs[i][1] + "</label>"))
			};
			var tragButtons = $("<div class = 'TragedyButtons'><label class = 'checkbox'><input type='checkbox'>Tragedies</label></div>");
			var allTrag = [["AntonyAndCleopatra", "Antony and Cleopatra"], ["Coriolanus", "Coriolanus"], ["Hamlet", "Hamlet"], ["JuliusCaesar", "Julius Caesar"],
				["KingLear", "King Lear"], ["Macbeth", "Macbeth"], ["Othello", "Othello"], ["RomeoAndJuliet", "Romeo and Juliet"], ["TimonOfAthens", "Timon of Athens"],
				["TitusAndronicus", "Titus Andronicus"]];
			for (var i=0; i<allTrag.length; i++){
				tragButtons.append($("<label class = 'checkbox " + allTrag[i][0] + "'><input type = 'checkbox'>" + allTrag[i][1] + "</label>"))
			}
			var hisButtons = $("<div class = 'HistoryButtons'><label class = 'checkbox'><input type='checkbox'>Histories</label></div>");
			playDiv.append(comButtons, tragButtons, hisButtons);
			div.append(playDiv);
		})
		
		$('.selectData').click(function(){
			$('.selectData').width('100px');
		})
	};
	
	
	return {"setup":setup}
}();

$(document).ready(function(){
	$(".shakesData").each(function(){
		shakesData.setup();
	});
});