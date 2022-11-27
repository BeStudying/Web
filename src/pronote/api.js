import { casList, login as session } from '@dorian-eydoux/pronote-api';
import Express from 'express'

casList.pop()

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export function cas(req, res){
    res.status(200).json(casList)
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
        res.status(400).end();
        return;
    }
    let user = await session(`https://${rne}.index-education.net/pronote/`, username, password, cas).catch(error => res.status(500).json(error))
    res.status(200).json(user.id)
}