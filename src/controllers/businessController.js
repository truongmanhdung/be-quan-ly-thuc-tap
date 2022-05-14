import business from "../models/business";
const ObjectId = require("mongodb").ObjectID;

//insertBusiness
export const insertBusiness = async (req, res) => {
  console.log(req.body);
  const { data, smester_id } = req.body;
  try {
    const checkBusiness = await business.find({}).limit(3);

    if (checkBusiness.length > 0) {
      const listBusiness = await business.find({ smester_id });
      if (listBusiness.length === 0) {
        await business.insertMany(data);
      } else {
        const listBS = [];
        listBusiness.forEach((item) => {
          listBS.push(item.mssv);
        });
        const listNew = [];
        await data.forEach((item) => {
          listNew.push(item.mssv);
        });

        await business.updateMany(
          { smester_id },
          {
            $set: {
              checkUpdate: false,
              checkMulti: false,
            },
          },
          { multi: true }
        );

        await business.updateMany(
          { $and: [{ mssv: { $in: listNew } }, { smester_id }] },
          {
            $set: {
              checkUpdate: true,
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await business.updateMany(
          { $and: [{ checkUpdate: false }, { smester_id }] },
          {
            $set: {
              checkUpdate: true,
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await business.insertMany(data);

        await business.updateMany(
          { $and: [{ mssv: { $nin: listBS } }, { smester_id }] },
          {
            $set: {
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await business.deleteMany({
          $and: [{ checkMulti: false }, { smester_id }],
        });
      }

      await business
        .find({ smester_id })
        .limit(20)
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            business
              .find({ smester_id })
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    } else {
      await business.insertMany(req.body.data);
      await business
        .find({ smester_id })
        .populate("smester_id")
        .limit(20)
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            business
              .find({ smester_id })
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    }
  } catch (error) {
    res.status(400).json({
      error: "Create business failed",
    });
    return;
  }
};
