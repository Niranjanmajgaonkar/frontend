import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';



function Carousels() {
  return (
    <Carousel style={{marginTop:'80px', marginBottom:'30px'}}>
      <Carousel.Item interval={1000}>
      <Image
       style={{
        width:'100%',
        height:'250px'
       }}
        src="images/slides/slides.webp" // Replace with your actual image URL
        alt='slide 1'
        fluid
      />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>



      <Carousel.Item interval={500}>
 
  <Image
   style={{
    width:'100%',
    height:'250px'
   }}
        src="images/slides/slides2.webp" // Replace with your actual image URL
        alt='slide 2'
        fluid
      />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>


      <Carousel.Item>
   <Image
   style={{
    width:'100%',
    height:'250px'
   }}
        src="images/slides/slides3.webp" // Replace with your actual image URL
        alt='slide 3'
        fluid
      />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;