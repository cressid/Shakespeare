var visual = function(){

	var setup = function(div){
		
	var plays=$('.visual').data('plays').split(',');
	var vis=$('.visual').data('vis').split(',');	
	for(var i =0;i<vis.length;i++){
		
		if(vis[i]=="'Search'")
		{
			
			 Mysearch=$("<div class='Search'  data-text = "+plays.join()+"></div>");  
	$(div).append(Mysearch);	
		}
		else{
			var backdiv=$('<div></div>')
			for(var j=0;j<plays.length;j++){
				var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'></div>');
					backdiv.append(mydiv);	
			}
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