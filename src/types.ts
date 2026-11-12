export type ProjectStatus = "active" | "at risk" | "awaiting approval";
export type ChangeStatus = "pending" | "approved" | "declined";

export type Project = {
  id: number;
  name: string;
  client: string;
  value: number;
  progress: number; // 0 to 100
  status: ProjectStatus;
  deadline: string;
  revisionsUsed: number;
  revisionsMax: number;
  agreed: boolean;
  included: string[];
  excluded: string[];
};

export type ChangeRequest = {
  id: number;
  projectId: number;
  description: string;
  cost: number;
  extraDays: number;
  status: ChangeStatus;
};
