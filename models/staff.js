const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: String,
    species: String,
    dob: String,
    imageurl: String,
    hobbies: [String]
})

const Staff = mongoose.model('Staff', staffSchema)

readStaff = async (options = {}) => {
    if (Object.entries(options).length == 0)
        return Staff.find().lean();
    else if (options.name)
        return Staff.findOne(options).lean();
    else
        return undefined;
}

createStaff = async (data) => {
    if (data.species=="cat" || data.species=="Cat")
        data.imageurl="/images/catlogo.jpg"
    if (data.species=="dog" || data.species=="Dog")
        data.imageurl="/images/doglogo.png"
    if (data.species=="fish" || data.species=="Fish")
        data.imageurl="/images/fishlogo.jpg"
    if (data.species=="fish" || data.species=="Bird")
        data.imageurl="/images/birdlogo.jpg"
    if (data.species=="fish" || data.species=="Hamster")
        data.imageurl="/images/hamsterlogo.jpg"
    if (data.hobbies=="")
        data.hobbies=null
    let staffDoc = new Staff(data);
    await staffDoc.save();
}

deleteStaff = async (name) => {
    const staff = await Staff.findOne({ name: name });
    await staff.remove();
}

updateStaff = async (data) => {
    var id = data._id;
    console.log(id);
    console.table(data)
    if (data.species=="cat" || data.species=="Cat")
        data.imageurl="/images/catlogo.jpg"
    if (data.species=="dog" || data.species=="Dog")
        data.imageurl="/images/doglogo.png"
    if (data.species=="fish" || data.species=="Fish")
        data.imageurl="/images/fishlogo.jpg"
    if (data.species=="fish" || data.species=="Bird")
        data.imageurl="/images/birdlogo.jpg"
    if (data.species=="fish" || data.species=="Hamster")
        data.imageurl="/images/hamsterlogo.jpg"
    if (data.hobbies=="")
        data.hobbies=null
    await Staff.findByIdAndUpdate({ _id: id }, { ...data })
}

exports.readStaff = readStaff;
exports.createStaff = createStaff
exports.deleteStaff = deleteStaff
exports.updateStaff = updateStaff