import React, {useState} from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR, {mutate} from "swr";
import styles from '../styles.module.css'
import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

export default function Reports() {
    const [loading, setLoading] = useState(false);
    const {data, mutate} = useSWR('/api/reports/list', fetcher, {
        refreshInterval: 60000,
    });
    // console.log('render', data);
    if (!data?.reports) {
        return 'Carregando...'
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            { loading && (
                <div>Atualizando...</div>
            )}
            {data.reports.map(report =>
                <div
                    key={report._id}
                    style={{
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
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            fontSize: 20
                        }}
                    >
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
                            <div style={{fontSize: 12}}>{report.to.firebaseId}</div>
                            <div>
                                <button
                                    style={{margin: '1rem'}}
                                    onClick={() => {
                                        const b = confirm('Tem certeza?');
                                        if (b) {
                                            setLoading(true);
                                            mutate(async old => {
                                                const res = await fetch(`/api/users/disable`, {
                                                    method: 'POST',
                                                    body: JSON.stringify({uid: report.to.firebaseId})
                                                }).catch(() => old)
                                                if (!res.ok) {
                                                    setLoading(false);
                                                    alert('Deu erro');
                                                    return old;
                                                }
                                                const resp = await res.json();
                                                if (!resp.ok) {
                                                    setLoading(false);
                                                    alert('Deu erro');
                                                    return old;
                                                }

                                                setLoading(false);
                                                alert('Banido. Desative a conta no firebase.');
                                                console.log({ resp, before: old })
                                                const after = {
                                                    ...old,
                                                    reports: old.reports.filter(({ to }) => to.firebaseId !== report.to.firebaseId)
                                                };
                                                console.log({ after })
                                                return after
                                            }, true);
                                        }
                                    }}
                                >
                                    Desativar
                                </button>
                                <button
                                    onClick={() => {
                                        const b = confirm('Tem certeza?');
                                        if (b) {
                                            setLoading(true);
                                            mutate(async old => {
                                                const res = await fetch(`/api/users/ban`, {
                                                    method: 'POST',
                                                    body: JSON.stringify({uid: report.to.firebaseId})
                                                }).catch(() => old)
                                                if (!res.ok) {
                                                    setLoading(false);
                                                    alert('Deu erro');
                                                    return old;
                                                }
                                                const resp = await res.json();
                                                if (!resp.ok) {
                                                    setLoading(false);
                                                    alert('Deu erro');
                                                    return old;
                                                }

                                                setLoading(false);
                                                alert('Banido. Desative a conta no firebase.');
                                                console.log({ resp, before: old })
                                                const after = {
                                                    ...old,
                                                    reports: old.reports.filter(({ to }) => to.firebaseId !== report.to.firebaseId)
                                                };
                                                console.log({ after })
                                                return after
                                            }, true);
                                        }
                                    }}
                                >
                                    Banir
                                </button>
                            </div>
                        </div>
                        <div style={{marginTop: '1rem'}}><strong>motivo:</strong> {report.reason}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
