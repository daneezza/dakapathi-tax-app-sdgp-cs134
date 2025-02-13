import { useState } from 'react';
import { postQuestion } from '../api';

export default function AskQuestion() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        await postQuestion({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h2>Ask a Question</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
