import { useState } from 'react';
import Child from './Child';

const Parent = () => {
	const [name, setName] = useState('Abdi');
	const changeName = (name) => {
		setName(name);
	};
	return (
		<div>
			<h1>Parent element</h1>
			<h4>My name is {name}</h4>
			<Child changeName={changeName} />
		</div>
	);
};

export default Parent;
