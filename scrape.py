url = "https://gymnasium.englisches-institut.eu/speiseplan/"

import requests
from bs4 import BeautifulSoup
import json


def fetch_menu(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    result = {}

    # Jeder Block entspricht einem Tag
    day_blocks = soup.find_all("div", class_="menublk")

    for block in day_blocks:
        # Datum extrahieren
        date_tag = block.find("b", class_="menudate")
        if not date_tag:
            continue

        date = date_tag.get_text(strip=True)

        menus = []

        # Alle Menü-Einträge finden
        entries = block.find_all("div", class_="menu-entry")

        for entry in entries:
            ff_div = entry.find("div", class_="ff")
            if not ff_div:
                continue

            menu_name_tag = ff_div.find("b")
            description_span = ff_div.find("span")

            menu_name = menu_name_tag.get_text(strip=True) if menu_name_tag else ""
            
            # Text ohne Menüname extrahieren
            full_text = ff_div.get_text(" ", strip=True)
            main_text = full_text.replace(menu_name, "").strip()

            description = description_span.get_text(strip=True) if description_span else ""

            menus.append({
                "menu": menu_name,
                "title": main_text.replace(description, "").strip(),
                "description": description
            })

        result[date] = menus

    return result


def save_to_json(data, filename="speiseplan.json"):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    menu_data = fetch_menu(url)
    save_to_json(menu_data)

    print("Speiseplan gespeichert in speiseplan.json")
