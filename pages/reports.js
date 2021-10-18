import React, {useCallback, useState} from "react";
import useSWR from "swr";
import UserReport from "../components/userReport";

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

export default function Reports() {
    const [loading, setLoading] = useState(false);
    const {data, mutate, revalidate} = useSWR('/api/reports/list', fetcher, {
        refreshInterval: 60000,
    });

    const {
        data: fofocas,
        mutate: mutateFofocasList,
        revalidate: revalidateFofocas
    } = useSWR('/api/reports/fofocas', fetcher, {
        refreshInterval: 60000,
    });

    console.log({fofocas});
    const mutateReport = useCallback(async ({uid, action, successMsg}) => {
        const b = confirm('Tem certeza?');
        if (b) {
            setLoading(true);
            mutate(async old => {
                const res = await fetch(`/api/users/${action}`, {
                    method: 'POST',
                    body: JSON.stringify({uid})
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
                alert(successMsg);
                await revalidate();
                return old
            }, true);
        }
    }, [mutate, setLoading, revalidate]);

    const mutateFofocaReport = useCallback(async ({uid, action, successMsg}) => {
        const b = confirm('Tem certeza?');
        if (b) {
            setLoading(true);
            mutateFofocasList(async old => {
                const res = await fetch(`/api/users/${action}`, {
                    method: 'POST',
                    body: JSON.stringify({uid})
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
                alert(successMsg);
                await revalidateFofocas();
                return old
            }, true);
        }
    }, [mutate, setLoading, revalidate]);


    if (!data?.reports || !fofocas?.reports) {
        return 'Carregando...'
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                {loading && (
                    <div>Atualizando...</div>
                )}
                <div>Usuários denunciados</div>
                {data.reports.map(report => {
                    const {firebaseId: reportedUser} = report.to;
                    return (
                        <UserReport
                            report={report}
                            onEnable={() =>
                                mutateReport({
                                    uid: reportedUser,
                                    action: 'enable',
                                    successMsg: 'Ativado.'
                                })
                            }
                            onDisable={() =>
                                mutateReport({
                                    uid: reportedUser,
                                    action: 'disable',
                                    successMsg: 'Desativado.'
                                })
                            }
                            onBan={() =>
                                mutateReport({
                                    uid: reportedUser,
                                    action: 'ban',
                                    successMsg: 'Banido.'
                                })
                            }
                        />
                    );
                })}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div>Fofocas denunciadas</div>
                {loading && (
                    <div>Atualizando...</div>
                )}
                {fofocas.reports.map(report => {
                    const {firebaseId: reportedUser} = report.to;
                    return (
                        <UserReport
                            report={report}
                            onEnable={() =>
                                mutateFofocaReport({
                                    uid: reportedUser,
                                    action: 'enable',
                                    successMsg: 'Ativado.'
                                })
                            }
                            onDisable={() =>
                                mutateFofocaReport({
                                    uid: reportedUser,
                                    action: 'disable',
                                    successMsg: 'Desativado.'
                                })
                            }
                            onBan={() =>
                                mutateFofocaReport({
                                    uid: reportedUser,
                                    action: 'ban',
                                    successMsg: 'Banido.'
                                })
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
