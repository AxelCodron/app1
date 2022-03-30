const express = require('express');
const router = express.Router();
const { readStaff } = require('../models/staff');
const { createStaff } = require('../models/staff');
const { deleteStaff } = require('../models/staff');
const { updateStaff } = require('../models/staff');

router.get('/addnew', (req, res) => {
    console.log("Data sent via post");
    var name = req.query.name;
    var species = req.query.species;
    res.render('animalsform')
})

/* router.post('/addnew', async (req, res) => {
    await createStaff(req.body);
    req.session.staffdata = { name: req.body.name };
    res.redirect(303, 'animaladded')
}) */

router.post('/addnew', async (req, res) => {
    await createStaff(req.body);
    console.log(req.body)
    req.session.flash =
        { type: 'success', intro: 'Data Saved:', message: "Data for <strong>" + req.body.name + "</strong> has been added" }
    res.redirect(303, '/animals')
})


router.get('/animaladded', (req, res) => {
    if (req.session.staffdata) {
        var newName = req.session.staffdata.name;
    }
    else {
        var newName = "";
    }
    res.render('animaladded', { newName: newName })
})

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const animal = await readStaff({ 'name': name })

    if (!animal) {
        res.render('404');
    }
    else {
        res.render('animal', { animal: animal });
    }
})

router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteStaff(name);

    res.redirect(303, '/animals');

});

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const animal = await readStaff({ 'name': name })

    if (!animal) {
        res.render('404');
    }
    else {
        res.render('animaleditform', { animal: animal });
    }
})

router.post('/:name/edit', async (req, res) => {

    await updateStaff(req.body);

    res.redirect(303, '/animals')

})

router.get('/', async (req, res) => {
    const staff = await readStaff();
    res.render('listing', { animallist: staff })
})

module.exports = router;