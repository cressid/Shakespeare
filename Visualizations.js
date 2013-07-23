var runVis=function(){
var visual = function(){

	var setup = function(div){
	var playArray={"King John" : {"type":"History","characters":{}},
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
	"Troilus and Cressida" : {"type":"Comedy","characters":{}},
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
	
	
	var keys={'Pie':"Pie Graph of Lines by Character", 'charTimelines': "Searchable Timelines by Character",'Search':'Circle Packing Search','playText':'Text of Play','CharacterChart':"Table of Characters by Scenes"};	
	var plays=$('.visual').data('plays').split(',');
	var vis=$('.visual').data('vis').split(',');	
	var bigdiv=$('<div class=backDisplayDiv></div>');
		var functionDict={'Pie':runPie,'Search':runSearch,'playText':runText,'CharacterChart':runTable,
						  'charTimelines':runTimeline};
	for(var i =0;i<vis.length;i++){
		
		if(vis[i]=="Search")
		{	
			
			var Mysearch=$("<div class='Search'  data-text = "+plays.join()+" id =srch></div>");
			var thisbut=$("<button id=ExpandBut>+</button>");
		 	thisbut.on("click",function(){
				
				if(Mysearch.width()<=300){
					Mysearch.width(600);
					Mysearch.height(600);
					thisbut.html('-')
				}
				else{
					Mysearch.width(300);
					Mysearch.height(300);
					thisbut.html('+')
				}
				
			});
			Mysearch.append(thisbut);
			if(vis.length<3)
			{
				var back=document.getElementById('srch');
				$(Mysearch).width(90/vis.length+'%');
					$(Mysearch).height('90%');
			}
	bigdiv.append(Mysearch);	
		}
		else{
			
			//var backdiv=$('<div class=backdiv id=background'+i+'></div>');
			
			var tabs=$('<div class="tabs"></div>');
			
			var ul=$('<ul></ul>');
			
			//NOW WE'RE ADDING THE BUTTONS THAT WILL LET US ADD PLAYS AND CHANGE DATA VISUALIZATIONS
			var changePlay=$("<div class=changePlay><button class = 'btn btn-large changePlay' data-toggle='dropdown'>Select A Play</button></div>");
			
			//BUILDING THE SELECT PLAY DROPDOWN
			var changePlayDrop=$('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">');
			var LIstOfPlays=$("<li class='listOfPlays'></li>");
			changePlayDrop.append(LIstOfPlays);
			var fluidDiv=$('<div class="row-fluid" style="width: 400px;"></div>');
			LIstOfPlays.append(fluidDiv);
			var comUL=$('<ul class="ComedyUL"></ul>');
			var tragUL=$('<ul class="TragedyUL"></ul>');
			var hisUL=$('<ul class="HistoryUL"></ul>');
			var comcounter = 0;
			var tragcounter=0;
			var hiscounter=0;
			for (var i in playArray){
				if (playArray[i].type == "Comedy"){
					comUL.append("<li class='ComedyUL' style='top:"+comcounter+"ems;'>"+i+"</li>");
					comcounter++
				}
				else if (playArray[i].type == "History"){
					hisUL.append("<li class='HistoryUL' style='top:"+hiscounter+"ems;'>"+i+"</li>");
					hiscounter++
				}
				else{
					tragUL.append("<li class='TragedyUL' style='top:"+tragcounter+"ems;'>"+i+"</li>");
				}
			};
			
			fluidDiv.append(comUL, tragUL, hisUL);
			
			changePlay.append(changePlayDrop);
			ul.append(changePlay);
			
			var changeData=$("<button class ='btn btn-large changeData' data-toggle='dropdown'>Select Data</button>");
			
			
			tabs.append(ul)
			var items=$('</div><div class="tabscontent"></div>');
			tabs.append(items);
			var label=$('<div><label>'+keys[vis[i]]+'</label></div>');
			
			//backdiv.append(label,tabs);			
			var mybut=$("<button class=ExpandBut id="+i+">+</button>");
			
				mybut.on("click",function(){
				var back=document.getElementById('background'+this.id);
				var but=document.getElementById(this.id);
					
				if($(back).width()<=$(bigdiv).width()/2){
					$(back).width('90%');
					$(back).height('90%');
					$(but).html('-')
				}
				else{
					$(back).width('40%');
					$(back).height('40%');
					$(but).html('+')
				}
					
			});
			//backdiv.prepend(mybut);
		
			// if(vis.length<3)
			// {
				
				// $(backdiv).width(100/vis.length+'%');
					// $(backdiv).height('95%');
			// }
			
			for(var j=0;j<plays.length;j++){
				
				var tab=$('<li class="tabBar" id="'+j+i+'">'+plays[j]+'</li>');
				ul.append(tab);
				tab.on("click",function(){
					for(var n=0;n<plays.length;n++)
					{
						
					$('#tabpage_'+n+this.id.charAt(1)).css('opacity','0');
					$('#tabpage_'+n+this.id.charAt(1)).css('z-index','0');
					var element= $('#'+plays[n]+'.'+vis[this.id.charAt(1)])[0];
			if(element!=null){element.parentNode.removeChild(element);}	
					}
					var mydiv=$('<div class='+vis[this.id.charAt(1)]+' id= '+plays[this.id.charAt(0)]+'></div>');
					$('#tabpage_'+this.id).css('opacity','1');
					$('#tabpage_'+this.id).css('z-index','11');
					$('#tabpage_'+this.id).append(mydiv);
					console.log("kipper" + vis[this.id.charAt(1)]);
					var func=functionDict[vis[this.id.charAt(1)]];
					console.log(vis[this.id.charAt(1)]);
					func();
				
				});
				
				var item=$('<div class="tabpage" id="tabpage_'+j+i+'"></div>');
				
				if(j==0)
				{
					console.log("shit")
					var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'></div>');
					$(item).css('opacity','1');
					item.append(mydiv);
				}
				console.log("butts")		
				items.append(item);
			}
			
			
			bigdiv.append(tabs);
		}
		
	}

	
	$(div).append(bigdiv);
		runPie();
		runSearch();
		runText();
		runTable();
		runTimeline();
	}

	return {setup:setup}
}();

$(document).ready(function(){
	$(".visual").each(function(){
		
		visual.setup($(this));
	});
});
};