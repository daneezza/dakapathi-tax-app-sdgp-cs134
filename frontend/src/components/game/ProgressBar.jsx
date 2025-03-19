const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar">
      <div className="filled" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

export default ProgressBar

