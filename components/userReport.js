import React from "react";
import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";

export const UserProfile = ({user, active = true, children}) => {
    const {images, name, firebaseId, bio, city, estado} = user;
    return (
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{marginTop: '1rem'}}>
                <img alt={images[0].url} width={200} height={200}
                     style={{objectFit: 'contain'}} src={images[0].url}/>
            </div>
            <div style={{fontSize: 12}}>{firebaseId}</div>
            <div>{name}, {city.name} - {estado.sigla}</div>
            <div style={{width: '50%', textAlign: 'center', margin: '0.5rem'}}>{bio}</div>

            <div style={{marginTop: '1rem'}}>
                <img alt={images[1]?.url} width={200} height={200}
                     style={{objectFit: 'contain'}} src={images[1]?.url}/>
            </div>

            <div style={{marginTop: '1rem'}}>
                <img alt={images[2]?.url} width={200} height={200}
                     style={{objectFit: 'contain'}} src={images[2]?.url}/>
            </div>
            <div style={{marginTop: '1rem'}}>
                <img alt={images[3]?.url} width={200} height={200}
                     style={{objectFit: 'contain'}} src={images[3]?.url}/>
            </div>
            {!active && (
                <div style={{fontSize: 12, color: 'pink', fontWeight: 400, letterSpacing: 1.2}}>desativado</div>)}
            {children}
        </div>
    );
}
export const UserCard = ({user, active = true, children}) => {
    const {url, name, firebaseId} = user;
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{marginTop: '1rem'}}>
                <img alt={url} width={100} height={100}
                     style={{objectFit: 'contain'}} src={url}/>
            </div>
            <div>{name}</div>
            <div style={{fontSize: 12}}>
                <a href={`/user?uid=${firebaseId}`} target="_blank">{firebaseId}</a>
            </div>
            {!active && (
                <div style={{fontSize: 12, color: 'pink', fontWeight: 400, letterSpacing: 1.2}}>desativado</div>)}
            {children}
        </div>
    );
}

const UserReport = ({report, onEnable, onDisable, onBan}) => {
    const {_id, active, createdAt, from, to, reason, fofoca} = report;
    return (
        <div
            key={_id}
            style={{
                display: 'flex',
                border: 'solid 1px black',
                fontFamily: 'Avenir Next',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '1rem',
                margin: '0.5rem',
                backgroundColor: active ? 'white' : 'grey'
            }}
        >
            {fofoca && (
                <div
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        fontWeight: 600
                    }}>
                    {fofoca}
                </div>
            )}
            <div
                style={{
                    fontStyle: 'italic',
                    width: '100%',
                    textAlign: 'left'
                }}>({formatDistance(new Date(createdAt), new Date(), {locale: ptBR})})
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    fontSize: 20
                }}
            >
                <UserCard user={from}/>
                <div style={{marginTop: '1rem'}}><strong>denunciou</strong></div>
                <UserCard user={to} active={active}>
                    <div>
                        {active ? (
                            <button
                                style={{margin: '1rem'}}
                                onClick={() => {
                                    onDisable(to.firebaseId)
                                }}
                            >
                                Desativar
                            </button>
                        ) : (
                            <button
                                style={{margin: '1rem'}}
                                onClick={() => {
                                    onEnable(to.firebaseId)
                                }}
                            >
                                Ativar
                            </button>
                        )}
                        <button
                            onClick={() => {
                                onBan(to.firebaseId);
                            }}
                        >
                            Banir
                        </button>
                    </div>
                </UserCard>
                <div style={{marginTop: '1rem'}}><strong>motivo:</strong> {reason}</div>
            </div>
        </div>
    )
}

export default UserReport;