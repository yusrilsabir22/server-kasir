require('dotenv').config()
const conn = require('../utils/intializeMysql')
const fs = require('fs')
const path = require('path')
const queryString = require('query-string')

const getData = (req, res, next) => {
    const sql = `SELECT * FROM makanan`
    conn.query(sql, (_err, results) => {
        _err ?
            res.status(500).json({
                success_get_makanan: false,
                message_get_makanan: 'Gagal mendapatkan makanan',
                error: _err
            }) :
            res.status(200).json({
                success_get_makanan: true,
                message_get_makanan: 'Berhasil mendapatkan makanan',
                menus: results
            })
    })
}

const addData = (req, res, next) => {
    const sql = `insert into makanan(id_makanan, nama, harga, tipe, img) values (?, ?, ?, ?, ?)`
    const id = req.userData.id
    const {
        nama,
        harga,
        tipe
    } = req.body
    const img = `http://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`
    // console.log(img)
    if (tipe.toLowerCase() === 'makanan' || tipe.toLowerCase() === 'minuman') {
        conn.query(sql, [id, nama, parseInt(harga), tipe, img], (err, results) => {
            err ?
                res.status(500).json({
                    success_send_menu: false,
                    message_send_menu: 'Gagal menambahkan makanan',
                    error: err
                }) :
                res.status(201).json({
                    success_send_menu: true,
                    message_send_menu: 'Berhasil menambahkan makanan'
                })
        })
    } else if (!tipe) {
        res.status(500).json({
            success_send_menu: false,
            message_send_menu: 'Gagal menambahkan makanan, karena tipe makanan'
        })
    } else {
        res.status(500).json({
            success_send_menu: false,
            message_send_menu: 'Gagal menambahkan makanan, kesalahan server',
        })
    }
}

const deleteData = (req, res, next) => {
   
    const pathFile = path.join(__dirname, '..', 'uploads')
    fs.readdir(pathFile, (err, files)=> {
        if(err) {
            res.status(500).json({
                success_delete_makanan: false,
                message_delete_makanan: 'Gagal menghapus data dan gambar makanan',
                error: err
            }).end()
        } else {
            for(let o in files) {
                const d = files[o].split('.')
                if (d[0] == req.query.id) {
                    fs.unlink(pathFile + '/' + files[o], (err) => {
                        if(err) {
                            res.status(500).json({
                                success_delete_makanan: false,
                                message_delete_makanan: 'Gagal gambar makanan',
                                error: err
                            }).end()
                        } else {
                            const sql = 'delete from makanan where id_makanan = ?'
                            const {
                                id
                            } = req.query
                            conn.query(sql, [id], (err, results) => {
                                if (err) res.status(500).json({
                                    success_delete_makanan: false,
                                    message_delete_makanan: 'Gagal menghapus data makanan',
                                    error: err
                                }).end();
                                res.status(201).json({
                                    success_delete_makanan: true,
                                    message_delete_makanan: 'Berhasil menghapus data makanan',
                                    ...results
                                }).end()
                            })
                        }
                    })
                    break;
                } else {
                    if ((files.length - 1) == o) {
                        res.status(500).json({
                            success_delete_makanan: false,
                            message_delete_makanan: 'tidak ada gambar yang ditemukan'
                        }).end()
                        break;
                    }
                }
            }
        }
    })
    
}

const testUpdateQuery = (req, res, next) => {
    if(req.query.img == 'true') {
        const img = 'http://'+process.env.HOST+':'+process.env.PORT+'/uploads/'+req.file.filename
        const reqBody = Object.keys(req.body)
        let reqBody1 = ''
        let tester2 = ''
        let query1 = ''
        if(reqBody.length < 1) {
            query1 = `update makanan set img='${img}' where id_makanan='${req.query.id}'`;
        } else {
            reqBody1 = queryString.stringify(req.body)
            tester2 = reqBody1.split("%20").join(" ").split("&").join("',").split("=").join("='")
            query1 = `update makanan set ${tester2}', img='${img}' where id_makanan='${req.query.id}'`;
        }
        conn.query(query1, (err, results) => {
            if (err) {
                res.status(500).json({ 
                    success_update_makanan: false,
                    message_update_makanan: 'Gagal mengubah data makanan',
                    error: err 
                })
            } else {
                res.status(201).json({ 
                    success_update_makanan: true,
                    message_update_makanan: 'Berhasil mengubah data makanan',
                })
            }
        })
    } else {
        const reqBody1 = queryString.stringify(req.body)
        const tester2 = reqBody1.split("%20").join(" ").split("&").join("',").split("=").join("='")
        const query1 = `update makanan set ${tester2}' where id_makanan='${req.query.id}'`;
        conn.query(query1, (err, results) => {
            if (err) {
                res.status(500).json({
                    success_update_makanan: false,
                    message_update_makanan: 'Gagal mengubah data makanan',
                    error: err
                })
            } else {
                res.status(201).json({
                    success_update_makanan: true,
                    message_update_makanan: 'Berhasil mengubah data makanan',
                })
            }
        })
    }
}

module.exports = {
    getData,
    addData,
    deleteData,
    testUpdateQuery
}