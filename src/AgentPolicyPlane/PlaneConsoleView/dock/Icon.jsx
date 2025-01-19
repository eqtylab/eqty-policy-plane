export const Icon = (props) => {
	return (
		<div title={props.title} className="action" onClick={props.onClick}>
			<span
				style={{ fontSize: "inherit" }}
				className="material-symbols-outlined">
				{props.icon}
			</span>
		</div>
	);
};
