var express = require('express');
var router = express.Router();

const fs = require('fs');


router.get('/auth', function(req, res, next) {
    console.log('Auth reqeust for a user');
    const { username, password } = req.body;
    if (username === "demo" && password === "demo") {
        return res.send(ok({
            id: 999,
            username: "demo",
        }))

    } else {
        return res.send(error("Invalid Credentials"))
    }

});

router.get('/all', function(req, res, next) {
    console.log('Get request for all Users');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(400).send({
                message: 'This is an error!'
            });
        } else {
            console.log(JSON.parse(JSON.stringify(data)))
            res.send((JSON.parse(data)));

        }
    });
});

router.get('/:user_id', function(req, res, next) {
    id = req.params.user_id
    console.log('Get request for single User');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(400).send({
                message: 'This is an error!'
            });
        }
        let d = JSON.parse(data)
        x = d.find(u => u.user_id == id);
        if (x == null) {
            res.status(400).send({
                message: 'User Not Found!'
            })
        } else { res.send(x); }

    });
});
router.delete('/:user_id', function(req, res, next) {
    id = req.params.user_id
    console.log('delete request for single User');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(400).send({
                message: 'This is an error!'
            });
        }
        let d = JSON.parse(data)
        const index = d.findIndex(x => x.user_id == req.params.user_id);
        d.splice(index, 1)
        fs.writeFileSync('./data/users.json', JSON.stringify(d), 'utf8', function(err) {
            if (err) {
                res.send("delete failed")
            } else {
                res.send("delete success")
            }
        })
    });
});

router.post('/save', function(req, res, next) {
    console.log('Save request for single User');
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(400).send({
                message: 'This is an error!'
            });
        }
        let d = JSON.parse(data)
        console.log(JSON.parse(JSON.stringify(data)))
        const index = d.findIndex(x => x.user_id == req.body.user_id);
        d[index] = req.body
        fs.writeFileSync('./data/users.json', JSON.stringify(d), 'utf8', function(err) {
            if (err) {
                res.send("change failed")
            } else {
                res.send("change success")
            }
        })

    });
});





module.exports = router;