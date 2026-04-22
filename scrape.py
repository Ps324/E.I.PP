import requests
from bs4 import BeautifulSoup
import json
import os
import re


def extract_weekday(date_string):
    # Nimmt z.B. "Montag, 22.04.2026" → "Montag"
    return date_string.split(" ")[0].strip()


def fetch_menu(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    result = {}

    day_blocks = soup.find_all("div", class_="menublk")

    for block in day_blocks:
        date_tag = block.find("b", class_="menudate")
        if not date_tag:
            continue

        raw_date = date_tag.get_text(strip=True)
        weekday = extract_weekday(raw_date)

        menus = []

        entries = block.find_all("div", class_="menu-entry")

        for entry in entries:
            ff_div = entry.find("div", class_="ff")
            if not ff_div:
                continue

            menu_name_tag = ff_div.find("b")
            description_span = ff_div.find("span")

            menu_name = menu_name_tag.get_text(strip=True) if menu_name_tag else ""

            full_text = ff_div.get_text(" ", strip=True)
            main_text = full_text.replace(menu_name, "").strip()

            description = description_span.get_text(strip=True) if description_span else ""

            menus.append({
                "menu": menu_name,
                "title": main_text.replace(description, "").strip(),
                "description": description
            })

        result[weekday] = menus

    return result


def update_json_in_place(new_data, filename="speiseplan.json"):
    # Falls Datei existiert → laden
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            try:
                existing_data = json.load(f)
            except json.JSONDecodeError:
                existing_data = {}
    else:
        existing_data = {}

    # Nur vorhandene Keys überschreiben / ergänzen
    for day, menus in new_data.items():
        existing_data[day] = menus

    # Zurückschreiben
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    url = "https://gymnasium.englisches-institut.eu/speiseplan/"
    
    menu_data = fetch_menu(url)
    update_json_in_place(menu_data)

    print("Speiseplan aktualisiert (inkrementell).")