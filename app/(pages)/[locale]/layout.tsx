import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3 pt-20 h-dvh">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
};

export default Layout;
