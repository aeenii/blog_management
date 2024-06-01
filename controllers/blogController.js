const { Op } = require("sequelize");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");

const blogController = {};
blogController.getAllBlogs = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const skip = (+page - 1) * +limit;
    let where = {
      deletedAt: null,
    };
    if (search) {
      where = {
        deletedAt: null,
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            content: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }
    const data = await blogModel.findAll({
      where: where,
      order: [["id", "DESC"]],
      offset: +skip,
      limit: +limit,
    });
    const totalCount = await blogModel.count({ where });
    return res.json({
      status: "suceess",
      result: data,
      limit: limit,
      totalCount: totalCount,
      statusCode: 200,
      message: "Blog Listed Successfully.",
    });
  } catch (e) {
    console.log(e);
    return res.json({
      status: false,
      error: e,
      statusCode: 500,
    });
  }
};

blogController.getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findOne({
      where: { id: req.params.blogId },
      include: [
        {
          model: commentModel,
          as: "comments",
          attributes: ["id", "comment"],
        },
      ],
    });
    if (!blog) {
      return res.json({
        status: false,
        error: "No Blog found with this Id",
        statusCode: 400,
      });
    }
    return res.json({
      status: "suceess",
      result: blog,
      statusCode: 200,
      message: "Blog Details Fetched Successfully.",
    });
  } catch (e) {
    console.log(e);
    return res.json({
      status: false,
      error: e,
      statusCode: 500,
    });
  }
};
module.exports = blogController;
