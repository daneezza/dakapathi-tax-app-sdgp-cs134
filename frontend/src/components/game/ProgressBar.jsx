import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar">
      <div className="filled" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
}
  


export default ProgressBar

