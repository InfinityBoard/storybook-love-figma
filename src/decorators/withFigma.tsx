import React, { useMemo } from "react"
import { useGlobals } from "storybook/internal/preview-api";
import type { DecoratorFunction } from "storybook/internal/types"
import { KEY } from "../constants";
import { Figma } from "../components/Figma";

export const withFigma: DecoratorFunction = (StoryFn, context) => {
	const [globals] = useGlobals();
	const myAddon = globals[KEY];
	const canvas = context.canvasElement as ParentNode;

	// Is the addon being used in the docs panel
	const isInDocs = context.viewMode === "docs";

	return (
		<>
			{StoryFn() as React.ReactNode}
			{!isInDocs && <Figma />}
		</>
	)
}