import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEditor from "../components/ListEditor";
import { useStore } from "../context/StoreContext";
import { formatNaira } from "../data/mock";

const steps = ["Client", "Deliverables", "Price and dates", "Review"];
const today = () => new Date().toISOString().slice(0, 10);

type Draft = {
  name: string;
  client: string;
  included: string[];
  excluded: string[];
  value: string;
  deadline: string;
  revisionsMax: string;
};

export default function AgreementBuilder() {
  const { addProject } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Draft>({
    name: "",
    client: "",
    included: [],
    excluded: [],
    value: "",
    deadline: "",
    revisionsMax: "3",
  });

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  function validate(): string {
    if (step === 0 && (!draft.name.trim() || !draft.client.trim()))
      return "Add a project name and a client.";
    if (step === 1 && draft.included.length === 0)
      return "List at least one thing that’s included.";
    if (step === 2) {
      if (!(Number(draft.value) > 0)) return "Add a price above zero.";
      if (!draft.deadline || draft.deadline < today())
        return "Pick a deadline that isn’t in the past.";
      if (!(Number(draft.revisionsMax) >= 1))
        return "Allow at least one revision round.";
    }
    return "";
  }

  function next() {
    const err = validate();
    setError(err);
    if (!err) setStep(step + 1);
  }

  function send() {
    const id = addProject({
      name: draft.name.trim(),
      client: draft.client.trim(),
      value: Number(draft.value),
      deadline: draft.deadline,
      revisionsMax: Number(draft.revisionsMax),
      included: draft.included,
      excluded: draft.excluded,
    });
    navigate(`/projects/${id}`);
  }

  return (
    <>
      <h1>New project</h1>
      <p className="sub">Define what’s agreed before any work starts.</p>

      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? "on" : i < step ? "done" : ""}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="card">
        {step === 0 && (
          <>
            <label htmlFor="pname">Project name</label>
            <input
              id="pname"
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Brand identity refresh"
            />
            <label htmlFor="pclient">Client</label>
            <input
              id="pclient"
              value={draft.client}
              onChange={(e) => set("client", e.target.value)}
              placeholder="e.g. Aura Studio"
            />
          </>
        )}

        {step === 1 && (
          <>
            <ListEditor
              label="What’s included"
              placeholder="e.g. Logo and 2 alternate marks"
              items={draft.included}
              onChange={(v) => set("included", v)}
            />
            <ListEditor
              label="What’s not included"
              placeholder="e.g. Packaging design"
              items={draft.excluded}
              onChange={(v) => set("excluded", v)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <label htmlFor="pvalue">Price (₦)</label>
            <input
              id="pvalue"
              type="number"
              inputMode="numeric"
              value={draft.value}
              onChange={(e) => set("value", e.target.value)}
              placeholder="2500000"
            />
            <label htmlFor="pdate">Deadline</label>
            <input
              id="pdate"
              type="date"
              min={today()}
              value={draft.deadline}
              onChange={(e) => set("deadline", e.target.value)}
            />
            <label htmlFor="prev">Revision rounds included</label>
            <input
              id="prev"
              type="number"
              inputMode="numeric"
              value={draft.revisionsMax}
              onChange={(e) => set("revisionsMax", e.target.value)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2>{draft.name}</h2>
            <div className="row">
              <span>Client</span>
              <span>{draft.client}</span>
            </div>
            <div className="row">
              <span>Price</span>
              <span>{formatNaira(Number(draft.value))}</span>
            </div>
            <div className="row">
              <span>Deadline</span>
              <span>{draft.deadline}</span>
            </div>
            <div className="row">
              <span>Revision rounds</span>
              <span>{draft.revisionsMax}</span>
            </div>
            <h2 style={{ marginTop: 14 }}>Included</h2>
            <ul>
              {draft.included.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
            {draft.excluded.length > 0 && (
              <>
                <h2 style={{ marginTop: 14 }}>Not included</h2>
                <ul>
                  {draft.excluded.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {error && (
          <p className="err" role="alert">
            {error}
          </p>
        )}

        <div className="actions" style={{ marginTop: 16 }}>
          {step > 0 && (
            <button
              className="btn ghost"
              onClick={() => {
                setError("");
                setStep(step - 1);
              }}
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button className="btn" onClick={next}>
              Next
            </button>
          ) : (
            <button className="btn" onClick={send}>
              Create and send to client
            </button>
          )}
        </div>
      </div>
    </>
  );
}
