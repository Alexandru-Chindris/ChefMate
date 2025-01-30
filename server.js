const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:UHCWq9GeubQjNDny@chefmate.psqxt.mongodb.net/?retryWrites=true&w=majority&appName=ChefMate";

const mainDatabase = "sample_mflix";
const mainCollection = "movies";

const client = new MongoClient(uri);

async function createDocument(collection, string) {
    try {
      const result = await collection.insertOne(string);
      console.log("Documento inserito con ID:", result.insertedId);

    } catch (error) {
      console.error("Errore:", error);
    }
  }

async function updateDocument(collection, search) {
    try {
        const result = await collection.updateOne(
        { title: search }, // Filtro
        { $set: { title: "Spaghetti alla Carbonara" } } // Modifica
        );
        console.log("Documenti aggiornati:", result.modifiedCount);
    } catch (error) {
        console.error("Errore:", error);
    }
}

async function deleteDocument(collection, search) {
    try {
      const result = await collection.deleteOne({ title: search });
      console.log("Documenti eliminati:", result.deletedCount);

    } catch (error) {
      console.error("Errore:", error);
    }
}


async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connesso a MongoDB Atlas!");

    const database = client.db(mainDatabase);
    const collection = database.collection(mainCollection);

    // Esempio: Trova tutti i documenti nella collezione
    const documents = await collection.find({}).toArray();
    console.log("Documenti trovati:", documents);

    /*
     createDocument(
        collection, {
        title: "Spaghetti Carbonar",
        ingredients: ["spaghetti", "uova", "guanciale", "pecorino", "pepe"],
        instructions: "Cuoci la pasta, prepara la crema di uova e pecorino, unisci tutto con il guanciale.",}
        );
    */
    // updateDocument(collection, "Spaghetti Carbonara");
    // deleteDocument(collection, "Spaghetti alla Carbonara");


  } catch (error) {
    console.error("Errore di connessione a MongoDB:", error);
  } finally {
    await client.close();
  }
}
  
connectToDatabase();