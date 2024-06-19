import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailTodo = () => {
	const { id } = useParams();

	const [data, setData] = useState({});
	const fetchData = async () => {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/todos/${id}/`
		);
		setData(response.data);
	};
	useEffect(() => {
		fetchData();
	}, [id]);
	console.log(data);
	return (
		<div>
			<p>UserId: {data.userId}</p>
			<p>UserId: {data.id}</p>
			<p>UserId: {data.title}</p> <br />
			<span>
				Completed:
				<input type="checkbox" checked={data.completed} />
			</span>
		</div>
	);
};

export default DetailTodo;
