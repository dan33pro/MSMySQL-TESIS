const express = require('express');

const response = require('../tools/network/response');
const store = require('../tools/store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:pk/:id', get);
router.post('/:table/:pk/:action', upsert);
router.put('/:table/:pk/:action', upsert);
router.delete('/:table/:pk/:id', remove);
router.get('/:table/:pk/:key/:value', query);

async function list(req, res, next) {
    let tabla = {
        name: req.params.table,
    };
    const datos = await store.list(tabla);
    response.success(req, res, datos, 200);
}

async function get(req, res, next) {
    let tabla = {
        name: req.params.table,
        pk: req.params.pk,
    };
    const datos = await store.get(tabla, req.params.id);
    response.success(req, res, datos, 200);
}

async function upsert(req, res, next) {
    let tabla = {
        name: req.params.table,
        pk: req.params.pk,
    };
    const datos = await store.upsert(tabla, req.body, req.params.action);
    response.success(req, res, datos, 200);
}

async function remove(req, res, next) {
    let tabla = {
        name: req.params.table,
        pk: req.params.pk,
    };
    const datos = await store.remove(tabla, req.params.id);
    response.success(req, res, datos, 200);
}

async function query(req, res, next) {
    let tabla = {
        name: req.params.table,
        pk: req.params.pk,
    };
    let key = req.params.key;
    let value = req.params.value;
    let query = {};
    query[key] = value;
    const datos = await store.query(tabla, query);
    response.success(req, res, datos, 200);
}

module.exports = router;