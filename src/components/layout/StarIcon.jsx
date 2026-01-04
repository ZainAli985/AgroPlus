const StarCheckbox = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer
      ${checked ? "bg-yellow-400 border-yellow-500" : "bg-white"}`
    }
  >
    {checked && <div className="w-3 h-3 bg-white rounded-full"></div>}
  </div>
);

export default StarCheckbox;