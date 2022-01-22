import { addNode, addRelation, addResolver, mathResolver, moveNode, numberResolver } from "@statistx/core";
import { x } from "@xstyled/styled-components";
import { Layout } from "components/Layout";
import { NodeUi } from "components/NodeUi";
import { Preview } from "components/Preview";
import { FC, useEffect } from "react";
import ReactFlow from "react-flow-renderer";
import { StatistxContext, useStatistx } from "utils/useStatistx";

const Index: FC = () => {
  const s = useStatistx();

  useEffect(() => {
    (async () => {
      s.transaction()
        .execOp(addResolver(numberResolver()))
        .execOp(addResolver(mathResolver()))
        .commit();

      s.transaction()
        .execOp(addNode("number"))
        .execOp(addNode("number"))
        .execOp(addNode("number"))
        .execOp(addNode("math"))
        .commit();
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StatistxContext.Provider value={s}>
      <Layout preview={<Preview node={s.selectedNode} />}>
        <x.div h="100vh" flexGrow={1}>
          <ReactFlow
            elements={s.elements}
            nodeTypes={{ generic: NodeUi }}
            onConnect={e => {
              s.execOp(addRelation([[e.source!, e.sourceHandle!], [e.target!, e.targetHandle!]]));
            }}
            onNodeDoubleClick={(e, n) => {
              s.selectNode(s.instance.current.nodes.get(n.id));
            }}
            onNodeDragStop={(_, n) => {
              s.execOp(moveNode(n.id, n.position.x, n.position.y));
            }}
          />
        </x.div>
      </Layout>
    </StatistxContext.Provider>
  );
};

export default Index;
