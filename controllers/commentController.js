const commentModel = require("../models/commentModel");

const commentController = {};
commentController.addComment = async (req, res) => {
  try {
    console.log(req.body)
    const comment = await commentModel.create(req.body);
    return res.json({
      status: "suceess",
      result: comment,
      statusCode: 200,
      message: "Comment added successfully.",
    });
  } catch (e) {
    return res.json({
      status: false,
      error: e,
      statusCode: 500,
    });
  }
};

module.exports = commentController;
