var runVis=function(){
var visual = function(){

	var setup = function(div){
		
	var plays=$('.visual').data('plays').split(',');
	var vis=$('.visual').data('vis').split(',');	
		var bigdiv=$('<div class=backDisplayDiv></div>');
	for(var i =0;i<vis.length;i++){
		
		if(vis[i]=="Search")
		{	
			
			var Mysearch=$("<div class='Search'  data-text = "+plays.join()+"></div>");
			var thisbut=$("<button id=ExpandBut>+</button>");
		 	thisbut.on("click",function(){
				console.log(Mysearch.width());
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
			for(var j=0;j<plays.length;j++){
				
				var tab=$('<li id="'+j+i+'">'+plays[j]+'</li>');
				ul.append(tab);
				tab.on("click",function(){
					for(var n=0;n<plays.length;n++)
					{
					$('#tabpage_'+n+this.id.charAt(1)).css('opacity','0');
					}
					$('#tabpage_'+this.id).css('opacity','1');
					
				});
				
				var item=$('<div class="tabpage" id="tabpage_'+j+i+'"></div>');
				var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'>'+plays[j]+'</div>');
				if(j==0)
				{
					$(item).css('opacity','1');
				}
					item.append(mydiv);	
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