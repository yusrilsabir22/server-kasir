require('dotenv').config()
const conn = require('../utils/intializeMysql')
const uuid = require('uuid')

const getData = (req, res, next) => {
    const sql = `SELECT * FROM makanan`
    conn.query(sql, (_err, results) => {
        _err ?
            res.status(500).json(_err) :
            res.status(200).json({
                success: true,
                menus: results
            })
    })
}

const addData = (req, res, next) => {
    const sql = `insert into makanan(id, nama, harga, stok, tipe, img) values (?, ?, ?, ?, ?, ?)`
    const id = uuid.v1()
    const {
        nama,
        harga,
        stok,
        tipe
    } = req.body
    const img = `http://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`
    console.log(img)
    if (tipe.toLowerCase() === 'makanan' || tipe.toLowerCase() === 'minuman') {
        conn.query(sql, [id, nama, parseInt(harga), parseInt(stok), tipe, img], (err, results) => {
            err ?
                res.status(500).json({
                    success: false,
                    error: err
                }) :
                res.status(201).json({
                    success: true,
                    message: results
                })
        })
    } else if (!tipe) {
        res.status(500).json({
            success: false,
            error: {
                message: 'something went wrong'
            }
        })
    } else {
        res.status(500).json({
            success: false,
            error: {
                message: 'something went wrong'
            }
        })
    }
}

const updateData = (req, res, next) => {
    const sqlUpdate = `update makanan set stok = ? where id = ?`
    const sqlGet = `select * from makanan where id = ?`
    const {
        id
    } = req.query;
    const {
        stok
    } = req.body
    try {
        conn.query(sqlGet, [id], (_err, data) => {
            if (data.length > 0) {
                if (parseInt(data[0].stok) > 0) {
                    const stokDb = data[0].stok;
                    const finalStok = parseInt(stokDb) - stok;
                    conn.query(sqlUpdate, [finalStok, id], (err, results) => {
                        err ?
                            res.status(500).json({
                                success: false,
                                error: err
                            }) :
                            res.status(201).json({
                                sucess: true,
                                results
                            })
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        error: "Stok sudah habis"
                    })
                }
            } else {
                res.status(500).json({
                    success: false,
                    message: 'data not found'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteData = (req, res, next) => {
    const sql = 'delete from makanan where id = ?'
    const { id } = req.query
    conn.query(sql, [id], (err, results) => {
        if (err) res.status(500).json(err)
        res.status(201).json(results)
    })
}

module.exports = {
    getData,
    addData,
    updateData,
    deleteData
}