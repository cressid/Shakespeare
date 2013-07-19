var runVis=function(){
var visual = function(){

	var setup = function(div){
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
			
			var backdiv=$('<div class=backdiv id=background'+i+'></div>');
			
			var tabs=$('<div class="tabs"></div>');
			
			var ul=$('<ul></ul>');
			tabs.append(ul)
			var items=$('</div><div class="tabscontent"></div>');
			tabs.append(items);
			var label=$('<div><label>'+vis[i]+'</label></div>');
			backdiv.append(label,tabs);			
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
			backdiv.prepend(mybut);
		
			if(vis.length<3)
			{
				
				$(backdiv).width(90/vis.length+'%');
					$(backdiv).height('90%');
			}
			
			for(var j=0;j<plays.length;j++){
				
				var tab=$('<li id="'+j+i+'">'+plays[j]+'</li>');
				ul.append(tab);
				tab.on("click",function(){
					for(var n=0;n<plays.length;n++)
					{
						
					$('#tabpage_'+n+this.id.charAt(1)).css('opacity','0');
					$('#tabpage_'+n+this.id.charAt(1)).css('z-index','0');
					var element= $('#'+plays[n]+'.'+vis[this.id.charAt(1)])[0];
						console.log(element);
			if(element!=null){element.parentNode.removeChild(element);}	
					}
					var mydiv=$('<div class='+vis[this.id.charAt(1)]+' id= '+plays[this.id.charAt(0)]+'></div>');
					$('#tabpage_'+this.id).css('opacity','1');
					$('#tabpage_'+this.id).css('z-index','11');
					$('#tabpage_'+this.id).append(mydiv);
					
					var func=functionDict[vis[this.id.charAt(1)]];
					console.log(vis[this.id.charAt(1)]);
					func();
				
				});
				
				var item=$('<div class="tabpage" id="tabpage_'+j+i+'"></div>');
				
				if(j==0)
				{
					var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'></div>');
					$(item).css('opacity','1');
					item.append(mydiv);
				}
						
				items.append(item);
			}
			
			
			bigdiv.append(backdiv);
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