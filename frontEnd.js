//you should be able to access the plays that have been highlighted via shakesData.selectedPlays

var shakesData = function(){
	var selectedPlays;
	//this function is called every time a check box is checked
	//it returns a list of the selected plays
	var selectPlays = function(){
		selectedPlays = [];
		$('input:checked').each(function(){
			console.log($(this).attr("id")); 
			selectedPlays.push($(this).attr("id"));
		})
		return selectedPlays;
	}
	
	var setup = function(){
		var div = $(".shakesData");
		var buttonDiv = $("<div class ='buttonDiv'></div>");
		var selectAPlay = $("<button class = 'btn btn-large selectAPlay'>Select A Play</button>");
		var selectData = $("<div><button class = 'btn btn-large selectData'>Select Data</button></div>");
		buttonDiv.append(selectAPlay, selectData);
		div.append(buttonDiv);
		
		
		$('.selectAPlay').click(function(){
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
			//now we're getting all our little check boxes in order
			var playDiv = $("<div class = 'playDiv'></div>")
			
			
			//comcheck and comButtons are the "Comedy" button + label at the top that selects everything
			var comcheck=$("<input type='checkbox' id='comediesCheck'>");
			var comButtons = $("<div class = 'ComedyButtons'><label class = 'checkbox' 'comediesCheck' id='Comedies'>Comedies</label></div>");
			comButtons.append(comcheck);
			var allComs = [["AllsWellThatEndsWell", "All's Well That Ends Well"], ["AsYouLikeIt", "As You Like It"], ["ComedyOfErrors", "Comedy of Errors"], 
				["LovesLaboursLost", "Love's Labours Lost"], ["MeasureForMeasure", "Measure For Measure"], ["MerryWivesOfWindsor", "The Merry Wives of Windsor"],
				["MerchantOfVenice", "The Merchant of Venice"], ["MidsummerNightsDream", "A Midsummer Night's Dream"], ["MuchAdoAboutNothing", "Much Ado About Nothing"],
				["Pericles", "Pericles"], ["TamingOfTheShrew", "Taming of the Shrew"], ["Tempest", "The Tempest"], ["TroilusAndCressida", "Troilus and Cressida"],
				["TwelfthNight", "Twelfth Night"], ["TwoGentlemenOfVerona", "The Two Gentlemen of Verona"], ["WintersTale", "The Winter's Tale"]];
			//now we're adding all the individual comedies
			for (var i=0; i<allComs.length; i++){
				var currentCheck = $("<input type='checkbox' class = 'playCheckbox' id="+allComs[i][0] + ">");
				currentCheck.css("top", -15*i);
				currentCheck.change(function(){
					selectPlays();
					});
					//and add the wee label
				var currentButton = $("<label class = 'checkbox "+ allComs[i][0] + "'>" + allComs[i][1] + "</label>")
				currentButton.css("top", -15 -15*i);
				comButtons.append(currentCheck);
				comButtons.append(currentButton);
			};

			//ok now we're going to go through the exact same rigamarole for the tragedy buttons
			var tragcheck=$("<input type='checkbox' id='tragediesCheck'>");
			var tragButtons = $("<div class = 'TragedyButtons'><label class = 'checkbox' 'tragediesCheck' id='Tragedies'>Tragedies</label></div>");
			tragButtons.append(tragcheck);
			var tragDiv = $("<div class ='tragDiv></div>")
			tragDiv.append(tragButtons);
			var allTrag = [["AntonyAndCleopatra", "Antony and Cleopatra"], ["Coriolanus", "Coriolanus"], ["Hamlet", "Hamlet"], ["JuliusCaesar", "Julius Caesar"],
				["KingLear", "King Lear"], ["Macbeth", "Macbeth"], ["Othello", "Othello"], ["RomeoAndJuliet", "Romeo and Juliet"], ["TimonOfAthens", "Timon of Athens"],
				["TitusAndronicus", "Titus Andronicus"]];                                                                                                    
			for (var i=0; i<allTrag.length; i++){                                                                                                            
				var currentCheck = $("<input type='checkbox' class = 'playCheckbox' id="+allTrag[i][0] + ">");
				currentCheck.css("top", -15*i);
				currentCheck.change(function(){
					selectPlays();
					});
					//and add the wee label
				var currentButton = $("<label class = 'checkbox "+ allTrag[i][0] + "'>" + allTrag[i][1] + "</label>")
				currentButton.css("top", -15*i);
				tragButtons.append(currentCheck);
				tragButtons.append(currentButton);              
			};
			
			//and the histories
			var hischeck=$("<input type='checkbox' id='historiesCheck'>");
			var hisButtons = $("<div class = 'HistoryButtons'><label class = 'checkbox' 'historiesCheck' id='Histories'>Histories</label></div>");
			hisButtons.append(hischeck);
			var allHis = [["KingJohn", "King John"], ["RichardII", "Richard II"], ["HenryIVPart1", "Henry IV Part 1"], ["HenryV", "Henry V"],                
			["HenryVIPart1", "Henry VI Part 1"], ["HenryVIPart2", "Henry VI Part 2"], ["HenryVIPart3", "Henry VI Part 3"], ["RichardIII", "Richard III"],    
			["HenryVIII", "Henry VIII"]];                                                                                                                    
			for (var i=0; i<allHis.length; i++){
				var currentCheck = $("<input type='checkbox' class = 'playCheckbox' id="+allHis[i][0] + ">");
				currentCheck.css("top", -15*i);
				currentCheck.change(function(){
					selectPlays();
					});
					//and add the wee label
				var currentButton = $("<label class = 'checkbox "+ allHis[i][0] + "'>" + allHis[i][1] + "</label>")
				currentButton.css("top", -15 -15*i);
				hisButtons.append(currentCheck);
				hisButtons.append(currentButton);
			}

			//this function makes all the comedies have the same checked status as the "Comedy" box if you click it
			comcheck.change(function(){
				$(".playCheckbox").prop("checked", comcheck.prop("checked"));                                                                                                                     
			});
			
			$("#Tragedies").on('click', function(){console.log("shit")});
			$("#Comedies").on('click', function(){console.log("Butts")});                                                                                    
			playDiv.append(comButtons, tragButtons, hisButtons);                                                                                             
			playDiv.animate({opacity: .9}, 800, function(){});                                                                                               
			div.append(playDiv);                                                                                                                             
		})                                                                                                                                                   
		                                                                                                                                                     
		$('.selectData').click(function(){                                                                                                                   
			$('.selectData').width('100px');                                                                                                                 
		})                                                                                                                                                   
	};                                                                                                                                                       
	                                                                                                                                                         
	                                                                                                                                                         
	return {"setup":setup, "selectedPlays":selectedPlays}                                                                                                                                   
}();                                                                                                                                                         
                                                                                                                                                             
$(document).ready(function(){                                                                                                                                
	$(".shakesData").each(function(){                                                                                                                        
		shakesData.setup();                                                                                                                                  
	});                                                                                                                                                      
});                                                                                                                                                          