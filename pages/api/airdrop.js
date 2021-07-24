import {connectToDatabase} from "../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    try {
        const subs = await db
            .collection("airdropsubscription")
            .find().toArray();
        const newusers = await db
            .collection("profile")
            .find({ createdAt: { $gt: 1627128000000 } }).toArray();

        res.json({ok: true, subs, newusers });
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
