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

// default entry point '/' 
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
});

// CRUD (Create / Read / Update / Delete) for articles ressource

// read all || get all
app.get('/api/articles', (req, res) => {
    res.json(data).status(200);
});

// read one || get one by Id
app.get('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(article => article.id === id);
 
    if(item){
        res.json(item).status(200);
    } else {
        res.json({message: 'Article not found'}).status(404);
    }
});

// create article
app.post('/api/articles', (req, res) => {
    const newArticle = {
        id : data.length + 1,
        title : req.body.title
    }
    data.push(newArticle);
    res.json(newArticle).status(201);
});

// update / edit article title
app.patch('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(article => article.id === id);

    if(item){
        item.title = req.body.title;
        res.json({ data : item, message : "Article has been modified !"}).status(200);
    } else {
        res.json({message: 'Article not found'}).status(404);
    }
});

// delete article by Id
app.delete('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(article => article.id === id);

    if(item){
        data.splice(data.indexOf(item), 1);
        res.json({ message : "Article have been deleted !"}).status(200);
    } else {
        res.json({message: 'Article not found'}).status(404);
    }
});

// log server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});