import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "./components/BudgetCard";
function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Presupuestos</h1>
        <Button variant="success">Agregar Presupuesto</Button>
        <Button variant="outline-danger">Agregar Gasto</Button>
      </Stack>
      <div className="layout">
        <BudgetCard name="Entretenimiento" amount={1000} max={1000} />
      </div>
    </Container>
  );
}

export default App;
