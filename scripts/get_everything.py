from scripts.article import article_scrapper
from scripts.youtube import youtube_scrapper

from scripts.tonality import get_sentiment
from scripts.department import get_dept

def get_all_info(data):
    result = []
    for i in range(len(data)):

        text = data[i].get("Text")

        tone= get_sentiment(text) 
        department= get_dept(text)

        result.append({ "Description": text,
                        "Department" : department,
                        "Tonality"   : tone,
                        "Title"      : data[i].get("Title"),
                        "Date"       : data[i].get("Date"),
                        "Type"       : data[i].get("Type"),
                        })

    return result

def get_all(q=None):
    if q is not None:
        result1 = get_all_info(youtube_scrapper(q))
        result2 = get_all_info(article_scrapper(q))
        return result1+result2
    else:
        result1 = get_all_info(youtube_scrapper())
        result2 = get_all_info(article_scrapper())
        return result1+result2