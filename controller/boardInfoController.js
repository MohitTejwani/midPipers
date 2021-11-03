const BoardInfoSchema = require('../models/boardInfoModel');

const createBoard = async (req, res) => {
    try {

        const { boardName } = req.body
        if (!boardName) {
            throw new Error('Board name not found');
        }
        const newBoard = new BoardInfoSchema({
            name: boardName,
            userId: req.userId
        })
        const result = await newBoard.save();
        const boardList = await BoardInfoSchema.find({ userId: req.userId })
        if (result) {
            return { status: true, message: 'Board Created', boardList }
        }

    } catch (error) {
        return { status: false, message: error.message }
    }
}

const getBoard = async (req, res) => {
    try {
        const boardList = await BoardInfoSchema.find({ userId: req.userId })
        if (boardList.length) {
            return { status: true, boardList, message: '' }
        } else {
            return { status: true, boardList: [], message: '' }
        }
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const deleteBoard = async (req, res) => {

    try {
        const deletedBoard = await BoardInfoSchema.remove({ _id: req.body.id });
        const boardList = await BoardInfoSchema.find({ userId: req.userId })

        if (deletedBoard) {
            return { status: true, message: "Deleted Succeccfully", boardList: boardList.length ? boardList : [] }
        } else {
            return { status: true, message: "Invalid Id", boardList: boardList.length ? boardList : [] }
        }
    } catch (error) {
        return { status: false, message: error.message }

    }
}


const addTodo = async (req, res) => {
    try {
        const { id, todoTask } = req.body;
        if (!id || !todoTask) {
            throw new Error('invalid information ')
        }
        const updateboardForTodo = await BoardInfoSchema.findById(id);
        updateboardForTodo.todoList.push(todoTask);
        const result = await updateboardForTodo.save();
        const boardList = await BoardInfoSchema.find({ userId: req.userId })
        return { status: true, boardList, message: '' }
    } catch (error) {
        return { status: false, message: error.message }

    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id, todoId } = req.body;
        if (!id || !todoId) {
            throw new Error('invalid information ')
        }
        const updateboardForTodo = await BoardInfoSchema.findById(id);
        let temp = updateboardForTodo.todoList;
        temp.splice(todoId, 1);
        updateboardForTodo.todoList = temp;
        const result = await updateboardForTodo.save();
        const boardList = await BoardInfoSchema.find({ userId: req.userId })
        return { status: true, boardList, message: '' }
    } catch (error) {
        return { status: false,boardList:[], message: error.message }

    }
}

module.exports = {
    createBoard,
    getBoard,
    deleteBoard,
    addTodo,
    deleteTodo
}