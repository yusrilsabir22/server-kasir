require('dotenv').config()
const conn = require('../utils/intializeMysql')
const uuid = require('uuid')

const getData = (req, res, next) => {
    const sql = `SELECT * FROM meja`
    conn.query(sql, (_err, results) => {
        _err ?
            res.status(500).json(_err) :
            res.status(200).json({
                success: true,
                menus: results
            })
    })
}

const updateData = (req, res, next) => {
    const sqlUpdate = `update meja set status = ? where id_meja = ?`
    const sqlGet = `select * from meja where id_meja = ?`
    const {
        id
    } = req.query;
    const {
        status
    } = req.body
    try {
        conn.query(sqlGet, [id], (_err, data) => {
            if (data.length > 0) {
                if (parseInt(data[0].status) > 0) {
                    conn.query(sqlUpdate, [status], (err, results) => {
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
module.exports = {
    getData,
    updateData
}