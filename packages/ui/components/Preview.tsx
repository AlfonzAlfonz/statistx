import { SNode } from "@statistx/core";
import { x } from "@xstyled/styled-components";
import { FC } from "react";

interface Props {
  node?: SNode;
}

export const Preview: FC<Props> = ({ node }) => {
  return (
    <x.div>
      <x.h2 fontSize="xl">State</x.h2>
      {node?.state.map((s, i) => (
        <x.div key={i} borderTopWidth={1} mt={2} pt={1}>
          <x.div display="flex" justifyContent="space-between">
            <x.div title={s.type.title}>{s.type.label}</x.div>
            <x.div>{s.type.type}</x.div>
          </x.div>
          <x.pre pb={4}>
            {JSON.stringify(s.value, null, 2)}
          </x.pre>
        </x.div>
      ))}
      <x.h2 fontSize="xl" mt={4}>Result</x.h2>
      {node?.result.map((s, i) => (
        <x.div key={i}>
          <x.div display="flex" justifyContent="space-between">
            <x.div title={s.type.title}>{s.type.label}</x.div>
            <x.div>{s.type.type}</x.div>
          </x.div>
          <x.pre pb={4}>
            {JSON.stringify(s.value, null, 2)}
          </x.pre>
        </x.div>
      ))}
    </x.div>

  );
};
