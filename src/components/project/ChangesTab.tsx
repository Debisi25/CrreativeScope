import { useState } from "react";
import type { SubmitEvent } from "react";
import StatusChip from "../StatusChip";
import { useStore } from "../../context/StoreContext";
import { formatNaira } from "../../data/mock";
import type { Project } from "../../types";

export default function ChangesTab({ project }: { project: Project }) {
  const { changes, addChange } = useStore();
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [days, setDays] = useState("");
  const [error, setError] = useState("");

  const mine = changes.filter((c) => c.projectId === project.id);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser from reloading the page
    if (!description.trim() || !Number(cost)) {
      setError("Add a description and an extra cost.");
      return;
    }
    addChange({
      projectId: project.id,
      description: description.trim(),
      cost: Number(cost),
      extraDays: Number(days) || 0,
    });
    setDescription("");
    setCost("");
    setDays("");
    setError("");
  }

  return (
    <div className="two">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Request extra work</h2>

        <label htmlFor="desc">What does the client want added?</label>
        <input
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Add a business card design"
        />

        <label htmlFor="cost">Extra cost (₦)</label>
        <input
          id="cost"
          type="number"
          inputMode="numeric"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="150000"
        />

        <label htmlFor="days">Extra days</label>
        <input
          id="days"
          type="number"
          inputMode="numeric"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="3"
        />

        {error && (
          <p className="err" role="alert">
            {error}
          </p>
        )}
        <button className="btn" type="submit">
          Send change request
        </button>
      </form>

      <div className="card">
        <h2>Change requests</h2>
        {mine.length === 0 && (
          <p className="sub">
            No change requests yet. Anything outside the agreement starts here.
          </p>
        )}
        {mine.map((c) => (
          <div className="row" key={c.id}>
            <span>
              {c.description}
              <br />
              <small>
                {formatNaira(c.cost)} and {c.extraDays} extra days
              </small>
            </span>
            <StatusChip status={c.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
