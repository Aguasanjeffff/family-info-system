import { useState, useEffect } from 'react';
import api from '../utils/api';
import FamilyMemberCircle from './FamilyMemberCircle';
import ProfileModal from './ProfileModal';

const FamilyTree = () => {
  const [family, setFamily] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    try {
      const res = await api.get('/family');
      setFamily(res.data.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching family:', error);
      setError('Failed to load family members. Please try again later.');
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handleUpdateMember = () => {
    fetchFamily();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading Family Tree...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-4 flex justify-center items-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <button
            onClick={fetchFamily}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Separate family members by role
  const parents = family.filter(
    (m) => m.familyRole === 'Father' || m.familyRole === 'Mother'
  );
  const father = parents.find((m) => m.familyRole === 'Father');
  const mother = parents.find((m) => m.familyRole === 'Mother');
  const children = family.filter(
    (m) => m.familyRole === 'Son' || m.familyRole === 'Daughter'
  );

  return (
    <div id="family-tree" className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          Our Family Tree
        </h2>

        {/* SVG Container for connections */}
        <div className="relative">
          {/* Parents Row */}
          <div className="flex justify-center items-center gap-8 md:gap-16 mb-16">
            {father && <FamilyMemberCircle member={father} onClick={handleMemberClick} />}
            
            {/* Heart Icon between parents */}
            {father && mother && (
              <div className="text-red-500 text-4xl md:text-5xl animate-pulse">
                ❤️
              </div>
            )}
            
            {mother && <FamilyMemberCircle member={mother} onClick={handleMemberClick} />}
          </div>

          {/* SVG Lines connecting parents to children */}
          {children.length > 0 && parents.length > 0 && (
            <svg className="absolute top-32 left-0 w-full h-32 pointer-events-none hidden md:block">
              {/* Vertical line from parents */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="50"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              
              {/* Horizontal line connecting to all children */}
              <line
                x1="20%"
                y1="50"
                x2="80%"
                y2="50"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              
              {/* Lines to each child */}
              {children.map((_, index) => {
                const spacing = 60 / (children.length + 1);
                const xPos = 20 + spacing * (index + 1);
                return (
                  <line
                    key={index}
                    x1={`${xPos}%`}
                    y1="50"
                    x2={`${xPos}%`}
                    y2="100%"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          )}

          {/* Children Row */}
          {children.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-16">
              {children.map((child) => (
                <FamilyMemberCircle
                  key={child._id}
                  member={child}
                  onClick={handleMemberClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={handleCloseModal}
            onUpdate={handleUpdateMember}
            allMembers={family}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
