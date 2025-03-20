import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaxGuides = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/taxGuides')
      .then((response) => setGuides(response.data))
      .catch((error) => console.error('Error fetching guides:', error));
  }, []);

  return (
    <div className="tax-guides-page">
      <h1 className="heading">Tax Guide</h1>
      <div className="guides-container">
        {guides.map((guide, index) => {
          const isEven = index % 2 === 0;
  
          const videoId = guide.YoutubePath.split('youtu.be/')[1]?.split('?')[0];
  
          return (
            <React.Fragment key={guide.id}>
              <div className={`guide ${isEven ? "even" : "odd"}`}>
                <div className="video-container">
                  {videoId && (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Guide ${guide.id} Video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
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
              </div>
              <br />
              <br />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TaxGuides;