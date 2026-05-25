#!/bin/bash
# Importa o JSON para a base de dados
mongoimport --host localhost --db leitura --collection livros  --file /docker-entrypoint-initdb.d/livros.json --jsonArray
