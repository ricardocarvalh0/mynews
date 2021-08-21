import {connectToDatabase} from "../../../util/mongodb";

export default async (req, res) => {
    const {db} = await connectToDatabase();
    console.log('req.aaaaaa', req.query.url);
    try {
        const fofocas = await db
            .collection("posts")
            .aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'firebaseId',
                        foreignField: 'firebaseId',
                        as: 'autor'
                    }
                }, {
                    $unwind: {
                        path: '$autor'
                    }
                }, {
                    $addFields: {
                        autor: '$autor.name',
                        autorImg: '$autor.photoURL',
                        autorEmail: '$autor.email',
                        autorInsta: '$autor.insta',
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $limit: 50
                }
            ])
            .toArray();

        console.log('found posts', {fofocas});
        res.json({ok: true, fofocas});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
