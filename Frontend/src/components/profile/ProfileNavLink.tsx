import { NavLink as RouterNavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import cn from "../../lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const ProfileNavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    { className, activeClassName, pendingClassName, to, end, ...props },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        end={end}
        className={({ isActive, isPending }) =>
          cn(
            className,
            isActive && activeClassName, // Only apply activeClassName if the link is active
            isPending && pendingClassName // Apply pendingClassName if the link is in a pending state
          )
        }
        {...props}
      />
    );
  }
);

ProfileNavLink.displayName = "NavLink";

export default ProfileNavLink;
