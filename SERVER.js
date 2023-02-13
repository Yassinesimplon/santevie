import express from 'express';

import {getPatient,addPatient,addrndv,getrndv,deletePatient} from './config/database.js';
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.set("view engine","ejs")


server.get("/",async (req,res)=>{
    
    const  patient =  await getPatient();
    const  rndv =  await getrndv();

    console.log(patient.length);
    res.status(200).render('page', {patient : patient , count : patient.length,rndv, countRndv:rndv.length});

   
    
});



server.get('/add', (req,res)=>{
    res.render('form');
});


server.post("/create", async (req,res)=>{
    

    try {
        
        await addPatient(req.body);        
        res.status(200).send('Patient ajouté avec succès');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l ajout du patient');
    }
});
//supprimer un patient
server.get('/delete/:id',async (req, res) => {
    // Récupérer l'ID du patient à supprimer
    const id = req.params.id;
  
    // Supprimer le patient de la base de données
    await deletePatient(id);
 
  
      // Rediriger vers la liste des patients
      res.redirect('/');

  });

server.get("/add/rndv", async (req,res)=>{
    
    try {
        
       const patients =  await getPatient();
        res.render("formrndv",{patients});
        
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l ajout du rndv');
    }
});

    
    
server.post('/create/rndv',async (req,res)=>{
    try {
    await addrndv(req.body);
    res.redirect('/')
      
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l ajout du rndv');
    }
});


server.use("/*",(req,res)=>{
    res.status(404).send('NOT FOUND')

});
server.listen(5000,()=>{
    console.log("server running")
})
