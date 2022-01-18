import { SNode } from "@statistx/core";
import { x } from "@xstyled/styled-components";
import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { useStatistxContext } from "../utils/useStatistx";

export const NodeUi: FC<NodeProps<SNode>> = memo(({ data }) => {
  const { instance } = useStatistxContext();
  return (
    <x.div p={2} borderWidth={2}>
      {instance.current.resolvers.get(data.type)?.label}
      <x.div pt={2}>
        <x.div mx={-3} display="flex">
          <x.div flexGrow={1}>
            {data.state.map((n, i) => (
              <x.div
                key={i}
                py={2}
                display="flex"
                alignItems="center"
                flexDirection="row-reverse"
                fontSize="xs"
                fontFamily="mono"
              >
                <x.div w="100%" px={2}>{n.type.label}</x.div>
                <Handle
                  id={n.id}
                  type="target"
                  position={Position.Left}
                  style={{
                    background: "#555",
                    position: "static"
                  }}
                  isConnectable
                />
              </x.div>
            ))}
          </x.div>
          <div>
            {data.result?.map((r, i) => (
              <x.div
                key={i}
                py={2}
                display="flex"
                minH={35}
                alignItems="center"
                flexDirection="row"
                fontSize="xs"
                fontFamily="mono"
              >
                <x.div w="100%" px={2}>{r.type.label}</x.div>
                <Handle
                  id={r.id}
                  type="source"
                  position={Position.Left}
                  style={{
                    background: "#555",
                    position: "static"
                  }}
                  isConnectable
                />
              </x.div>
            ))}
          </div>
        </x.div>
      </x.div>
    </x.div>
  );
});
