import { connectToDatabase } from "../../util/mongodb";
import { startOfToday } from 'date-fns'

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const news = await db
        .collection("posts").deleteMany({ create_at: { $lt: startOfToday().getTime() } })

    // const gg = news.map(({ post }) => JSON.parse(post))
    // console.log('news', news);
    res.json(news);
};