import { useLayoutEffect, useState } from 'react';
import { api } from './constant';
import axios from 'axios';
import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	TablePagination,
} from '@mui/material';
import TodoDetail from './TodoDetail';

const TodoCard = () => {
	const [rowperpage, rowperpagechange] = useState(6);
	const [page, pagechange] = useState(0);
	const [todo, setTodo] = useState([]);
	const [loading, setLoading] = useState(false);

	const handlepagechange = (e, newpage) => {
		pagechange(newpage);
	};

	const handlerowperpagechange = (e) => {
		rowperpagechange(+e.target.value);
		pagechange(0);
	};
	const fetchData = async () => {
		setLoading(true);
		const response = await axios.get(api);
		setTodo(response.data);
		setLoading(false);
	};
	useLayoutEffect(() => {
		fetchData();
	}, []);

	console.log(todo);

	return (
		<>
			{loading === true ? (
				'loading'
			) : (
				<>
					<>
						<Grid container spacing={2}>
							{todo
								?.slice(page * rowperpage, page * rowperpage + rowperpage)
								.map((item) => (
									<Grid item lg={4} key={item.id}>
										<TodoDetail todo={item} />
									</Grid>
								))}
						</Grid>
					</>
					<TablePagination
						style={{
							width: '100vw',
							marginTop: '40px',
						}}
						rowsPerPageOptions={[6, 12, 24]}
						rowsPerPage={rowperpage}
						page={page}
						count={todo.length}
						onPageChange={handlepagechange}
						onRowsPerPageChange={handlerowperpagechange}
					></TablePagination>
				</>
			)}
		</>
	);
};

export default TodoCard;