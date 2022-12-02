module.exports = {
  multipleMongooseToObject: (mongooses) =>
    mongooses.map((mongooses) => mongooses.toObject()),
  mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
