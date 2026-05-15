const createIssue = (req,res)=>{
    res.send("Issue Created");
}

const updateIssue = (req,res)=>{
    res.send("update Issue up");
}

const deleteIssuebyId = (req,res)=>{
    res.send("deleteISsue");
}


const getAllIssue = (req,res)=>{
    res.send("all issue");
}

const getIssuebyId = (req,res)=>{
    res.send("Issue");
}

export {
    createIssue,
    updateIssue,
    deleteIssuebyId,
    getAllIssue,
    getIssuebyId,
};