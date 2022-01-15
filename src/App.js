import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModel from "./components/AddBudgetModel";
import AddExpenseModal from "./components/AddExpenseModel";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Presupuestos</h1>
          <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>
            Agregar Presupuesto
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setShowAddExpenseModal(true)}
          >
            Agregar Gasto
          </Button>
        </Stack>
        <div className="layout">
          {budgets.map(({ id, name, max }) => {
            const amout = getBudgetExpenses(id).reduce(
              (total, expense) => total + expense.amout,
              0
            );
            return <BudgetCard key={id} name={name} amount={amout} max={max} />;
          })}
        </div>
      </Container>
      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
}

export default App;
