const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },
    expectedAnswer: {
        type: String,
        required: true
    }
},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    intention: {
        type: String,
        required: true
    },
    expectedAnswer: {
        type: String,
        required: true
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },

    focusArea: {
        type: String,
        required: true
    },

    tasks: {
        type: [String],
        required: true
    }
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },

    jobDescription: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: false
    },

    resume: {
        type: String,
        required: false
    },

    selfDescription: {
        type: String,
        required: false
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },

    technicalQuestions: {
        type: [technicalQuestionSchema],
    },

    behavioralQuestions: {
        type: [behavioralQuestionSchema],
    },

    skillGaps: {
        type: [skillGapSchema],
    },

    preparationPlan: {
        type: [preparationPlanSchema],
    }
} ,{
    timestamps: true
})

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;