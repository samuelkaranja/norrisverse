import React from "react";
import "./categorybutton.css";

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
  return (
    <div className="btn">
      <button onClick={onClick}>{label.toUpperCase()}</button>
    </div>
  );
};

export default CategoryButton;
