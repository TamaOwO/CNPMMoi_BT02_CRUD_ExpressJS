import db from '../models/index'; //Import db
import CRUDServices from '../services/CRUDServices'; //Import CRUD services
// Ham getHomePage
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); //Lay tat ca user
        console.log('................');
        console.log(data);
        console.log('................');
        return res.render('homepage.ejs', { //Render trang homepage
            data: JSON.stringify(data) //Chuyen doi du lieu sang JSON
        });

    } catch (e) {
        console.log(e); //Neu co loi, in ra loi
    }
}

//Ham getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs'); //Render trang about
}

//Ham CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs'); //Render trang crud
}

//Ham findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDServices.getAllUsers(); //Lay tat ca user
    return res.render('displayCRUD.ejs', { //Render trang displayCRUD
        dataTable: data //Truyen du lieu vao trang
    });
}

//Ham post CRUD
let postCRUD = async (req, res) => { //Dung async de xu ly bat dong bo
    let message = await CRUDServices.createNewUser(req.body); //Goi ham tao user
    console.log(message);
    return res.send('Post crud to server'); //Chuyen huong ve trang get-crud
}

//Ham lay du lieu de eidt
let getEditCRUD = async (req, res) => {
    let userId = req.query.id; //Lay id tu query
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId); //Lay thong tin user theo id
        return res.render('users/editUser.ejs', { //Render trang editCRUD
            user: userData //Truyen du lieu vao trang
        });
    } else {
        return res.send('User not found'); //Neu khong tim thay user, tra ve thong bao
    }
}

let putCRUD = async (req, res) => {
    let data = req.body; //Lay du lieu tu body
    let data1 = await CRUDServices.updateUser(data); //Goi ham cap nhat user
    return res.render('users/findAllUser.ejs', { //Render trang displayCRUD
        dataTable: data1 //Truyen du lieu vao trang
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id; //Lay id tu query
    if (id) {
        await CRUDServices.deleteUserById(id); //Goi ham xoa user theo id
        return res.send('Deleted'); //Chuyen huong ve trang get-crud
    } else {
        return res.send('User not found'); //Neu khong tim thay user, tra ve thong bao
    }

    module.exports = { //Export cac ham
        getHomePage: getHomePage, //Export ham getHomePage  
        getAboutPage: getAboutPage, //Export ham getAboutPage
        getCRUD: getCRUD, //Export ham getCRUD
        postCRUD: postCRUD, //Export ham postCRUD
        getFindAllCrud: getFindAllCrud, //Export ham getFindAllCrud
        getEditCRUD: getEditCRUD, //Export ham getEditCRUD
        putCRUD: putCRUD, //Export ham putCRUD
        deleteCRUD: deleteCRUD //Export ham deleteCRUD
    }
}