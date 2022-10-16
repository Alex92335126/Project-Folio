import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <Card className="text-center footer" style= {{ backgroundColor: "black", color: "#FFA500", font:"60px"  }}>
      <h2>About Us</h2>
      <Card.Body>
         <span>Email Us:&nbsp;<a href="mailto:gamefolio@gmail.com">gamefolio@gmail.com</a></span>

        {/* <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      <Card.Footer className="text-muted">Copyright 2022</Card.Footer>
    </Card>
  );
}

export default Footer;