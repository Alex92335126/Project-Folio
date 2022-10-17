import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <div className="text-center footer py-4" style= {{ backgroundColor: "black", color: "#FFA500", font:"60px"  }}>
      <h2>About Us</h2>
      <div>
         <span>Email Us:&nbsp;<a href="mailto:gamefolio@gmail.com">gamefolio@gmail.com</a></span>

        {/* <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text> */}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </div>
      <div className="text-muted">Copyright {new Date().getFullYear()}</div>
    </div>
  );
}

export default Footer;