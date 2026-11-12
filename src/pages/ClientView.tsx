import { Link, useParams } from "react-router-dom";
import StatusChip from "../components/StatusChip";
import { useStore } from "../context/StoreContext";
import { formatNaira } from "../data/mock";

export default function ClientView() {
  const { id } = useParams();
  const {
    changes,
    setChangeStatus,
    approvedCost,
    approveAgreement,
    projects,
    deadlineOf,
  } = useStore();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <main className="client">
        <p>This link doesn’t match a project.</p>
      </main>
    );
  }

  const mine = changes.filter((c) => c.projectId === project.id);
  const pending = mine.filter((c) => c.status === "pending");
  const decided = mine.filter((c) => c.status !== "pending");
  const extra = approvedCost(project.id);
  const total = project.value + extra;

  return (
    <main className="client">
      <p className="sub">Aura Creative Studio sent you an agreement</p>
      <h1>{project.name}</h1>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Agreement</h2>
        <div className="row">
          <span>Price</span>
          <span>{formatNaira(total)}</span>
        </div>
        <div className="row">
          <span>Deadline</span>
          <span>{deadlineOf(project)}</span>
        </div>
        <div className="row">
          <span>Revision rounds</span>
          <span>{project.revisionsMax}</span>
        </div>

        <h2 style={{ marginTop: 14 }}>What’s included</h2>
        <ul>
          {project.included.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        {project.excluded.length > 0 && (
          <>
            <h2 style={{ marginTop: 14 }}>What’s not included</h2>
            <ul>
              {project.excluded.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </>
        )}
        {project.agreed ? (
          <p>
            <StatusChip status="approved" /> You approved this agreement.
          </p>
        ) : (
          <button
            className="btn full"
            onClick={() => approveAgreement(project.id)}
          >
            Approve agreement
          </button>
        )}
      </div>

      {pending.map((c) => (
        <div className="card" key={c.id}>
          <h2>Extra work requested: {c.description}</h2>
          <div className="cmp">
            <div>
              <small className="muted">Original</small>
              <br />
              <b>{formatNaira(total)}</b>
              <br />
              {project.deadline}
            </div>
            <div className="new">
              <small className="muted">With this change</small>
              <br />
              <b>{formatNaira(total + c.cost)}</b>
              <br />
              {project.deadline} plus {c.extraDays} days
            </div>
          </div>
          <div className="actions">
            <button
              className="btn"
              onClick={() => setChangeStatus(c.id, "approved")}
            >
              Approve extra work
            </button>
            <button
              className="btn ghost"
              onClick={() => setChangeStatus(c.id, "declined")}
            >
              Decline
            </button>
          </div>
        </div>
      ))}

      {decided.length > 0 && (
        <div className="card">
          <h2>Earlier decisions</h2>
          {decided.map((c) => (
            <div className="row" key={c.id}>
              <span>
                {c.description} ({formatNaira(c.cost)})
              </span>
              <StatusChip status={c.status} />
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h2>Payments</h2>
        <div className="row">
          <span>Upfront (50%)</span>
          <span>{formatNaira(project.value / 2)}</span>
        </div>
        <div className="row">
          <span>On delivery (50%)</span>
          <span>{formatNaira(project.value / 2)}</span>
        </div>
        {extra > 0 && (
          <div className="row">
            <span>Approved extra work</span>
            <span>{formatNaira(extra)}</span>
          </div>
        )}
        <div className="row">
          <span>Project total</span>
          <b>{formatNaira(total)}</b>
        </div>
      </div>

      <Link to={`/projects/${project.id}`}>Back to creative dashboard</Link>
    </main>
  );
}
