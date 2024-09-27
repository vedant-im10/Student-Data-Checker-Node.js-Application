const router = require('express').Router();
const fs = require('fs');
const async = require('hbs/lib/async');

router.get('/', (req, res) => {
    res.set({
        "Content-type": "text/html"
    });
    fs.readFile('index.html', (e, d) => {
        res.send(d);
    })
});

router.post('/check', async(req, res) => {
    fs.readFile(req.body.id + ".json", 'utf-8', (err, data) => {
        if (data) {
            const id = JSON.parse(data)['id'];
            const name = JSON.parse(data)['name'];
            const email = JSON.parse(data)['email'];
            const rollno = JSON.parse(data)['rollno'];
            res.render('student', {
                id,
                name,
                email,
                rollno
            })
        } else {
            res.render('add', {
                id: req.body.id,
            })
        }
    })
});

router.post('/update', async(req, res) => {
    const tempjson = {
        "id": req.body.id,
        "name": req.body.name,
        "email": req.body.email,
        "rollno": req.body.rollno
    }
    fs.writeFile(req.body.id + ".json", JSON.stringify(tempjson), ((err) => {
        if (!err) {
            res.status(201).json({ message: "Student Updated Successfully" });
        }
    }))
});

module.exports = router;