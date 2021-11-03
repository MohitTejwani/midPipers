const UserInfoSchema = require('../models/userInfoModel');
const BoardInfoSchema = require('../models/boardInfoModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            throw new Error('Invalid user information')
        }
        if (!validator.isAscii(userName)) {
            throw new Error('Invalid user name')
        }
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email address')
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserInfoSchema({
            userName,
            email,
            password: hashedPassword
        })
        const result = await newUser.save();
        if (result) {
            return { status: true, message: "Resgistration done successfully" }
        }

    } catch (error) {
        return { status: false, message: error.message }
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Invalid Information')
        }
        const user = await UserInfoSchema.findOne({ email: email });
        if (!user) {
            throw new Error('User doesnot exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.AUTH_SECRET_KEY, {
            expiresIn: '1d'
        });
        const boards = await BoardInfoSchema.find({
            userId: user.id
        })
        return { status: true, token, boards }
    } catch (error) {
        return { status: false, message: error.message, boards: [] }
    }
}
module.exports = {
    createUser,
    login
}