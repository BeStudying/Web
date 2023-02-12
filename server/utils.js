import {fetchInfos} from "@dorian-eydoux/pronote-api";
import {query} from "./db.js";

export function saveInfos(session){
    fetchInfos(session).then(infos => {
        query(`REPLACE Adresses VALUES ('${session.ine}', '${infos.adresse1}', '${infos.adresse2}', '${infos.adresse3}', '${infos.adresse4}', '${infos.codePostal}', '${infos.ville}', '${infos.province}', '${infos.pays}');`);
        const tel = `+${infos.indicatifTel}${infos.telephonePortable}`;
        query(`REPLACE Users VALUES ('${session.ine}', '${session.user.name}', '${session.user.studentClass.name}', '${session.user.establishment.name}', '${session.user.avatar}', '${tel}', '${infos.eMail}');`);
    });
}