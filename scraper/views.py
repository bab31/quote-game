from rest_framework.decorators import api_view
from rest_framework.response import Response
import random
from .utils import scrape_quotes

quotes = scrape_quotes()


@api_view(['GET'])
def get_random_quote(request):
    quote = random.choice(quotes)
    return Response({
        "text": quote["text"],
        "author": quote["author"],
        "hint": {
            "initials": f"{quote['author'][0]}.{quote['author'].split()[-1][0]}.",
            "bio_link": quote["bio_link"]
        }
    })
