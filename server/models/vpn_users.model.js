module.exports = (sequelize, Sequelize) => {
  const VpnUser = sequelize.define("ppp_journals", {
    timestamp: {
      type: Sequelize.TIME,
    },
    uptime: {
      type: Sequelize.INTEGER,
    },
    login: {
      type: Sequelize.STRING,
    },
    action: {
      type: Sequelize.STRING,
    },
    md5: {
      type: Sequelize.STRING,
    },
  });

  return VpnUser;
};
