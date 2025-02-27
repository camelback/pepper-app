import { ComponentProps } from "react";

import dynamic from "next/dynamic";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

export const LazySvg = async ({ name, ...props }: LazySvgProps) => {
  const Svg = dynamic(() => import(`@/cards/${name}.svg`));

  // Or without using `dynamic`:
  // We use `default` here because `@svgr/webpack` converts all other *.svg imports to React components, this might be different for other loaders.
  // const Svg = (await import(`@/assets/${name}.svg`)).default;

  return <Svg {...props} />;
};