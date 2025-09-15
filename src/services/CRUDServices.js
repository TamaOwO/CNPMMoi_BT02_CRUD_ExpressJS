import bcrypt from 'bcrypt'; //Thu vien bcrypt
import db from '../models/index'; //Import database
import {Model, where} from 'sequelize'; //Import where from sequelize
const salt = bcrypt.genSaltSync(10); //Tao salt de ma hoa mat khau
let createNewUser = async (data) => { //Ham user, tham so data
    return new Promise(async (resolve, reject) => { //Tra ve promise
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password); //Ma hoa mat khau
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

//lay findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ //Lay user theo id
                where: {id: userId}, //Dieu kien lay user
                raw: true //Tra ve du lieu thuc
            });
            if (user) {
                resolve(user); //Neu co user, tra ve user
            } else {
                resolve({}); //Neu khong co user, tra ve object rong
            }
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ //Tim user theo id
                where: {id: data.id}, //Dieu kien tim user
            });
            if (user) { //Neu co user
                user.firstName = data.firstName; //Cap nhat ten
                user.lastName = data.lastName; //Cap nhat ho
                user.address = data.address; //Cap nhat dia chi
                await user.save();
                //Lay danh sach user
                let getAllUsers = await db.User.findAll();
                resolve(getAllUsers);
                } else{
                    resolve(); //Neu khong co user, tra ve thong bao thanh cong
                }
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ //Xoa user theo id
                where: {id: userId} //Dieu kien xoa user
            });
            if (user) {
                user.destroy(); //Neu xoa thanh cong, tra ve thong bao thanh cong
            } else {
                resolve(); //Neu khong co user, tra ve thong bao thanh cong
            }
        } catch (e) {
            reject(e); //Neu co loi, tra ve loi
        }
    })
}
module.exports = { //Export cac ham
    createNewUser: createNewUser, //Export ham tao user moi
    getAllUsers: getAllUsers, //Export ham lay tat ca user
    getUserInfoById: getUserInfoById, //Export ham lay thong tin user theo id
    updateUser: updateUser, //Export ham cap nhat thong tin user
    deleteUserById: deleteUserById //Export ham xoa user theo id
}