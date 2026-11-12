import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialChanges, initialProjects, addDays } from "../data/mock";
import type { ChangeRequest, ChangeStatus, Project } from "../types";

// Mounted in main.tsx, wraps the whole app

type Store = {
  projects: Project[];
  changes: ChangeRequest[];
  addChange: (c: Omit<ChangeRequest, "id" | "status">) => void;
  setChangeStatus: (id: number, status: ChangeStatus) => void;
  approvedCost: (projectId?: number) => number;
  approveAgreement: (projectId: number) => void;
  deadlineOf: (p: Project) => string;
  addProject: (
    p: Pick<
      Project,
      | "name"
      | "client"
      | "value"
      | "deadline"
      | "revisionsMax"
      | "included"
      | "excluded"
    >,
  ) => number;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [changes, setChanges] = useState<ChangeRequest[]>(initialChanges);
  // Starts from the sample data in mock.ts
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject: Store["addProject"] = (p) => {
    const id = Math.max(0, ...projects.map((x) => x.id)) + 1;
    setProjects((prev) => [
      ...prev,
      {
        ...p,
        id,
        progress: 0,
        status: "awaiting approval",
        agreed: false,
        revisionsUsed: 0,
      },
    ]);
    return id;
  };

  const approveAgreement: Store["approveAgreement"] = (projectId) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              agreed: true,
              status: p.status === "awaiting approval" ? "active" : p.status,
            }
          : p,
      ),
    );

  const addChange: Store["addChange"] = (c) =>
    setChanges((prev) => [
      ...prev,
      { ...c, id: Date.now(), status: "pending" },
    ]);

  const setChangeStatus: Store["setChangeStatus"] = (id, status) =>
    setChanges((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));

  const approvedCost: Store["approvedCost"] = (projectId) =>
    changes
      .filter(
        (c) =>
          c.status === "approved" &&
          (projectId === undefined || c.projectId === projectId),
      )
      .reduce((sum, c) => sum + c.cost, 0);
  const deadlineOf: Store["deadlineOf"] = (p) =>
    addDays(
      p.deadline,
      changes
        .filter((c) => c.status === "approved" && c.projectId === p.id)
        .reduce((sum, c) => sum + c.extraDays, 0),
    );

  return (
    <StoreContext.Provider
      value={{
        projects,
        changes,
        addChange,
        setChangeStatus,
        approvedCost,
        addProject,
        approveAgreement,
        deadlineOf,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "useStore must be used inside <StoreProvider> (see main.tsx)",
    );
  return ctx;
}
