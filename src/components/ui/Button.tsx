interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

const Button = ({ 
    children, 
    onClick,
    disabled=false,
}: ButtonProps) => {
    return (<button 
        onClick={onClick}
        disabled={disabled}
        className={`w-fit bg-gray-800 hover:bg-gray-700 transition-all font-medium cursor-pointer hover text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 inset-shadow-md shadow-amber-50/5 flex items-center gap-2 ${disabled && "disabled"}`}
    >
        { children }
    </button>)
}

export default Button;