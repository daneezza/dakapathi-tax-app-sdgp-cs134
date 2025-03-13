import PropTypes from 'prop-types';
import '../styles/AboutUs.css'


const teamMembers = [
  {
    name: 'Daneesha Hansaka',
    role: 'Co-Founder',
    image: 'src/assets/members/developer01.jpg'
  },
  {
    name: 'Methuni Mallikaratchchy',
    role: 'Co-Founder',
    image: 'src/assets/members/developer04.jpg'
  },
  {
    name: 'Inam Irshad',
    role: 'Co-Founder',
    image: 'src/assets/members/developer02.jpg'
  },
  {
    name: 'Nethasa Manawadu',
    role: 'Co-Founder',
    image: 'src/assets/members/developer05.jpg'
  },
  {
    name: 'Stephan Theekshana',
    role: 'Co-Founder',
    image: 'src/assets/members/developer03.jpg'
  }
];


function AboutUs() {
  return (
      <div className="about-us-container">
        <h1>About Us</h1>
        <p className="about-description">Dakapathi Tax Consultant</p>
        <p className='about-description'>At the heart of innovation and social responsibility, our team of five dedicated developers has crafted Dakapathi, a cutting-edge AI-powered tax management web application
          designed exclusively for Sri Lankan taxpayers. Dakapathi, a term rooted in Sri Lanka&apos;s rich history, refers to an ancient tax system that played a crucial role in economic governance. Inspired by this legacy, 
          our platform modernizes tax literacy and compliance by offering intuitive tools for tax calculations, real-time updates on regulations, multilingual AI assistance, and engaging educational resources.
          We believe in empowering individuals and businesses with transparency, accuracy, and accessibility, making tax management effortless. Driven by expertise, collaboration, and a passion for impact, our team has merged 
          technology with financial intelligence to create a seamless, user-friendly experience that bridges the gap between taxpayers and economic responsibility. Together, we are redefining how Sri Lanka navigates taxation; one smart solution at a time.
        </p>

        <div className='contact-details'>
          <h2>Contact Us</h2>
          <p><strong>Address:</strong> 123 Tax Lane, Colombo, Sri Lanka</p>
          <p><strong>Hotline:</strong> +94 123 456 789</p>
          <p><strong>Website:</strong> <a href="https://www.dakapathi.com" target="_blank" rel="noopener noreferrer">www.dakapathi.com</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@dakapathi.com">info@dakapathi.com</a></p>
        </div>

        
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} className="member-image" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
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