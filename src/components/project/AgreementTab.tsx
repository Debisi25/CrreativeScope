import { Link } from "react-router-dom";
import { useState } from "react";
import StatusChip from "../StatusChip";
import { useStore } from "../../context/StoreContext";
import { formatNaira } from "../../data/mock";
import type { Project } from "../../types";

export default function AgreementTab({ project }: { project: Project }) {
  const { approvedCost, deadlineOf } = useStore();
  const total = project.value + approvedCost(project.id);
  const used = (project.revisionsUsed / project.revisionsMax) * 100;
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}/client/${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url); // fallback if the browser blocks clipboard access
    }
  }

  return (
    <div className="two">
      <div className="card">
        <h2>Terms</h2>
        <div className="row">
          <span>Client</span>
          <span>{project.client}</span>
        </div>
        <div className="row">
          <span>Price</span>
          <span>{formatNaira(total)}</span>
        </div>
        <div className="row">
          <span>Deadline</span>
          <span>{deadlineOf(project)}</span>
        </div>
        <div className="row">
          <span>Revisions used</span>
          <span>
            {project.revisionsUsed} of {project.revisionsMax}
          </span>
        </div>
        <div className="bar" style={{ marginTop: 10 }}>
          <i style={{ width: `${used}%` }} />
        </div>

        <p style={{ marginTop: 14 }}>
          {project.agreed ? (
            <>
              <StatusChip status="approved" /> Locked after client approval
            </>
          ) : (
            <>
              <StatusChip status="pending" /> Sent, waiting for client
            </>
          )}
        </p>
        <div className="actions">
          <Link to={`/client/${project.id}`} className="btn">
            Open client view
          </Link>
          <button className="btn ghost" onClick={copyLink}>
            {copied ? "Link copied" : "Copy client link"}
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Included</h2>
        <ul>
          {project.included.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <h2 style={{ marginTop: 16 }}>Not included</h2>
        <ul>
          {project.excluded.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
          <li>Revisions beyond {project.revisionsMax} rounds</li>
        </ul>
      </div>
    </div>
  );
}
