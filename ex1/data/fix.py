import json

# [
#   {
#     "id": "catan",
#     "name": "Catan",
#     "year": 1995,
#     "category": "Family",
#     "minPlayers": 3,
#     "maxPlayers": 4,
#     "playingTimeMinutes": 120,
#     "descriptionEN": "Players take on the roles of settlers, each attempting to build and develop holdings while trading and acquiring resources.",
#     "autores": [
#       {
#         "id": "klaus-teuber",
#         "name": "Klaus Teuber"
#       }
#     ],
#     "editoras": [
#       {
#         "id": "kosmos",
#         "name": "KOSMOS",
#         "country": "Germany"
#       }
#     ],
#     "mecanicas": [
#       {
#         "id": "route-building",
#         "name": "Route Building"
#       },
#       {
#         "id": "tile-placement",
#         "name": "Tile Placement"
#       },
#       {
#         "id": "dice-rolling",
#         "name": "Dice Rolling"
#       }
#     ],
#     "premios": [
#       {
#         "id": "sdj-1995",
#         "name": "Spiel des Jahres",
#         "year": 1995
#       }
#     ]
#   }
# ]


# criar 1 ficheiro: autores.json
with open("jogos.json", "r") as f:
    data = json.load(f)


autores_list = []
categorias_list = []
autores_por_id = {}
categorias_por_id = {}

for item in data:
    for autor in item["autores"]:
        if autor["id"] not in autores_por_id:
            obj = {
                "id": autor["id"],
                "name": autor["name"],
                "jogos": []
            }
            autores_por_id[autor["id"]] = obj
            autores_list.append(obj)
        autores_por_id[autor["id"]]["jogos"].append({
            "id": item["id"],
            "name": item["name"]
        })

    categoria = item["category"]
    categoria_id = categoria.lower().replace(" ", "-")
    if categoria_id not in categorias_por_id:
        obj = {
            "id": categoria_id,
            "name": categoria,
            "jogos": []
        }
        categorias_por_id[categoria_id] = obj
        categorias_list.append(obj)
    categorias_por_id[categoria_id]["jogos"].append({
        "id": item["id"],
        "name": item["name"]
    })

with open("autores.json", "w") as f:
    json.dump(autores_list, f, indent=4)

with open("categorias.json", "w") as f:
    json.dump(categorias_list, f, indent=4)