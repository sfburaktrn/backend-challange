const UserModel = require("./user-model");

const checkUserId = async function (req, res, next) {
  try {
    const isExist = await UserModel.findById(req.params.id);
    if (!isExist) {
      res.status(404).json({ message: "id not found" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkName = async function (req, res, next) {
  try {
    const { name } = req.body;
    let nameControl = await UserModel.findByFilter({ name: name });
    if (nameControl) {
      res.status(401).json({
        message: "Username already taken, try new username",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkUserId,
  checkName,
};
