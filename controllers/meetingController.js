const db = require('../models');

const Meeting = db.meetings;
const User = db.users;

const addMeeting = async (req, res) => {
  try {
    let info = {
      description: req.body.description,
      i_date: req.body.i_date,
      i_time: req.body.i_time,
      user_id: req.userId,
      title: req.body.title,
      meeting_point: req.body.meeting_point,
    };
    if (
      info.description === null ||
      info.title === null ||
      info.i_date === null ||
      info.meeting_point === null ||
      info.i_time === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const meeting = await Meeting.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Meeting Added Successfully!',
        data: meeting.id,
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
      meeting_point: req.body.meeting_point,
      title: req.body.title,
    };
    let id = req.body.id;
    if (
      info.description === null ||
      info.i_date === null ||
      info.i_time === null ||
      info.meeting_point === null ||
      info.title === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let meeting = await Meeting.findOne({ where: { id: id } });
      if (meeting === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Meeting.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Meeting updated Successfully!',
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

const getLeadMeeting = async (req, res) => {
  try {
    User.hasMany(Meeting, { foreignKey: 'user_id' });
    Meeting.belongsTo(User, { foreignKey: 'user_id' });

    let meeting = await Meeting.findAll({
      attributes: [
        'id',
        'description',
        'i_date',
        'i_time',
        'createdAt',
        'updatedAt',
        'title',
        'user_id',
        'meeting_point',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Meeting Listed Successfully.',
      data: meeting,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Meeting.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: 'Meeting Deleted Successfully.',
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
  addMeeting,
  editAction,
  getLeadMeeting,
  deleteMeeting,
};
