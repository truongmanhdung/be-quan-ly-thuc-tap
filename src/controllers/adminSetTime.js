import ConfigTime from '../models/configTime'

export const handleSetTimeRequest = async(req,res) => {
    const {startTime,endTime} = req.body
    const timeRequest = await ConfigTime.find()
    if(timeRequest.length === 0){
       await ConfigTime.create([{startTime,endTime}])
       res.status(200).json({
           message:"create time success"
       })
    }
    else{
        await ConfigTime.findOneAndUpdate({},{startTime,endTime})
        res.status(200).json({
            message:"update time success"
        })
    }
}