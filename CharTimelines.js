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
//var charListSpeakers = {}; //will have format {HAMLET:[1, 2, 3, 18, 19...], CLAUDIUS:[8, 9, 10, 28,...]};
var lineChar={}//form {1:"hamlet", 2: "claudius"}
var inCharacters = false; //by default, we assume that the character in question is not in the list of characters
for (var i=0; i<play.length; i++){//loop through every line in the play
var character = play[i]["speaker"]; //this is the character speaking the current line
//console.log(jQuery.inArray(character, charList))
if(charList.indexOf(character)>-1){
inCharacters = true; //now we know that the inCharacters variable is true
lineChar[play[i].line_id]=character; //then we add the character to the line id 
} 
else{

if (character === "Stage Directions"){//just skip if we're talking about stage directions
} else{
charList.push(character);
lineChar[play[i].line_id]=character; //then we add the character to the line id 
}
}
}
	console.log(charList);
return [charList, lineChar]
}
 
//this function builds a data set for a play of the following format:
//[4, 2, 1, 1, 1, ...] where 4 represents the beginning of an act, 2 represents the beginning of a scene, and 1 represents a normal line
//these will be the heights on the "bar graphs" we make
var buildDataSet = function(play){
var dataSet = [];
	
for (var i=0; i<play.length; i++){
if (play[i].text_entry.substring(0, 3) === "ACT" & play[i].speaker === "Stage Directions"){
//this is to make all the "Act" lines be 4x as big as all the other ones
dataSet.push(4);
} else if (play[i].text_entry.substring(0, 5) === "SCENE" & play[i].speaker === "Stage Directions"){
//this makes all the "Scene" lines 2x as big as all the other ones
dataSet.push(2);
} else{
dataSet.push(1);
}
}
return dataSet
}
 
//now we need a function that generates a timeline based on the length of the play
//it will color the timeline according to whether the character is speaking
var width = 5000;
var height = 50;

var makeTimeLine = function(data, character,lines){

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
	svg.append('text')
      .attr('x', '20px')
	  .attr('y', '38px')
      .text(character);

//now we're adding rectangles to this thing
var rect=svg.selectAll("rect");
	
rect.data(data)
.enter()
.append("rect")
.attr("x", function(d, i) {
return i; //so they're not all on top of each other
})
.attr("y", function(d){
return height - 10*d;
})
.attr("fill", function(d, i){

if (lines[i] == character){
return "blue"
} else{
return "gray"
}
})
.attr("width", width / data.length) //so that the entire rectangles all fit together!
.attr("height", function(d) {
return d*10;
})

          
      };
	

 
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
	console.log(myplay)
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
//for (var i=0; i<TwoGents[0].length; i++){
for (var i=0; i<1; i++){
	console.log(i);
makeTimeLine(data,TwoGents[0][i],TwoGents[1]);
}
	
}
 
return {"setup":setup}
}();

$(document).ready(function(){
$(".charTimelines").each(function(){
charTimelines.setup($(this),this.id);
});
});