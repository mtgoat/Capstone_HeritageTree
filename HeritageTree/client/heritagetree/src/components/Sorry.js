import { Link } from "react-router-dom";
import { Accordion, Button } from "react-bootstrap";

export const Sorry = () => {
    return (
      <>

        <p>Go back to home page </p>
        <Link to={`/`}>
          <Button className="back">Home</Button>
        </Link>

        </>
    )
}