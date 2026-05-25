# ENGWEB2026-Normal

### Realizado por Soraia Filipa Ribeiro Pereira, a106806


# EXERCÍCIO 1

## Alterações realizadas aos dados

A paritr do jogos.json foram criados dois ficheiros: autores.json e categorias.json. O primeiro contém os autores dos jogos (_id e nome) e a lista dos seus jogos (_id e nome). O segundo contém as categorias dos jogos (_id e nome) e a lista dos jogos que pertencem a cada categoria (_id e nome).

Depois, para fazer import para o MongoDB, criei o [docker-compose](ex1/docker-compose.yml) com o serviço mongodb e na pasta [data](ex1/data) do ex1 criei um Dockerfile que copia os ficheiros json para dentro do container e um script de importação. Assim, quando o container do mongo arranca, o script é executado e os dados são importados para a base de dados jogostabuleiro.
Criei 3 coleções: jogos, autores e categorias, usando os ficheiros json correspondentes.

Para entrar na shell do mongosh no container do mongo e testar, usei
```
docker exec -it mongodb_jogos mongosh
```

## Queries
Repostas disponíveis em [ex1/queries.txt](ex1/queries.txt)


## 1.3.

- Na rota
    "GET /jogos?editora=EEEE: devolve a lista de jogos que foram publicados pela editora EEEE: id(ou _id), name, year;""
  Assumi que a editora refere-se ao _id da editora, e não o nome.

- Nas rotas GET /autores e GET /categorias, as listas de jogos associadas a cada autor/categoria contêm o _id e name do jogo e não id e name.

## Execução
Ir para o diretório ex1 e executar
```
docker compose up --build -d
```
Para parar os containers
```
docker compose down
```
Opcionalmente, incluir flag --remove-orphans para eliminar o container do mongo totalmente.


# EXERCÍCIO 2

O modelo derivado para a base de dados é do tipo:
```
    {
        "_id": "l2",
        "titulo": "1984",
        "autor": "George Orwell",
        "paginas": 1178,
        "genero": "Fantasia",
        "lido": false
    }
```

O ficheiro JSON desenvolvido encontra-se em [ex2/api_dados/livros.json](ex2/api_dados/livros.json) e contém 10 livros.
Para importar os dados para o MongoDB, segui a mesma técnica do exercício 1.
A API de dados está em [ex2/api_dados](ex2/api_dados) e a interface em [ex2/interface](ex2/interface).

## Execução
Ir para o diretório ex2 e executar
```
docker compose up --build -d
```
Para parar os containers
```
docker compose down
```
Opcionalmente, incluir flag --remove-orphans para eliminar o container do mongo totalmente.
