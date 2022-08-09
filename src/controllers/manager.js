import Manager from '../models/manager';

export const getListManager = async (req, res) => {
  try {
    const manager = await Manager.find().populate('campus_id').sort({ createdAt: -1 }).exec();
    res.status(200).json({
      manager,
      success: true,
    });
  } catch (error) {
    res.json(error);
  }
};

export const getManager = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id).populate('campus_id').exec();
    res.status(200).json({
      manager,
      success: true,
    });
  } catch (error) {
    res.json(error);
  }
};

export const createManager = async (req, res) => {
  const emailVali = await Manager.findOne({
    $and: [
      {
        email: req.body.email,
      },
      {
        campus_id: req.body.campus_id,
      },
    ],
  });

  try {
    if (emailVali !== null) {
      res.status(202).json({
        message: 'Nhân viên đã tồn tại vui lòng xem lại email hoặc cơ sở',
        success: false,
      });
    } else {
      const manager = await Manager.create(req.body);
      res.status(201).json({
        manager,
        message: 'Tạo nhân viên quản lý sinh viên thực tập thành công',
        success: true,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      manager,
      success: true,
      message: 'Sửa thông tin nhân viên quản lý sinh viên thực tập thành công',
    });
    return;
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const removeManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndRemove(req.params.id);
    res.status(200).json({
      manager,
      success: true,
      message: 'Xóa nhân viên quản lý sinh viên thực tập thành công',
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
