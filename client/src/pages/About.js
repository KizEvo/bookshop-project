import aboutUsSvg from '../assets/about-us-svg.svg'

const About = () => {
  return (
    <section className='container h-100 py-5'>
      <div className='d-flex justify-content-center align-items-center flex-column my-3'>
        <h1>Our Vision</h1>
        <div className='bg-primary px-5 py-1'></div>
      </div>
      <div className='d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-5 pb-5'>
        <img src={aboutUsSvg} alt='about-us-team' className='img-fluid' />
        <div style={{ maxWidth: '30rem' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          earum enim, dicta repudiandae eius, dignissimos, aut nemo inventore
          culpa laborum dolores incidunt exercitationem sed cum voluptates
          voluptate fugiat a asperiores soluta minima aliquid eveniet quod
          veniam. Aperiam impedit, ut dolorum quasi atque quo doloremque autem
          itaque sequi sapiente quaerat eveniet reprehenderit soluta. Aperiam
          accusamus illum exercitationem! Ducimus itaque error neque, delectus,
          debitis corrupti temporibus nemo aspernatur nisi rem esse quod
          accusantium quia ad nam facere.
        </div>
      </div>
    </section>
  )
}
export default About
