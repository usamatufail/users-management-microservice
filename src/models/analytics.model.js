import { Schema, model } from 'mongoose';


export const analyticsSchema = Schema(
  {
    action: {
      type: String,
      required: [true, 'Please add a name for action i.e. user.create'],
    },
    method: {
      type: String,
      required: [true, 'Please add request method i.e. POST, GET, PUT, PATCH, DELETE etc.'],
    },
    requestUserId: {
      type: String,
      required: [true, "Please add user's id who requested the action"],
    },
    payload: {
      type: Schema.Types.Mixed,
      required: [true, 'Please add request payload data i.e. body, params, and queries.'],
      select: false,
    },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

export const Analytics = model('Analytics', analyticsSchema);
