import type { ChangeStatus, ProjectStatus } from "../types";

const tone: Record<ProjectStatus | ChangeStatus, string> = {
  active: "ok",
  approved: "ok",
  "at risk": "bad",
  declined: "bad",
  "awaiting approval": "warn",
  pending: "warn",
};

export default function StatusChip({
  status,
}: {
  status: ProjectStatus | ChangeStatus;
}) {
  return <span className={`chip ${tone[status]}`}>{status}</span>;
}
