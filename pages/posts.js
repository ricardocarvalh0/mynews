import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR from "swr";
import styles from '../styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Movies(posts = []) {

    const { data, error } = useSWR('/api/news', fetcher, { refreshInterval: 1000 });
    // console.log('data', data);
    // console.log('error', error);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    // setTimeout(() => {
        let msg = data[0].message;
        const m = new Notification(msg);
    // }, 3000)
    return (
        <div>
            {
                data.map(({ id, message, link, create_at, fonte }) => (
                    <div key={id} className={styles.card}>
                        <div className={styles.container}>
                            <h4><b>{fonte} | {formatDistanceToNow(create_at)}</b></h4>
                            <p>{message.split('**')[1]}</p>
                            <p><a href={link} target="_blank">{link} </a></p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}