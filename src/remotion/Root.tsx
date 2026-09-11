import React from "react";
import { Composition } from "remotion";
import { HordeAssembly, HORDE_ASSEMBLY } from "./HordeAssembly";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HordeAssembly"
      component={HordeAssembly}
      durationInFrames={HORDE_ASSEMBLY.durationInFrames}
      fps={HORDE_ASSEMBLY.fps}
      width={HORDE_ASSEMBLY.width}
      height={HORDE_ASSEMBLY.height}
    />
  );
};
