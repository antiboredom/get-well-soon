import json
from glob import glob
import re
import spacy
from nltk.tokenize import sent_tokenize

nlp = spacy.load("en_core_web_sm")

for f in glob("comments/*.json"):
    with open(f, "r") as infile:
        data = json.load(infile)
    try:
        comments = [c["comment"]["comment"] for c in data]
        for c in comments:
            # c = c.replace("\n", " ")
            sentences = sent_tokenize(c)
            for s in sentences:
                if len(s) < 10:
                    continue
                if len(re.findall(r'[A-Z]', s)) > 1:
                    continue
                doc = nlp(s)
                if len(doc.ents) > 0:
                    continue
                print(s)
            # for s in doc.sents:
                # if "you" in s.text:
                #     print(s.text)
                # if len(s.ents) == 0:
                    # print(s.text.strip())
                # for ent in s.ents:
                    # print(ent)
            # print(c)
    except Exception as e:
        pass
