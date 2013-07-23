var shakesData = function(){
	
	//called when selectAPlay is clicked
	var selectExpand = function(){
		
	}
	
	var setup = function(){
		var div = $(".shakesData");
		var buttonDiv = $("<div class ='buttonDiv'></div>")
		var selectAPlay = $("<button class = 'btn btn-large selectAPlay'>Select A Play</button>");
		var selectData = $("<div><button class = 'btn btn-large selectData'>Select Data</button></div>");
		selectAPlay.click()
		buttonDiv.append(selectAPlay, selectData);
		div.append(buttonDiv);
	}
	
	return {"setup":setup}
}();

$(document).ready(function(){
	$(".shakesData").each(function(){
		shakesData.setup($(this));
	});
});