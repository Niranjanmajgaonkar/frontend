import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Home() {
  return (
    <div style={{margin:'10px'}}>

    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" style={{height:'250px', width:'250px'}} src="https://res.cloudinary.com/dnht8m6ph/image/upload/v1738341591/edge-50-fusion-pb300002in-motorola-original-imahywzrfagkuyxx_ibny8n.webp" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
    </div>
  )
}
