import business, { findByIdAndUpdate, insertMany } from "../models/business";
import Student from "../models/student";
import semester from "../models/semester";

//insertBusiness
export const insertBusiness = async (req, res) => {
  try {
    await business.insertMany(req.body);
    await business
      .find(req.query)
      .populate("campus_id")
      .populate("smester_id")
      .populate("majors")
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
      error: "Create business failed",
    });
    return;
  }
};

export const listBusiness = async (req, res) => {
  const { limit, page } = req.query;
  console.log(req.query)
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
          .populate("campus_id")
          .populate("smester_id")
          .populate("majors")
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
      const listBusiness = await business
        .find(req.query)
        .populate("campus_id")
        .populate("smester_id")
        .populate("majors");
      res.status(200).json({
        total: listBusiness.length,
        list: listBusiness,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete business
export const removeBusiness = async (req, res) => {
  try {
    const Business = await business.findById(req.params.id)
    const isStudentOfBusiness = await Student.findOne({
      business: req.params.id,
      campus_id:Business.campus_id,
      smester_id:Business.smester_id
    });
    if (isStudentOfBusiness) {
      return res.status(200).json({
        message: "Doanh nghiệp đang được sinh viên đăng ký không thể xóa.",
        success: false,
      });
    } else {
      const itemDelete = await business.findByIdAndRemove(req.params.id);
      return res.status(200).json({
        itemDelete,
        message: "Xóa doanh nghiệp thành công",
        success: true,
      });
    }
  } catch (error) {
    return res.json({
      error,
      success: false,
    });
  }
};

//create business

export const createbusiness = async (req, res) => {
  const { code_request, campus_id } = req.body;
  try {
    const defaultSemester = await semester.findOne({
      $and: [
        { start_time: { $lte: new Date() } },
        { date_time: { $gte: new Date() } },
      ],
    });
    const Business = await business.find({
      smester_id: defaultSemester._id,
      campus_id: campus_id,
    });

    const isBusinessCodeRequest = Business.some((item) => {
      if(item.code_request){
        return item.code_request.toUpperCase() === code_request.toUpperCase();
      }
    });

    if (isBusinessCodeRequest) {
      return res.status(200).json({
        message: "Mã doanh nghiệp đã tồn tại không thể tạo mới",
        success: false,
      });
    } else {
      const newBusiness = await business.create({
        ...req.body,
        smester_id: defaultSemester._id,
      });
      return res.status(200).json({
        newBusiness,
        message: "Tạo doanh nghiệp thành công",
        success: true,
      });
    }
  } catch (error) {
    return res.json({
      error,
      success: false,
    });
  }
};

//update Business

export const updateBusiness = async (req, res) => {
  const { code_request, smester_id, campus_id } = req.body;
  try {

    const defaultSemester = await semester.findOne({
      $and: [
        { start_time: { $lte: new Date() } },
        { date_time: { $gte: new Date() } },
      ],
    });

    const Business = await business.find({
      smester_id: smester_id,
      campus_id: campus_id,
    });
    
    if (defaultSemester._id.toString() !== smester_id) {
      return res.status(200).json({
        message: "Không thể sửa doanh nghiệp do không ở kỳ hiện tại",
        success: false,
      });
    }
    
    const listBusiness =  Business.filter((item) => {
        return (item._id.toString() !== req.params.id);
    });

    const isBusinessCodeRequest =  listBusiness.some((item) => {
      if(item.code_request){
        return item.code_request.toUpperCase() === code_request.toUpperCase();
      }
    });
    
    if (isBusinessCodeRequest) {
      return res.status(200).json({
        message: "Mã doanh nghiệp đã tồn tại không thể tạo sửa",
        success: false,
      });
    } else {
      const itemBusinessUpdate = await business.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({
        itemBusinessUpdate,
        message: "Sửa doanh nghiệp thành công",
        success: true,
      });
    }
  } catch (error) {
    return res.json({
      error,
      success: false,
    });
  }
};

export const getBusiness = async (req, res) => {
  try {
    const itemBusiness = await business.findById(req.params.id);
    return res.status(200).json({
      itemBusiness,
      success: true,
    });
  } catch (error) {
    return res.status(200).json({
      error,
      success: false,
    });
  }
};

export const updateMany = async (req, res) => {
  try {
    const { listIdBusiness, smester_id } = req.body;
    console.log(req.body)
    const data = await business.updateMany(
      { _id: { $in: listIdBusiness } },
      {
        $set: {
          smester_id: smester_id,
          status: 0
        }
      },
      { multi: true }
    )

    res.status(200).json({ listIdStudent, smester_id });
  } catch (error) {
    return res.status(200).json({
      error,
      success: false
    })
  }
}