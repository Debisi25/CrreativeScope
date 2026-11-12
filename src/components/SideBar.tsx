import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/projects", label: "Projects", end: false },
];

export default function Sidebar() {
  return (
    <nav className="side">
      <div className="logo">CreativeScope</div>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
