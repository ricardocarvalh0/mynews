import React, {useState} from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR, {mutate} from "swr";
import styles from '../styles.module.css'
import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

export default function Ethernity() {
    const [loading, setLoading] = useState(false);
    const {data} = useSWR('/api/fofocas/neto', fetcher, {refreshInterval: 30000});
    const fofocas = data?.fofocas || [];
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {fofocas.map(f =>
                <div key={f._id} style={{padding: '1.5rem', width: '40%', border: 'solid 1px grey', fontFamily: 'Avenir Next'}}>
                    <div style={{fontStyle: 'italic'}}>({formatDistance(new Date(f.createdAt), new Date(), { locale: ptBR })})</div>
                    <div style={{marginTop: '1rem'}}><img alt={f.autor} width={50} height={50} style={{objectFit: 'contain'}} src={f.autorImg}/></div>
                    <div>{f.autor} - <a href={`https://instagram.com/${f.autorInsta.replace('@', '')}`} target="_blank">{f.autorInsta}</a> - ( {f.autorEmail} )</div>
                    <div style={{marginTop: '1rem'}}><strong>texto:</strong> {f.content}</div>
                    <div
                        style={{
                            textAlign: 'center',
                            paddingTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {!f.approved && (
                            <button
                                style={{border: '2px solid green', cursor: 'pointer'}}
                                onClick={() => {
                                    setLoading(true);
                                    mutate('/api/fofocas/neto', async old => {
                                        // let's update the todo with ID `1` to be completed,
                                        // this API returns the updated data
                                        await fetch(`/api/fofocas/approve`, {
                                            method: 'PATCH',
                                            body: JSON.stringify({id: f._id})
                                        })
                                        setLoading(false);
                                        return {
                                            ...old,
                                            fofocas: old.fofocas.map(d => ({
                                                ...d,
                                                approved: d._id === f._id ? true : d.approved
                                            }))
                                        }
                                    })
                                }}
                            >
                                {loading ? '...': 'Aprovar'}
                            </button>
                        )}
                        <button
                            style={{border: '2px solid red', cursor: 'pointer'}}
                            onClick={() => {
                                setLoading(true)
                                mutate('/api/fofocas/neto', async old => {
                                    // let's update the todo with ID `1` to be completed,
                                    // this API returns the updated data
                                    await fetch(`/api/fofocas/delete`, {
                                        method: 'PATCH',
                                        body: JSON.stringify({id: f._id})
                                    })
                                    setLoading(false);
                                    return {
                                        ...old,
                                        fofocas: old.fofocas.filter(d => d._id !== f._id)
                                    }
                                })
                            }}
                        >
                            {loading ? '...': 'Apagar'}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
