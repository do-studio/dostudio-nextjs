import {Banner,AnimatPara,About,Whatwedo,Clients,Testimonials,MovingWords,GetinTouch} from '../components'


export default function Home() {
 

  return (
    <main>
      <Banner/>
      <AnimatPara/>
      <About/>
      {/* <Whatwedo/>
      <Clients/> */}
      <Testimonials/>
      <GetinTouch/>
      <MovingWords/>
    </main>
  );
}
