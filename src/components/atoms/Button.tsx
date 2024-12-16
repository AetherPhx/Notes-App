type ButtonProps = {
	type?: "button" | "submit" | "reset";
	className?: string;
	action?: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
};

export const Button = ({
	type = "button",
	className,
	action,
	disabled = false,
	children,
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={className}
			disabled={disabled}
			onClick={action}
		>
			{children}
		</button>
	);
};
