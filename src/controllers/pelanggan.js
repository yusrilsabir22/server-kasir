require('dotenv').config()
const conn = require('../utils/intializeMysql')

const getData = (req, res, next) => {
    const sql = `SELECT * FROM pelanggan`
    conn.query(sql, (_err, results) => {
        _err ?
            res.status(500).json(_err) :
            res.status(200).json({
                success: true,
                customers: results
            })
    })
}

const addData = (req, res, next) => {
    const sql = `insert into pelanggan(id_pelanggan, nama, bayar, status) values (?, ?, ?, ?)`
    const id = new Date().getTime()
    const {
        nama,
        bayar,
        status
    } = req.body
    try {
        conn.query(sql, [id, nama, parseInt(bayar), status], (err, results) => {
            err ?
                res.status(500).json({
                    success_pelanggan: false,
                    error: err
                }) :
                res.status(201).json({
                    success_pelanggan: true,
                    message: results
                })
        })
    } catch (error) {
            res.status(500).json({
                success_pelanggan: false,
                error: {
                    message: 'something went wrong'
                }
            })
    }
    
}

const updateData = (req, res, next) => {
    const sqlUpdate = `update pelanggan set status = ?, bayar = ? where id_pelanggan = ?`
    const sqlGet = `select * from pelanggan where id_pelanggan = ?`
    const {
        id
    } = req.query;
    const {
        status, 
        bayar
    } = req.body
    try {
        conn.query(sqlGet, [id], (_err, data) => {
            if (data.length > 0) {
                conn.query(sqlUpdate, [status, parseInt(bayar), id], (err, results) => {
                   err ?
                        res.status(500).json({
                            success_update: false,
                            error: err
                        }) :
                        res.status(201).json({
                            success_update: true,
                            message: 'success',
                            results
                        })
                })
            } else {
                res.status(500).json({
                    success_update: false,
                    message: 'data not found'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteData = (req, res, next) => {
    const sql = 'delete from pelanggan where id_pelanggan = ?'
    const {
        id
    } = req.query
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