import React from "react";

const Button = ({ onClick, title = "Button" }) => {
    return (
        <button
            onClick={onClick}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
            {title}
        </button>
    );
};

export default Button;
