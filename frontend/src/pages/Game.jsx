import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Game() {

return (
    <>

    <div className= "scoreboard" style={{color: "#FFA500", padding: "120px"}}>
    <div>
        <h1 style={{textDecorationLine: 'underline', marginBottom: "20px"}}>Game Instruction:  </h1> 
        <h5 style={{width: "18rem"}}>Gamefolio is a Virtual Stock Market Simulator which provides real time stock price and news  which allows you to trade your favorite stocks. With the user friendly interface, you can show your stock picking skills and creating your own portfolio for winning the NFT and other prizes . You start with $100k and can buy and sell stocks in realtime from the US stock exchange and the game will start from 1st, Jan,  2023. GOOD LUCK! </h5>
    </div>

       
        <Card style={{ width: '18rem', height: "35rem", backgroundColor: "black"}}>
        <Card.Img variant="top" src="/Gold.png" />
        <Card.Body>
            <Card.Title>Champion</Card.Title>
            <Card.Text>
            NFT GOLD PRIZE
            </Card.Text>
            <ul>
                1. Gold Crown NFT 
            </ul>
            <ul>
                2. 30% Trading Fee Discount from FDX 
            </ul>
            <ul>
                3. Potentially enjoy 1% Management Fee from followers
            </ul>
        </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem', height: "35rem", backgroundColor: "black"}}>
        <Card.Img variant="top" src="/Silver.png" />
        <Card.Body>
            <Card.Title>2nd Runner Up</Card.Title>
            <Card.Text>
            NFT SILVER PRIZE
            </Card.Text>
            <ul>
                1. Silver Crown NFT 
            </ul>
            <ul>
                2. 20% Trading Fee Discount from FDX 
            </ul>
            <ul>
                3. Potentially enjoy 1% Management Fee from followers
            </ul>
        </Card.Body>
        </Card>

        <Card style={{ width: '18rem', height: "35rem", backgroundColor: "black" }}>
        <Card.Img variant="top" src="/Bronze.png" />
        <Card.Body>
            <Card.Title>3rd Runner Up</Card.Title>
            <Card.Text>
            NFT BRONZE PRIZE
            </Card.Text>
            <ul>
                1. Bronze Crown NFT 
            </ul>
            <ul>
                2. 10% Trading Fee Discount from FDX 
            </ul>
            <ul>
                3. Potentially enjoy 1% Management Fee from followers
            </ul>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem', height: "35rem", backgroundColor: "black" }}>
        <Card.Img variant="top" src="/number4-10.png" />
        <Card.Body>
            <Card.Title>4-10 Runner Up</Card.Title>
            <Card.Text>
            NFT 4-10 RUNNER UP PRIZE
            </Card.Text>
            <ul>
                1. Gold Crown NFT 
            </ul>
            <ul>
                2. 30% Trading Fee Discount from FDX 
            </ul>
            <ul>
                3. Potentially enjoy 1% Management Fee from followers
            </ul>
        </Card.Body>
        </Card>

    </div>
    </>
    )
}