import {
	AddIcon,
	CloseIcon,
	NotFindIcon,
	DraggableIcon,
	EditIcon,
	DeleteIcon,
} from "@assets/icons";

type IconProps = {
	icon?: string;
	className?: string;
	action?: React.MouseEventHandler<HTMLDivElement>;
	isDisabled?: boolean;
};

export const Icon = ({
	icon = undefined,
	className,
	action,
	isDisabled = false,
}: IconProps) => {
	const IconComponent =
		icon === "add"
			? AddIcon
			: icon === "close"
			? CloseIcon
			: icon === "draggable"
			? DraggableIcon
			: icon === "edit"
			? EditIcon
			: icon === "delete"
			? DeleteIcon
			: NotFindIcon;

	return (
		<div className={className} onClick={isDisabled ? undefined : action}>
			{IconComponent && <IconComponent />}
		</div>
	);
};
