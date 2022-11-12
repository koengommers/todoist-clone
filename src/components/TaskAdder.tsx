import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "./Button";
import { trpc } from "../utils/trpc";
import { Popover } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export const schema = z.object({
  name: z.string().min(1).max(180),
  description: z.string().nullable(),
});
type FormValues = z.infer<typeof schema>;

type TaskContext = {
  projectId: string;
};
const TaskAdder = ({ context }: { context: TaskContext }) => {
  const {
    register,
    formState: { isValid },
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const utils = trpc.useContext();
  const mutation = trpc.tasks.add.useMutation({
    onSuccess: (data) => {
      utils.projects.get.setData(
        (previousData) =>
          previousData && {
            ...previousData,
            tasks: [...previousData.tasks, data],
          },
        { projectId: context.projectId }
      );
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({ ...context, ...data });
  };

  return (
    <Popover>
      {({ open, close }) => (
        <>
          {!open && (
            <Popover.Button className="group flex w-full items-center gap-2 py-3 text-sm text-white/40 hover:text-red-500">
              <PlusIcon className="h-5 w-5 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white" />{" "}
              Add task
            </Popover.Button>
          )}
          <Popover.Panel
            as="form"
            focus={true}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-1 flex flex-col gap-3 rounded-md border border-white/10 p-2 focus-within:border-white/20">
              <input
                placeholder="Task name"
                className="bg-transparent text-sm outline-none placeholder:text-white/40"
                {...register("name")}
              />
              <input
                placeholder="Description"
                className="bg-transparent pb-2 text-xs outline-none placeholder:text-white/30"
                {...register("description")}
              />
            </div>
            <div className="flex flex-row-reverse gap-2 py-3">
              <Button variant="primary" disabled={!isValid}>
                Add task
              </Button>
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default TaskAdder;
