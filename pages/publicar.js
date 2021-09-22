import React, {useRef} from "react";


export default function Ethernity() {
    const contentRef = useRef();
    const imageRef = useRef();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{width: '20rem', padding: '2rem'}}>
                <textarea ref={contentRef} style={{width: '20rem', height: '10rem'}}  placeholder="Fofoca" />
            </div>
            <div style={{width: '40rem', padding: '2rem'}}>
                <input ref={imageRef} style={{width: '40rem'}} type="text" placeholder="Url da imagem"/>
            </div>
            <div style={{width: '40rem', padding: '2rem', textAlign: 'center'}}>
                <button onClick={() => {
                    if (!contentRef.current.value) {
                        alert('PRESTA ATENCAO');
                    } else {
                        fetch(`/api/fofocas/create`, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                content: contentRef.current.value,
                                image: imageRef.current.value || null
                            })
                        }).then(() => {
                            alert('PUBLICOU');
                            contentRef.current.value = ''
                            imageRef.current.value = ''
                        }).catch((err) => {
                            console.error(err);
                            alert('NAO DEU CERTO');
                        })
                    }
                }}>Publicar</button>
            </div>
        </div>
    );
}
