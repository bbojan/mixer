import { createMixerComponent } from "../mixer/mixer";

// console.log = () => {};

export const ViewChild = createMixerComponent((self) => {
  let count = 0;

  console.log("mixer Connected", self.uid);

  self.onDisconnected = () => {
    console.log("mixer Disconnected", self.uid);
  };

  return ({ ctxIdentifier }: { ctxIdentifier?: number }) => {
    const val = count * (self.context.get<number>(ctxIdentifier ?? 0) ?? -1);

    return (
      <div>
        <div>{count}</div>
        <div>
          <button
            onClick={() => {
              count++;

              self.update();

              console.log("click", count, "from", self.uid);
            }}
          >
            ++
          </button>
        </div>
        <div>{val}</div>
      </div>
    );
  };
});
