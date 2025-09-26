const dotenv = require("dotenv")
dotenv.config();

const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.CONNECTION_STRING);

async function start() {
    await client.connect();
    module.exports = client.db("Myapp");

    const app = require("./app");
    app.listen(process.env.PORT, () => {
        console.log(`Server is working on port ${process.env.PORT}.`);
    });
}

start();