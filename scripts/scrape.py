import json
from tqdm import tqdm
import os
import requests
from requests_html import HTMLSession


def get_pages():
    cookies = {
        "visitor": "%7B%22country%22%3A%22US%22%2C%22locale%22%3A%22en_US%22%2C%22cookieWarning%22%3A%220%22%2C%22theme%22%3A%22default%22%7D",
        "gdid": "00-4a04a04f7320433aa47636eb77e02fde-9043d39a",
        "suid": "97e5145a27f54c2a838fe201fc6e0546",
        "ssid1": "24d74089a7-f5aa7410e527490c-6%3A1582303722",
        "ssid2": "24d74089a7-8006b4b52cfb4eba-6%3A1582474722",
        "amplitude_id_dec4ad7da36c150f9fffce4f288058a8gofundme.com": "eyJkZXZpY2VJZCI6IjAwLTRhMDRhMDRmNzMyMDQzM2FhNDc2MzZlYjc3ZTAyZmRlLTkwNDNkMzlhIiwidXNlcklkIjpudWxsLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE1ODIzMDE1Mzc2MjMsImxhc3RFdmVudFRpbWUiOjE1ODIzMDE3NzI0NzAsImV2ZW50SWQiOjExLCJpZGVudGlmeUlkIjoxNiwic2VxdWVuY2VOdW1iZXIiOjI3fQ==",
        "mp_default__c": "19",
        "mp_default__c3": "24478",
        "mp_default__c4": "23080",
        "mp_default__c5": "132",
        "mp_impression__c": "19",
        "mp_impression__c3": "24478",
        "mp_impression__c4": "23080",
        "mp_impression__c5": "132",
        "mp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoiZ29mdW5kbWUtZmFzdHRyYWNrIiwiaW5wdXRMYWJlbCI6Ik1vYmlsZV9TREsiLCJpbnB1dFR5cGUiOiJKU1NESyJ9.VcK4Qu7IFdx-4eaNvFpO6-k7uLU4BnnoCaUKfLDYXBM_mixpanel": "%7B%22distinct_id%22%3A%20%2200-4a04a04f7320433aa47636eb77e02fde-9043d39a%22%2C%22user_agent%22%3A%20%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010.14%3B%20rv%3A73.0)%20Gecko%2F20100101%20Firefox%2F73.0%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D",
        "mp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoiZ29mdW5kbWUtZmFzdHRyYWNrIiwiaW5wdXRMYWJlbCI6ImpzX2ltcHJlc3Npb25zIiwiaW5wdXRUeXBlIjoiSlNTREsifQ.b5cv2xeiayTkWNVbv-Hg9BGILIHwgE1nL2Tl2OaPVIA_mixpanel": "%7B%22distinct_id%22%3A%20%2200-4a04a04f7320433aa47636eb77e02fde-9043d39a%22%2C%22user_agent%22%3A%20%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010.14%3B%20rv%3A73.0)%20Gecko%2F20100101%20Firefox%2F73.0%22%7D",
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:73.0) Gecko/20100101 Firefox/73.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Requested-With": "XMLHttpRequest",
        "DNT": "1",
        "Connection": "keep-alive",
        "Referer": "https://www.gofundme.com/discover/medical-fundraiser",
        "TE": "Trailers",
    }

    with open("diseases.json", "r") as infile:
        diseases = json.load(infile)
    diseases = diseases["diseases"]

    for d in diseases:
        for page in range(1, 112):
            try:
                params = (
                    # ("route", "categorypages/load_more"),
                    ("route", "homepage_norma/load_more"),
                    ("page", page),
                    ("term", d),
                    ("cid", "11"),
                )

                session = HTMLSession()
                r = session.get(
                    "https://www.gofundme.com/mvc.php",
                    headers=headers,
                    params=params,
                    cookies=cookies,
                )

                links = r.html.find("a")
                for l in links:
                    print(l.attrs.get("href"))
            except Exception as e:
                break


def get_comments(slug):

    outname = "comments/{}.json".format(slug)
    if os.path.exists(outname):
        return outname

    cookies = {
        "visitor": "%7B%22country%22%3A%22US%22%2C%22locale%22%3A%22en_US%22%2C%22cookieWarning%22%3A%220%22%2C%22theme%22%3A%22default%22%7D",
        "gdid": "00-4a04a04f7320433aa47636eb77e02fde-9043d39a",
        "suid": "97e5145a27f54c2a838fe201fc6e0546",
        "ssid1": "24d74089a7-f5aa7410e527490c-6%3A1582305518",
        "ssid2": "24d74089a7-8006b4b52cfb4eba-6%3A1582476518",
        "amplitude_id_dec4ad7da36c150f9fffce4f288058a8gofundme.com": "eyJkZXZpY2VJZCI6IjAwLTRhMDRhMDRmNzMyMDQzM2FhNDc2MzZlYjc3ZTAyZmRlLTkwNDNkMzlhIiwidXNlcklkIjpudWxsLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE1ODIzMDE1Mzc2MjMsImxhc3RFdmVudFRpbWUiOjE1ODIzMDM3MTg0MDEsImV2ZW50SWQiOjE4LCJpZGVudGlmeUlkIjoyNSwic2VxdWVuY2VOdW1iZXIiOjQzfQ==",
        "mp_default__c": "27",
        "mp_default__c3": "34026",
        "mp_default__c4": "32008",
        "mp_default__c5": "182",
        "mp_impression__c": "27",
        "mp_impression__c3": "34026",
        "mp_impression__c4": "32008",
        "mp_impression__c5": "182",
        "mp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoiZ29mdW5kbWUtZmFzdHRyYWNrIiwiaW5wdXRMYWJlbCI6Ik1vYmlsZV9TREsiLCJpbnB1dFR5cGUiOiJKU1NESyJ9.VcK4Qu7IFdx-4eaNvFpO6-k7uLU4BnnoCaUKfLDYXBM_mixpanel": "%7B%22distinct_id%22%3A%20%2200-4a04a04f7320433aa47636eb77e02fde-9043d39a%22%2C%22user_agent%22%3A%20%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010.14%3B%20rv%3A73.0)%20Gecko%2F20100101%20Firefox%2F73.0%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D",
        "mp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoiZ29mdW5kbWUtZmFzdHRyYWNrIiwiaW5wdXRMYWJlbCI6ImpzX2ltcHJlc3Npb25zIiwiaW5wdXRUeXBlIjoiSlNTREsifQ.b5cv2xeiayTkWNVbv-Hg9BGILIHwgE1nL2Tl2OaPVIA_mixpanel": "%7B%22distinct_id%22%3A%20%2200-4a04a04f7320433aa47636eb77e02fde-9043d39a%22%2C%22user_agent%22%3A%20%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010.14%3B%20rv%3A73.0)%20Gecko%2F20100101%20Firefox%2F73.0%22%7D",
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:73.0) Gecko/20100101 Firefox/73.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "GFM-Request-Id": "29955695-3e26-4304-a520-c0f7717d5461",
        "Origin": "https://www.gofundme.com",
        "DNT": "1",
        "Connection": "keep-alive",
        "Referer": "https://www.gofundme.com/f/hope-for-pedro",
    }

    offset = 0

    url = "https://gateway.gofundme.com/web-gateway/v1/feed/{}/comments".format(slug)

    params = (("limit", "20"), ("offset", offset))

    response = requests.get(url, headers=headers, params=params, cookies=cookies)

    data = response.json()["references"]["contents"]

    with open(outname, "w") as outfile:
        json.dump(data, outfile)


def get_all_comments():
    with open("urls.txt", "r") as infile:
        urls = infile.readlines()

    for url in tqdm(urls):
        url = url.strip()
        slug = url.split("/")[-1]

        try:
            get_comments(slug)
        except Exception as e:
            pass


# get_pages()
# get_comments("https://gateway.gofundme.com/web-gateway/v1/feed/hope-for-pedro/comments")
get_all_comments()
