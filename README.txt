README

This tool is designed to offer a data visualization tool for the works of William Shakespeare. The goal is to allow students, readers, and actors to understand aspects
of Shakespeare's work (such as character line distribution, word distribution, etc.) through intuitive, easy to use graphs and charts.


--REQUIREMENTS--
jQuery, D3, Bootstrap are required


---USING THE VISUALIZATIONS ---

The front end of the document (frontEnd.js) includes buttons to allow the user to select the plays and the data visualizations he wants to see. The user is able to select
any of Shakespeare's plays as well as which of the available data visualizations desired. The five data visualizations are listed below:

1. Pie Graph by lines
returns pie charts for each of the selected plays indicating the number of lines per character.

2. Character Timelines
Returns a set of horizontal lines, each line representing the entirety of the play (Act 1 Scene 1 all the way on the left, Act 5 last scene all the way on the right)
There is one line for each character, with the lines of each character represented as blue sections on the otherwise grey line. This is designed to show not only the 
number of lines that each charcter has, but also where his/or her lines are located within the play.

3. Text of Play
Returns the entire text of the play. A dropdown menu of all characters in the play gives the u ser the option of highlighting any character's lines.

4. Character Table
Returns a chart with rows representing characters and columns representing scenes in the play. An x at any given location will represent that the character in that row
appears in the scene in that column.
Hovering over the character name will show a list of all the characters that do not appear in any scenes with that character (which can be useful for double casting)

5. Circle Packing Search
Allows the user to search for a word and will return a circle packed chart. Three circles represent the comedies, histories, and tragedies. Within each of these circles
are circles representing each play within that category, and within each of the play circles are circles representing each character who says the word. Clicking on
any circle will zoom in to that circle. The sizes of each circle indicates the number of times the word appears in a given category (so, for instance, one will find
that searching for "crown" leads to the history circle being the largest, whereas "love" leads to a larger comedy circle.
Clicking on a character circle will also generate a list of all the lines in which the word is spoken by the character.





--FILES--

charTimelines.html calls all necessary files

The data for the 36 plays are all saved as js files with titles like Macbeth.js and AllsWellThatEndsWell.js
withStageDir.js is all 36 plays in a single file

Flare.JSON is required to run the search function

frontEnd.js sets up the front end of the web site and allows user interaction

pie.js generates a pie chart for the selected plays

text.js generates a readable text document from the js data files for a given play

Character Table.js generates character tables for the selected plays

charTimelines.js generates character timelines for selected plays

visualizations.js creates the DOM elements that display the visualizations

shakesdata.css contains all necessary css for formatting the web page