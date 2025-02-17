const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('User Management Server')
})

// U7bHMGoJv8D3HsEN

const uri = "mongodb+srv://developersazzad7:U7bHMGoJv8D3HsEN@cluster0.58s2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Create Collection 
        const userCollection = client.db('userDB').collection('users')
        // const userCollection = client.db('usersDB').collection('user-list');

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        // create user
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log("new User", user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, (req, res) => {
    console.log(`Port is : ${port}`);
})