import json

data = json.load(open("will_play_text.json"))

hamlet=[record for record in data if record["play_name"]=="Hamlet"]

json.dump(hamlet, open("hamlet.json", "w"), indent=2)
