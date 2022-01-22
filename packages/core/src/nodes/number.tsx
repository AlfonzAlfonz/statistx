import { Resolver } from "../resolver";
import { NumberType, numberType } from "../types/number";
import { objectType, ObjectType } from "../types/object";

export type NumberResolver = Resolver<ObjectType<{}>, number, ObjectType<{ x: NumberType }>>;

export const numberResolver = (): NumberResolver => ({
  label: "Number",
  type: "number",

  propTypes: objectType({}),
  resultTypes: objectType({ x: numberType() }),

  initialState: 0,

  exec: (_, x) => ({ x }),
  shouldResolve: () => true,

  render: ({ state, setState }) => (
    <>
      <input
        type="number"
        value={state}
        onChange={e => setState(e.target.valueAsNumber)}
      />
    </>
  )
});
