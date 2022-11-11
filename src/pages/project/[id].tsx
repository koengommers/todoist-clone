import Head from "next/head";
import { useRouter } from "next/router";
import TaskAdder from "../../components/TaskAdder";
import { trpc } from "../../utils/trpc";

const ProjectPage = ({ projectId }: { projectId: string }) => {
  const { data: project } = trpc.projects.get.useQuery({ projectId });

  if (!project)
    return (
      <>
        <Head>
          <title>Todoist</title>
        </Head>
      </>
    );

  return (
    <>
      <Head>
        <title>{project.name}: Todoist</title>
      </Head>
      <h1 className="mb-4 text-2xl font-semibold">{project && project.name}</h1>
      {project.tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
      <TaskAdder context={{ projectId: project.id }} />
    </>
  );
};

const ProjectPageWrapper = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") return null;

  return <ProjectPage projectId={id} />;
};

export default ProjectPageWrapper;
