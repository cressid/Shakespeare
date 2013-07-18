var runPie=function(){
var Pie = function(){



	var setup = function(div,title){
		
	var mydiv=$('<div id=myPie'+title+'><div>');
	$(div).append(mydiv);
var playLookup={"Hamlet":Hamlet,
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
"TroilusAndCressida":TroilusAndCressida,"TwelfthNight":TwelfthNight,"TwoGentlemenOfVerona":TwoGentlemenOfVerona

};	
		
		var myplay=playLookup[title];
		var w = $(div).width()*2,                       
		h = $(div).width()*1.4;                         
		$(div).css('font-size',w/20);                        //height
		var r = h/4;                            //radius
		     //builtin range of colors
		
		//note: characters and charsWithLines are in the SAME ORDER (so Hamlet would be the first in both if he were first in one)
		var characters = []; //will have format [HAMLET, CLAUDIUS]
		var charsWithLines = {}; //will have format {HAMLET:100000, CLAUDIUS:583};
		
		/*
		try a data array like so:
		data = [[list of characters], {associative array w/ format speaker: line number}]
		*/
		
		for (var i=0; i<myplay.length; i++){
			var character = myplay[i]["speaker"] // character is of format CYMBELINE or something
			var inCharacters = false; //by default, we assume that the character is not in fact in the list of characters
			//console.log( i +  "characters length " + characters.length)
			for (var j=0; j<characters.length; j++){ //looping through every character
				//console.log("this is so");
				if (characters[j] == character){ //if the speaker is in the characters
					inCharacters=true; //we set the inCharacters variable to true
					charsWithLines[String(character)]++; //then we add 1 to the value in charswith Lines
					//console.log("real legit " + character + charsWithLines.character);
					break;
				}
			}
			//console.log("past the for loop " + inCharacters);
			if (inCharacters == false){
				characters.push(character);
				charsWithLines[String(character)] = 1;
			}
		}
		characters.splice(characters.indexOf("Stage Directions"),1);
		characters.splice(characters.indexOf("All"),1);
		
		var color=d3.scale.linear()
    .domain([0, characters.length/3,characters.length/1.5])
    .range(["blue", "skyblue","purple"]); 
		
		var data = [];
		var others=0;
		//console.log("cymbeline incoming " + charsWithLines.CYMBELINE);
		
		for (var m=0; m<characters.length; m++){
			
			if(charsWithLines[characters[m]]>myplay.length/80){
			var newArray = {};
			newArray.label = characters[m];
			var x=characters[m];
			newArray.value=charsWithLines[x];
			data.push(newArray);
			}
			else{
				others+=charsWithLines[characters[m]];
			}
		
		}
		var newArray = {};
			newArray.label = "Others";
			var x=characters[m];
			newArray.value=others;
			data.push(newArray);
		//console.log("data is " + data);
		
		var vis = d3.select('#myPie'+title)
			.append("svg:svg")              //create the SVG element inside the <body>
			.data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
			.append("svg:g")//make a group to hold our pie chart
            .attr("transform", "translate(" + w/2 + "," + h/2 + ")")    //move the center of the pie chart from 0, 0 to radius, radius
			
		
			
		
		var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
 
		var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
 
		var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
               arcs.append("svg:text")
			   .style("font-size",r/10)
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) +")";        //this gives us a pair of coordinates like [50, 50]
            })
			   
            .attr("text-anchor", function(d) {
    // are we past the center?
    return (d.endAngle + d.startAngle)/2 > Math.PI ?
        "end" : "start";
})
			.attr("transform", function(d) {
    var c = arc.centroid(d),
        x = c[0],
        y = c[1],
		rad=r*1.1,
		tilt=(d.endAngle + d.startAngle)/2,
		
        // pythagorean theorem for hypotenuse
        h = Math.sqrt(x*x + y*y);
    return "translate(" + (x/h * rad) +  ',' +
       (y/h * rad) +  ")" +"rotate("+tilt*7+")"; 
})
			
            .text(function(d, i) { return data[i].label +" "+data[i].value; });        //get the label from our original data array
	}
  
	return {setup:setup}
}();

$(document).ready(function(){
	setTimeout( function(){
	$(".Pie").each(function(){
		Pie.setup($(this),this.id);
	});
	},10);
});
};