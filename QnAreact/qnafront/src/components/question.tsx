import { useEffect, useState } from 'react';
import { fetchQuestions } from '../api';

export default function Questions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions().then((res) => setQuestions(res.data));
    }, []);

    return (
        <div>
            <h2>Questions</h2>
            {questions.map((q: any) => (
                <div key={q.id}>
                    <h3>{q.title}</h3>
                    <p>{q.content}</p>
                </div>
            ))}
        </div>
    );
}
