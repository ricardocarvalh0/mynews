import styles from '../styles.module.css'
import {useEffect, useState} from "react";

const tk = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmljYXJkbyBBbHZlcyBDYXJ2YWxobyIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS80NzY5NjcxMTU2MzgyOTk1L3BpY3R1cmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29tZWNvcmRhbWF0Y2giLCJhdWQiOiJjb21lY29yZGFtYXRjaCIsImF1dGhfdGltZSI6MTYyNTUxNDM1NiwidXNlcl9pZCI6Ikl2ek40ZW52ZEVQR21PSUdEQW0xN212WlFyNzMiLCJzdWIiOiJJdnpONGVudmRFUEdtT0lHREFtMTdtdlpRcjczIiwiaWF0IjoxNjI1NTE0MzU2LCJleHAiOjE2MjU1MTc5NTYsImVtYWlsIjoicmljYXJkbzAwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJmYWNlYm9vay5jb20iOlsiNDc2OTY3MTE1NjM4Mjk5NSJdLCJlbWFpbCI6WyJyaWNhcmRvMDAxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZmFjZWJvb2suY29tIn19.NHRHjJ1Lq7bFik6LBMux3gG-xdvG_OuSrux4BoosD7MPZPJuX1c6hIFXQDd5LAN-MvRl9LglWnsKm1jlKtUo_ojtJKjtfmzKu6sQW0UHDHQUW7-EI_9kc9r5yJLWmiOpKEzAQSWX4cvF8Gm3wdjMRyHL_PAbYE0BVNuWA54db22y4naj9ErPrQrcyk2w1_t_uwmbKxSxi5xpRu-uPuby8tx1e-1KBjqE_rpqX1gIWrAsXO7yzKHOZxvS5N2cTYlVboYDiJDvcnOFFy0HmTOcxCcoZ1yavJRTH_pKCtU5KgjgWkpDlBeu8XsY9G8qfpzpV1z5WJGi63FhqySFLK5R6Q.eyJuYW1lIjoiUmljYXJkbyBBbHZlcyBDYXJ2YWxobyIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS80NzY5NjcxMTU2MzgyOTk1L3BpY3R1cmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29tZWNvcmRhbWF0Y2giLCJhdWQiOiJjb21lY29yZGFtYXRjaCIsImF1dGhfdGltZSI6MTYyNTUxNDM1NiwidXNlcl9pZCI6Ikl2ek40ZW52ZEVQR21PSUdEQW0xN212WlFyNzMiLCJzdWIiOiJJdnpONGVudmRFUEdtT0lHREFtMTdtdlpRcjczIiwiaWF0IjoxNjI1NTE0MzU2LCJleHAiOjE2MjU1MTc5NTYsImVtYWlsIjoicmljYXJkbzAwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJmYWNlYm9vay5jb20iOlsiNDc2OTY3MTE1NjM4Mjk5NSJdLCJlbWFpbCI6WyJyaWNhcmRvMDAxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZmFjZWJvb2suY29tIn19.NHRHjJ1Lq7bFik6LBMux3gG-xdvG_OuSrux4BoosD7MPZPJuX1c6hIFXQDd5LAN-MvRl9LglWnsKm1jlKtUo_ojtJKjtfmzKu6sQW0UHDHQUW7-EI_9kc9r5yJLWmiOpKEzAQSWX4cvF8Gm3wdjMRyHL_PAbYE0BVNuWA54db22y4naj9ErPrQrcyk2w1_t_uwmbKxSxi5xpRu-uPuby8tx1e-1KBjqE_rpqX1gIWrAsXO7yzKHOZxvS5N2cTYlVboYDiJDvcnOFFy0HmTOcxCcoZ1yavJRTH_pKCtU5KgjgWkpDlBeu8XsY9G8qfpzpV1z5WJGi63FhqySFLK5R6Q';
export default function Posts() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            const r = await fetch('/api/images', { method: 'GET' });
            const d = await r.json();
            setData(d);
        }
        getdata();
    }, [])

    return (
        <div className={`${styles.imgContainer}`}>
            {
                data.map((img) => (
                    <div key={img._id} className={`${styles.card}`}>
                        <div
                            key={img.url}
                            className={`${styles.cardImg}`}
                            style={{backgroundImage: `url("${img.url}")`}}
                        >
                        </div>
                        <div>
                            <button
                                className={`${styles.cardBtn}`}
                                onClick={() => {
                                    try {
                                        fetch(`http://localhost:9000/images/approve?id=${img._id}`, {
                                            headers: {
                                                'Access-Control-Allow-Origin': '*'
                                            }
                                        }).then((x) => console.log('LALAU', x)).catch(() => {
                                            console.log('CATC')
                                        });
                                    } catch (err) {
                                        console.log('ERRR', err);
                                    }

                                }}
                            >
                                Aprovar
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}