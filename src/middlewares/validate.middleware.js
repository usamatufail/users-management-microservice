export const validate = (schema) => async (req, res, next) => {
  try {
    const validatedReq = await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = validatedReq.body;
    req.query = validatedReq.query;
    req.params = validatedReq.params;
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
