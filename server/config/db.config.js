module.exports = {
    HOST: "192.168.58.252",
    USER: "operator",
    PASSWORD: "Mimoza2019",
    DB: "vpn-users-copy",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };