import React, {useContext} from 'react';
import GridBase from '../../base/GridBase';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FetchContext from '../../../contexts/FetchContext';

const Area = (props) => {
    var fetchHelper = useContext(FetchContext);

    const data = React.useMemo(
        fetchHelper.get, []
    );
    
    const columns = React.useMemo(() => [
            {
                Header: 'id',
                accessor: 'id',
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Facturable',
                accessor: 'isBillable',
                canSort: false
            }
        ], []
    );

    return (
        <Container>
            <Row style={{marginTop:'25px'}}>
                <Col xs={12}>
                <Accordion defaultActiveKey="0">
                    <Card border="secondary">
                        <Card.Header style={{padding:'5px'}}>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <h5>Áreas</h5>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <GridBase columns={columns} data={data} />
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default Area;