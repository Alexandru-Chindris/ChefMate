const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; // Open Port

// Middleware handle JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

/* Limiting request only from specified port, removed for web interface.

app.use(cors({
    origin: 'http://localhost:5174', // Consenti solo richieste da questa origine
}));

*/

const uri = "mongodb+srv://admin:UHCWq9GeubQjNDny@chefmate.psqxt.mongodb.net/?retryWrites=true&w=majority&appName=ChefMate";

const mainDatabase = "sample_mflix";
const mainCollection = "movies";

// Connecting to database
async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connesso a MongoDB Atlas!");
    const database = client.db(mainDatabase);
    const collection = database.collection(mainCollection);
    return { client, collection };
}

// Endpoint to insert document
app.post('/create', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
  
    try {
      const { client, collection } = await connectToDatabase();
  
      const result = await collection.insertOne({
        title,
        ingredients,
        instructions,
      });
  
      console.log("Documento inserito con ID:", result.insertedId);
      res.status(201).json({ message: "Documento creato", id: result.insertedId });
  
      await client.close();
    } catch (error) {
      console.error("Errore durante l'inserimento:", error);
      res.status(500).json({ error: "Errore durante l'inserimento" });
    }
});

// Endpoint to update document
app.put('/update', async (req, res) => {
    const { search, newTitle } = req.body;
  
    try {
      const { client, collection } = await connectToDatabase();
  
      const result = await collection.updateOne(
        { title: search }, // Filtro
        { $set: { title: newTitle } } // Modifica
      );
  
      console.log("Documenti aggiornati:", result.modifiedCount);
      res.status(200).json({ message: "Documento aggiornato", modifiedCount: result.modifiedCount });
  
      await client.close();
    } catch (error) {
      console.error("Errore durante l'aggiornamento:", error);
      res.status(500).json({ error: "Errore durante l'aggiornamento" });
    }
});

// Endpoint to delete document
app.delete('/delete', async (req, res) => {
    const { search } = req.body;
  
    try {
      const { client, collection } = await connectToDatabase();
  
      const result = await collection.deleteOne({ title: search });
  
      console.log("Documenti eliminati:", result.deletedCount);
      res.status(200).json({ message: "Documento eliminato", deletedCount: result.deletedCount });
  
      await client.close();
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      res.status(500).json({ error: "Errore durante l'eliminazione" });
    }
});

// Server call
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});

/*

For shell debugging

curl -X POST http://localhost:5000/create \
-H "Content-Type: application/json" \
-d '{"title": "Spaghetti Carbonara", "ingredients": ["spaghetti", "uova", "guanciale", "pecorino", "pepe"], "instructions": "Cuoci la pasta, prepara la crema di uova e pecorino, unisci tutto con il guanciale."}'

*/