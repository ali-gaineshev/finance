const Entry = require('../models/entry');
const {Category, Occurrence, Type} = require('../models/enums');

const saveEntry = (category, occurrence, type, date, userId) => {
    return new Entry({category: category,
        occurrence: occurrence,
        type: type,
        date: date,
        userId: userId}
    ).save();
}

const getEntries = (userId) => {
    return Entry.find({userId: userId});
}

const deleteEntry =  (id) => {
    return Entry.deleteOne({_id: id}).exec();
}

module.exports = {saveEntry, deleteEntry, getEntries};