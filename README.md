# DesCodeuses :

## Projet 4 : Web Scraping & API

### Express/NodeJS Serveur : 

> Etape 1
- Créer un dossier `server` dans un dossier `projet4`


> Etape 2
- Depuis le terminal :
    - se déplacer à la racine du dossier `server` puis exécuter la commande `npm init` pour initialiser un projet NodeJS [npm](https://www.npmjs.com/), cette commande va créer un fichier `package.json` à la racine de `server`.
    - installer les dépendances nécessaires à l'exécution du serveur : `npm install express nodemon --save`
        - Express : [express](https://expressjs.com/)
        - Nodemon : [nodemon](https://www.npmjs.com/package/nodemon)

> Etape 3
- Dans le fichier `package.json` :
    - ajouter le script `start` qui exécute le serveur avec `nodemon server.js`
  
> Etape 4
- Dans le dossier `server` :
    - Créer un fichier `index.js`
    - Dans le fichier `index.js` :
        - configurer le serveur avec `express` en ajoutant le code suivant :
            ```javascript
            // use micro framework express
            const express = require('express');

            // use a data file
            const data = require('./data.json');

            // use port 8000 to run server on localhost
            const port = 8000;

            // initialize express in a variable named app
            const app = express();

            // configure express to use urlencoded
            app.use(express.urlencoded({
                extended: true
            }));

            // default entry point '/' of the server => go to http://localhost:8000 after executing npm start
            app.get('/', (req, res) => {
                res.json({ message : 'Welcome on Express/Node Server'}).status(200);
            });

            // log server start (check your terminal to see the message)
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
            ```
        - configurer le serveur pour utiliser un fichier `data.json` en ajoutant le code suivant :
            ```javascript
            // use data file
            const data = require('./data.json');
            ```
        - puis ajouter un fichier data.json à la racine de `server` avec les datas suivantes :
            ```json
            [
                {
                    "id": 1,
                    "title": "Article 1"
                },
                {
                    "id": 2,
                    "title": "Article 2"
                }
            ]
            ```

> Etape 5
- Dans le terminal :
    - se déplacer à la racine du dossier `server` puis exécuter la commande `npm start` pour lancer le serveur


> Le serveur est prêt à être utilisé !


### Exercice :

A partir de ce qui a été fait ce matin, créer un serveur Express/NodeJs :
-GET ALL : répond à l'URL `/api/articles` et qui retourne un JSON contenant tous les articles du fichier `data.json`
-GET ONE : répond à l'URL `/api/articles/:id` et qui retourne un JSON contenant l'article correspondant à l'id passé en paramètre
-POST : répond à l'URL `/api/articles` et qui ajoute un nouvel article à `data.json` 
-PATCH : répond à l'URL `/api/articles/:id` et qui modifie l'article correspondant à l'id passé en paramètre
-DELETE : répond à l'URL `/api/articles/:id` et qui supprime l'article correspondant à l'id passé en paramètre

Tips : pour tester vos entrées, utilisez POSTMAN ou un navigateur web (selement pour les routes accessibles en méthode GET).