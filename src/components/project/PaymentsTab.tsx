import { useStore } from "../../context/StoreContext";
import { formatNaira } from "../../data/mock";
import type { Project } from "../../types";

export default function PaymentsTab({ project }: { project: Project }) {
  const { approvedCost } = useStore();
  const extra = approvedCost(project.id);

  return (
    <div className="card">
      <h2>Payment milestones</h2>
      <div className="row">
        <span>Upfront (50%)</span>
        <span>
          {formatNaira(project.value / 2)} <span className="chip ok">paid</span>
        </span>
      </div>
      <div className="row">
        <span>On delivery (50%)</span>
        <span>
          {formatNaira(project.value / 2)}{" "}
          <span className="chip warn">due</span>
        </span>
      </div>
      {extra > 0 && (
        <div className="row">
          <span>Approved extra work</span>
          <span>
            {formatNaira(extra)} <span className="chip warn">due</span>
          </span>
        </div>
      )}
      <div className="row">
        <span>Project total</span>
        <b>{formatNaira(project.value + extra)}</b>
      </div>
    </div>
  );
}
