import { ObjectID } from 'mongodb'
import {connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    const b = JSON.parse(req.body);
    console.log('approve', { b });
    try {
        await db
            .collection("posts")
            .save({
                content: b.content,
                image: b.image,
                approved: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            })

        // console.log('approved post', {fofocas});
        res.json({ok: true});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
