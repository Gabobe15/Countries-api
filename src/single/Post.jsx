import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
	const [id, setId] = useState('');
	const [data, setData] = useState([]);

	const changeInput = (e) => {
		setId(e.target.value);
	};

	const fetchData = async ({ id }) => {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${id}/`
		);
		return setData(res.data);
	};

	useEffect(() => {
		fetchData({ id });
	}, []);

	return (
		<div>
			<input value={id} onChange={changeInput} />
			<button onClick={() => fetchData({ id })} className="fetch-data">
				{' '}
				fetchData
			</button>

			<div className="data">
				{data.id ? (
					<>
						<div>
							<h2>{data?.id}</h2>
							<h2>{data?.name}</h2>
							<p>Email: {data?.email}</p>
							<p>City: {data?.address?.city}</p>
							<p>zipcode: {data?.address?.zipcode}</p>
						</div>
						<button className="fetch-data">Pay</button>
					</>
				) : (
					<> no content</>
				)}
			</div>
		</div>
	);
};

export default Post;

// const [data, loading] = useFetchAPI(`${api_users}/${id}`);
// const { user, error, loading } = useSelector((state) => state.user);
// const dispatch = useDispatch();

// const changeInput = (e) => {
// 	setId(e.target.value);
// };

// const fetchData = () => {
// 	dispatch(getUser);
// };

// {
// 	loading ? (
// 		<p>loading...</p>
// 	) : error ? (
// 		<p>Error: {error}</p>
// 	) : user ? (
// 		<div>{/* <h2>{user.name}</h2> */}</div>
// 	) : (
// 		<p>No user data</p>
// 	);
// }
