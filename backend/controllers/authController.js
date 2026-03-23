// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  res.json({ message: 'Auth logic will be implemented here' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  res.json({ message: 'Registration logic will be implemented here' });
};

export { authUser, registerUser };
