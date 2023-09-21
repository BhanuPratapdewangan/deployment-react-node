import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from 'express';
import cors from 'cors';
import { createProxyMiddleware } from "http-proxy-middleware";

// const connString = 'mongodb+srv://bhanupratap04123:JfrGwm5Op3rxNokC@cluster0.3uck13t.mongodb.net/?retryWrites=true&w=majority';

const connString = "mongodb://127.0.0.1:27017";

const app = express();

// const PORT = process.env.PORT || 4500

const port = 4500;

// const backend_url = "https://deployment-backend-3in9.onrender.com/";

// const corsOptions = {
//     origin: 'https://deployment-frontend-w7vr.onrender.com',
//     // credentials:true,            //access-control-allow-credentials:true
//     // optionSuccessStatus:200
// }

// app.use(cors(corsOptions));
app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
    // Allow requests from a specific origin (replace with your frontend URL)
    res.header('Access-Control-Allow-Origin', 'https://deployment-frontend-w7vr.onrender.com');

    // Allow other necessary headers and HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Allow credentials (if needed)
    res.header('Access-Control-Allow-Credentials', 'true');

    // Continue to the next middleware
    next();
});

app.use('/api', createProxyMiddleware({
    target: 'https://deployment-backend-3in9.onrender.com',
    changeOrigin: true,
    // Add any other proxy options you may need
}));

// app.options("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     // res.sendStatus(204);
// });


// app.get('/api/data', (req, res) => {
//     // Your API logic here
//     Mongodb.connect(connString).then(clientObject => {

//         var database = clientObject.db("demo");
//         database.collection("users").find({}).toArray().then(document => {
//             res.send(document);
//             res.json({ message: 'This is a response from the API' });
//             res.end();
//         })
//     })
// });

// app.get('/user', (req, res) => {

//     Mongodb.connect(connString).then(clientObject => {

//         var database = clientObject.db("demo");
//         database.collection("users").find({}).toArray().then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })



app.get('/api/signin', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("demo");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})


app.post('/api/signup', async (req, res) => {

    var data = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Age: req.body.Age,
        Email: req.body.Email,
        Mobile: req.body.Mobile
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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
})

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT} `);
// })

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});