import axios from 'axios';
import { useEffect, useState } from 'react';

function Skills() {
    const [allSkills, setAllSkills] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/skills');
                setAllSkills(response.data);
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

    const filteredSkills =
        category === 'All'
            ? allSkills
            : allSkills.filter((s) => s.category === category);

    if (error) return <p>Failed to load skills.</p>;
    if (loading) return <p>Loading skills...</p>;

    return (
        <section id="skills">
            {/* Dropdown options from loaded Categories */}
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <div className="skills-list">
                {filteredSkills.map((skill) => (
                    <p>{skill.name} — ({skill.yearsOfExperience} years)  {skill.level}</p>
                ))}
            </div>
        </section>
    );
}

export default Skills;