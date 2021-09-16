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
    const {data} = useSWR('/api/reports/list', fetcher, {refreshInterval: 60000});
    const reports = data?.reports || [];
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {reports.map(report =>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    border: 'solid 1px grey',
                    fontFamily: 'Avenir Next',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '1.5rem',
                }}
                >
                    <div
                        style={{
                            fontStyle: 'italic',
                            width: '100%',
                            textAlign: 'left'
                        }}>({formatDistance(new Date(report.createdAt), new Date(), {locale: ptBR})})
                    </div>
                    <div key={report._id} style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        fontSize: 20
                    }}>
                        <div style={{textAlign: 'center'}}>
                            <div style={{marginTop: '1rem'}}>
                                <img alt={report.from.url} width={100} height={100}
                                     style={{objectFit: 'contain'}} src={report.from.url}/>
                            </div>
                            <div>{report.from.name}</div>
                        </div>
                        <div style={{marginTop: '1rem'}}><strong>denunciou -></strong></div>
                        <div style={{textAlign: 'center'}}>
                            <div style={{marginTop: '1rem'}}>
                                <img alt={report.to.url} width={100} height={100}
                                     style={{objectFit: 'contain'}} src={report.to.url}/>
                            </div>
                            <div>{report.to.name}</div>
                            <div style={{fontSize: 14}}>{report.to.firebaseId}</div>
                        </div>
                        <div style={{marginTop: '1rem'}}><strong>motivo:</strong> {report.reason}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
