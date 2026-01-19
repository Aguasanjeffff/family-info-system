const express = require('express');
const {
  getAllFamily,
  getFamilyMember,
  updateFamilyMember,
} = require('../controllers/familyController');
const { protect, canEditProfile } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllFamily);
router.get('/:id', getFamilyMember);
router.put('/:id', protect, canEditProfile, updateFamilyMember);

module.exports = router;
