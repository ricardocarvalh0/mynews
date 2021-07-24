import React, { useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR from "swr";
import styles from '../styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

const start = 1627128000000;

const duration = (d) => {
    const hours = d / 1000 / 60 / 60;
    const intHours = parseInt(hours, 10);
    const minutes = parseInt((hours - intHours) * 60, 10);
    return `${intHours}h${minutes}m`
}
export default function Ethernity() {
    const { data } = useSWR('/api/airdrop', fetcher, { refreshInterval: 30000 });
    const subs = data?.subs || [];
    const newusers = data?.newusers || [];
    const signups = subs.filter(s => s.subscribed);
    const denials = subs.filter(s => !s.subscribed && s.popupDisabled);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 24, alignItems: 'center' }}>
            <div style={{fontSize: 26, padding: 10}}><strong>Airdrop numbers</strong></div>
            <div><strong>{duration(new Date().getTime() - start)}</strong></div>
            <div>New users: <strong>{newusers.length}</strong></div>
            <div>Signups: <strong>{signups.length}</strong></div>
            <div>Denials: <strong>{denials.length}</strong></div>
        </div>
    );
}
