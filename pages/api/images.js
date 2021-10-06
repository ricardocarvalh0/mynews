import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    let images = [];
    try {
         images = await db
            .collection("images")
            .find({ approved: false })
            // .sort({ amount: -1 })
            .limit(5)
            .toArray();
    } catch (err) {
        console.log('api erro', err);
    }

    console.log('images', images);
    // const gg = images.map(({ post }) => JSON.parse(post))
    res.json(images);
};
