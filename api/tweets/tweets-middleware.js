const twitModel = require("./tweets-model");

const checkUserId = async function (req, res, next) {
  try {
    const isExist = await twitModel.idGorePostGetir(req.params.id);
    if (isExist.length == 0) {
      res.status(404).json({ message: "id not found" });
    } else {
      req.yorum = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPayloadAndUserIdExist = async (req, res, next) => {
  let { user_id, post_content } = req.body;
  if (user_id === undefined || post_content === undefined) {
    next({
      status: 400,
      message: "There is a missing field",
    });
  } else {
    next();
  }
};

const checkPostId = async (req, res, next) => {
  try {
    const isExist = await twitModel.postId(req.params.post_id);
    if (!isExist) {
      res.status(404).json({ message: "id not found" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPostContent = async (req, res, next) => {
  try {
    let { post_content } = req.body;
    if (!post_content) {
      res.status(404).json({ message: "fill in the post" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserId,
  checkPayloadAndUserIdExist,
  checkPostId,
  checkPostContent,
};
