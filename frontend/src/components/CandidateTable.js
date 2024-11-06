import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateTable = ({ refresh }) => {
	const [candidates, setCandidates] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [candidatesPerPage] = useState(10);
	const [filterOption, setFilterOption] = useState("");
	const [genderFilter, setGenderFilter] = useState("");
	const [experienceFilter, setExperienceFilter] = useState("");
	const [educationFilter, setEducationFilter] = useState("");
	const [skillFilters, setSkillFilters] = useState([]);
	const [allSkills, setAllSkills] = useState([]);

	useEffect(() => {
		const fetchCandidates = async () => {
			try {
				const res = await axios.get("http://localhost:5001/api/candidates");
				setCandidates(res.data);

				// Extract unique skills from candidates
				const skills = new Set();
				res.data?.forEach((candidate) => {
					if (typeof candidate.skills === "string") {
						skills.add(candidate.skills);
					}
				});
				setAllSkills([...skills]);
			} catch (error) {
				console.error("Error fetching candidates:", error);
			}
		};
		fetchCandidates();
	}, [refresh]);

	const filteredCandidates = candidates.filter((candidate) => {
		const matchesSearch =
			candidate.name.toLowerCase()?.includes(search.toLowerCase()) ||
			candidate.phone?.includes(search) ||
			candidate.email.toLowerCase()?.includes(search.toLowerCase());

		let matchesFilter = true;
		if (filterOption === "gender") {
			matchesFilter = !genderFilter || candidate.gender === genderFilter;
		} else if (filterOption === "experience") {
			matchesFilter =
				!experienceFilter || candidate.experience === experienceFilter;
		} else if (filterOption === "education") {
			matchesFilter =
				!educationFilter || candidate.education === educationFilter;
		} else if (filterOption === "skills") {
			matchesFilter =
				!skillFilters.length || skillFilters.includes(candidate.skills);
		}

		return matchesSearch && matchesFilter;
	});

	const indexOfLastCandidate = currentPage * candidatesPerPage;
	const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
	const currentCandidates = filteredCandidates.slice(
		indexOfFirstCandidate,
		indexOfLastCandidate
	);

	const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="container my-4">
			<h2>Candidate List</h2>

			<div className="d-flex justify-content-between align-items-center mb-4">
				<div className="d-flex flex-column w-50">
					<input
						type="text"
						className="form-control mb-3"
						placeholder="Search candidates..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<select
						className="form-control w-30"
						value={filterOption}
						onChange={(e) => {
							const selectedOption = e.target.value;
							setFilterOption(selectedOption);
							setGenderFilter("");
							setExperienceFilter("");
							setEducationFilter("");
							setSkillFilters([]);
						}}
					>
						<option value="">Select Filter</option>
						<option value="gender">Gender</option>
						<option value="experience">Experience</option>
						<option value="education">Education</option>
						<option value="skills">Skills</option>
					</select>

					{filterOption === "gender" && (
						<select
							className="form-control mt-3"
							value={genderFilter}
							onChange={(e) => setGenderFilter(e.target.value)}
						>
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					)}

					{filterOption === "experience" && (
						<select
							className="form-control mt-3"
							value={experienceFilter}
							onChange={(e) => setExperienceFilter(e.target.value)}
						>
							<option value="">Select Experience</option>
							<option value="Fresher">Fresher</option>
							<option value="1 Year">1 Year</option>
							<option value="2 Years">2 Years</option>
							<option value="3 Years">3 Years</option>
							<option value="More than 3 Years">More than 3 Years</option>
						</select>
					)}

					{filterOption === "education" && (
						<select
							className="form-control mt-3"
							value={educationFilter}
							onChange={(e) => setEducationFilter(e.target.value)}
						>
							<option value="">Select Education</option>
							<option value="Undergraduate">Undergraduate</option>
							<option value="Graduate">Graduate</option>
							<option value="Postgraduate">Postgraduate</option>
							<option value="PhD">PhD</option>
						</select>
					)}

					{filterOption === "skills" && (
						<select
							className="form-control mt-3"
							value={skillFilters}
							onChange={(e) => setSkillFilters([e.target.value])}
						>
							<option value="">Select Skill</option>
							{allSkills.map((skill) => (
								<option key={skill} value={skill}>
									{skill}
								</option>
							))}
						</select>
					)}
				</div>
			</div>

			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Experience</th>
						<th>Education</th>
						<th>Skills</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{currentCandidates.map((candidate) => (
						<tr key={candidate._id}>
							<td>{candidate.name}</td>
							<td>{candidate.phone}</td>
							<td>{candidate.email}</td>
							<td>{candidate.gender}</td>
							<td>{candidate.experience}</td>
							<td>{candidate.education}</td>
							<td>{candidate.skills}</td>
							<td>{new Date(candidate.createdAt).toLocaleDateString()}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="d-flex justify-content-center my-3">
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="btn btn-outline-secondary me-2"
				>
					Previous
				</button>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => paginate(index + 1)}
						className={`btn btn-outline-secondary me-2 ${
							currentPage === index + 1 ? "active" : ""
						}`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="btn btn-outline-secondary ms-2"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CandidateTable;
