import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { useSession } from "next-auth/react";

type ButtonProps = React.ComponentProps<"button"> & {
  href?: undefined;
};

type ButtonOrLinkProps = (ButtonProps | LinkProps) & {
  className?: string;
  children?: React.ReactNode;
};
const ButtonOrLink = (props: ButtonOrLinkProps) => {
  if (props.href !== undefined) {
    return <Link {...props} />;
  }
  return <button {...props} />;
};

type IconButtonProps = ButtonOrLinkProps & {
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
};
const IconButton = ({ Icon, ...props }: IconButtonProps) => (
  <ButtonOrLink className="rounded p-1 hover:bg-neutral-500" {...props}>
    <Icon className="h-6 w-6 text-white/80" />
  </ButtonOrLink>
);

const ProfileButton = () => {
  const session = useSession();

  if (session.status !== "authenticated" || !session.data?.user?.image) {
    return <div className="h-7 w-7 mx-3 rounded-full bg-neutral-500"></div>;
  }

  return <img className="h-7 w-7 mx-3 rounded-full" src={session.data.user.image} />
};

const Header = () => {
  return (
    <div className="flex h-[44px] flex-shrink-0 items-center justify-between bg-neutral-700 px-4 shadow">
      <div className="flex items-center gap-1">
        <IconButton type="button" Icon={Bars3Icon} />
        <IconButton type="button" Icon={HomeIcon} />
      </div>
      <div className="flex items-center gap-1">
        <IconButton type="button" Icon={PlusIcon} />
        <IconButton type="button" Icon={BellIcon} />
        <ProfileButton />
      </div>
    </div>
  );
};

export default Header;
