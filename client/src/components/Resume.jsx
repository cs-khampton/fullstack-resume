import axios from 'axios';
import { useEffect, useState } from 'react';
import resume from '../assets/KH_Resume_8-26.pdf';

function Resume() {

    const [array, setArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAPI = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/experience');
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

    if (loading) return <p>Loading resume...</p>;
    if (error) return <p>Failed to load resume.</p>;


    return (
        <>
            <section id="experience">
                {array.map((exp) => (
                    <div className="experience" key={exp.id}>
                        <h2><strong>{exp.company}</strong></h2>
                        <p id='job-title'><strong>{exp.jobTitle}</strong></p>
                        <p id='employment-date'><em>{exp.startDate} - {exp.endDate}</em></p>
                        <ul>
                            {exp.tasks.map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <div id="resume-PDF-download">
                <a href={resume} style={{ textDecoration: 'none' }} download="KaiHampton_Resume.pdf">Download PDF Version</a>
            </div>
        </>
    )
}

export default Resume;