import Link from "next/link";
import {
  CalendarDaysIcon,
  CalendarIcon,
  InboxIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import clsx from "clsx";

const defaultLinks = [
  {
    label: "Inbox",
    href: "/inbox",
    icon: <InboxIcon className="h-5 w-5 text-blue-500" />,
  },
  {
    label: "Today",
    href: "/today",
    icon: <CalendarIcon className="h-5 w-5 text-green-500" />,
  },
  {
    label: "Upcoming",
    href: "/upcoming",
    icon: <CalendarDaysIcon className="h-5 w-5 text-purple-500" />,
  },
  {
    label: "Filters & Labels",
    href: "/filters-labels",
    icon: <Squares2X2Icon className="h-5 w-5 text-orange-500" />,
  },
];

const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const router = useRouter();
  const utils = trpc.useContext();
  const { data: projects } = trpc.projects.list.useQuery(undefined, {
    onSuccess: (projects) => {
      projects.forEach((project) => {
        utils.projects.get.prefetch({ projectId: project.id });
      });
    },
  });

  return (
    <div className="h-screen w-[305px] bg-neutral-800 px-4 py-8">
      <ul className="mb-4">
        {defaultLinks.map((link) => (
          <li key={link.label}>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-md p-2 text-sm hover:bg-neutral-600",
                router.asPath === link.href && "bg-neutral-600"
              )}
              href={link.href}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ProjectModal
        isOpen={projectModalOpen}
        close={() => setProjectModalOpen(false)}
      />
      <div className="flex items-center rounded-md p-2 text-sm font-semibold text-neutral-100/50 hover:bg-neutral-600">
        <Link className="flex-grow" href="/projects/active">
          Projects
        </Link>
        <button onClick={() => setProjectModalOpen(true)}>
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <ul>
        {projects &&
          projects.map((project) => (
            <li key={project.id}>
              <Link
                className={clsx(
                  "block rounded-md p-2 text-sm hover:bg-neutral-600",
                  router.asPath === `/project/${project.id}` && "bg-neutral-600"
                )}
                href={`/project/${project.id}`}
              >
                {project.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
