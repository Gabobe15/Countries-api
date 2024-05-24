import { useState, useEffect, Fragment } from 'react';
import { NavLinks } from './NavLinks';

import { useSelector, useDispatch } from 'react-redux';
import { getCountry } from '../redux/features/countrySlice';

function Countries() {
	const [searchQuery, setSearchQuery] = useState('');

	const dispatch = useDispatch();
	const { country, error, loading } = useSelector((store) => store.country);
	useEffect(() => {
		dispatch(getCountry());
	}, []);

	const handleFilter = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		if (query === '') {
			getCountry();
		} else {
			const filtered = country.filter((c) => {
				return (
					c.name.common.toLowerCase().includes(query) ||
					c.region.toLowerCase().includes(query)
				);
			});
			return getCountry(filtered);
		}
	};

	// Pagination
	const itemPerPage = 20;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastItem = currentPage * itemPerPage;
	const indexOfFirstItem = indexOfLastItem - itemPerPage;
	const currentItems = country.slice(indexOfFirstItem, indexOfLastItem); // it is going to show the first and last page 0-4, this mean it consist of four pages
	const totalPages = Math.ceil(country.length / itemPerPage); // 10/5 = 2 page
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1 // we looping throught page numbers and adding 1 since in js numbers start from 0 , _(is parameter we don't want to use currently but you can name it)
	);

	return (
		<>
			<NavLinks />
			<div className="search-container">
				<div className="search">
					<input
						type="text"
						value={searchQuery}
						onChange={handleFilter}
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
						: `countr${country.length > 1 ? 'ies' : 'y'} "${
								country.length
						  }" `}{' '}
				</div>
			</div>
			{loading === true ? (
				<p>Loading....</p>
			) : (
				<>
					<div className="country">
						{currentItems?.map((c, index) => (
							<div key={index} className="section">
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
												<p>
													Currency used: {[key, value][1].name || 'no name'}
												</p>
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
						{country.length < 1 && <p>No country found</p>}
					</div>
					<div className="pagination-container">
						<ul className="pagination">
							<li>
								<button
									onClick={() =>
										currentPage > 1 ? setCurrentPage(currentPage - 1) : null
									}
								>
									<i className="fa-solid fa-arrow-left" />

									{/* Prev */}
								</button>
							</li>
						</ul>
						<ul className="pagination">
							{pageNumbers.map((number) => (
								<li
									key={number}
									className={`${currentPage === number ? 'active' : ''}`}
								>
									<button onClick={() => setCurrentPage(number)}>
										{number}
									</button>
								</li>
							))}
						</ul>
						<ul className="pagination">
							<li>
								<button
									onClick={() =>
										currentPage < totalPages
											? setCurrentPage(currentPage + 1)
											: null
									}
								>
									<i className="fa-solid fa-arrow-right" />
									{/* Next */}
									{/* <i className="ci-arrow-right ms-3" /> */}
								</button>
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
}

export default Countries;
