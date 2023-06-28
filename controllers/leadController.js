const db = require('../models');

const Lead = db.leads;
const User = db.users;
const Source = db.sources;
const Interaction = db.interactions;
const Action = db.actions;

const addLeads = async (req, res) => {
  try {
    let info = {
      company: req.body.company,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      designation: req.body.designation,
      property_type: req.body.property_type,
      mobile_number: req.body.mobile_number,
      emailid: req.body.emailid,
      source_id: req.body.source_id,
      assigned_id: req.body.assigned_id === '' ? null : req.body.assigned_id,
      user_id: req.userId,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      requirement: req.body.requirement,
      notes: req.body.notes,
      isCompleted: false,
    };
    if (
      info.first_name === null ||
      info.first_name === undefined ||
      info.last_name === null ||
      info.last_name === undefined
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let leadzz = await Lead.findAll({
        where: { mobile_number: info.mobile_number },
      });
      if (leadzz.length > 0) {
        res.status(200).json({
          statuscode: 400,
          message: 'Mobile number already registered!',
        });
      } else {
        const lead = await Lead.create(info);
        res.status(200).json({
          statuscode: 200,
          message: 'Lead added successfully!',
          data: lead.id,
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

const getAllLeads = async (req, res) => {
  try {
    User.hasMany(Lead, { foreignKey: 'assigned_id' });
    Lead.belongsTo(User, { foreignKey: 'assigned_id' });

    Source.hasMany(Lead, { foreignKey: 'source_id' });
    Lead.belongsTo(Source, { foreignKey: 'source_id' });

    Lead.hasMany(Action, { foreignKey: 'lead_id' });
    Action.belongsTo(Lead, { foreignKey: 'lead_id' });

    Lead.hasMany(Interaction, { foreignKey: 'lead_id' });
    Interaction.belongsTo(Lead, { foreignKey: 'lead_id' });

    User.hasMany(Action, { foreignKey: 'user_id' });
    Action.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Interaction, { foreignKey: 'user_id' });
    Interaction.belongsTo(User, { foreignKey: 'user_id' });

    let lead = await Lead.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: Source,
        },
        {
          model: Action,
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name'],
            },
          ],
        },
        {
          model: Interaction,
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name'],
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Leads Listed Successfully.',
      data: lead,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getOneLead = async (req, res) => {
  let id = req.body.id;
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      User.hasMany(Lead, { foreignKey: 'assigned_id' });
      Lead.belongsTo(User, { foreignKey: 'assigned_id' });

      Source.hasMany(Lead, { foreignKey: 'source_id' });
      Lead.belongsTo(Source, { foreignKey: 'source_id' });

      Lead.hasMany(Action, { foreignKey: 'lead_id' });
      Action.belongsTo(Lead, { foreignKey: 'lead_id' });

      Lead.hasMany(Interaction, { foreignKey: 'lead_id' });
      Interaction.belongsTo(Lead, { foreignKey: 'lead_id' });

      User.hasMany(Action, { foreignKey: 'user_id' });
      Action.belongsTo(User, { foreignKey: 'user_id' });

      User.hasMany(Interaction, { foreignKey: 'user_id' });
      Interaction.belongsTo(User, { foreignKey: 'user_id' });
      let lead = await Lead.findOne({
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name'],
          },
          {
            model: Source,
          },
          {
            model: Action,
            include: [
              {
                model: User,
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
          {
            model: Interaction,
            include: [
              {
                model: User,
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
        ],
        where: { id: id },
      });
      if (lead === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Lead not found.',
        });
      } else {
        res.status(200).json({
          statuscode: 200,
          message: 'Lead Listed Successfully.',
          data: lead,
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

const updateLeads = async (req, res) => {
  try {
    let info = {
      company: req.body.company,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      designation: req.body.designation,
      property_type: req.body.property_type,
      mobile_number: req.body.mobile_number,
      emailid: req.body.emailid,
      source_id: req.body.source_id,
      assigned_id: req.body.assigned_id === '' ? null : req.body.assigned_id,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      requirement: req.body.requirement,
      notes: req.body.notes,
      isCompleted: false,
    };
    let id = req.body.id;
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let lead = await Lead.findOne({ where: { id: id } });
      if (lead !== null) {
        if (
          info.first_name === null ||
          info.first_name === undefined ||
          info.last_name === null ||
          info.last_name === undefined
        ) {
          res.status(200).json({
            statuscode: 400,
            message: 'Invalid request!',
          });
        } else {
          let leadzz = await Lead.findAll({
            where: { mobile_number: info.mobile_number },
          });
          if (leadzz.filter((ele) => ele.id !== id).length > 0) {
            res.status(200).json({
              statuscode: 400,
              message: 'Mobile number already registered!',
            });
          } else {
            await Lead.update(info, { where: { id: id } });
            res.status(200).json({
              statuscode: 200,
              message: 'Lead updated successfully!',
              data: id,
            });
          }
        }
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
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

const deleteLead = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Lead.destroy({ where: { id: id } });
    let action = await Action.destroy({ where: { lead_id: id } });
    let interaction = await Interaction.destroy({ where: { lead_id: id } });
    res.status(200).json({
      statuscode: 200,
      message: 'Lead Deleted Successfully.',
      data: [count, action, interaction],
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    let info = {
      isCompleted: req.body.isCompleted,
    };
    let id = req.body.id;
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let lead = await Lead.findOne({ where: { id: id } });
      if (lead !== null) {
        if (info.isCompleted === null || info.isCompleted === undefined) {
          res.status(200).json({
            statuscode: 400,
            message: 'Invalid request!',
          });
        } else {
          await Lead.update(info, { where: { id: id } });
          res.status(200).json({
            statuscode: 200,
            message: 'Lead updated successfully!',
            data: id,
          });
        }
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
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
  addLeads,
  getAllLeads,
  getOneLead,
  updateLeads,
  deleteLead,
  updateLeadStatus,
};
