import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Login() {

return (
    <div className= "scoreboard" style={{color: "#FFA500"}}>
        <Card style={{ width: '18rem', height: "30rem", backgroundColor: "black"}}>
        <Card.Img variant="top" src="/Gold.png" />
        <Card.Body>
            <Card.Title>Champion</Card.Title>
            <Card.Text>
            NFT GOLD PRIZE
            </Card.Text>
        </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem', height: "30rem", backgroundColor: "black"}}>
        <Card.Img variant="top" src="/Silver.png" />
        <Card.Body>
            <Card.Title>2nd Runner Up</Card.Title>
            <Card.Text>
            NFT SILVER PRIZE
            </Card.Text>
        </Card.Body>
        </Card>

        <Card style={{ width: '18rem', height: "30rem", backgroundColor: "black" }}>
        <Card.Img variant="top" src="/Bronze.png" />
        <Card.Body>
            <Card.Title>3rd Runner Up</Card.Title>
            <Card.Text>
            NFT BRONZE PRIZE
            </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem', height: "30rem", backgroundColor: "black" }}>
        <Card.Img variant="top" src="/number4-10.png" />
        <Card.Body>
            <Card.Title>4-10 Runner Up</Card.Title>
            <Card.Text>
            NFT 4-10 RUNNER UP PRIZE
            </Card.Text>
        </Card.Body>
        </Card>

    </div>
    )
}