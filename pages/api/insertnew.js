import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    console.log('body', req.body);
    const payload = JSON.parse(req.body);
    const posts = await db.collection("posts");
    const doc = { ...payload, created_at: new Date().getTime() };
    await posts.insertOne(doc);
    console.log('added', doc);
    res.json([]);
};