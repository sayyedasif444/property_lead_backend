const db = require('../models');

const Task = db.tasks;
const User = db.users;

const addTask = async (req, res) => {
  try {
    let info = {
      tasklist: req.body.tasklist,
      assigned_id: req.body.assigned_id,
      description: req.body.description,
      isOpen: true,
      deadline: req.body.deadline,
      user_id: req.userId,
    };
    if (
      info.tasklist === null ||
      info.assigned_id === null ||
      info.deadline === null ||
      info.description === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const task = await Task.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Task Added Successfully!',
        data: task.id,
      });
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const editTask = async (req, res) => {
  try {
    let info = {
      tasklist: req.body.tasklist,
      assigned_id: req.body.assigned_id,
      description: req.body.description,
      deadline: req.body.deadline,
      isOpen: true,
    };
    let id = req.body.id;
    if (
      info.tasklist === null ||
      info.deadline === null ||
      info.assigned_id === null ||
      info.description === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let task = await Task.findOne({ where: { id: id } });
      if (task === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Task.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Task Updated Successfully!',
          data: id,
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const updateTask = async (req, res) => {
  try {
    let info = {
      tasklist: req.body.tasklist,
    };
    var data = JSON.parse(info.tasklist);
    if (data.length > 0) {
      info.isOpen = data.filter((ele) => !ele.status).length > 0;
      console.log(data.filter((ele) => !ele.status).length);
    }
    let id = req.body.id;
    if (info.tasklist === null) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let task = await Task.findOne({ where: { id: id } });
      if (task === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Task.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Task Updated Successfully!',
          data: id,
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    User.hasMany(Task, { foreignKey: 'assigned_id' });
    Task.belongsTo(User, { foreignKey: 'assigned_id' });

    let task = await Task.findAll({
      attributes: [
        'id',
        'tasklist',
        'description',
        'deadline',
        'isOpen',
        'assigned_id',
        'createdAt',
        'updatedAt',
      ],
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Task Listed Successfully.',
      data: task,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getUserTask = async (req, res) => {
  try {
    let user_id = req.userId;
    User.hasMany(Task, { foreignKey: 'assigned_id' });
    Task.belongsTo(User, { foreignKey: 'assigned_id' });

    let task = await Task.findAll({
      attributes: [
        'id',
        'tasklist',
        'description',
        'deadline',
        'isOpen',
        'createdAt',
        'updatedAt',
      ],
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
      order: [['id', 'DESC']],
      where: { assigned_id: user_id },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Task Listed Successfully.',
      data: task,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Task.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: 'Task Deleted Successfully.',
      data: count,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};
module.exports = {
  addTask,
  editTask,
  getAllTask,
  getUserTask,
  deleteTask,
  updateTask,
};
