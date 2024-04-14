import { Button } from 'react-bootstrap';

const RefreshButton = ({ action }) => <Button onClick={action} variant="outline-info" size="sm">Refrescar</Button>;

export default RefreshButton;