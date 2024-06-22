const Child = ({ changeName }) => {
	return (
		<div>
			<h2>Child</h2>
			<button onClick={() => changeName('Gabobe')}>Change name</button>
		</div>
	);
};

export default Child;
