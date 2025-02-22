# Phase 6 precursor
(zips coming soon)

## **Objective:**
- Create a static site that uses Jikan API to grab the user's recently watched anime from MyAnimeList (MAL)

## **Intended functionality**
- User enters their MAL username into the field, then chooses from 3 options:
   - Recently watched anime
      - 10 buttons for each of the 10 most recently watched anime
   - Favorite anime
      - 10 buttons for each of the user's 10 favorite anime
   - Favorite characters
      - 10 buttons for each of the user's 10 favorite characters

## **Further Implementation**
- Entering a specific anime for the background
- Entering a specific character for the background
- Tiled approach to show multiple images (with toggle for any of the characters/titles the user doesn't want to see)

## **Challenges**
- Anime names are in romaji or kanji/hiragana/katakana
   - Implement solution for english-speaking users
- Rate limited to 60 requests/minute or 3 requests/second
   - Potential fix: "please wait" text + utilize setInterval to wait for 1 second before retrieving next set of anime