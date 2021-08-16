import {connectToDatabase} from "../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    console.log('req.aaaaaa', req.query.url);
    try {
        const fofocas = await db
            .collection("posts")
            .find({approved: false}).toArray();

        console.log('found posts', {fofocas});
        res.json({ok: true, fofocas});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
