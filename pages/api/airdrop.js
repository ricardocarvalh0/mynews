import {connectToDatabase} from "../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    try {
        const subs = await db
            .collection("dropsubscription")
            .find().toArray();
        const newusers = await db
            .collection("profile")
            .find({ createdAt: { $gt: 1628089200000 } }, { email: 1})
            .toArray();

        const denials = subs.filter(s => !s.subscribed && s.popupDisabled);

        res.json({ok: true, signups: subs.length, denials: denials.length, newusers: newusers.length});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
