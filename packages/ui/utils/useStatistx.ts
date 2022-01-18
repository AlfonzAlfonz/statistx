import { Operation, SNode, StatistxCore } from "@statistx/core";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Edge, FlowElement } from "react-flow-renderer";

export type StatistxContext = ReturnType<typeof useStatistx>;

export const useStatistx = () => {
  const statistx = useRef<StatistxCore>(null!);
  const [elements, setElements] = useState<FlowElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNode, selectNode] = useState<SNode>();

  const flushToState = useCallback(() => {
    setElements([...getElements(statistx.current), ...getEdges(statistx.current)]);
  }, []);

  useEffect(() => {
    statistx.current = new StatistxCore();
    flushToState();
  }, [flushToState]);

  const execOp = useCallback(async (op: Operation) => {
    setLoading(true);
    await statistx.current.execOperation(op);
    flushToState();
    setLoading(false);
  }, [flushToState]);

  const transaction = useCallback(() => {
    const t = statistx.current.transaction();
    const c = t.commit.bind(t);

    t.commit = async () => {
      await c();
      flushToState();
    };

    return t;
  }, [flushToState]);

  return useMemo(() => ({
    elements,
    loading,
    execOp,
    transaction,
    selectedNode,
    selectNode,
    instance: statistx
  }), [elements, execOp, loading, selectedNode, transaction]);
};

const getElements = (s: StatistxCore): FlowElement[] => [...s.nodes].map(([id, n]) => ({
  id,
  type: "generic",
  data: n,
  position: { x: 0, y: 5 }
}));

const getEdges = (s: StatistxCore): Edge[] => [...s.relations].map(([from, to]) => ({
  id: `e${from[0]}[${from[1]}]-${to[0]}[${to[1]}]`,
  type: "straight",
  source: `${from[0]}`,
  sourceHandle: `${from[1]}`,
  target: `${to[0]}`,
  targetHandle: `${to[1]}`
}));

export const StatistxContext = createContext<StatistxContext>(null!);
export const useStatistxContext = () => useContext(StatistxContext);
