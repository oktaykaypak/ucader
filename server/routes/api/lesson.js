const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//* GET METODU
router.get('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    try {
        res.send(await client.db('ucader').collection('egitim').find({}).toArray())
    } catch (err) {
        console.error(err);
        res.status(400).send();
    } finally { client.close() }
});


//* GET METODU
router.get('/:id', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    try {
        res.send(await client.db('ucader').collection('egitim').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
    } catch (err) {
        console.error(err);
        res.status(400).send();
    } finally { client.close() }
});

//* UPDATE METODU
router.put('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    try {


        await client.db('ucader').collection('egitim').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: req.body.nameEn, desc: req.body.descEn } },
                category: new mongodb.ObjectID(req.body.categoryId),
                showInPage: Boolean(req.body.showInPage),
                startDate: mongodb.Int32(req.body.startDate),
                endDate: mongodb.Int32(req.body.endDate),
                row_number: mongodb.Int32(req.body.row_number)
            }
        })
        res.status(200).send();
    } catch { res.status(400).send(); } finally { client.close() }
});


//* POST METODU
router.post('/photo', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {

        await client.db('ucader').collection('egitim').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $push: {
                "picture": req.body.img_url
            }
        })
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    } finally { client.close() }
});

router.post('/pageData', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {

        await client.db('ucader').collection('egitim').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $push: {
                "pages": req.body.pageData
            }
        })
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    } finally { client.close() }
});


//* POST METODU
router.post('/lessonData', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {

        await client.db('ucader').collection('egitim').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                title: req.body.title,
                desc: req.body.desc
            }
        })
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(400).send();
    } finally { client.close() }
});

//* POST METODU
router.post('/addLesson', async (req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    await client.db('ucader').collection('egitim').insertOne({

        title: "",
        desc: "",
        picture: [],
        pages: []

    }, function (err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });

    });

})



//* DELETE METODU
router.delete('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:zQwQz@cluster0.q8mdc.mongodb.net/ucader?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
       
        await client.db('ucader').collection('egitim').deleteOne({ _id: new mongodb.ObjectID(req.query.id) })
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(400).send();
    } finally {
        client.close()
    }
})

module.exports = router;