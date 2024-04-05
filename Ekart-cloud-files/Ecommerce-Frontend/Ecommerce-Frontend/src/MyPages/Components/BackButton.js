import React from 'react'

const BackButton = () => {
  return (
    <>

      <button className={`{styles.home_button} btn btn-warning fw-bold px-4 my-3 mx-2`} onClick={() => window.history.back()}>
        <i className="bi bi-arrow-left-circle fs-5 pe-2"></i>Back
      </button>

    </>
  )
}

export default BackButton