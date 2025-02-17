import React, { useState, ChangeEvent } from 'react';
import './QuestionForm.css';

interface QuestionFormProps {
    onSubmit: (question: { title: string }) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            return;
        }

        onSubmit({ title });
        setTitle('');
    };

    const handleReset = () => {
        setTitle('');
    };

    return (
        <div className="question-form-container">
            <h1>Ask a Question</h1>
            <div className="form-content">
                <textarea
                    placeholder="Write your question here..."
                    value={title}
                    onChange={handleChange}
                    className="question-input"
                />
                <div className="button-container">
                    <button className="reset-button" onClick={handleReset}>Reset</button>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;