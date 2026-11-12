import { Link, useNavigate } from "react-router-dom";
import KpiCard from "../components/KpiCard";
import StatusChip from "../components/StatusChip";
import { useStore } from "../context/StoreContext";
import { formatNaira } from "../data/mock";
import RevenueChart from "../components/RevenueCharts";

export default function Overview() {
  const { projects, changes, approvedCost, deadlineOf } = useStore();
  const navigate = useNavigate();

  const pending = changes.filter((c) => c.status === "pending");
  const totalValue =
    projects.reduce((sum, p) => sum + p.value, 0) + approvedCost();
  const extraRevenue = changes
    .filter((c) => c.status !== "declined")
    .reduce((sum, c) => sum + c.cost, 0);
  const atRisk = projects.filter((p) => p.status === "at risk");

  return (
    <>
      <div className="top">
        <div>
          <h1>Good morning, Alex</h1>
          <p className="sub">
            Here’s what’s happening across your creative business.
          </p>
        </div>
        <button className="btn" onClick={() => navigate("/projects/new")}>
          New project
        </button>
      </div>

      <div className="kpis">
        <KpiCard label="Active projects" value={projects.length} />
        <KpiCard label="Total contract value" value={formatNaira(totalValue)} />
        <KpiCard
          label="Additional revenue identified"
          value={formatNaira(extraRevenue)}
        />
        <KpiCard label="Projects at risk" value={atRisk.length} />
      </div>

      <div className="card">
        {/* Needs your Attention!! */}
        <h2>Needs your attention</h2>
        <ul>
          <h2 className="pVH">PENDING PROJECTS</h2>
          {pending.map((c) => (
            <li key={c.id}>
              <Link to={`/projects/${c.projectId}`}>
                Change request waiting: {c.description} ({formatNaira(c.cost)})
              </Link>
            </li>
          ))}
          <h2 className="pVH">Projects awaiting approval</h2>
          {projects
            .filter((p) => !p.agreed)
            .map((p) => (
              <li key={p.id}>
                {p.client} hasn’t approved the agreement for {p.name} yet
              </li>
            ))}
          <h2 className="pVH">Projects at risk</h2>
          {atRisk.map((p) => (
            <li key={p.id}>{p.name} has used all its revisions</li>
          ))}
        </ul>
      </div>

      <RevenueChart />

      <div className="card">
        <h2>Project performance</h2>
        <div className="wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Value</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  tabIndex={0}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate(`/projects/${p.id}`)
                  }
                >
                  <td>{p.name}</td>
                  <td>{p.client}</td>
                  <td>{formatNaira(p.value + approvedCost(p.id))}</td>
                  <td>
                    <div className="bar">
                      <i style={{ width: `${p.progress}%` }} />
                    </div>
                  </td>
                  <td>
                    <StatusChip status={p.status} />
                  </td>
                  <td>{deadlineOf(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
