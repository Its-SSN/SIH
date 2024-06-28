from transformers import pipeline

sentiment_pipeline = pipeline("text-classification", model= "distilbert-base-uncased-finetuned-sst-2-english")
def get_sentiment(data):
    res = data.split()
    s=""
    sum=0
    c=0
    for i in range(len(res)):
        s+=" "+res[i]
        if i%200==0 and i!=0:
            #print(s)
            pred= sentiment_pipeline(s)
            tone= pred[0].get('label')
            score= pred[0].get('score')

            if tone=="POSITIVE":
                sum+= score
            else:
                sum-= score
            
            s=""
            c+=1
    
    if s!="":
        pred= sentiment_pipeline(s)
        tone= pred[0].get('label')
        score= pred[0].get('score')

        if tone=="POSITIVE":
            sum+= score
        else:
            sum-= score
        s=""
        c+=1

    sum/=c
    if sum<=0.5 and sum>=(-0.5):
        tone= "NEUTRAL"
    elif sum>=0.5:
        tone= "POSITIVE"
    else:
        tone= "NEGATIVE"

    return tone

#data=["At the U.S.-Pacific Islands Forum Summit meeting at the White House on September 25, President Biden renewed our commitment to enhancing our partnership with the Pacific Islands, and the respective governments, to achieve our shared vision for a resilient Pacific region of peace, harmony, security, social inclusion, and prosperity, where individuals can reach their potential, the environment can thrive, and democracy can flourish. Last year, the Biden-Harris Administration released the first ever U.S. Pacific Partnership Strategy with an ambitious slate of initiatives to achieve this vision and meet Pacific priorities including announcing plans to provide over $810 million in new assistance. And in May, Secretary Blinken highlighted our commitment to working with Congress for over $7.2 billion in new funding and programs for the Pacific Islands region."]
# data= "Government Initiatives and Schemes for Tourism Development in IndiaDear learners, In this session, we are going to learn aboutthe government schemes and initiatives for development of tourism infrastructure in thecountry.The Agenda of the session is to highlight why tourism?Then what does the government doing?Then We'll discuss the key government initiatives to promote tourism infrastructure in the country.Then we'll discuss about the tourism infrastructure opportunities available.And lastly, the various government schemes for the sector.Now why tourism ? because tourism involves journey , it involves road journeys, adventure, tour guide.It involves your hotel.It involves your travel, it involves cruise.It involves trips.It involves vacation experts.It involves aero planes, railways and the whole gamut of things.We believe.As per the United Nations World Tourism Organization, that the world will have one point four billiontourists by 2020 and one point eight billion tourists by 2030.This target of projection of one point four billion tourists has already been achievedin the year 2018, well two years ahead of what was projected for.That means the growth has been phenomenal and the growth has been above the expectationsand the projections.Why tourism? because tourism has emerged as one of the key enablers of growth worldwide.The sector significantly contributes towards the socio economic progress through employmentgeneration, foreign exchange earnings and infrastructure development.While the global economy grew at three point two percent in 2018, Travel and tourism witnesseda growth of three point nine percent higher than sectors such as construction, retail,wholesale, healthcare etc.Foreign tourists, arrivals cross 10 million and international tourists cross 15 millionin 2018.In 2018 we had around ten point five million foreign tourists coming to India, includingthe NRIs, it goes up to 15 million.And this is a growth trend which is expected to continue over the coming years.However, the consumption of domestic tourists remains the keystone for the sector India,which is much stronger than the global average.The top 10 source countries accounted for sixty five point eight zero percent of thetotal inbound flows in the country in 2017, which includes Bangladesh at number one, theUnited States then the United Kingdom, Canada, and followed by Australia.Foreign tourism levels from most of the top source countries grew during the last fewyears.Now, coming to the point of what is the government doing?The government of India has recently been focusing upon fast track infrastructure developmentand promoting tourism digitally.Sustained efforts have led to a jump of 25 places in the World Economic Forum traveland tourism Competitiveness index ranking between 2013 and 2017.2013 we were at sixty fifth place and in 2017 we have jumped up to fortieth(40th) placein the entire world.Infrastructure development for various thematic segments across the country has received asignificant boost through the schemes like Swadesh Darshan PRASAD and further initiativessuch as 24 into seven tourist helpline one three six three in 12 international languages.Then Swatcha Paryatan Mobile App , launch of adventure tourism guidelines, among others,have positively impacted the sector.The government has been actively engaging on the publicity and promotion front as well,and has launched the incredible India 2.0 campaign with market specific content andadvertising.Efforts of Ministry of Tourism have been complemented by progressive initiatives by other ministries,such as the UDAN scheme that is Ude Desh ka Aam Nagrik or the Regional Connectivity Schemeby the Ministry of Civil Aviation.Tourist trains by the Ministry of Railways.Sagar Mala Project and Development of Lighthouses by the Ministry of Shipping, among others.Key government initiatives to promote inbound tourist include the Ministry of Tourism hasintroduced an E visa facility which is extended to 168 countries with relaxed applicationwindow duration and number of entry norms.Launched in Incredible India 2.0 campaign with market specific content and advertisingplanned to set up five special tourist zones in partnership with various states.New tourism policy to be launched and under Swadesh Darshan Scheme, the government hasidentified fifteen circuits on a specific theme for development.During 2018-19, a total of seven projects worth INR three eighty four point six sevencrore have been sanctioned under this scheme.Under PRASAD scheme, Twenty five religious sites have been identified for development.The Ministry has released INR 83.24 crore for the projects sanctioned under Prasad tillMarch 31st 2018.Ministry of Tourism also launched India’s first adventure tourism guidelines.And I'm happy to say that Indian Institute of tourism and travel management and its instituteby the name of National Institute of Water Sports has been the pioneering institutionin preparing this adventure tourism guidelines.It covers twenty nine land, air and water based activities, detailing out the role ofa guide, Important equipment required, operating instructions, risk mitigation, medical facility,among others, and these are all areas where infrastructure development has to take place."
# tone= get_sentiment(data)
# print(f"Tone: {tone}")
