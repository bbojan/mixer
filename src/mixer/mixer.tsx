import { useEffect, useMemo, useRef, useState } from "react";

export type MixerRenderComponent<P> = React.FC<P>;

export type MixerHandle = {
  queueTask: (callback: () => void) => void;
  render: () => void;
  update: () => void;
  onDisconnected?: () => void;
  uid: number;
  context: {
    get: <T>(uid: number) => T;
    set: <T>(value?: T) => void;
  };
};

export interface InitializeMixerComponent<P> {
  (that: MixerHandle): MixerRenderComponent<P>;
}

type RenderComponentProps<P> = {
  ___INTERNAL___initializer: InitializeMixerComponent<P>;
};

let __UID = 0;
const __allContexts = new Map<number, unknown>();

export function RenderComponent___INTERNAL<P>(props: RenderComponentProps<P>) {
  const { ___INTERNAL___initializer, ...rest } = props;

  const uidRef = useRef<number>(0);
  if (!uidRef.current) {
    __UID++;
    uidRef.current = __UID;
  }

  const [, setRenderNumber] = useState(0);

  const self = useMemo<MixerHandle>(() => {
    const render = () => {
      setRenderNumber((prev) => prev + 1);
    };

    const context = {
      get: (uid: number) => {
        return __allContexts.get(uid);
      },
      set: (value?: unknown) => {
        __allContexts.set(uidRef.current, value);
      },
    } as {
      get: <T>(uid: number) => T;
      set: <T>(value?: T) => void;
    };

    return {
      uid: uidRef.current,
      context,
      render,
      update: render,
      queueTask: (callback: () => void) => {
        setTimeout(() => {
          callback();
        }, 1);
      },
    };
    // no deps
  }, []);

  useEffect(() => {
    return () => {
      self.onDisconnected?.();
      __allContexts.delete(self.uid);
    };
    // no deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mrcRef = useRef<MixerRenderComponent<P>>(
    null as unknown as MixerRenderComponent<P>
  );

  if (!mrcRef.current) {
    const mrc = ___INTERNAL___initializer(self);
    mrcRef.current = mrc;
  }

  const MRC = mrcRef.current as React.FC;

  return <MRC {...rest} />;
}

export function createMixerComponent<P>(
  initializer: InitializeMixerComponent<P>
): MixerRenderComponent<P> {
  return (props: P) => (
    <RenderComponent___INTERNAL<P>
      {...props}
      ___INTERNAL___initializer={initializer}
    />
  );
}
