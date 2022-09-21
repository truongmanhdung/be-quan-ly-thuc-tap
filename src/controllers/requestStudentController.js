import requestStudentToManagerModel from '../models/requestStudentToManagerModel';
import Student from '../models/student';
import { defaultCvStudent, defaultForm, defaultReport } from '../utils/defaultValueStudent';
export function getListRequestStudent(req, res) {}

export async function sendRequestToManager(req, res) {
  try {
    await requestStudentToManagerModel.create(req.body);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getRequestOfStudent(req, res) {
  try {
    const data = await requestStudentToManagerModel.find(req.query).populate('userId');
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      err,
    });
  }
}

export async function resetStudent(req, res) {
  const { type, id, useId } = req.body;
    let valueReset = {};
    if (type === process.env.cv) {
      valueReset = defaultCvStudent;
    }
    if (type === process.env.form) {
      valueReset = defaultForm;
    }
    if (type === process.env.report) {
      valueReset = defaultReport;
    }


  try {
    Student.findOneAndUpdate({_id: req.params.id}, valueReset, { new: true }).then((r) => requestStudentToManagerModel.findByIdAndDelete(id)).then(r => res.status(200).json({
      success:true,
      message: 'Thành công'
    }));
  } catch (error) {
    res.status({
      success: false,
      message: 'Có lỗi sảy ra',
    });
  }
}

export async function cancelResetStudent(req,res){
  try {
    await requestStudentToManagerModel.findByIdAndDelete(req.params.id) 
    
    res.status(204).json({
      success: true,
      message: 'Thành công'
    })
  } catch (error) {
  res.status(400).json({
    success: false,
    message: 'Thất bại'
  })
  }
    
}