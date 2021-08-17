import { ObjectID } from 'mongodb'
import {connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    const b = JSON.parse(req.body);
    console.log('approve', { b });
    try {
        const fofocas = await db
            .collection("posts")
            .updateOne({ _id: ObjectID(b.id) }, { $set: {approved: true} })

        console.log('approved post', {fofocas});
        res.json({ok: true, fofocas});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
