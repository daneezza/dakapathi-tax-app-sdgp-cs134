import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar">
      {/* fills based on progress percentage */}
      <div className="filled" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired //progress must be a number
}
  


export default ProgressBar

