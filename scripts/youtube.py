from apiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi

def extract_video_info(video_data):

    video_id = video_data['id']['videoId']
    title = video_data['snippet']['title']
    date = video_data['snippet']['publishedAt']

    return {
        'Video ID': video_id,
        'Date': date[:10],
        'Title': title,
        }

def get_transcript(video_id):
    try:
        transcript = ""
        for i in YouTubeTranscriptApi.get_transcript(video_id):
            k=i.get('text')
            transcript+=k
        transcript = ' '.join(transcript.split('\n'))
    except:
        s = None
    
    return transcript

def youtube_scrapper(q="government policies"):

    yt_api_key="AIzaSyBsx7o0R9vqhe4wZvO09uN1QOmF9UIuJpQ"
    youtube=build('youtube','v3', developerKey=yt_api_key)

    req1=youtube.search().list(q=q,part='snippet',type='video', maxResults=100)
    res1=req1.execute()
    info = [extract_video_info(video_data) for video_data in res1['items']]

    data = []
    for info_ in info:
        transcript = get_transcript(info_.get("Video ID"))
        if transcript:
            data.append({"Text" : transcript,
                         "Type" : "youtube",
                         "Title": info_.get("Title"),
                         "Date" : info_.get("Date"),
                         'Video ID': info_.get("Video ID"),
                         })
    return data