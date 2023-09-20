import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from 'express';
import cors from 'cors';

const connString = 'mongodb+srv://bhanupratap04123:JfrGwm5Op3rxNokC@cluster0.3uck13t.mongodb.net/?retryWrites=true&w=majority';

const app = express();

const PORT = process.env.PORT || 5500

// const backend_url = "https://deployment-backend-3in9.onrender.com/";

app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());

app.get('https://deployment-backend-3in9.onrender.com/users', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})



app.get('https://deployment-backend-3in9.onrender.com/signin', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})


app.post('https://deployment-backend-3in9.onrender.com/signup', async(req, res) => {
    
    var data = {
        UserId : req.body.UserId,
        UserName : req.body.UserName,
        Password : req.body.Password,
        Age : req.body.Age,
        Email : req.body.Email,
        Mobile : req.body.Mobile
    }

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").insertOne(data).then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.connect((req, res) => {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end();
})

app.listen(PORT, () => {
    console.log(`Server started to this URL http://localhost:5500`);
})