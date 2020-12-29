// import required essentials
const express = require('express');
// create new router
const router = express.Router();

// define size of data
let sizeOfData = 4;
// create a JSON data array
let data = [
    { id: 1, name: "Trung Nguyen1", age : 18 , email: "t123@gmail.com", class: "VTI"},
    { id: 2, name: "Trung Nguyen2", age : 28 , email: "t1234@gmail.com", class: "VTI"},
    { id: 3, name: "Trung Nguyen3", age : 38 , email: "t12345@gmail.com", class: "VTI"},
    { id: 4, name: "Trung Nguyen4", age : 48 , email: "t123456@gmail.com", class: "VTI"},

];

// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// POST : add data
router.post('/create', function (req, res) {
    
    sizeOfData++;
    // create new data
    var newData ={
        id: sizeOfData,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        class: req.body.class
    }

    //push data into database
    data.push(newData);
    res.status(200).json(newData);
});

// PUT: Update data
router.put('/:id/edit', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.findIndex(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // if object found return an object else return 404 not-found
    if (found) {
        let newData ={
            id: req.params.id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            class: req.body.class
        }
        data.splice(found,1,newData);
        res.status(200).json(newData);
    } else {
        res.sendStatus(404);
    }

});

// DELETE : delete data
router.delete('/:id/delete', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.findIndex(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        data.splice(found,1);
        res.send('Delete successful');
    } else {
        res.sendStatus(404);
    }

});
module.exports = router;