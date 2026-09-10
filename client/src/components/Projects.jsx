import axios from 'axios';
import { useEffect, useState } from 'react';

function Projects() {
    const [array, setArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAPI = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/projects');
            setArray(response.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects.</p>;

    return (
        <>
            <section className='body' id="projects">
                {array.map((project) => (
                    <div className="project" id={project.id}>
                        <h2><strong>{project.title}</strong></h2>
                        <h3><strong>Role: {project.role}</strong></h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>
        </>
    )
}
export default Projects;