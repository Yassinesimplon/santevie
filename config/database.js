import mysql from 'mysql2';

const pool = mysql.createPool({

    host : 'localhost',
    user : 'root',
    password: 'yassine',
    database : 'cabinet',
}).promise();

// export async function getPatient(id){
//     const [row] = await pool.query('select * from patient' );
//     return row;
// }
export async function getPatient(id){
    const [row] = await pool.query('select * from patient' );
    return row;
}
export async function addPatient(patient){
    const sql = 'INSERT INTO patient (nom, prenom, age, genre, phone) VALUES (?,?,?,?,?)';

    await pool.query(sql,[patient.nom,patient.prenom,patient.age,patient.genre,patient.phone]);
} 
export async function getrndv(){
    const [row] = await pool.query('select rndv.*,nom,prenom from rndv left join patient on rndv.patient_id=patient.id');
    return row;
}
export async function addrndv(rndv){
    const sql = 'INSERT INTO rndv (date, time,patient_id) VALUES (?,?,?)';

    await pool.query(sql,[rndv.date,rndv.time,rndv.patient_id]);
} 

export async function deletePatient(id){
    const sql = 'delete from patient where id =  ?';
    await pool.query(sql,[id]);


}