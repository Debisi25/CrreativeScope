import type { ChangeRequest, Project } from "../types";

const sampleIncluded = [
  "Logo and 2 alternate marks",
  "Colour palette and type guide",
  "Brand guidelines PDF",
];
const sampleExcluded = ["Packaging design", "Social media assets"];
export const initialProjects: Project[] = [
  {
    id: 1,
    name: "Brand identity refresh",
    client: "Aura Studio",
    value: 2850000,
    progress: 65,
    status: "awaiting approval",
    deadline: "14 Nov",
    revisionsUsed: 2,
    revisionsMax: 3,
    agreed: false,
    included: sampleIncluded,
    excluded: sampleExcluded,
  },
  {
    id: 2,
    name: "Campaign photoshoot",
    client: "Lumen Foods",
    value: 1200000,
    progress: 30,
    status: "at risk",
    deadline: "22 Nov",
    revisionsUsed: 3,
    revisionsMax: 3,
    agreed: true,
    included: sampleIncluded,
    excluded: sampleExcluded,
  },
  {
    id: 3,
    name: "Website redesign",
    client: "Kente & Co",
    value: 3800000,
    progress: 45,
    status: "active",
    deadline: "5 Dec",
    revisionsUsed: 1,
    revisionsMax: 3,
    agreed: true,
    included: sampleIncluded,
    excluded: sampleExcluded,
  },
  {
    id: 4,
    name: "Product film",
    client: "Naija Wears",
    value: 2300000,
    progress: 80,
    status: "awaiting approval",
    deadline: "18 Nov",
    revisionsUsed: 2,
    revisionsMax: 2,
    agreed: false,
    included: sampleIncluded,
    excluded: sampleExcluded,
  },
  {
    id: 5,
    name: "Album artwork",
    client: "Tobi Beats",
    value: 900000,
    progress: 15,
    status: "active",
    deadline: "30 Nov",
    revisionsUsed: 0,
    revisionsMax: 2,
    agreed: true,
    included: sampleIncluded,
    excluded: sampleExcluded,
  },
];

export const initialChanges: ChangeRequest[] = [
  {
    id: 1,
    projectId: 1,
    description: "Add 3 social media banner sizes",
    cost: 150000,
    extraDays: 3,
    status: "pending",
  },
];

export const formatNaira = (n: number): string =>
  "₦" + n.toLocaleString("en-NG");

const DAY = 86_400_000;
export const daysFromNow = (n: number): string =>
  new Date(Date.now() + n * DAY).toISOString().slice(0, 10);
export const addDays = (iso: string, n: number): string =>
  new Date(new Date(iso).getTime() + n * DAY).toISOString().slice(0, 10);
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
