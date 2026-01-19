const FamilyMemberCircle = ({ member, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transform hover:scale-110 transition duration-300 animate-fade-in-up"
      onClick={() => onClick(member)}
    >
      <div className="relative group">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-2xl transition duration-300">
          <img
            src={member.profileImage}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition duration-300"></div>
      </div>
      <div className="mt-3 text-center">
        <p className="font-semibold text-gray-800 text-sm md:text-base">{member.name}</p>
        <p className="text-xs md:text-sm text-gray-600">{member.familyRole}</p>
      </div>
    </div>
  );
};

export default FamilyMemberCircle;
