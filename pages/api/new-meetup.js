import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
    console.log(title, image, address, description);

    const client = await MongoClient.connect(
      "mongodb+srv://drodrigomoura:1rvtq9b9@cluster0.lomqc.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    // res.send(result);
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
