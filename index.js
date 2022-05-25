// use micro framework express
const express = require('express');

// use axios
const axios = require('axios');

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

// default entry point '/' 
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
});

// get characters from rick and morty api
app.get('/api/characters', async (req, res) => {
    // try to get data from rick and morty api
    try {
        // fetch data from rick and morty api with axios and asynchrone method (await) then save response in a variable
        const responseFromApi = await axios.get('https://rickandmortyapi.com/api/character/')
        // send response data to client
        res.json(responseFromApi.data.results).status(200);

        // Is the second possibility to fetch data from rick and morty api with axios
        //axios.get('https://rickandmortyapi.com/api/character/')
        //.then(responseFromApi => res.send(responseFromApi.data.results).status(200))
        
    } 
    // catch error if any
    catch (error) {
        console.log(error);
    }
});

// CRUD (Create / Read / Update / Delete) for articles ressource

// read all || get all
app.get('/api/articles', (req, res) => {
    res.json(data).status(200);
});

// read one || get one by Id
// :id is a placeholder for the id of the article
app.get('/api/articles/:id', (req, res) => {
    // get the id from the url params
    const id = parseInt(req.params.id);
    // find the article in the data array
    const item = data.find(article => article.id === id);
    // if the article is found
    if(item){
        // send the article
        res.json(item).status(200);
    } else {
        // else send a 404 error
        res.json({message: 'Article not found'}).status(404);
    }
});

// create article
app.post('/api/articles', (req, res) => {
    // initialize a new article
    const newArticle = {
        // get the id from the data array + 1 to get the next id
        id : data.length + 1,
        // get the title from the body request (data send by the client)
        title : req.body.title
    }
    // push the new article to the data array
    data.push(newArticle);
    // send the new article to the client
    res.json(newArticle).status(201);
});

// update / edit article title
app.patch('/api/articles/:id', (req, res) => {
    // get the id from the url params
    const id = parseInt(req.params.id);
    // find the article in the data array
    const item = data.find(article => article.id === id);

    // if the article is found
    if(item){
        // update the article title
        item.title = req.body.title;
        // send the updated article to the client
        res.json({ data : item, message : "Article has been modified !"}).status(200);
    } else {
        // else send a 404 error
        res.json({message: 'Article not found'}).status(404);
    }
});

// delete article by Id
app.delete('/api/articles/:id', (req, res) => {
    // get the id from the url params
    const id = parseInt(req.params.id);
    // find the article in the data array
    const item = data.find(article => article.id === id);

    // if the article is found
    if(item){
        // remove the article from the data array
        data.splice(data.indexOf(item), 1);
        // send a message to the client
        res.json({ message : "Article have been deleted !"}).status(200);
    } else {
        // else send a 404 error
        res.json({message: 'Article not found'}).status(404);
    }
});

// log server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});