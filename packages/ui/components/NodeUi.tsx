import { setNodeState, SNode } from "@statistx/core";
import { x } from "@xstyled/styled-components";
import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { useStatistxContext } from "utils/useStatistx";

export const NodeUi: FC<NodeProps<SNode>> = memo(({ data }) => {
  const { instance, execOp } = useStatistxContext();
  const resolver = instance.current.resolvers.get(data.type);

  return (
    <x.div p={2} borderWidth={2} bg="white">
      <div>
        {resolver?.label}
      </div>

      {resolver?.render && (
        <resolver.render
          props={data.props}
          state={data.state}
          setState={s => execOp(setNodeState(data.id, typeof s === "function" ? s(data.state) : s))}
        />
      )}

      <x.div pt={2}>
        <x.div mx={-3} display="flex">
          <x.div flexGrow={1}>
            {Object.keys(data.props.value).map((k) => (
              <x.div
                key={k}
                py={2}
                display="flex"
                alignItems="center"
                flexDirection="row-reverse"
                fontSize="xs"
                fontFamily="mono"
              >
                <x.div w="100%" px={2}>{k}</x.div>
                <Handle
                  id={k}
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
            {data.result.value && Object.keys(data.result.value).map((k) => (
              <x.div
                key={k}
                py={2}
                display="flex"
                minH={35}
                alignItems="center"
                flexDirection="row"
                fontSize="xs"
                fontFamily="mono"
              >
                <x.div w="100%" px={2}>{k}</x.div>
                <Handle
                  id={k}
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
