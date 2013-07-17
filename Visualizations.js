var visual = function(){

	var setup = function(div){
		
	var plays=$('.visual').data('plays').split(',');
	var vis=$('.visual').data('vis').split(',');	
	for(var i =0;i<vis.length;i++){
		
		if(vis[i]=="'Search'")
		{	var backdiv=$('<div></div>')
			var but=$('<button>Expand<button>');
			var Mysearch=$("<div class='Search'  data-text = "+plays.join()+"></div>");
			but.on("click",function(){
				if(Mysearch.width()<=300){Mysearch.width(900);Mysearch.height(900);}
				else{Mysearch.width(300);Mysearch.height(200);}
					});
		 Mysearch.prepend(but);
			backdiv.append(Mysearch);
	$(div).append(backdiv);	
		}
		else{
			var backdiv=$('<div></div>')
			for(var j=0;j<plays.length;j++){
				var mydiv=$('<div class='+vis[i]+' id= '+plays[j]+'></div>');
				var mybut=$('<button><button>');
				mybut.on("click",function(){
				if(mydiv.width()<=300){mydiv.width(900);mydiv.height(900);}
				else{mydiv.width(300);mydiv.height(200);}
					});
					mydiv.prepend(mybut);
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