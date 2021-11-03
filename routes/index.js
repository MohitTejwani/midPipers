var express = require("express");
var router = express.Router();
const { login, createUser } = require('../controller/userInfoController');
const { createBoard,  deleteBoard, addTodo, deleteTodo } = require('../controller/boardInfoController')
var boards = []
const checkAuth = require('../middleware/checkAuth');
router.get("/", async (req, res) => {
    res.render("index", { title: "Express", status: true, message: '' });
});
router.get("/signup", async (req, res) => {
    res.render("signUp", { title: "Express", status: true, message: '' });
});

router.post("/login", async (req, res) => {
    const { status, message } = await createUser(req, res);
    if (status) {
        res.render("index", { title: "Express", message, status });
    } else {
        res.render("signUp", { title: "Express", status, message });
    }
});

router.post("/home", async (req, res) => {
    const { status, token, boards, message } = await login(req, res);
    if (status) {
        res.render("home", { title: "Express", boards, token, status, message });

    } else {
        res.render("index", { title: "Express", status, message });
    }
});
router.post("/addBoard", checkAuth, async (req, res) => {
    if (req.isAuth) {
        const { status, message, boardList } = await createBoard(req, res)
        res.render("home", { title: "Express", boards: boardList, status, message, token: req.body.userToken });
    } else {
        res.render("index", { title: "Express", status: false, message: 'Session Time out please try again to login' });

    }
});
router.post("/removeBoard", checkAuth, async (req, res) => {
    if (req.isAuth) {
        const { status, message, boardList } = await deleteBoard(req, res)
        res.render("home", { title: "Express", boards: boardList, status, message, token: req.body.userToken });
    } else {
        res.render("index", { title: "Express", status: false, message: 'Session Time out please try again to login' });

    }
});

router.post("/task", checkAuth, async (req, res) => {
    if (req.isAuth) {
        const { status, message, boardList } = await addTodo(req, res)
        res.render("home", { title: "Express", boards: boardList, status, message, token: req.body.userToken });
    } else {
        res.render("index", { title: "Express", boards: [], status: false, message: 'Session Time out please try again to login' });
    }
});


router.post("/delete/task", checkAuth, async (req, res) => {
    if (req.isAuth) {
        const { status, message, boardList } = await deleteTodo(req, res)
        res.render("home", { title: "Express", boards: boardList, status, message, token: req.body.userToken });
    } else {
        res.render("index", { title: "Express", boards: [], status: false, message: 'Session Time out please try again to login' });
    }
});

module.exports = router