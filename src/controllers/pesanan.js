require('dotenv').config()
const conn = require('../utils/intializeMysql')

const getData = (req, res, next) => {
    const sql = `SELECT * FROM pesanan`

    if(req.query.data_pelanggan) {
        conn.query(sql+` where id_pelanggan = ?`,[req.query.id], (_err, results) => {
            _err ?
                res.status(500).json(_err) :
                res.status(200).json({
                    success: true,
                    menus: results
                })
        })
    } else {
        conn.query(sql, (_err, results) => {
            _err ?
                res.status(500).json(_err) :
                res.status(200).json({
                    success: true,
                    menus: results
                })
        })
    }
}

const getDataUserAndFood = (req, res , next) => {
    const sql = `SELECT 
                        pelanggan.id_pelanggan AS id_pelanggan,
                        pesanan.count AS count, 
                        makanan.id_makanan AS id_makanan, 
                        makanan.nama AS nama_makanan,
                        makanan.harga AS harga 
                FROM 
                        pesanan
                INNER JOIN 
                        pelanggan 
                ON 
                        pesanan.id_pelanggan = pelanggan.id_pelanggan 
                INNER JOIN 
                        makanan 
                ON 
                        pesanan.id_makanan = makanan.id_makanan`
    conn.query(sql, [req.query.id], (_err, results) => {
        if(_err) { res.status(500).json(_err) }
        else {
            res.status(201).json({records: results})
        }

    })
}

const addData = (req, res, next) => {
    const {
       records
    } = req.body
    try {
        conn.query(`delete from pesanan where id_pelanggan = '${req.query.id}'`, (_er, rs) => {
            if(_er) {
                console.log(_er)
                res.status(500).json({
                    success_pesanan: false,
                    error: _er
                })
            } else {
                const sql = `insert into pesanan (id_pelanggan, id_makanan, count) values ?`
                conn.query(sql, [records], (err, results) => {
                    if(err) console.log(err)
                    err ?
                        res.status(500).json({
                            success_pesanan: false,
                            error_pesanan: err
                        }) :
                        res.status(201).json({
                            success_pesanan: true,
                            message_pesanan: results
                        })
                })
                }
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
             success_pesanan: false,
             error_pesanan: {
                 message: 'something went wrong'
             }
         })
    }
}


module.exports = {
    getData,
    addData,
    getDataUserAndFood
}