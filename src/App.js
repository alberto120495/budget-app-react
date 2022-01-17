import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModel from "./components/AddBudgetModel";
import AddExpenseModal from "./components/AddExpenseModel";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCAREGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalId, setViewExpensesModalId] = useState();
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Presupuestos</h1>
          <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>
            Agregar Presupuesto
          </Button>
          <Button variant="outline-danger" onClick={openAddExpenseModal}>
            Agregar Gasto
          </Button>
        </Stack>
        <div className="layout">
          {budgets.map(({ id, name, max }) => {
            const amount = getBudgetExpenses(id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={id}
                name={name}
                amount={amount}
                max={max}
                onAddExpeseClick={() => openAddExpenseModal(id)}
                onViewExpenseClick={() => setViewExpensesModalId(id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpeseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpensesModalId(UNCAREGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={AddExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalId}
        handleClose={() => setViewExpensesModalId()}
      />
    </>
  );
}

export default App;
