import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from 'express';
import cors from 'cors';

// const connString = 'mongodb+srv://bhanupratap04123:JfrGwm5Op3rxNokC@cluster0.3uck13t.mongodb.net/?retryWrites=true&w=majority';

const connString = "mongodb://127.0.0.1:27017";

const app = express();

const PORT = process.env.PORT || 5500

// const backend_url = "https://deployment-backend-3in9.onrender.com/";

const corsOptions ={
    origin:'https://deployment-frontend-w7vr.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(urlencoded({extended:true}));
app.use(express.json());

app.options("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
  });

app.get('/users', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})



app.get('/signin', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})


app.post('/signup', async(req, res) => {
    
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