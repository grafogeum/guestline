export interface IButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}

const CapacityButtonStyle = {
	backgroundColor: "transparent",
	border: "none",
	outline: "none",
	cursor: "pointer"
};

export const Button = ({ onClick, children }: IButtonProps) => {
	return (
		<button style={CapacityButtonStyle} onClick={onClick}>
			{children}
		</button>
	);
};
