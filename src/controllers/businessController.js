import business, { insertMany } from '../models/business';

//insertBusiness
export const insertBusiness = async (req, res) => {
  try {
    await business.insertMany(req.body);
    await business
      .find(req.query)
      .populate('campus_id')
      .populate('smester_id')
      .populate('majors')
      .sort({ createdAt: -1 })
      .exec((err, doc) => {
        if (err) {
          res.status(400).json(err);
        } else {
          business
            .find(req.query)
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
  } catch (error) {
    res.status(400).json({
      error: 'Create business failed',
    });
    return;
  }
};

export const listBusiness = async (req, res) => {
  const { limit, page } = req.query;
  try {
    if (page && limit) {
      //getPage
      let perPage = parseInt(page);
      let current = parseInt(limit);
      if (perPage < 1 || perPage == undefined || current == undefined) {
        perPage = 1;
        current = 9;
      }
      const skipNumber = (perPage - 1) * current;
      try {
        await business
          .find(req.query)
          .populate('campus_id')
          .populate('smester_id')
          .populate('majors')
          .skip(skipNumber)
          .limit(current)
          .exec((err, doc) => {
            if (err) {
              res.status(400).json(err);
            } else {
              business
                .find(req.query)
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
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      const listBusiness = await business.find(req.query).populate('campus_id').populate('smester_id').populate("majors");
      res.status(200).json({
        total: listBusiness.length,
        list: listBusiness,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
