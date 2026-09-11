import axios from 'axios';
import { useEffect, useState } from 'react';

function Skills() {
    // all skills and categories based off JSON file
    const [allSkills, setAllSkills] = useState([]);
    const [category, setCategory] = useState('All');

    // loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // filtering states
    const [sortAscending, setSortAscending] = useState(true);
    const [sortMode, setSortMode] = useState('name'); // 'name' or 'experience'

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/skills');
                setAllSkills([...response.data].sort((a, b) => a.name.localeCompare(b.name)));
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const categories = ['All', ...new Set(allSkills.map((s) => s.category).sort())];

    const filteredSkills = [...(
        category === 'All'
            ? allSkills
            : allSkills.filter((s) => s.category === category)
    )].sort((a, b) => {
        if (sortMode === 'experience') {
            return sortAscending
                ? a.yearsOfExperience - b.yearsOfExperience
                : b.yearsOfExperience - a.yearsOfExperience;
        }
        return a.name.localeCompare(b.name);
    });

    const handleSortByExperience = () => {
        setSortMode('experience');
        setSortAscending(!sortAscending);
    };

    const handleReset = () => {
        setCategory('All');
        setSortMode('name');
        setSortAscending(true);
    };

    if (error) return <p>Failed to load skills.</p>;
    if (loading) return <p>Loading skills...</p>;

    return (
        <section className="body">
            <div>
                {/* Dropdown options from loaded Categories */}
                <label for='cat-select'>Category</label>
                <select id='cat-select' value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button onClick={handleSortByExperience}>Sort by Experience {sortAscending ? '↑' : '↓'}</button>
                <button onClick={handleReset}>Reset Filters</button>
            </div>
            <div>
                {filteredSkills.map((skill) => (
                    <p key={skill.id}>{skill.name}&nbsp; - &nbsp;{skill.yearsOfExperience} years</p>
                ))}
            </div>
        </section>
    );
}

export default Skills;