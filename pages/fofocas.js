import React, { useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR from "swr";
import styles from '../styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

const start = 1628089200000;

const duration = (d) => {
    const hours = d / 1000 / 60 / 60;
    const intHours = parseInt(hours, 10);
    const minutes = parseInt((hours - intHours) * 60, 10);
    return `${intHours}h${minutes}m`
}
export default function Ethernity() {
    const { data } = useSWR('/api/approve', fetcher, { refreshInterval: 30000 });
    console.log({data});
    const fofocas = data?.fofocas || [];
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {fofocas.map(f =>
                <div style={{ padding: '1.5rem'}}>
                    <div>criado: {new Date(f.createdAt).toLocaleString()}</div>
                    <div>texto: {f.content}</div>
                </div>
            )}
        </div>
    );
}
