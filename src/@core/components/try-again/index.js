import { AlertTriangle } from "react-feather"
import { Button, Col, Row } from "reactstrap"

const TryAgain = ({cb}) => {
    return (
        <Row className="d-flex justify-content-center">
            <Col xs={12} className="d-flex justify-content-center mb-1">
                <AlertTriangle size={100} />
            </Col>
            <Col xs={12} className="d-flex justify-content-center mb-1">
                Une erreur est survenue
            </Col>
                <Button color="primary" style={{maxWidth: "120px"}} onClick={cb}>
                    Réessayer
                </Button>
        </Row>
    )
}

export default TryAgain