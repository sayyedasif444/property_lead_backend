const db = require('../models');

const Interaction = db.interactions;
const Lead = db.leads;
const User = db.users;

const addInteraction = async (req, res) => {
  try {
    let info = {
      description: req.body.description,
      lead_id: req.body.lead_id,
      i_date: req.body.i_date,
      i_time: req.body.i_time,
      user_id: req.body.user_id,
    };
    if (
      info.description === null ||
      info.lead_id === null ||
      info.i_date === null ||
      info.i_time === null ||
      info.user_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const interaction = await Interaction.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Interaction Added Successfully!',
        data: interaction.id,
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

const editInteraction = async (req, res) => {
  try {
    let info = {
      description: req.body.description,
      i_date: req.body.i_date,
      i_date: req.body.i_time,
      user_id: req.body.user_id,
    };
    let id = req.body.id;
    if (
      info.description === null ||
      info.i_date === null ||
      info.i_date === null ||
      info.user_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let interaction = await Interaction.findOne({ where: { id: id } });
      if (interaction === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        await Interaction.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Interaction updated Successfully!',
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

const getLeadInteraction = async (req, res) => {
  try {
    let lead_id = req.body.lead_id;
    Lead.hasMany(Interaction, { foreignKey: 'lead_id' });
    Interaction.belongsTo(Lead, { foreignKey: 'lead_id' });

    User.hasMany(Interaction, { foreignKey: 'user_id' });
    Interaction.belongsTo(User, { foreignKey: 'user_id' });

    let interaction = await Interaction.findAll({
      attributes: [
        'id',
        'description',
        'i_date',
        'i_time',
        'createdAt',
        'updatedAt',
      ],
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
      order: [['id', 'DESC']],
      where: { lead_id: lead_id },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Interaction Listed Successfully.',
      data: interaction,
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
  addInteraction,
  editInteraction,
  getLeadInteraction,
};
