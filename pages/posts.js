import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR from "swr";
import styles from '../styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const getBGcolor = (relevance) => {
    if (relevance === 2 || relevance === 1)
        return styles.urgentbg;

    return styles.normalbg;
}

export default function Posts() {

    const { data, error } = useSWR('/api/news', fetcher, { refreshInterval: 10000 });

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    setTimeout(() => {
        const msg = data[0].message;
        const m = new Notification(msg);
    }, 2000);
    console.log('data', data);
    return (
        <div>
            {
                data.map(({ id, message, link, create_at, fonte, relevance }) => (
                    <div key={id} className={`${styles.card}`}>
                        <div className={`${styles.container}`}>
                            <h4 className={`${getBGcolor(relevance)}`}><b>{fonte} | {formatDistanceToNow(create_at)}</b>
                            </h4>
                            <p>{message.split('**')[1]}</p>
                            <p><a href={link} target="_blank">{link} </a></p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}