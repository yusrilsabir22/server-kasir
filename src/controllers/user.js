require('dotenv').config()
const conn = require('../utils/intializeMysql')
const jwt = require('jsonwebtoken')

const uuid = require('uuid')

const signIn = (req, res, next) => {
    const sql = `SELECT * FROM user WHERE nama = ? AND kode_rahasia = ?`;
    const {nama, kode_rahasia} = req.body
    
    let token = '';
    conn.query(sql, [nama, kode_rahasia], (_err, results) => {
        if(_err) {
            res.status(500).json({
                success: false,
                error: _err
            });
        }
        
        if(results.length > 0) {
            token = jwt.sign({
                id: results[0].id,
                nama: results[0].nama
            }, process.env.SECRET_MEMBER)
            res.status(201).json({
                message: 'anda telah ter-autentikasi',
                token,
                id: results[0].id,
                nama: results[0].nama
            }).end()
        } else {
            res.status(401).json({
                status: 401,
                message: 'nama atau kode rahasia yang anda masukkan salah'
            }).end()
        }
        
    })
}

const signUp = (req, res, next) => {
    const sql = `insert into user(id, nama, kode_rahasia, email) values (?, ?, ?, ?)`
    const id = uuid.v4().toString()
    const {nama, kode_rahasia, email} = req.body
    conn.query(sql, [id, nama, kode_rahasia, email], (_err, results) => {
        _err ? res.status(500).json({
            success: false,
            error: _err
        }) :
        res.json({
            success: true,
            message: 'Berhasil Terdaftar',
            results
        }).end()
    })
}

module.exports = {
    signIn,
    signUp
}