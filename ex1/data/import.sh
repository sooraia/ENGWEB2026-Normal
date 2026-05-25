#!/bin/bash
# Importa o JSON para a base de dados
mongoimport --host localhost --db jogostabuleiro --collection jogos --file /docker-entrypoint-initdb.d/jogos.json --jsonArray
mongoimport --host localhost --db jogostabuleiro --collection categorias --file /docker-entrypoint-initdb.d/categorias.json --jsonArray
mongoimport --host localhost --db jogostabuleiro --collection autores --file /docker-entrypoint-initdb.d/autores.json --jsonArray