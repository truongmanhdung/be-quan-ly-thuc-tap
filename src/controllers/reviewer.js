import Student from "../models/student";
const ObjectId = require('mongodb').ObjectID;

export const listReviewer = async (req, res) => {
    const { limit, page } = req.query
    if (page && limit) {
        //getPage
        let perPage = parseInt(page)
        let current = parseInt(limit)
        if (perPage < 1 || perPage == undefined || current == undefined) {
            perPage = 1
            current = 9
        }
        const skipNumber = (perPage - 1) * current
        try {
            await Student.find({
                ...req.query,
                statusCheck: 0
            }).populate('campus_id').skip(skipNumber).limit(current).sort({ 'createdAt': -1, 'CV': -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    Student.find({
                        ...req.query,
                        statusCheck: 0,
                        CV: { $ne: null }

                    }).countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            res.json(count_error);
                            return
                        } else {
                            res.status(200).json({
                                total: count,
                                list: doc
                            })
                            return
                        }
                    })
                }

            })
        } catch (error) {
            res.status(400).json(error)
        }
    }
};


export const listReviewForm = async (req, res) => {
    const { limit, page } = req.query
    if (page && limit) {
        //getPage
        let perPage = parseInt(page)
        let current = parseInt(limit)
        if (perPage < 1 || perPage == undefined || current == undefined) {
            perPage = 1
            current = 9
        }
        const skipNumber = (perPage - 1) * current
        try {
            await Student.find({
                ...req.query,
                statusCheck: 0,
                form: { $ne: null }
            }).populate('campus_id').skip(skipNumber).limit(current).sort({ 'createdAt': -1, 'CV': -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    Student.find({
                        ...req.query,
                        statusCheck: 0
                    }).countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            res.json(count_error);
                            return
                        } else {
                            res.status(200).json({
                                total: count,
                                list: doc
                            })
                            return
                        }
                    })
                }

            })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}