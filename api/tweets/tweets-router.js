const router = require("express").Router();
const twitModel = require("./tweets-model");
const mw = require("./tweets-middleware");

router.get("/", async (req, res, next) => {
  const posts = await twitModel.postlarıGetir();
  res.status(200).json(posts);
});

router.get("/:id", mw.checkUserId, (req, res, next) => {
  res.status(200).json(req.yorum);
});

router.post("/", mw.checkPayloadAndUserIdExist, async (req, res, next) => {
  try {
    let insertedData = await twitModel.insertPost(req.body);
    res.json(insertedData);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:post_id",
  mw.checkPostId,
  mw.checkPostContent,
  async (req, res, next) => {
    try {
      const postUpdate = await twitModel.updatePost(
        req.body,
        req.params.post_id
      );
      res.status(200).json(postUpdate);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:post_id", mw.checkPostId, async (req, res, next) => {
  try {
    await twitModel.deletePost(req.params.post_id);
    res.status(200).json({
      message: `The post with id ${req.params.post_id} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
