from torchtext.data import get_tokenizer
from torchtext.vocab import GloVe
import numpy as np
from numpy import dot
from numpy.linalg import norm

tokenizer = get_tokenizer("basic_english")
global_vectors = GloVe(name='840B', dim=300)

l= ["Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy",
    "Department of Atomic Energy",
    "Ministry of Agriculture & Farmers Welfare",
    "Ministry of Chemicals and Fertilizers",
    "Ministry of Commerce & Industry",
    "Ministry of Communications",
    "Ministry of Corporate Affairs",
    "Ministry of Culture",
    "Ministry of Defence",
    "Ministry of Education",
    "Ministry of Electronics & Information Technology",
    "Ministry of Environment, Forest and Climate Change",
    "Ministry of Finance",
    "Ministry of Fisheries, Animal Husbandry & Dairying",
    "Ministry of Health and Family Welfare",
    "Ministry of Home Affairs",
    "Ministry of Housing & Urban Affairs",
    "Ministry of Jal Shakti",
    "Ministry of Information & Broadcasting",
    "Ministry of Labour & Employment",
    "Ministry of Law and Justice",
    "Ministry of Petroleum & Natural Gas",
    "Ministry of Power",
    "Ministry of Road Transport & Highways",
    "Ministry of Rural Development",
    "Ministry of Science & Technology",
    "Ministry of Science & Technology"
    ]

depa= ['Ayurveda Yoga Naturopathy Unani Siddha Homeopathy',
    'Atomic Energy Nuclear Research Nuclear Power',
    'Agriculture Farmers Crop Management Agricultural Policy',
    'Chemicals Fertilizers Chemical Industry',
    'Commerce Industry Trade Export',
    'Communications Telecom Postal Services',
    'Corporate Affairs Corporate Governance Company Registration',
    'Culture Art Heritage',
    'Defence Military National Security',
    'Education Schools Higher Education',
    'Electronics Information Technology Digital Services',
    'Environment Forests Climate Change',
    'Finance Economy Budget',
    'Fisheries Animal Husbandry Dairying',
    'Health Family Welfare Medical Services',
    'Home Affairs Internal Security Law and Order',
    'Housing Urban Affairs Smart Cities',
    'Jal Shakti Water Resources Water Management',
    'Information Broadcasting Media',
    'Labour Employment Workforce',
    'Law Justice Legal System',
    'Petroleum Natural Gas Energy',
    'Power Electricity Energy',
    'Road Transport Highways Infrastructure',
    'Rural Development Village Development Panchayati Raj',
    'Science Technology Research']

dep_emb= [global_vectors.get_vecs_by_tokens(tokenizer(k), lower_case_backup=True) for k in l]
dep_emb= [k.mean(axis=0) for k in dep_emb]
dep_emb= [np.array(k) for k in dep_emb]

def get_dept(text):
    text_emb = global_vectors.get_vecs_by_tokens(tokenizer(text), lower_case_backup=True)
    text_emb= text_emb.mean(axis=0)
    text_emb= np.array(text_emb)

    s=0
    department=""
    for i in range(len(dep_emb)):
        k= dep_emb[i]
        sim = dot(text_emb, k)/(norm(text_emb)*norm(k))

        if sim>s:
            s= sim
            department= i

    return l[department]

# text= "forest fires spread out suddenly in sunderbans"
# print(getdep(text))
