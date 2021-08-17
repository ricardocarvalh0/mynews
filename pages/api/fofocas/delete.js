import { ObjectID } from 'mongodb'
import {connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    const b = JSON.parse(req.body);
    console.log('delete', { b });
    try {
        const fofocas = await db
            .collection("posts")
            .deleteOne({ _id: ObjectID(b.id) })
        await db
            .collection("postreactions")
            .deleteOne({ post: ObjectID(b.id) })

        console.log('deleted post', {fofocas});
        res.json({ok: true, fofocas});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
