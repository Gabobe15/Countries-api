import { Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
const PageSize = 3;
const AppPagination = ({ ...setTodo }) => {
	const [pagination, setPagination] = useState({
		count: 20,
		from: 0,
		to: PageSize,
	});

	console.log(setTodo);
	useEffect(() => {}, []);

	const handlePageChange = () => {};
	return (
		<Box display="flex" justifyContent="center" alignItems={'center'}>
			<Pagination
				color="primary"
				count={Math.ceil(pagination.count / PageSize)}
				onChange={handlePageChange}
			/>
		</Box>
	);
};

export default AppPagination;
