import json

data = json.load(open("will_play_text.json"))
shakes = open("full-text-shakespeare.html")
fullShakes = shakes.read() #fullShakes is the html document
#data is just the JSON file



play_names = ["Alls well that ends well", "As you like it", "A Comedy of Errors",\
              "Cymbeline", "Loves Labours Lost", "Measure for measure",\
              "Merry Wives of Windsor", "Merchant of Venice",\
              "A Midsummer nights dream", "Much Ado about nothing", \
              "Pericles", "Taming of the Shrew", "The Tempest",\
              "Troilus and Cressida", "Twelfth Night",\
              "Two Gentlemen of Verona", "A Winters Tale", \
              "King John", "Richard II", "Henry IV", \
              "Henry V", "Henry VI Part 1", "Henry VI Part 2", "Henry VI Part 3",\
              "Richard III", "Henry VIII", "Antony and Cleopatra", \
              "Coriolanus", "Hamlet", "Julius Caesar", "King Lear", "macbeth",\
              "Othello", "Romeo and Juliet", "Timon of Athens",\
              "Titus Andronicus"]

lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",\
             "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
caps = ["A", 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',\
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

lowerCaseDict = {}
for i in lowercase:
	lowerCaseDict[i] = True

capsDict = {}
for i in caps:
	capsDict[i] = lowercase[caps.index(i)]
		
#we are going to call this on each element of our italics in HTML (which is found with findItalics)
#and we are also going to call it on each element of the JSON file (data)
#then we will compare to see if each JSON element is in 
def friendlyString(string): #makes a lower case string with no spaces
    friendlyString = ""
    j=-1
    for i in string:
        j+=1
        if i in lowerCaseDict:
            friendlyString += string[j] #we like lower case
        elif i in capsDict:
            friendlyString += capsDict[i] #append the lower case version
        else:
            pass
    return friendlyString

#this makes friendly strings for every element in the list
#we will call this function on the HTML italics list
def friendlyList(List):
    friendlyList = []
    for i in List:
        friendlyList.append(friendlyString(i))
    return friendlyList
    

def findItalics(string): #finds all the text in italics <i>like this!</i>
    length = len(string)
    italics = [] #this is the empty list to which we will append all italics
    j = -1
    #states work like so:
    #   state = 0: we're just in text
    #   state = 1: last character was '<' (we're in a tag that might be italics)
    #   state = 2: last 2 characters were <i
    #   state = 3: last 3 characters were <i> now we're appending to string
    #   from state 3, if we see a <, state becomes 0 and we add the string to
    #   italics
    #   
    for i in string:
        j+=1 #j is the actual index, i is the character
        if j == 0:
            state = 0
        elif state == 0:
            if i == '<':
                state = 1
        elif state == 1:
            #print i, i == 'i'
            if i == 'i':
                state = 2
            elif i == 'H' or i == 'h':
                state = 1
            elif i == '3':
                state = 2
            else:
                state = 0 #if it's not an i or h, we don't care about the tag
        elif state == 2:
            if i == '>':
                state = 3
                stageDir = "" #make a new empty string in prep for stageDir
            else:
                state = 0 #hopefully this never happens
        elif state == 3:
            if i == '<':
                state = 0
                italics.append(stageDir)
            else:
                stageDir = stageDir + i
        #print type(i), i, type('<'), i == '<', state, j
    return italics

#this is all the html
#it still needs to become friendly
HTMLItalicsList = findItalics(fullShakes)


friendlyHTML = friendlyList(HTMLItalicsList)


def changeStageDir(html):
    #this is going to change the JSON file to not have its stupid stagedir shit
    JSONdir =[] #this is a new list of all the JSON stage directions 
    for i in data:
        curItem = i["text_entry"]
        print i["play_name"]
        if friendlyString(i["text_entry"]) in friendlyHTML:
            JSONdir.append(i)
            #print JSONdir, "true"
    #print len(JSONdir)
    for j in JSONdir:
        j["speaker"] = "Stage Directions"


changeStageDir(friendlyHTML)

json.dump(data, open("withStageDir"+".json", "w"), indent=2)
