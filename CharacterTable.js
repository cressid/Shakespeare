var runTable=function(){
var CharacterChart = function(){

	var setup = function(div,title){
		var mydiv=$('<div id=myTable'+title+'><div>');
		$(div).append(mydiv);
var playLookup={"TwoGentlemenOfVerona":TwoGentlemenOfVerona,"Hamlet":Hamlet,
"ComedyOfErrors":ComedyOfErrors,"MidsummerNightsDream":MidsummerNightsDream,
"WintersTale":WintersTale,"AllsWellThatEndsWell":AllsWellThatEndsWell,				
"AntonyAndCleopatra":AntonyAndCleopatra,"AsYouLikeIt":AsYouLikeIt,"Coriolanus":Coriolanus,
"Cymbeline":Cymbeline,"HenryIVPart1":HenryIV,"HenryV":HenryV,"HenryVIPart1":HenryVIPart1,
"HenryVIPart2":HenryVIPart2,"HenryVIPart3":HenryVIPart3,"HenryVIII":HenryVIII,
"JuliusCaesar":JuliusCaesar,"KingJohn":KingJohn, "KingLear":KingLear, 
"LovesLaboursLost":LovesLaboursLost, "Macbeth":Macbeth,"MeasureForMeasure":MeasureForMeasure,
"MerchantOfVenice":MerchantOfVenice,"MerryWivesOfWindsor":MerryWivesOfWindsor,
"MuchAdoAboutNothing":MuchAdoAboutNothing,"Othello":Othello,"Pericles":Pericles,"RichardII":RichardII,
"RichardIII":RichardIII,"RomeoAndJuliet":RomeoAndJuliet,"TamingOfTheShrew":TamingOfTheShrew,
"Tempest":TheTempest,"TimonOfAthens":TimonOfAthens,"TitusAndronicus":TitusAndronicus,
"TroilusAndCressida":TroilusAndCressida,"TwelfthNight":TwelfthNight

};
var myplay=playLookup[title];	
var thisdiv=$('<div id='+title+'><div>');
		mydiv.append(thisdiv);
		var w=$(mydiv).width()*5;
		var h=$(mydiv).height();
		$(div).css('font-size',Math.min($(div).width()/40,10))		
		var offset=0;

		
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
		
	var vals=[];	
	var overlap=[];	
	characters.splice(characters.indexOf("Stage Directions"),1);
	characters.splice(characters.indexOf("All"),1);
	for( var c=0;c<characters.length;c++)
	{
	var dat=[];
	 var cast=[];
		for(var x=0;x<scenes.length;x++)
		{
			var index =places[scenes[x]].indexOf(characters[c]);
			if(index>-1)
			{
					dat.push("X");
				for(var n=0;n<places[scenes[x]].length;n++){
					cast.push(places[scenes[x]][n]);
					
				}
				
			}
			else{
				dat.push("");
			}
			
		}
	 
	 overlap.push(cast);
		vals.push(dat);	
	}
		var dualCast=[];
		
var dualCast=[];
for (var h=0;h<overlap.length;h++)
{
	double=[];
		for(var g=0;g<characters.length;g++)
		{
			if(overlap[h].indexOf(characters[g])==-1)
			{
				double.push(characters[g]);
			}
		}
	dualCast.push(double);
	
}
	


// Table module ////////////////////////////////////
var Table = function module() {
    var opts = {
        width: 0,
        height: 0,
        margins: {top: 2, right: 2, bottom: 2, left: 2}
    };
	
    function exports(selection) {
        selection.each(function (dataset) {
			
            //________________________________________________
            // Data
            //________________________________________________
            var columnLabel = dataset.columnLabel;
            var rowLabel = dataset.rowLabel;
            var value = dataset.value;

            //________________________________________________
            // DOM preparation
            //________________________________________________
            // Size
            var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0);
            var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom,0 );

            // SVG
            var parentDiv = d3.select(this).html('');
            var svg = parentDiv.append('svg').attr('width', w).attr('height', opts.height);
			var tooltip = d3.select("#myTable"+title+"")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden")
				.style("background","lightsteelblue")
				.text("test");
            var visSvg = svg.append('g').attr('class', 'vis-group').attr('transform', 'translate(' + opts.margins.left + ',' + opts.margins.top + ')');
	
            var tableBodySvg = visSvg.append('g').attr('class', 'chart-group');
            var tableHeaderSvg = visSvg.append('g').attr('class', 'chart-group');
            var rowHeaderSvg = tableHeaderSvg.append('g').attr('class', 'row-header');
            var colHeaderSvg = tableHeaderSvg.append('g').attr('class', 'col-header');
			

            //________________________________________________
            // Table
            //________________________________________________
            var rowHeaderLevelNum = 1;
            var colHeaderLevelNum = 1;
            var cellH = chartH / (value.length + rowHeaderLevelNum);
			
            var cellW = chartW / (value[0].length + colHeaderLevelNum+offset/scenes.length);
		
		

	
            // Row header
            var rowHeaderCell = rowHeaderSvg.selectAll('#rect.row-header-cell')
                .data(rowLabel);
          	
            rowHeaderCell.enter().append('rect')
                .attr({
                    class:'row-header-cell',
                    width:cellW*3,
					height:cellH,
					text:function(d,i){return dualCast[i]},
                    x: 0,
                    y: function(d, i){return i * cellH + (cellH * colHeaderLevelNum)}
                })
                .style({fill:'#eee', stroke:'silver'})
				.on("mouseover", function(event){return tooltip.style("visibility", "visible").text(dualCast[characters.indexOf(event)])})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-height/2)+"px").style("left",(event.pageX-w*2)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
 

            // Row header text
            rowHeaderCell.enter().append('text')
                .attr({
                    class:'row-header-content',
                    x: cellW/8,
                    y: function(d, i){return i * cellH + (cellH * colHeaderLevelNum)},
                    dx: 0,
                    dy: cellH/2
                })
                .style({fill:'black', 'text-anchor':'left','font-size':Math.min(w/40,10)})
                .text(function(d, i){return d;})
		
          		
            // Col header
            var colHeaderCell = colHeaderSvg.selectAll('rect.col-header-cell')
                .data(columnLabel);
            colHeaderCell.enter().append('rect')
                .attr({
                    class:'col-header-cell',
                    width:cellW, height:cellH,
                    x: function(d, i){return offset+(i+2) * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0
                })
                .style({fill:'#eee', stroke:'silver'})
				

            // Col header text
            colHeaderCell.enter().append('text')
                .attr({
                    class:'col-header-content',
                    x: function(d, i){return offset+(i+2) * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0,
                    dx: cellW/2,
                    dy: cellH/2
                })
                .style({fill:'black', 'text-anchor':'left','font-size':Math.min(w/40,10)})
                .text(function(d, i){return d;});
				
            // Body
            var row = tableBodySvg.selectAll('g.row')
                .data(value);
            row.enter().append('g')
                .attr('class', 'cell row')
                .each(function(pD, pI){
                    // Cells
                    var cell = d3.select(this)
                        .selectAll('rect.cell')
                        .data(pD);
                    cell.enter().append('rect')
                        .attr({
                            class:'cell', width:cellW, height:cellH,
                            x: function(d, i){return offset+ (i+2) * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH}
                        })
                        .style({fill:'white', stroke:'silver'});
                    // Text
                    cell.enter().append('text')
                        .attr({
                            class:'cell-content', width:cellW, height:cellH,
                            x: function(d, i){return offset+ (i+2) * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH},
                            dx: cellW/2,
                            dy: cellH/2
                        })
                        .style({fill:'black', 'text-anchor':'middle','font-size':Math.min(w/40,10)})
                        .text(function(d, i){return d;});
                });
        });
    }

    exports.opts = opts;
    createAccessors(exports, opts);
    return exports;
};
  
// Helper function ////////////////////////////////////                       
var createAccessors = function(visExport) {
    for (var n in visExport.opts) {
        if (!visExport.opts.hasOwnProperty(n)) continue;
        visExport[n] = (function(n) {
            return function(v) {
                return arguments.length ? (visExport.opts[n] = v, this) : visExport.opts[n];
            }
        })(n);
    }
};                        
 
// Usage ////////////////////////////////////   

var dataset = {
    rowLabel: characters,
    columnLabel: scenes,
    value: vals
};
                        
var width = Math.min(w/2,40)*scenes.length;
var height =  Math.min(h,40)*characters.length;
var table = Table().width(width).height(height);

d3.select("#myTable"+title+"")
    .datum(dataset)
    .call(table);
        
	}

	return {setup:setup}
}();

$(document).ready(function(){
	setTimeout( function(){
		
	$(".CharacterChart").each(function(){
		CharacterChart.setup($(this),this.id);
	});
	},100);
});
}