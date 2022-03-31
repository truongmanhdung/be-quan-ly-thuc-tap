import Student from "../models/student"
export const listStudent = async (req, res) => {
    const student = await Student.Find({}).exec();
    res.json(student);
}
export const updateStudent = async (req, res) => {
    const student = await Student.findOneAndUpdate(      
    {id: req.params.id},
    {new: true});
    res.json(student);
}
export const removeStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({id: req.params.id})
        res.json(student)
    } catch (error) {
        console.log("Lỗi r");
    }
}
export const readOneStudent = async (req, res) => {
    const student = await Student.findOne({ id: req.params.id }).exec();
    res.json(student)
}