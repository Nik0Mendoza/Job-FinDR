from dotenv import load_dotenv
from serpapi import GoogleSearch

import base64
from datetime import datetime
import json
import os
import requests

# get important keys in .env file
load_dotenv()

SERP_API_KEY = os.getenv("SERP_API_KEY")
SERP_API_URL = "https://serpapi.com/search.json"

ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
ADZUNA_API_KEY = os.getenv("ADZUNA_API_KEY")
ADZUNA_API_URL = "http://api.adzuna.com/v1/api/jobs/gb/search/1"

PARSER_ID = os.getenv("PARSER_ID")
PARSER_API_KEY = os.getenv("PARSER_API_KEY")
PARSER_API_URL = "https://api.us.textkernel.com/tx/v10/parser/resume"

def get_parsed_data(file):
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "tx-accountid": PARSER_ID,
        "tx-servicekey": PARSER_API_KEY,
    }
    print(headers)

    payload = {
        'DocumentAsBase64String': base64.b64encode(file.read()).decode('UTF-8'),
        'DocumentLastModified': datetime.today().strftime('%Y-%m-%d'),
        'SkillsSettings': { "Normalize": True },
        'ProfessionsSettings': { "Normalize": True },
    }

    response = requests.post(PARSER_API_URL, data=json.dumps(payload), headers=headers)

    if response.status_code == 200:
        response_json = json.loads(response.content)
        return response_json
    else:
        print(response.json())
        return json.dumps({
            "status": 500,
            "message": "There was an error on our end. Please try again later."
        })

def get_serp_posts(role_keyword: str) -> list:
    params = {
        "engine": "google_jobs",
        "hl": "en",
        "q": role_keyword,
        "api_key": SERP_API_KEY,
    }

    search = GoogleSearch(params)
    response = search.get_dict()
    jobs_results = response["jobs_results"]

    if "error" not in response:
        return [
            { 
                "title": result["title"],
                "company": result["company_name"],
                "location": result["location"],
                "description": result["description"]
            }
            for result in jobs_results
        ]
    return []
    
def get_adzuna_posts(role_keyword: str) -> list:
    params = {
        "app_id": ADZUNA_APP_ID,
        "app_key": ADZUNA_API_KEY,
        "results_per_page": 20,
        "content-type": "application/json",
        "what": role_keyword,
    }
    response = requests.get(ADZUNA_API_URL, params=params)
    if response.status_code == 200:
        job_results = response.json()["results"]
        return [
            { 
                "title": result["title"],
                "company": result["company"]["display_name"],
                "location": result["location"]["display_name"],
                "description": result["description"]
            }
            for result in job_results
        ]
    return []