import Badge from './Badge';

const NavIcon = ({ icon, active, onClick, badge }) => {
  return (
    <div
      className={`relative p-2 md:p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
        active ? 'text-blue-600' : 'text-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="text-xl md:text-2xl">{icon}</div>
      <Badge count={badge} />
    </div>
  );
};

export default NavIcon;