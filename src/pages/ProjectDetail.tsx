import { useState } from "react";
import { useParams } from "react-router-dom";
import AgreementTab from "../components/project/AgreementTab";
import ChangesTab from "../components/project/ChangesTab";
import PaymentsTab from "../components/project/PaymentsTab";
import StatusChip from "../components/StatusChip";
import { useStore } from "../context/StoreContext";
// ...

type Tab = "agreement" | "changes" | "payments";
const tabs: Tab[] = ["agreement", "changes", "payments"];

export default function ProjectDetail() {
  const { projects } = useStore();
  const { id } = useParams();
  const [tab, setTab] = useState<Tab>("agreement");
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <p>Project not found.</p>;

  return (
    <>
      <div className="top">
        <div>
          <h1>{project.name}</h1>
          <p className="sub">{project.client}</p>
        </div>
        <StatusChip status={project.status} />
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={t === tab ? "on" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "agreement" && <AgreementTab project={project} />}
      {tab === "changes" && <ChangesTab project={project} />}
      {tab === "payments" && <PaymentsTab project={project} />}
    </>
  );
}
