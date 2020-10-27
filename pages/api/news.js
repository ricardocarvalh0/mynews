import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const news = await db
        .collection("posts")
        .find({})
        .sort({ create_at: -1 })
        .limit(20)
        .toArray();

    // const gg = news.map(({ post }) => JSON.parse(post))
    // console.log('news', news);
    res.json(news);
};