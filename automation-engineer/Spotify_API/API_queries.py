import requests
import json
from urllib.parse import urlencode
from rauth import OAuth2Service


def data_utils():
    with open('data.json', 'r') as file:
        data = json.loads(file.read())
    return data


def authorize():
    spotify = OAuth2Service(
        name=data_utils()['app_name'],
        client_id=data_utils()['client_id'],
        client_secret=data_utils()['secret'],
        access_token_url=data_utils()['access_url'],
        authorize_url=data_utils()['authorize_url'],
        base_url=data_utils()["search_url"])
    params = {'redirect_uri': data_utils()['redirect_url'],
              'response_type': 'token',
              'scope': 'playlist-read-private'}
    url = spotify.get_authorize_url(**params)
    print(url)
    auth_response = input('PLease click on the link and copy/paste the full '
                          'callback URL\n')
    with open("cred.txt", "w") as f:
        f.write(auth_response[(auth_response.find('=') +
                               1):auth_response.find('&')])


def album_list(artist):
    with open("cred.txt", "r") as f:
        token = f.read()
    headers = {
               "Authorization": f"Bearer {token}"
              }
    endpoint = data_utils()['search_url']
    params = urlencode({"q": artist, "type": "album"})
    lookup_url = f"{endpoint}?{params}"
    response = requests.get(lookup_url, headers=headers)
    if response.status_code == 401:
        authorize()
        album_list(artist)
        return
    assert response.status_code == 200, f"Failed to request. Response: " \
                                        f"{response.status_code}"
    msg = f" {artist} albums "
    print(msg.center(55, "="))
    for i in response.json()['albums']['items']:
        print(f"{i['name']} Release date:{i['release_date']}")


def user_playlist():
    with open("cred.txt", "r") as f:
        token = f.read()
    headers = {
        "Authorization": f"Bearer {token}",
        "scope": "playlist-read-private"
    }
    endpoint = data_utils()['user_playlist_url']

    response = requests.get(endpoint, headers=headers)
    if response.status_code == 401:
        authorize()
        user_playlist()
        return
    assert response.status_code == 200, f"Failed to request. Response: " \
                                        f"{response.status_code}"
    page_json = response.json()

    # getting playlist id form 1st playlist
    playlist_id = page_json["items"][0]['id']
    endpoint = data_utils()['playlist_url']
    uri = endpoint + playlist_id + '/' + 'tracks'
    headers = {
        "Authorization": f"Bearer {token}",
        "scope": "user-library-read"}
    response = requests.get(uri, headers=headers)
    assert response.status_code == 200, f"Failed to request. Response: " \
                                        f"{response.status_code}"
    playlist = []
    msg = "Playlist tracks"
    print("\n", msg.center(55, "="))
    for i in response.json()['items']:
        playlist.append(i['track']['name'])

        print(f"{i['track']['name']} - by"
              f" {i['track']['artists'][0]['name']}")
    return playlist


def get_top10_tracks(artist):
    with open("cred.txt", "r") as f:
        token = f.read()
    headers = {
        "Authorization": f"Bearer {token}",
        "scope": "user-library-read"}

    endpoint = data_utils()['search_url']
    data = urlencode({"q": artist, "type": "album"})
    lookup_url = f"{endpoint}?{data}"
    response = requests.get(lookup_url, headers=headers)
    if response.status_code == 401:
        authorize()
        get_top10_tracks(artist)
        return
    assert response.status_code == 200, f"Failed to request. Response: " \
                                        f"{response.status_code}"
    page_json = response.json()
    artist_id = page_json['albums']['items'][0]['artists'][0]['id']
    endpoint = data_utils()['artist_url'] + artist_id + "/top-tracks"
    params = {"market": "us"}
    response = requests.get(endpoint, headers=headers, params=params)
    assert response.status_code == 200, f"Failed to request. Response: " \
                                        f"{response.status_code}"
    top_10 = []
    msg = f"Top 10 popular tracks by {artist}"
    print(msg.center(55, "="))
    for i in response.json()['tracks']:
        print(f"{i['name']} - popularity:"
              f"{i['popularity']}")
        top_10.append(i['name'])
    play_list = user_playlist()
    if set(play_list).intersection(set(top_10)):
        print(f"\nFollowing tracks from the top 10 by the {artist} are in "
              f"user playlist:")
        print(*set(play_list).intersection(set(top_10)), sep="\n")
    else:
        print(f"\nUser playlist doesnt contain any popular tracks from"
              f" {artist}")


# album_list("U2")

# user_playlist()

# get_top10_tracks("The Weeknd")
