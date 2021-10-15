export default async (req, res) => {
    const b = JSON.parse(req.body);
    console.log('ban user', { b });
    try {
        const data = await fetch('https://api.comecorda.com/users/disable', {
            method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                    'Access-Control-Allow-Headers':
                    'Authorization, Origin, Content-Type, X-CSRF-Token',
            },
            body: JSON.stringify({ uid: b.uid })
        });

        if(data.ok) {
            const d = await data.json();
            res.status(200).json({ok: true});
            return;
        }

        res.json({ok: false});
    } catch (err) {
        console.log('api erro', err);
        res.json({ok: false});
    }
};
