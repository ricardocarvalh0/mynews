import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    console.log('body', req.body);
    const {
        id,
        create_at,
        update_at,
        user_id,
        message,
        hashtags,
        fonte,
        link,
        relevance,
        ticker,
        stocks
    } = JSON.parse(req.body);
    const posts = await db.collection("posts");
    const doc = {
        id,
        create_at,
        update_at,
        user_id,
        message,
        hashtags,
        fonte,
        link,
        relevance,
        ticker,
        stocks,
        created_at: new Date().getTime()
    };
    await posts.insertOne(doc);
    console.log('added', doc);
    res.json([]);
};