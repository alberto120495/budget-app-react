import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils/utils";
function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpeseClick,
  hideButtons,
  onViewExpenseClick,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-25");
  } else if (gray) {
    classNames.push("bg-light");
  }

  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };

  console.log(classNames);
  return (
    <div>
      <Card className={classNames.join(" ")}>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(amount)}
              {max && (
                <span className="text-muted fs-6 ms-1">
                  / {currencyFormatter.format(max)}
                </span>
              )}
            </div>
          </Card.Title>
          {max && (
            <ProgressBar
              className="rounded-pill"
              variant={getProgressBarVariant(amount, max)}
              min={0}
              max={max}
              now={amount}
            />
          )}
          {!hideButtons && (
            <Stack direction="horizontal" gap="2" className="mt-3">
              <Button
                variant="outline-danger"
                className="ms-auto"
                onClick={onAddExpeseClick}
              >
                Agregar Gasto
              </Button>
              <Button variant="outline-secondary" onClick={onViewExpenseClick}>
                Ver Gastos
              </Button>
            </Stack>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BudgetCard;
