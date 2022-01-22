import { SNode } from "@statistx/core";
import { x } from "@xstyled/styled-components";
import { FC } from "react";

interface Props {
  node?: SNode;
}

export const Preview: FC<Props> = ({ node }) => {
  return (
    <x.div>
      <x.h2 fontSize="xl" mt={4}>Result</x.h2>
      {node && Object.entries(node.result.value).map(([k, v], i) => (
        <x.div key={i} display="flex" justifyContent="space-between" py={4}>
          <x.div display="flex" justifyContent="space-between">
            <x.div title={k}>{k}</x.div>
            {/* <x.div>{s.type.type}</x.div> */}
          </x.div>
          <x.pre pb={4}>
            {JSON.stringify(v, null, 2)}
          </x.pre>
        </x.div>
      ))}
    </x.div>

  );
};
