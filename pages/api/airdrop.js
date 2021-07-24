import {connectToDatabase} from "../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    try {
        const subs = await db
            .collection("airdropsubscription")
            .find().toArray();
        const newusers = await db
            .collection("profile")
            .find({ createdAt: { $gt: 1627128000000 } }, { email: 1})
            .toArray();

        const signups = subs.filter(s => s.subscribed);
        const denials = subs.filter(s => !s.subscribed && s.popupDisabled);

        res.json({ok: true, signups: signups.length, denials: denials.length, newusers: newusers.length});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
