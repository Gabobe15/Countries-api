import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { API } from '../utils/Api';
import { Link } from 'react-router-dom';

function Countries() {
	const [countries, setCountries] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const fetchCountries = () => {
		try {
			axios.get(API).then((res) => {
				setCountries(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handlefilter = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		if (query === '') {
			fetchCountries();
		} else {
			const filtered = countries.filter((c) => {
				return (
					c.name.common.toLowerCase().includes(query) ||
					c.region.toLowerCase().includes(query)
					// c.capital.toLowerCase().includes(query)
				);
			});
			return setCountries(filtered);
		}
	};

	useEffect(() => {
		fetchCountries();
	}, []);
	countries.sort();

	// Pagination
	const itemPerPage = 20;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastItem = currentPage * itemPerPage;
	const indexOfFirstItem = indexOfLastItem - itemPerPage;
	const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem); // it is going to show the first and last page 0-4, this mean it consist of four pages
	const totalPages = Math.ceil(countries.length / itemPerPage); // 10/5 = 2 page
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1 // we looping throught page numbers and adding 1 since in js numbers start from 0 , _(is parameter we don't want to use currently but you can name it)
	);

	return (
		<>
			<div className="search-container">
				<div className="search">
					<input
						type="text"
						value={searchQuery}
						onChange={handlefilter}
						// onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="search by country or region"
					/>
				</div>
				<div>
					{searchQuery === ''
						? ''
						: `Showing Results for "${searchQuery || 'No Search Query'}" `}{' '}
				</div>
				<div>
					{searchQuery === ''
						? ''
						: `country "${countries.length}" `}{' '}
				</div>
			</div>
			<div className="country">
				{currentItems?.map((c, index) => (
					<div key={index} className="section">
						{console.log(c)}
						<div className="img-container">
							<img src={c.flags.png} />
						</div>
						<div className="container">
							<div className="country-capital">
								<p>Country:{c.name.common} </p>
								<p>Capital City:{c.capital}</p>
							</div>
							<p>Continent: {c.continents}</p>
							<p>Population: {c.population}</p>
							<p>Square are: {c.area}</p>
							<p>Region: {c.region}</p>
							<p>
								landlocked status:{' '}
								{c.landlocked === true ? 'Landlocked' : 'Coastal'}
							</p>
							<div>
								{Object.entries({ ...c.currencies }).map(([key, value]) => (
									<Fragment key={key}>
										<p>Currency used: {[key, value][1].name || 'no name'}</p>
										<p>{[key, value][1].symbol || 'no symbol'} 100</p>
									</Fragment>
								))}
							</div>
							<span>
								language:
								{Object.entries({ ...c.languages }).map(([key, value]) => (
									<span key={key}>
										{[key, value][1]}
										{key.length > 1 && ',' + ' '}
									</span>
								))}
							</span>
						</div>
					</div>
				))}
				{countries.length < 1 && <p>No country found</p>}
			</div>
			<div className="pagination-container">
				<ul className="pagination">
					<li>
						<button onClick={() => setCurrentPage(currentPage - 1)}>
							Previous
						</button>
					</li>
				</ul>
				<ul className="pagination">
					{pageNumbers.map((number) => (
						<li key={number}>
							<button
								className="page-link"
								onClick={() => setCurrentPage(number)}
							>
								{number}
							</button>
						</li>
					))}
				</ul>
				<ul className="pagination">
					<li>
						<button onClick={() => setCurrentPage(currentPage + 1)}>
							Next
						</button>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Countries;
