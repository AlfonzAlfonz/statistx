import { x } from "@xstyled/styled-components";
import { FC, ReactNode } from "react";

interface Props {
  preview?: ReactNode;
}

export const Layout: FC<Props> = ({ children, preview }) => {
  return (
    <x.div display="flex">
      {children}
      <x.div borderLeftWidth={1} minWidth="20vw" p={4}>
        {preview}
      </x.div>
    </x.div>
  );
};
