import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchAPI = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchData = async () => {
		setLoading(true);
		const response = await axios.get(url);
		setData(response.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, [url]);
	return [data, loading];
};

export default useFetchAPI;
