var charTimelines = function(playName){

	
//we need a function that will normalize each play so that each play starts at line 0
//it will normalize the play when called
//it will call the js file and
var myplay;
var normalizePlayLines = function(play){
var normalizeBy = parseInt(play[0].line_id);
//console.log("normalizeBy" + normalizeBy);
//console.log(play + play.length);
for (i=0; i<play.length; i++){
play[i].line_id = String(parseInt(play[i].line_id - normalizeBy));
}
}

//we want to make a function that will return a dictionary as follows
//{character: [a list of all his line numbers]}
var charLineNums = function(play){
var charList = []; //will have format [HAMLET, CLAUDIUS]
var charListSpeakers = {}; //will have format {HAMLET:[1, 2, 3, 18, 19...], CLAUDIUS:[8, 9, 10, 28,...]};
//var lineChar={}//form {1:"hamlet", 2: "claudius"}
var inCharacters = false; //by default, we assume that the character in question is not in the list of characters
for (var i=0; i<play.length; i++){//loop through every line in the play
var character = play[i]["speaker"]; //this is the character speaking the current line
//console.log(jQuery.inArray(character, charList))
if(charList.indexOf(character)>-1){
inCharacters = true; //now we know that the inCharacters variable is true
//lineChar[play[i].line_id]=character; //then we add the character to the line id 
charListSpeakers[character].push(i);
} 
else{

if (character === "Stage Directions"){//just skip if we're talking about stage directions
} else{
charList.push(character);
charListSpeakers[character] = [i];	
//lineChar[play[i].line_id]=character; //then we add the character to the line id 
}
}
}
	
return [charList, charListSpeakers]
}
 
//this function builds a data set for a play of the following format:
//[4, 2, 1, 1, 1, ...] where 4 represents the beginning of an act, 2 represents the beginning of a scene, and 1 represents a normal line
//these will be the heights on the "bar graphs" we make
var buildDataSet = function(play){
var dataSet = {"Acts":[],"Scenes":[]};
	
for (var i=0; i<play.length; i++){
if (play[i].text_entry.substring(0, 3) === "ACT" & play[i].speaker === "Stage Directions"){
//this is to make all the "Act" lines be 4x as big as all the other ones
dataSet["Acts"].push(i);
} else if (play[i].text_entry.substring(0, 5) === "SCENE" & play[i].speaker === "Stage Directions"){
//this makes all the "Scene" lines 2x as big as all the other ones
dataSet["Scenes"].push(i);
} 
}
	
return dataSet
}
 
//now we need a function that generates a timeline based on the length of the play
//it will color the timeline according to whether the character is speaking
var width = 5000;
var height = 50;
var space=.2
var makeTimeLine = function(play,data, character,lines,wordLoc){

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
	svg.append('text')
      .attr('x', '20px')
	  .attr('y', '38px')
      .text(character);
var tooltip = d3.select("body")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden")
				.style("background","lightsteelblue")
				.text("love");	
var rectangle = svg.append("rect")

                            .attr("x", 0)
                            .attr("y", 40)
                            .attr("width", (play.length-5)*space)
                            .attr("height", 10)
							.attr("fill",  "silver");


var ActRect=svg.selectAll("rect");
ActRect.data(data["Acts"])
.enter()
.append("rect")
							.attr("x", function(d){return d*space})
                            .attr("y", 10)
                            .attr("width", 2)
                            .attr("height", 40)
							.attr("fill",  "silver");
var SceneRect=svg.selectAll("rect");
ActRect.data(data["Scenes"])
.enter()
.append("rect")
							.attr("x", function(d){return d*space})
                            .attr("y", 30)
                            .attr("width", 1)
                            .attr("height", 10)
							.attr("fill",  "silver");
		
//now we're adding rectangles to this thing
var rect=svg.selectAll("rect");
	
rect.data(lines[character])
.enter()
.append("rect")
.attr("x", function(d, i) {
return d*space; //so they're not all on top of each other
})
.attr("y", function(d){
	if(wordLoc[character]!=null){
		if(wordLoc[character].indexOf(d)>-1){return height-13}};
return height-10;
})
.attr("fill",  function(d){
	if(wordLoc[character]!=null){
		if(wordLoc[character].indexOf(d)>-1){return "magenta"};
	}return "blue"})
.attr("width", 2) //so that the entire rectangles all fit together!
.attr("height", function(d) {
if(wordLoc[character]!=null){
		if(wordLoc[character].indexOf(d)>-1){return 13};
	}return 10;
})
.on("mouseover", function(d){if(wordLoc[character]!=null){
		if(wordLoc[character].indexOf(d)>-1){return tooltip.style("visibility", "visible").text(play[d]["text_entry"])}}else{return null}})
.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

var txt=svg.selectAll("text");
	
txt.data(data["Acts"])
.enter()
.append('text')
.attr("x", function(d, i) {
return d*space+5; //so they're not all on top of each other
})
.attr("y", function(d){
return 10;
})
      .text(function(d,i){return play[d]["text_entry"]});

          
      };
	
var search=function(word,play)
{
		var locs={};
		for (var i=0; i<play.length; i++){
			
		if(play[i]["text_entry"].indexOf(word)>-1){
		
		if(play[i]["play_name"]!=null){
		
			var speaker=play[i]["speaker"]
			if(locs[speaker]!=null)
			   {
			   locs[speaker].push(i);
			 }
			 else{
				 locs[speaker]=[i];}
		}
		}
		}
	return locs
}
 
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
var myplay=playLookup[title];	
	var input=$('<input class=mysearch></input>',{type: "text", size: 200, align: "center"});
	input.val("love");
    var but=$('<button class="searchbutton">Search for Word</button>');
	but.on('click',function(){
		var word= input.val();
		d3.selectAll("svg")
       .remove();
		var highlight=search(word,playLookup[title]);
		for (var i=0; i<TwoGents[0].length; i++){
//for (var i=0; i<1; i++){
	
makeTimeLine(myplay,data,TwoGents[0][i],TwoGents[1],highlight);
}
		
		});
	$(div).append(input,but);
    
	
normalizePlayLines(myplay);
var TwoGents = charLineNums(myplay);

var data = buildDataSet(myplay);
	
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
	svg.append('text')
      .attr('x', '20px')
	  .attr('y', '38px')
      .text(myplay[0]["play_name"]);
var highlight=	search("love",playLookup[title]);
for (var i=0; i<TwoGents[0].length; i++){
//for (var i=0; i<1; i++){
	
makeTimeLine(myplay,data,TwoGents[0][i],TwoGents[1],highlight);
}
	
}
 
return {"setup":setup}
}();

$(document).ready(function(){
$(".charTimelines").each(function(){
charTimelines.setup($(this),this.id);
});
});