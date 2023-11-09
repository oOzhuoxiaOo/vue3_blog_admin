db.notes.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
    { $lookup: { from: "types", localField: "_id", foreignField: "_id", as: "typeInfo" },
    {$set:{typename:"$typeInfo[0].typename"}}
}])