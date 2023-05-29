const db = require('../models');

const Action = db.actions;
const Lead = db.leads;
const User = db.users;

const addAction = async (req, res) => {
  try {
    let info = {
      description: req.body.description,
      lead_id: req.body.lead_id,
      i_date: req.body.i_date,
      i_time: req.body.i_time,
      user_id: req.userId,
      assigned_id: req.body.assigned_id,
      isOpen: true,
    };
    if (
      info.description === null ||
      info.lead_id === null ||
      info.i_date === null ||
      info.i_time === null ||
      info.user_id === null ||
      info.assigned_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const action = await Action.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Action Added Successfully!',
        data: action.id,
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

const editAction = async (req, res) => {
  try {
    let info = {
      description: req.body.description,
      i_date: req.body.i_date,
      i_time: req.body.i_time,
      user_id: req.userId,
      assigned_id: req.body.assigned_id,
    };
    let id = req.body.id;
    if (
      info.description === null ||
      info.i_date === null ||
      info.i_date === null ||
      info.user_id === null ||
      info.assigned_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let action = await Action.findOne({ where: { id: id } });
      if (action === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Lead.update({ isCompleted: false }, { where: { id: id } });
        await Action.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Action updated Successfully!',
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

const getLeadAction = async (req, res) => {
  try {
    let lead_id = req.body.lead_id;
    Lead.hasMany(Action, { foreignKey: 'lead_id' });
    Action.belongsTo(Lead, { foreignKey: 'lead_id' });

    User.hasMany(Action, { foreignKey: 'user_id' });
    Action.belongsTo(User, { foreignKey: 'user_id' });

    let action = await Action.findAll({
      attributes: [
        'id',
        'description',
        'i_date',
        'i_time',
        'createdAt',
        'updatedAt',
        'isOpen',
        'assigned_id',
        'user_id',
        'lead_id',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
      order: [['id', 'DESC']],
      where: { lead_id: lead_id },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Action Listed Successfully.',
      data: action,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getUserAction = async (req, res) => {
  try {
    let assigned_id = req.userId;
    Lead.hasMany(Action, { foreignKey: 'lead_id' });
    Action.belongsTo(Lead, { foreignKey: 'lead_id' });

    User.hasMany(Action, { foreignKey: 'assigned_id' });
    Action.belongsTo(User, { foreignKey: 'assigned_id' });

    let action = await Action.findAll({
      attributes: [
        'id',
        'description',
        'i_date',
        'i_time',
        'createdAt',
        'updatedAt',
        'isOpen',
        'assigned_id',
        'user_id',
        'lead_id',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
      order: [['id', 'DESC']],
      where: { assigned_id: assigned_id, isOpen: true },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Action Listed Successfully.',
      data: action,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const deleteAction = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Action.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: 'Action Deleted Successfully.',
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

const updateActionStatus = async (req, res) => {
  try {
    let info = {
      isOpen: req.body.isOpen,
    };
    let id = req.body.id;
    if (info.isOpen === null) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let action = await Action.findOne({ where: { id: id } });
      if (action === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Lead.update({ isCompleted: false }, { where: { id: id } });
        await Action.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Action updated Successfully!',
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

module.exports = {
  addAction,
  editAction,
  getLeadAction,
  deleteAction,
  getUserAction,
  updateActionStatus,
};
