import React, {useCallback, useState} from "react";
import useSWR from "swr";
import UserReport, {UserCard, UserProfile} from "../components/userReport";
import {useRouter} from "next/router";

const fetcher = (...args) => fetch(...args).then(res => {
    return res.json()
})

export default function Reports() {
    const [loading, setLoading] = useState(false);
    const { query } = useRouter();
    const {data, mutate, revalidate, isValidating} = useSWR(`/api/users/profile?uid=${query.uid}`, fetcher, {
        refreshInterval: 60000,
    });

    if (isValidating) {
        return 'Carregando...';
    }

    if (!data?.user) {
        return 'Usuario nao encontrado'
    }

    console.log(data?.user);
    return (
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row'
        }}
        >
            <UserProfile user={data.user} />
        </div>
    );
}
