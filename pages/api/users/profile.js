import {connectToDatabase} from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    console.log({req: req.query});
    if (!req.query || req.query === 'undefined') {
        console.log('returning empty', req.query);
        res.json({ok: true, user: {}});
        return;
    }
    try {
        const [user] = await db
            .collection("users")
            .aggregate([{
                $match: {
                    firebaseId: req.query.uid
                }
            }, {
                $lookup: {
                    from: 'images',
                    localField: 'firebaseId',
                    foreignField: 'firebaseId',
                    as: 'images'
                }
            }, {
                '$lookup': {
                    from: 'cities',
                    localField: 'city',
                    foreignField: '_id',
                    as: 'city'
                }
            }, {
                '$unwind': {
                    path: '$city'
                }
            },{
                '$lookup': {
                    from: 'estados',
                    localField: 'estado',
                    foreignField: '_id',
                    as: 'estado'
                }
            }, {
                '$unwind': {
                    path: '$estado'
                }
            }])
            .toArray();

        console.log('found user', req.query.uid, {user});
        res.json({ok: true, user});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
