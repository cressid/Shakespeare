var visual = function(){

	var setup = function(div){
		
	var plays=$('.visual').data('plays').split(',');
	var vis=$('.visual').data('vis').split(',');	
	for(var i =0;i<vis.length;i++){
		
		if(vis[i]=="'Search'")
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
	
	$(div).append(Mysearch);	
		}
		else{
			
			var backdiv=$('<div class=backdiv id=background'+i+'></div>');
			var label=$('<div><label>'+vis[i].replace(/\'/g,'')+'</label></div>');
			backdiv.append(label);			
			for(var j=0;j<plays.length;j++){
				var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'>'+plays[j]+'</div>');
				
				
					
					backdiv.append(mydiv);	
			}
			var mybut=$("<button class=ExpandBut id="+i+">+</button>");
				mybut.on("click",function(){
				var back=document.getElementById('background'+this.id);
				var but=document.getElementById(this.id);
				console.log(back);
				if($(back).width()<=350){
					$(back).width(600);
					$(back).height(600);
					$(but).html('-')
				}
				else{
					$(back).width(300);
					$(back).height(300);
					$(but).html('+')
				}
			});
			backdiv.prepend(mybut);
				
			$(div).append(backdiv);
		}
	}
		
	}

	return {setup:setup}
}();

$(document).ready(function(){
	$(".visual").each(function(){
		
		visual.setup($(this));
	});
});