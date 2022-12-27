import { PronoteSession, fetchInfos, fetchTimetable, casUrls, login as connect } from '@dorian-eydoux/pronote-api'; 
import Express from 'express';
import { query } from './db.js';

/** @type {number: {PronoteSession}} */
let sessionsObjects = {};
/** @type {string: number} */
let sessionsINE = {};

const sessionToINE = (sessionId) => {
    for(const data of Object.entries(sessionsINE)){
        if(Number(sessionId) !== data[1]) continue;
        return data[0];
    }
    return null;
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export function cas(req, res){
    return res.status(200).json(Object.entries(casUrls).map(cas => {
        return {label: cas[1], value: cas[0]}
    })).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function login(req, res){
    const [rne, username, password, cas] = [req.query['rne'], req.query['username'], req.query['password'], req.query['cas']]
    if(!rne || !username || !password || !cas){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    /** @type {PronoteSession} */
    const session = await connect(`https://${rne}.index-education.net/pronote/`, username, password, cas).catch(error => { 
        if(error.code === 3){
            res.status(403).json(error.message).end();
        }
        res.status(100).json(error).end();
    });
    if(session instanceof PronoteSession){
        const ine = (await fetchInfos(session))?.numeroINE;
        session.setKeepAlive(true);
        sessionsObjects[session.id] = session;
        sessionsINE[ine] = session.id;
        return res.status(200).json(session.id).end();
    }
    return res.status(504).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function timetable(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    else if (!sessionsINE[target]){
        res.statusMessage = "Not Found";
        return res.status(404).end();
    }
    const timetable = await sessionsObjects[sessionsINE[target]].timetable(new Date(2022, 10, 28)).catch(err => res.status(500).json(err).end());
    if (Array.isArray(timetable)) {
        return res.status(200).json(timetable).end();
    }

}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function infos(req, res){
    const session = req.query['session'];
    if(!session){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    return res.status(200).json(await fetchInfos(sessionsObjects[session])).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function addFriend(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    return res.status(200).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function cancelFriend(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    return res.status(200).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function acceptFriend(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    return res.status(200).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function rejectFriend(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    return res.status(200).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function getFriends(req, res){
    const session = req.query['session'];
    const ine = sessionToINE(session);
    if(!session){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session] || !ine){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    await query(`SELECT * FROM Relations WHERE '${ine}' IN (first, second);`, function(results){
        const list = [ine];
        for (const result of results){
            if(result.first !== ine){
                list.push(result.first)
            }
            else if(result.second !== ine){
                list.push(result.second)
            }
        }
        return res.status(200).json(list).end();
    });
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function photo(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    else if (!sessionsINE[target]){
        res.statusMessage = "Not Found";
        return res.status(403).end();
    }
    const userSession = sessionsObjects[session];
    if(userSession instanceof PronoteSession){
        return res.status(200).json(userSession.user.avatar ?? "https://i.imgur.com/tbvsqWK.png").end();
    }
    return res.status(500).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function nom(req, res){
    const [session, target] = [req.query['session'], req.query['target']];
    if(!session || !target){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    else if (!sessionsObjects[session]){
        res.statusMessage = "Forbidden";
        return res.status(403).end();
    }
    else if (!sessionsINE[target]){
        res.statusMessage = "Not Found";
        return res.status(403).end();
    }
    const userSession = sessionsObjects[session];
    if(userSession instanceof PronoteSession){
        return res.status(200).json(userSession.user.name).end();
    }
    return res.status(500).end();
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function ping(req, res){
    const session = req.query['session'];
    if(!session){
        res.statusMessage = "Bad Request";
        return res.status(400).end();
    }
    return res.status(200).json(+!!sessionsObjects[session]).end();
}

