import Pronote, { login as connect } from '@dorian-eydoux/pronote-api';
import Express from 'express'

const casList = {
    'ac-besancon': 'cas.eclat-bfc.fr',
    'ac-bordeaux': 'mon.lyceeconnecte.fr',
    'ac-bordeaux2': 'ent2d.ac-bordeaux.fr',
    'ac-caen': 'fip.itslearning.com',
    'ac-clermont': 'cas.ent.auvergnerhonealpes.fr',
    'ac-dijon': 'cas.eclat-bfc.fr',
    'ac-grenoble': 'cas.ent.auvergnerhonealpes.fr',
    'ac-lille': 'cas.savoirsnumeriques62.fr',
    'ac-lille2': 'teleservices.ac-lille.fr',
    'ac-limoges': 'mon.lyceeconnecte.fr',
    'ac-lyon': 'cas.ent.auvergnerhonealpes.fr',
    'ac-montpellier': 'cas.mon-ent-occitanie.fr',
    'ac-nancy-metz': 'cas.monbureaunumerique.fr',
    'ac-nantes': 'cas3.e-lyco.fr',
    'ac-orleans-tours': 'ent.netocentre.fr',
    'ac-poitiers': 'mon.lyceeconnecte.fr',
    'ac-reims': 'cas.monbureaunumerique.fr',
    'ac-rouen': 'nero.l-educdenormandie.fr',
    'ac-strasbourg': 'cas.monbureaunumerique.fr',
    'ac-toulouse': 'cas.mon-ent-occitanie.fr',
    'ac-valdoise': 'cas.moncollege.valdoise.fr',
    'agora06': 'cas.agora06.fr',
    'arsene76': 'cas.arsene76.fr',
    'atrium-sud': 'www.atrium-sud.fr',
    'cybercolleges42': 'cas.cybercolleges42.fr',
    'eure-normandie': 'cas.ent27.fr',
    'haute-garonne': 'cas.ecollege.haute-garonne.fr',
    'hdf': 'enthdf.fr',
    'iledefrance': 'ent.iledefrance.fr',
    'moncollege-essonne': 'www.moncollege-ent.essonne.fr',
    'laclasse': 'www.laclasse.com',
    'ljr-munich': 'cas.kosmoseducation.com',
    'lyceeconnecte': 'mon.lyceeconnecte.fr',
    'parisclassenumerique': 'ent.parisclassenumerique.fr',
    'portail-famille': 'seshat.ac-orleans-tours.fr:8443',
    'seine-et-marne': 'ent77.seine-et-marne.fr',
    'somme': 'college.entsomme.fr',
    'toutatice': 'www.toutatice.fr',
    'monbureaunumerique-educonnect': 'cas.monbureaunumerique.fr'
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export function cas(req, res){
    res.status(200).json(Object.entries(casList).map(cas => {
        return {label: cas[1], value: cas[0]}
    }))
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
    {Pronote.PronoteSession} const session = await connect(`https://${rne}.index-education.net/pronote/`, username, password, cas).catch(error => res.status(404).json(error));
    session.setKeepAlive(true);
    res.status(200).json(session.id)
}

/**
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {void}
 */
export async function timetable(req, res){
    const [session, target, from] = [req.query['session'], req.query['target'], req.query['from']]
    res.status(200)
}