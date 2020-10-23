const db = require("../models");
const VpnUser = db.ppp_journals;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
// exports.create = (req, res) => {  
// };

// Retrieve all VpnUser from the database.
exports.findAll = (req, res) => {
    const login = req.query.lofin;
    var condition = login ? { login: { [Op.like]: `%${login}%` } } : null;
  
    VpnUser.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vpn_users."
        });
      });
};

// Find a single VpnUser with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    VpnUser.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving VpnUser with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// Delete all VpnUser from the database.
// exports.deleteAll = (req, res) => {
  
// };

// Find all published VpnUser
// exports.findAllPublished = (req, res) => {
  
// };