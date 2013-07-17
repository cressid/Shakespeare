var playText = function(){

	var setup = function(div,title){
		var playLookup={"TwoGentlemenOfVerona":TwoGentlemenOfVerona,"Hamlet":Hamlet,
"ComedyOfErrors":ComedyOfErrors,"MidsummerNightsDream":MidsummerNightsDream,
"WintersTale":WintersTale,"AllsWellThatEndsWell":AllsWellThatEndsWell,				
"AntonyAndCleopatra":AntonyAndCleopatra,"AsYouLikeIt":AsYouLikeIt,"Coriolanus":Coriolanus,
"Cymbeline":Cymbeline,"HenryIV":HenryIV,"HenryV":HenryV,"HenryVIPart1":HenryVIPart1,
"HenryVIPart2":HenryVIPart2,"HenryVIPart3":HenryVIPart3,"HenryVIII":HenryVIII,
"JuliusCaesar":JuliusCaesar,"KingJohn":KingJohn, "KingLear":KingLear, 
"LovesLaboursLost":LovesLaboursLost, "Macbeth":Macbeth,"MeasureForMeasure":MeasureForMeasure,
"MerchantOfVenice":MerchantOfVenice,"MerryWivesOfWindsor":MerryWivesOfWindsor,
"MuchAdoAboutNothing":MuchAdoAboutNothing,"Othello":Othello,"Pericles":Pericles,"RichardII":RichardII,
"RichardIII":RichardIII,"RomeoAndJuliet":RomeoAndJuliet,"TamingOfTheShrew":TamingOfTheShrew,
"TheTempest":TheTempest,"TimonOfAthens":TimonOfAthens,"TitusAndronicus":TitusAndronicus,
"TroilusAndCressida":TroilusAndCressida,"TwelfthNight":TwelfthNight

};	
var mydiv=$('<div id=myText><div>');
	$(div).append(mydiv);		
		
var myplay=playLookup[title];	
		var offset=145;
		var w = 900,                        //width
		h = 900,                            //height
		r = 300,                            //radius
		color = d3.scale.category20c();     //builtin range of colors
		
		//note: characters and charsWithLines are in the SAME ORDER (so Hamlet would be the first in both if he were first in one)
		var characters = []; //will have format [HAMLET, CLAUDIUS]
		var charsWithLines = {}; //will have format {HAMLET:100000, CLAUDIUS:583};
		var places={}
        var scenes=[];
		/*
		try a data array like so:
		data = [[list of characters], {associative array w/ format speaker: line number}]
		*/
		
		for (var i=0; i<myplay.length; i++){
			var character = myplay[i]["speaker"] // character is of format CYMBELINE or something
			var inCharacters = false; //by default, we assume that the character is not in fact in the list of characters
			
			var ln=myplay[i]["line_number"];
            var place=ln.split(".");
			var scene=place[0]+"."+place[1];
			if(scene!=".undefined"){
            if(scenes.indexOf(scene)==-1){
         		
                scenes.push(scene);
				places[scene]=[];
            }
				if(places[scene].indexOf(character)==-1){
					places[scene].push(character);
					
				}
			}
				
			
			for (var j=0; j<characters.length; j++){ //looping through every character
				
				if (characters[j] == character){ //if the speaker is in the characters
					inCharacters=true; //we set the inCharacters variable to true
					charsWithLines[String(character)]++; //then we add 1 to the value in charswith Lines
					break;
				}
			}
			if (inCharacters == false){
				characters.push(character);
				charsWithLines[String(character)] = 1;
			}
		}
		characters.splice(characters.indexOf("Stage Directions"),1);
		characters.splice(characters.indexOf("All"),1);
		var center=$("<center></center>");
		var dropdown=$('<select id="char"></select>');
		dropdown.append($('<option>None</option>'));
		for(var i=0;i<characters.length;i++){
			dropdown.append($("<option>"+characters[i]+"</option>"));
		}
		center.append(dropdown);
var texts=$('<lablel class=text></label>');
	 var lines=$('<div></div>');
lines.append(texts);

		mydiv.append(center,lines);
		
		$("#char").change(function(){
  			var id = $(this).find("option:selected").text();
			write(texts,myplay,id)	;
  });
	write(texts,myplay,"None")	;
	function write(texts, myplay,character)	
		{
		var currentSpeaker=null;
		
		console.log(character);
		var text="";
		for (var i=0; i<myplay.length; i++){
			if(myplay[i]["speaker"]=="Stage Directions")
			{
				if(myplay[i]["text_entry"].indexOf("ACT")>-1||myplay[i]["text_entry"].indexOf("SCENE")>-1)
				{text=text+"<br><b><center>"+myplay[i]["text_entry"]+"</b></center>"}
				else{
					if(myplay[i]["text_entry"].indexOf(character)>-1)
					{text=text+"<br><mark><i>"+myplay[i]["text_entry"]+"</i></mark>"}
					else{text=text+"<br><i>"+myplay[i]["text_entry"]+"</i>";}
				}
			}
			
			else {
				
			if(currentSpeaker!=myplay[i]["speaker"]){
				if(myplay[i]["speaker"]==character){text=text+"<mark><br><b>"+myplay[i]["speaker"]+"</b><br>"+myplay[i]["text_entry"]+"</mark>";}
			else{text= text+"<br><b>"+myplay[i]["speaker"]+"</b><br>"+myplay[i]["text_entry"];}
				currentSpeaker=myplay[i]["speaker"];
			}
			else{
				if(myplay[i]["speaker"]==character){text=text+"<mark><br>"+myplay[i]["text_entry"]+"</mark>";}
				else{text= text+"<br>"+myplay[i]["text_entry"];}}
		}
		}
		texts.html(text);
		}
	}

	return {setup:setup}
}();

$(document).ready(function(){
	setTimeout( function(){$(".playText").each(function(){
		playText.setup($(this),this.id);
	});}, 10 );
	
});