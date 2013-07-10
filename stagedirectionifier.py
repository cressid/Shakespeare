import json

data = json.load(open("will_play_text.json"))

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


def friendlyString(string): #makes a lower case string with spaces as only punct
    length = len(string)
    stringList = []
    j=-1
    for i in string:
        j+=1
        if i in lowercase:
            stringList.append(string[j]) #we like the 
        elif i in caps:
            stringList.append(caps.index(i)) #append the lower case version
        elif i == ' ' and string[j-2] != ' ' and j != 0:
            stringList.append(' ') #add spaces ONLY if they are the first
            #string in a row and they are not the start of the string
        else:
            pass
    return stringList
