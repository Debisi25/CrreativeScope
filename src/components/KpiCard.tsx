type Props = { label: string; value: string | number };

export default function KpiCard({ label, value }: Props) {
  return (
    <div className="card">
      <small className="muted">{label}</small>
      <b className="kpi-value">{value}</b>
    </div>
  );
}
