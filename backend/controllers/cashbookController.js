import Cashbook from "../models/Cashbook.js";

export const createCashbook = async (req, res) => {
  try {
    const cashbook = await Cashbook.create(req.body);
    res.json({ success: true, cashbook });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCashbooks = async (req, res) => {
  try {
    const cashbooks = await Cashbook.find().sort({ createdAt: -1 });
    res.json({ success: true, cashbooks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCashbookById = async (req, res) => {
  try {
    const cashbook = await Cashbook.findById(req.params.id);
    res.json({ success: true, cashbook });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};