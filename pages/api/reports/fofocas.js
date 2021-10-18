import {connectToDatabase} from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    try {
        const reports = await db
            .collection("postreports")
            .aggregate([{
                $sort: {
                    createdAt: -1
                }
            }, {$limit: 50}, {
                $lookup: {
                    from: 'posts',
                    localField: 'post',
                    foreignField: '_id',
                    as: 'fofoca'
                }
            }, {
                $lookup: {
                    from: 'userimages',
                    localField: 'from',
                    foreignField: 'firebaseId',
                    as: 'from'
                }
            }, {
                $lookup: {
                    from: 'userimages',
                    localField: 'to',
                    foreignField: 'firebaseId',
                    as: 'to'
                }
            }, {
                $unwind: {
                    path: '$fofoca'
                }
            }, {
                $unwind: {
                    path: '$from'
                }
            }, {
                $unwind: {
                    path: '$to'
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'to.firebaseId',
                    foreignField: 'firebaseId',
                    as: 'active'
                }
            }, {
                $unwind: {
                    path: '$active'
                }
            }, {
                $addFields: {
                    active: '$active.approved',
                    fofoca: '$fofoca.content'
                }
            }])
            .toArray();

        // console.log('found reports', {reports});
        res.json({ok: true, reports});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
