import { useStore } from "../context/StoreContext";
import { formatNaira } from "../data/mock";

export default function RevenueChart() {
  const { projects, approvedCost } = useStore();
  const rows = projects.map((p) => ({
    id: p.id,
    name: p.name,
    base: p.value,
    extra: approvedCost(p.id),
  }));
  const max = Math.max(...rows.map((r) => r.base + r.extra));

  return (
    <div className="card">
      <h2>Revenue protected</h2>
      <p className="sub" style={{ marginTop: 0 }}>
        Original contract value and approved extra work, per project.
      </p>
      <div className="legend">
        <span>
          <i className="dot base" /> Original
        </span>
        <span>
          <i className="dot extra" /> Approved extra work
        </span>
      </div>

      {rows.map((r) => (
        <div className="hrow" key={r.id}>
          <span className="hname">{r.name}</span>
          <div
            className="htrack"
            role="img"
            aria-label={`${r.name}: ${formatNaira(r.base)} original, ${formatNaira(r.extra)} extra work`}
          >
            <i
              className="seg base"
              style={{ width: `${(r.base / max) * 100}%` }}
            />
            <i
              className="seg extra"
              style={{ width: `${(r.extra / max) * 100}%` }}
            />
          </div>
          <span className="hval">{formatNaira(r.base + r.extra)}</span>
        </div>
      ))}
    </div>
  );
}
