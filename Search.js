
var searchWord = function(){
	
var jsonObject = { "All Works" : {  "History" : {  "King John" : {},
                                                    "Richard II" : {},
                                                    "Henry IV" : {},
												    "HenryV" : {},
                                                    "Henry VI Part 1" : {},
                                                    "Henry VI Part 2" : {},
                                                    "Henry VI Part 3" : {},	
                                                    "Richard III" : {},
                                                    "Henry VIII" : {}												 
                                    },

                                    "Comedy" : {  "The Tempest" : {},
                                                    "The Two Gentlemen of Verona" : {},
                                                    "The Merry Wives of Windsor" : {},
												    "Measure for Measure" : {},
                                                    "The Comedy of Errors" : {},
                                                    "Much Ado About Nothing" : {},
                                                    "A Midsummer Night's Dream" : {},	
                                                    "The Merchant of Venice" : {},
                                                    "As You Like It" : {}
												    "The Taming of the Shrew" : {},
												    "All's Well That Ends Well" : {},
                                                    "Twelfth Night" : {},
                                                    "The Winter's Tale" : {},
                                                    "Pericles, Prince of Tyre" : {}
                                                
                                    },

                                    "Tradgedy" :  {  "Troilus and Cressida " : {},
                                                    "Coriolanus" : {},
                                                    "Titus Andronicus" : {},	
                                                    "Romeo and Juliet" : {},
                                                    "Timon of Athens" : {}
												    "Julius Caesar" : {},
												    "Macbeth" : {},
                                                    "Hamlet" : {},
                                                    "King Lear" : {},
                                                    "Othello" : {},	
				                                    "Antony and Cleopatra" : {},
                                                    "Cymbeline" : {}
                                    }

                                    
                                } 
                    }
	
var search=function(word){
var occurences=[]
var AllData=hamletData;
for (var i=0; i<AllData.length; i++){
if(AllData[i]["text_entry"].indexOf(word)>-1){
occurences.push(AllData[i])
}
}
}


	var setup = function(){		
var diameter = 960,
    format = d3.format(",d");

var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.size; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(2,2)");

d3.json("flare.json", function(error, root) {
  var node = svg.datum(root).selectAll(".node")
      .data(pack.nodes)
    .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

  node.append("circle")
      .attr("r", function(d) { return d.r; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name.substring(0, d.r / 3); });
});

d3.select(self.frameElement).style("height", diameter + "px");
	}
	return {setup:setup}
}();

$(document).ready(function(){
	$(".searchWord").each(function(){
		searchWord.setup($(this));
	});
});