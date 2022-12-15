import { Analytics } from "../models";

export const analytics = (action) => async (req, res, next) => {
  try {
    await Analytics.create({
      action,
      method: req.method,
      requestUserId: req.user.user_id,
      payload: {
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
