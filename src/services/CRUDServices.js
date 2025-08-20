import bcrypt from 'bcrypt'; //Thu vien bcrypt
import db from '../models/index'; //Import database
import {where} from 'sequelize'; //Import where from sequelize
const salt = bcrypt.genSaltSync(10); //Tao salt de ma hoa mat khau
let createNewUser = async (data) => { //Ham user, tham so data
    return new Promise(async (resolve, reject) => { //Tra ve promise
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password); //Ma hoa mat khau
            await db.User.create({ //Tao moi user
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('Create user succeed!'); //Tra ve thong bao thanh cong
            //console.log('data from service: ', data);
            //console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await bcrypt.hashSync("B4c0/\/", salt); //Ma hoa mat khau
            resolve(hashPasswordFromBcrypt); //Tra ve mat khau da ma hoa
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}

//Lay tat ca findAll CRUD
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ //Lay tat ca user
                raw: true //Tra ve du lieu thuc
            });
            resolve(users); //Tra ve danh sach user
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}