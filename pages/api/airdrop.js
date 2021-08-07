import {connectToDatabase} from "../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    try {
        const subs = await db
            .collection("dropsubscription")
            .count();
        const newusers = await db
            .collection("profile")
            .countDocuments({ createdAt: { $gt: 1628089200000 } });

        console.log({ subs, newusers})

        res.json({ok: true, signups: subs.toLocaleString(), denials: 0, newusers: newusers.toLocaleString()});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
