import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const ProfileModal = ({ member, onClose, onUpdate, allMembers }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(member);
  const [formData, setFormData] = useState({
    name: member.name,
    bio: member.bio || '',
    profileImage: member.profileImage || '',
    socialLinks: {
      facebook: member.socialLinks?.facebook || '',
      instagram: member.socialLinks?.instagram || '',
      twitter: member.socialLinks?.twitter || '',
    },
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      bio: member.bio || '',
      profileImage: member.profileImage || '',
      socialLinks: {
        facebook: member.socialLinks?.facebook || '',
        instagram: member.socialLinks?.instagram || '',
        twitter: member.socialLinks?.twitter || '',
      },
    });
    setIsEditing(false);
    setMessage('');
  }, [member]);

  // Check if user can edit this profile
  const canEdit = user && (user.role === 'admin' || user._id === currentMember._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.put(`/family/${currentMember._id}`, formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setCurrentMember(res.data.data);
      onUpdate();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const navigateToMember = (newMember) => {
    setCurrentMember(newMember);
    setFormData({
      name: newMember.name,
      bio: newMember.bio || '',
      profileImage: newMember.profileImage || '',
      socialLinks: {
        facebook: newMember.socialLinks?.facebook || '',
        instagram: newMember.socialLinks?.instagram || '',
        twitter: newMember.socialLinks?.twitter || '',
      },
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Profile' : 'Profile'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Admin Navigation */}
        {user?.role === 'admin' && allMembers.length > 1 && (
          <div className="bg-gray-50 p-4 border-b">
            <p className="text-sm text-gray-600 mb-2">Navigate to:</p>
            <div className="flex flex-wrap gap-2">
              {allMembers.map((m) => (
                <button
                  key={m._id}
                  onClick={() => navigateToMember(m)}
                  className={`px-3 py-1 rounded text-sm ${
                    m._id === currentMember._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.includes('success')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <img
                  src={currentMember.profileImage}
                  alt={currentMember.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-800">{currentMember.name}</h3>
                <p className="text-lg text-gray-600">{currentMember.familyRole}</p>
              </div>

              {currentMember.bio && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Biography</h4>
                  <p className="text-gray-700">{currentMember.bio}</p>
                </div>
              )}

              {(currentMember.socialLinks?.facebook ||
                currentMember.socialLinks?.instagram ||
                currentMember.socialLinks?.twitter) && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Social Media</h4>
                  <div className="space-y-2">
                    {currentMember.socialLinks.facebook && (
                      <a
                        href={currentMember.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <span className="mr-2">📘</span> Facebook
                      </a>
                    )}
                    {currentMember.socialLinks.instagram && (
                      <a
                        href={currentMember.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-pink-600 hover:text-pink-800"
                      >
                        <span className="mr-2">📷</span> Instagram
                      </a>
                    )}
                    {currentMember.socialLinks.twitter && (
                      <a
                        href={currentMember.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-600"
                      >
                        <span className="mr-2">🐦</span> Twitter/X
                      </a>
                    )}
                  </div>
                </div>
              )}

              {canEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Edit Profile
                </button>
              )}
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Biography</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Twitter/X URL
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage('');
                    setFormData({
                      name: currentMember.name,
                      bio: currentMember.bio || '',
                      profileImage: currentMember.profileImage || '',
                      socialLinks: {
                        facebook: currentMember.socialLinks?.facebook || '',
                        instagram: currentMember.socialLinks?.instagram || '',
                        twitter: currentMember.socialLinks?.twitter || '',
                      },
                    });
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
