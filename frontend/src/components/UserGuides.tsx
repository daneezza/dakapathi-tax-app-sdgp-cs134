import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserGuides.css';

interface Guide {
    id: number;
    title: string;
    content: string[];
    videoPath: string;
}

const UserGuides: React.FC = () => {
const [guides, setGuides] = useState<Guide[]>([]);

useEffect(() => {
axios
    .get<Guide[]>('http://localhost:3000/api/guides')
    .then((response) => setGuides(response.data))
    .catch((error) => console.error('Error fetching guides:', error));
}, []);

return (
<div className="user-guides-page">
    <h1 className="heading">User Guide</h1>
    <div className="guides-container">
    {guides.map((guide, index) => {
        const isEven = index % 2 === 0;
        return (
        <React.Fragment key={guide.id}>
            <div className="guide">
            {isEven ? (
                <>
                <div className="video-container">
                    <video controls>
                    <source
                        src={`http://localhost:3000/videos/${guide.videoPath}`}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                    </video>
                </div>
                <div className="text-container">
                    <h2 className="guide-title">
                    {guide.id}) {guide.title}
                    </h2>
                    <div className="guide-content">
                    {guide.content.map((step, idx) => (
                        <p key={idx}>{step}</p>
                    ))}
                    </div>
                </div>
                </>
            ) : (
                <>
                <div className="text-container">
                    <h2 className="guide-title">
                    {guide.id}) {guide.title}
                    </h2>
                    <div className="guide-content">
                    {guide.content.map((step, idx) => (
                        <p key={idx}>{step}</p>
                    ))}
                    </div>
                </div>
                <div className="video-container">
                    <video controls>
                    <source
                        src={`http://localhost:3000/videos/${guide.videoPath}`}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                    </video>
                </div>
                </>
            )}
            </div>
            <hr className="guide-divider" />
        </React.Fragment>
        );
    })}
    </div>
</div>
);
};

export default UserGuides;
