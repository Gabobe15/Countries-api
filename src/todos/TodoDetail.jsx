import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const TodoDetail = ({ todo }) => {
	const [completed, setCompleted] = useState(true);

	return (
		<Box>
			<Box>{todo.title}</Box>
			<FormControlLabel checked={todo.completed} control={<Checkbox />} />
		</Box>
	);
};

export default TodoDetail;
