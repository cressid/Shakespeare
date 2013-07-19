var runSearch=function(){
var searchWord = function(div){
	
size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
	
var plays={"King John" : {"type":"History","characters":{}},
	"Richard II" : {"type":"History","characters":{}},
	"Henry IV" : {"type":"History","characters":{}},
	"Henry V" : {"type":"History","characters":{}},
	"Henry VI Part 1" : {"type":"History","characters":{}},
	"Henry VI Part 2" : {"type":"History","characters":{}},
	"Henry VI Part 3" : {"type":"History","characters":{}},
	"Richard III" : {"type":"History","characters":{}},
	"Henry VIII" : {"type":"History","characters":{}},
	"The Tempest" : {"type":"Comedy","characters":{}},
	"Two Gentlemen of Verona" : {"type":"Comedy","characters":{}},
	"Merry Wives of Windsor" : {"type":"Comedy","characters":{}},
    "Measure for measure" : {"type":"Comedy","characters":{}},
	"A Comedy of Errors" : {"type":"Comedy","characters":{}},
	"Much Ado about nothing" : {"type":"Comedy","characters":{}},
	"A Midsummer nights dream" : {"type":"Comedy","characters":{}},
	"Merchant of Venice" : {"type":"Comedy","characters":{}},
	"As you like it" : {"type":"Comedy","characters":{}},
	"Taming of the Shrew" :{"type":"Comedy","characters":{}},
	"Loves Labours Lost" :{"type":"Comedy","characters":{}},	   
	"Alls well that ends well" : {"type":"Comedy","characters":{}},
	"Twelfth Night" : {"type":"Comedy","characters":{}},
	"A Winters Tale" : {"type":"Comedy","characters":{}},
	"Pericles" : {"type":"Comedy","characters":{}},
	"Troilus and Cressida" : {"type":"Tragedy","characters":{}},
	"Coriolanus" : {"type":"Tragedy","characters":{}},
	"Titus Andronicus" : {"type":"Tragedy","characters":{}},	
	"Romeo and Juliet" : {"type":"Tragedy","characters":{}},
	"Timon of Athens" : {"type":"Tragedy","characters":{}},
	"Julius Caesar" : {"type":"Tragedy","characters":{}},
	"macbeth" : {"type":"Tragedy","characters":{}},
	"Hamlet" : {"type":"Tragedy","characters":{}},
	"King Lear" : {"type":"Tragedy","characters":{}},
	"Othello" : {"type":"Tragedy","characters":{}},	
	"Antony and Cleopatra" : {"type":"Tragedy","characters":{}},
	"Cymbeline" : {"type":"Tragedy","characters":{}}};
var temp=plays;
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
	
var dat=null;

var setup = function(div,w){	
	var mydiv=$('<div id=mySearchDiv><div>');
	$(div).append(mydiv);
	var input=$('<input class=mysearch></input>',{type: "text", size: 200, align: "center"});
	input.val(w);
	var center=$('<center></center>');
    var but=$('<button class="searchbutton">Search for Word</button>');
	var texts=$('<lablel class=text></label>');
	 var lines=$('<div class="lines"></div>');
	lines.append(texts);
	but.on('click',function(){
		var word= input.val();
		d3.selectAll("#mySearchDiv svg")
       .remove();
		
		search(word);
		texts.html("");
		
		});
	center.append(input,but,lines);
    $(div).prepend(center);
	
	
	
	var search=function(word){
		plays=temp;
		
		
		
		
		var mydat=$('.Search').data('text').split(',');
		console.log(mydat);
		var AllData=[];
		
		for(var i=0;i<mydat.length;i++)
		{
			var readPlay=playLookup[mydat[i]];
			console.log(mydat[i]);
			for(var j=0;j<readPlay.length;j++)
			{
				AllData.push(readPlay[j]);
			}
		}
		
		
		var lineDat={};
		for (var i=0; i<AllData.length; i++){
		if(AllData[i]["text_entry"].indexOf(word)>-1){
		if(AllData[i]["play_name"]!=null){
			
			var item=plays[AllData[i]["play_name"]]["characters"][AllData[i]["speaker"]];
			if(item!=null){plays[AllData[i]["play_name"]]["characters"][AllData[i]["speaker"]].push(AllData[i]["line_number"]+ ": " +AllData[i]["text_entry"]);}
			else{plays[AllData[i]["play_name"]]["characters"][AllData[i]["speaker"]]=[AllData[i]["line_number"]+ ": " +AllData[i]["text_entry"]];}
		}
		}
		}
		var hist=null;
		var com=null;
		var trag=null;
		var chars={};
			$.getJSON("flare.json", function(data) {
				plays=temp;
				hist=data.children[0].children[0].children;
				com=data.children[0].children[1].children;
				trag=data.children[0].children[2].children;
				for( var i=0;i<hist.length;i++){
				hist[i].children=[];
					for(key in plays[hist[i]["name"]]["characters"])
					{
						
						hist[i].children.push({"name":key, "size": plays[hist[i]["name"]]["characters"][key].length});
						lineDat[hist[i]["name"]+key]=plays[hist[i]["name"]]["characters"][key];
						
					}	
					chars["name"]=plays[hist[i]["name"]]["characters"];
				}
				for( var i=0;i<com.length;i++){
					com[i].children=[];
					for(key in plays[com[i]["name"]]["characters"])
					{
						
						com[i].children.push({"name":key, "size": plays[com[i]["name"]]["characters"][key].length});
						lineDat[com[i]["name"]+key]=plays[com[i]["name"]]["characters"][key];
						
					}
					chars["name"]=plays[com[i]["name"]]["characters"];
				}
				for( var i=0;i<trag.length;i++){
					trag[i].children=[];
				
					
					for(key in plays[trag[i]["name"]]["characters"])
					{
						
						trag[i].children.push({"name":key, "size": plays[trag[i]["name"]]["characters"][key].length});
						lineDat[trag[i]["name"]+key]=plays[trag[i]["name"]]["characters"][key];
				
					}
					chars["name"]=plays[trag[i]["name"]]["characters"];
				}
				var dat=data
			
				draw(dat,lineDat,texts,div);
				for( var i=0;i<trag.length;i++){plays[trag[i]["name"]]["characters"]={};}
				for( var i=0;i<com.length;i++){plays[com[i]["name"]]["characters"]={};}
				for( var i=0;i<hist.length;i++){plays[hist[i]["name"]]["characters"]={};}
				
		});
			
		}

	search(w);
		


				
		
	}
	return {setup:setup}
}();

$(document).ready(function(){
	
	setTimeout( function(){
		$(".Search").each(function(){
		searchWord.setup($(this),"crown");
	});}, 10 );
	
	});



var draw= function(datas,myplay,textIN,div) {

	
	
			 var w = $(div).width(),
    h = $(div).height(),
    r = Math.min(h,w),
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) { return d.size; })

var vis = d3.select("#mySearchDiv").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

	
  node = root = datas;

  var nodes = pack.nodes(root);
	
  vis.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { return "parent"  })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { 
		  if(d.children!=null){return zoom(node == d ? root : d);}
							   else{
								   var words=d.name +": <br>"; 
								 
								 for(var i=0;i<myplay[d.parent.name+d.name].length;i++){
									 words+=myplay[d.parent.name+d.name][i]+"<br>";
								 }
									textIN.html(words)
											   
											   
											   }});

  vis.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return (d.r > 30 && d.r<100)? 1 : 0; })
      .text(function(d) { if(d.name!=null){return d.name.substring(0,d.r/4);}
						 else{return d.name;} });

  d3.select(window).on("click", function() { zoom(root); });


function zoom(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = vis.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 && k * d.r < 300 ? 1 : 0; })
	 .text(function(d) { if(d.name!=null){return d.name.substring(0,k*d.r/4);}
						 else{return d.name;} });

  node = d;
  d3.event.stopPropagation();
}
};		
};