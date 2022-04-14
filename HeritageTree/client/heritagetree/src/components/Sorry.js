import { Link } from "react-router-dom";
import { Accordion, Button } from "react-bootstrap";

export const Sorry = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
      <>
{(currentUser.userTypeId !== 1) &&
<span>
        <p>Go back to home page </p>
        <Link to={`/`}>
          <Button className="back">Home</Button>
        </Link></span>
}
        </>
    )
}