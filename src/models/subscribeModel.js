'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Uiid = require('node-uuid');

const SubscribeSchema = new Schema({
  _id: { type: String, required: true },
  subject: { type: String, required: true },
  subscriber: { type: String, required: true }
},{
  collection: 'Subscribe',
  versionKey: false
});

SubscribeSchema.statics.updateSubscribes = function (content) {

  const payload = {
    _id: Uiid.v1(),
    subject: content.subject,
    subscriber: content.endpoint
  };

  const entity = new this(payload);

  return entity.save();
};

SubscribeSchema.statics.getSubjects = function () {

  return this.aggregate([
    {
      $group: {
        _id: "$subject"
      }
    }
  ]);
};

module.exports = Mongoose.model('Subscribe', SubscribeSchema);
