import requests
from bs4 import BeautifulSoup

BASE_URL = "http://quotes.toscrape.com"


def scrape_quotes():
    all_quotes = []
    url = "/page/1"

    while url:
        res = requests.get(BASE_URL + url)
        soup = BeautifulSoup(res.text, "html.parser")
        quotes = soup.find_all(class_="quote")

        for quote in quotes:
            text = quote.find(class_="text").get_text()
            author = quote.find(class_="author").get_text()
            link = quote.find("a")["href"]
            all_quotes.append(
                {"text": text, "author": author, "bio_link": link})
        next_btn = soup.find(class_="next")
        url = next_btn.find("a")["href"] if next_btn else None

    return all_quotes
