const Loading = (pageLoading) => {
  if (pageLoading) {
    return (
      <div className='row text-center mt-5 align-items-center'>
        <div className='col-xl mt-5'>
          <h4 className='mb-5'>
            We're getting your data, please wait a moment . . .
          </h4>
          <div className='loading loading-full-height'></div>
        </div>
      </div>
    )
  }
}
export default Loading