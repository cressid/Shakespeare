var HamletPlaces = function(){

	var setup = function(){
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
		
		for (var i=0; i<hamletData.length; i++){
			var character = hamletData[i]["speaker"] // character is of format CYMBELINE or something
			var inCharacters = false; //by default, we assume that the character is not in fact in the list of characters
			//console.log( i +  "characters length " + characters.length)
			var ln=hamletData[i]["line_number"];
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
	var vals=[];	
	for( var c=0;c<characters.length;c++)
	{ var dat=[];
		for(var x=0;x<scenes.length;x++)
		{	
			if(places[scenes[x]].indexOf(characters[c])>-1)
			{
					dat.push("X");
			}
			else{
				dat.push("");
			}
		}
		vals.push(dat);	
	}
		
// Table module ////////////////////////////////////
var Table = function module() {
    var opts = {
        width: 200,
        height: 200,
        margins: {top: 20, right: 20, bottom: 20, left: 20}
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
            var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0.1);
            var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom, 0.1);

            // SVG
            var parentDiv = d3.select(this).html('');
            var svg = parentDiv.append('svg').attr('width', opts.width).attr('height', opts.height);
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
            var rowHeaderCell = rowHeaderSvg.selectAll('rect.row-header-cell')
                .data(rowLabel);
            rowHeaderCell.enter().append('rect')
                .attr({
                    class:'row-header-cell',
                    width:offset+32,
					height:cellH,
                    x: 0,
                    y: function(d, i){return i * cellH + (cellH * colHeaderLevelNum)}
                })
                .style({fill:'#eee', stroke:'silver'});

            // Row header text
            rowHeaderCell.enter().append('text')
                .attr({
                    class:'row-header-content',
                    x: offset/2,
                    y: function(d, i){return i * cellH + (cellH * colHeaderLevelNum)},
                    dx: cellW/2,
                    dy: cellH/2
                })
                .style({fill:'black', 'text-anchor':'middle'})
                .text(function(d, i){return d;});

            // Col header
            var colHeaderCell = colHeaderSvg.selectAll('rect.col-header-cell')
                .data(columnLabel);
            colHeaderCell.enter().append('rect')
                .attr({
                    class:'col-header-cell',
                    width:cellW, height:cellH,
                    x: function(d, i){return offset+i * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0
                })
                .style({fill:'#eee', stroke:'silver'});

            // Col header text
            colHeaderCell.enter().append('text')
                .attr({
                    class:'col-header-content',
                    x: function(d, i){return offset+i * cellW + (cellW * rowHeaderLevelNum)},
                    y: 0,
                    dx: cellW/2,
                    dy: cellH/2
                })
                .style({fill:'black', 'text-anchor':'middle'})
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
                            x: function(d, i){return offset+ i * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH}
                        })
                        .style({fill:'white', stroke:'silver'});
                    // Text
                    cell.enter().append('text')
                        .attr({
                            class:'cell-content', width:cellW, height:cellH,
                            x: function(d, i){return offset+ i * cellW + (cellW * rowHeaderLevelNum)},
                            y: function(d, i){return pI * cellH + cellH},
                            dx: cellW/2,
                            dy: cellH/2
                        })
                        .style({fill:'black', 'text-anchor':'middle'})
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
console.log(vals);
var dataset = {
    rowLabel: characters,
    columnLabel: scenes,
    value: vals
};
                        
var width = 40*scenes.length+offset;
var height = 40*characters.length;

var table = Table().width(width).height(height);

d3.select('body')
    .datum(dataset)
    .call(table);
        
	}

	return {setup:setup}
}();

$(document).ready(function(){
	$(".HamletPlaces").each(function(){
		HamletPlaces.setup($(this));
	});
});