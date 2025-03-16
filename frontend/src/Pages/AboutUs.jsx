import PropTypes from 'prop-types';
import '../styles/AboutUs.css'

const teamMembers = [
  {
    
    name: 'Inam Irshad',
    role: 'Co-Founder',
    image: 'src/assets/members/developer02.jpg',
    github: 'https://github.com/ItsInam',
    linkedin: 'http://www.linkedin.com/in/inam-irshad',
    instagram: 'https://www.instagram.com/_.its_inam.__'
  },
  {
    name: 'Methuni Mallikaratchy',
    role: 'Co-Founder',
    image: 'src/assets/members/developer04.jpg',
    github: 'https://github.com/Methu04',
    linkedin: 'https://www.linkedin.com/in/methuni-mallikaratchy-16045133b',
    instagram: 'https://www.instagram.com/methuuuu_ni/'
  },
  {
    
    name: 'Daneesha Hansaka',
    role: 'Co-Founder',
    image: 'src/assets/members/developer01.jpg',
    github: 'https://github.com/daneezza',
    linkedin: 'https://www.linkedin.com/in/daneezza/',
    instagram: 'https://www.instagram.com/daneezza/'
  },
  {
    
    name: 'Nethasa Manawadu',
    role: 'Co-Founder',
    image: 'src/assets/members/developer05.jpg',
    github: 'https://github.com/nethasa-manawadu',
    linkedin: 'http://www.linkedin.com/in/nethasa-manawadu-7041832a7',
    instagram: 'https://www.instagram.com/nethasa_m/'
  },
  {
    
    name: 'Stephan Theekshana',
    role: 'Co-Founder',
    image: 'src/assets/members/developer03.jpg',
    github: 'https://github.com/Stephanperera04',
    linkedin: 'https://www.linkedin.com/in/stephan-perera-8a202a241',
    instagram: 'https://www.instagram.com/stephan_theekshana'
  }
];

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>Who We Are</h1>
      <hr className="about-us-line" />
      <p className='about-description'>
        At the intersection of innovation and social responsibility, our team of five visionary developers presents Dakapathi, Sri Lanka’s first versatile tax management web app. 
        <b className="about-description-bold"> Inspired by the ancient Dakapathi system, our platform modernizes tax literacy and compliance with intuitive calculators, real-time regulatory updates, AI assistance, and engaging educational tools. </b>
        We believe in transparency, accuracy, and accessibility, making tax management effortless for individuals and businesses alike. Fueled by expertise and collaboration, we bridge the gap between taxpayers and economic responsibility; one smart solution at a time.
      </p>

      <div className="team-section">
        <h2>The Visionaries Who Brought Dakapathi to Life</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} className="member-image" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noopener noreferrer" title="Github">
                  <img src="src/assets/icons/github-icon.png" alt="GitHub" className="social-icon" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <img src="src/assets/icons/linkedin-icon.png" alt="LinkedIn" className="social-icon" />
                </a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <img src="src/assets/icons/instagram-icon.png" alt="Instagram" className="social-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='contact-details'>
        <h2>Contact Dakapathi</h2>
        <p><strong>Hotline:</strong> +94 719 745 537</p>
        <p><strong>Gmail:</strong> dakapathi.official@gmail.com</p>

        {/* Social media icons */}
        <div className="social-icons">
          <a href="https://www.instagram.com/dakapathi.official/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <img src="src/assets/icons/instagram-black.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@dakapathi.official" target="_blank" rel="noopener noreferrer" title="TikTok">
            <img src="src/assets/icons/tiktok-black.png" alt="TikTok" />
          </a>
          <a href="https://www.facebook.com/share/164LtWpVr9/" target="_blank" rel="noopener noreferrer" title="Facebook">
            <img src="src/assets/icons/facebook-black.png" alt="TikTok" />
          </a>
        </div>
      </div>
    </div>
  );
}

AboutUs.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default AboutUs;
