const SubscribeSection = () => {
  return (
    <section className='container d-flex flex-column py-5 gap-5'>
      <h3>Join our newsletter to receive the latest books update!</h3>
      <div className='d-flex flex-column flex-lg-row align-items-lg-center justify-content-between  gap-5'>
        <p className='mb-0' style={{ maxWidth: '30rem' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia itaque
          nemo laborum iste nisi asperiores amet dignissimos aspernatur possimus
          alias.
        </p>
        <form className='d-flex flex-lg-row flex-column align-items-lg-center gap-2'>
          <input
            type='email'
            className='p-1 px-2 rounded'
            placeholder='Enter Email'
            required
          />
          <button className='btn btn-primary'>SUBSCRIBE</button>
        </form>
      </div>
    </section>
  )
}
export default SubscribeSection
