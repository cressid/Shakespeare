//you should be able to access the plays that have been highlighted via shakesData.selectedPlays

var shakesData = function(){
	var selectedPlays=[];
	var selectedVis=[];
	//this function is called every time a check box is checked
	//it returns a list of the selected plays
	var selectPlays = function(){
		selectedPlays = [];
		selectedVis = [];
		var vis=['Search','playText','charTimelines','Pie','CharacterChart'];
		var checks=['comediesCheck','tragediesCheck','historiesCheck ']
		$('input:checked').each(function(){
			var item=$(this).attr("id");
			if(vis.indexOf(item)!=-1)
			{
			
				selectedVis.push(item);
			}
			else{
				if(checks.indexOf(item)>-1){}
				else{selectedPlays.push(item)}
			};
		});
		
		console.log(selectedPlays,selectedVis);
		if(selectedPlays.length>0 &&selectedVis.length>0)
		{
			document.getElementById("Go").disabled = false;	
		}
		else{document.getElementById("Go").disabled = true;	}
	}
		

	var setup = function(){
		var div = $(".shakesData");
		var buttonDiv = $("<div class ='buttonDiv'></div>");
		var selectAPlay = $("<button class = 'btn btn-large selectAPlay'>Select A Play</button>");
		var selectData = $("<div><button class = 'btn btn-large selectData'>Select Data</button></div>");
		var Go = $("<div><button class = 'btn btn-large Go' id='Go' disabled>Visualize!</button></div>");
		Go.on("click",function()
		{
			$('.playDiv').animate({opacity: 0}, 800, function(){});
			$('.dataDiv').animate({opacity: 0}, 800, function(){});
			console.log(selectedPlays.join());
			var Mysearch=$("<div class='visual' data-plays="+selectedPlays.join()+" data-vis="+selectedVis.join()+"></div>");  
			var displayDiv = $("<div class = 'displayDiv'></div>");
			displayDiv.append(Mysearch);
			div.append(displayDiv);
			runVis()
			$('.displayDiv').animate({opacity: 1}, 800, function(){});
		}
			 );
		buttonDiv.append(selectAPlay, selectData,Go);
		div.append(buttonDiv);


		$('.selectAPlay').click(function(){
			$('.selectAPlay').animate({
			width: '100',
			"font-size": '12'}, 800, function(){}
			);
			$('.selectData').animate({width: '100px', "font-size": '12px'}, 800, function(){});
			$('.Go').animate({width: '100px', "font-size": '12px'}, 800, function(){});
			$('.buttonDiv').animate({
					left: '0',
					top: '0'
					}, 800, function(){
					});
			$(".playDiv").remove();
			//now we're getting all our little check boxes in order
			var playDiv = $("<div class = 'playDiv'></div>");


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
				var currentCheck = $("<input type='checkbox' class = 'comCheckbox' id="+allComs[i][0] + ">");
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
			tragButtons.prepend(tragcheck);
			var allTrag = [["AntonyAndCleopatra", "Antony and Cleopatra"], ["Coriolanus", "Coriolanus"], ["Hamlet", "Hamlet"], ["JuliusCaesar", "Julius Caesar"],
				["KingLear", "King Lear"], ["Macbeth", "Macbeth"], ["Othello", "Othello"], ["RomeoAndJuliet", "Romeo and Juliet"], ["TimonOfAthens", "Timon of Athens"],
				["TitusAndronicus", "Titus Andronicus"]];                                                                                                    
			for (var i=0; i<allTrag.length; i++){                                                                                                            
				var currentCheck = $("<input type='checkbox' class = 'tragCheckbox' id="+allTrag[i][0] + ">");
				currentCheck.css("top",-15+-15*i);
				currentCheck.change(function(){
					selectPlays();
					});
					//and add the wee label
				var currentButton = $("<label class = 'checkbox "+ allTrag[i][0] + "'>" + allTrag[i][1] + "</label>")
				currentButton.css("top",-30 -15*i);
				tragButtons.append(currentCheck);
				tragButtons.append(currentButton);              
			};

			//and the histories
			var hischeck=$("<input type='checkbox' id='historiesCheck'>");
			var hisButtons = $("<div class = 'HistoryButtons'><label class = 'checkbox' 'historiesCheck' id='Histories'>Histories</label></div>");
			hisButtons.prepend(hischeck);
			var allHis = [["KingJohn", "King John"], ["RichardII", "Richard II"], ["HenryIVPart1", "Henry IV Part 1"], ["HenryV", "Henry V"],                
			["HenryVIPart1", "Henry VI Part 1"], ["HenryVIPart2", "Henry VI Part 2"], ["HenryVIPart3", "Henry VI Part 3"], ["RichardIII", "Richard III"],    
			["HenryVIII", "Henry VIII"]];                                                                                                                    
			for (var i=0; i<allHis.length; i++){
				var currentCheck = $("<input type='checkbox' class = 'histCheckbox' id="+allHis[i][0] + ">");
				currentCheck.css("top", -15-15*i);
				currentCheck.change(function(){
					selectPlays();
					});
					//and add the wee label
				var currentButton = $("<label class = 'checkbox "+ allHis[i][0] + "'>" + allHis[i][1] + "</label>")
				currentButton.css("top", -30 -15*i);
				hisButtons.append(currentCheck);
				hisButtons.append(currentButton);
			}

			//this function makes all the comedies have the same checked status as the "Comedy" box if you click it
			comcheck.change(function(){
				$(".comCheckbox").prop("checked", comcheck.prop("checked"));                                                         selectPlays();                                              
			});
			
			tragcheck.change(function(){
				
				$(".tragCheckbox").prop("checked", tragcheck.prop("checked"));                                                        selectPlays();                                                
			});

			hischeck.change(function(){
				$(".histCheckbox").prop("checked", hischeck.prop("checked"));                                                         selectPlays();                                                      
			});
			
			                                                                            
			playDiv.append(comButtons, tragButtons, hisButtons);                                                                                             
			playDiv.animate({opacity: 1}, 800, function(){});                                                                                               
			div.append(playDiv);                                                                                                                             
		})                                                                                                                                                   

		$('.selectData').click(function(){                                                                                               $('.selectData').animate({
			width: '100',
			"font-size": '12'}, 800, function(){}
			);
			$('.selectAPlay').animate({width: '100px', "font-size": '12px'}, 800, function(){});
			$('.Go').animate({width: '100px', "font-size": '12px'}, 800, function(){});
			
							  
			$('.buttonDiv').animate({
					left: '0',
					top: '0'
					}, 800, function(){
					});
			
			 var dataDiv = $("<div class = 'dataDiv'></div>");
									  

			//comcheck and comButtons are the "Comedy" button + label at the top that selects everything
			var c1=$("<input type='checkbox' class='dataCheck' id='Search'></input>");
			var c2=$("<input type='checkbox' class='dataCheck' id='Pie'></input>");
			var c3=$("<input type='checkbox' class='dataCheck' id='charTimelines'></input>");
			var c4=$("<input type='checkbox' class='dataCheck' id='playText'></input>");
			var c5=$("<input type='checkbox' class='dataCheck' id='CharacterChart'></input>");	
			var c= [c1,c2,c3,c4,c5] 
			for(var i=0;i<5;i++)
			{
				c[i].change(function(){
					selectPlays();
					});
			}
				var d1=$("<div class='data'><label class = 'checkbox'  >Circle Packing Search</label></div>");
				var d2=$("<div class='data'><label class = 'checkbox'  >Pie Graph by Lines</label></div>");						    var d3=$("<div class='data'><label class = 'checkbox'  >Charachter Timelines</label></div>");
				var d4=$("<div class='data'><label class = 'checkbox'  >Text of Play</label></div>");
				var d5=$("<div class='data'><label class = 'checkbox'  >Character Table</label></div>");						  	d1.prepend(c1);		
				d2.prepend(c2);		
				d3.prepend(c3);		
				d4.prepend(c4);								  
				d5.prepend(c5);								  
			dataDiv.append(d2,d3,d4,d5,d1);	
										  
			dataDiv.animate({opacity: 1}, 800, function(){});
			div.append(dataDiv); 							  
		})                                                                                                                                                   
	};                                                                                                                                                       


	return {"setup":setup, "selectedPlays":selectedPlays}                                                                                                                                   
}();                                                                                                                                                         
                                                                                                                                                             
$(document).ready(function(){                                                                                                                                
	$(".shakesData").each(function(){                                                                                                                       
		shakesData.setup();                                                                                                                                  
	});                                                                                                                                                      
});                                                                         