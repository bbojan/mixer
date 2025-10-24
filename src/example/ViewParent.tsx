import { createMixerComponent } from "../mixer/mixer";
import { ViewChild } from "./ViewChild";

export const ViewParent = createMixerComponent((self) => {
  let isShown = true;

  self.context.set(42);

  return () => (
    <div>
      <div>{isShown && <ViewChild ctxIdentifier={self.uid} />}</div>
      <div>
        <button
          onClick={() => {
            isShown = !isShown;

            self.update();
          }}
        >
          {isShown ? "HIDE" : "SHOW"}
        </button>
      </div>
    </div>
  );
});
