import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Africa, America, Countries, Europe, Oceania, Asia } from './component';
// import AppPagination from './pagination/AppPagination';
import TodoCard from './todos/TodoCard';
import DetailTodo from './todos/DetailTodo';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<TodoCard />} />
					<Route path="todo/:id/" element={<DetailTodo />} />
				</Routes>
			</Router>
			{/* <Router>
				<Routes>
					 <Route path="/" element={<Countries />} />
					 <Route path="/europe/" element={<Europe />} />
					 <Route path="/africa/" element={<Africa />} />
					 <Route path="/america/" element={<America />} />
					 <Route path="/asia/" element={<Asia />} />
					 <Route path="/oceania/" element={<Oceania />} />
				</Routes>
			</Router> */}
		</>
	);
}

export default App;
