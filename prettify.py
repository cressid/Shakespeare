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

              #we are sad because Henry IV Part 2 is missing :(

print len(play_names)

for i in play_names:
    print i
    currentPlay=[record for record in data if record["play_name"]==i]
    json.dump(currentPlay, open(i+".json", "w"), indent=2)
