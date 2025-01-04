import React from "react"
import { Figma } from "../components";
import { useGlobals } from "storybook/internal/preview-api";
import type { DecoratorFunction } from "storybook/internal/types"

import { KEY } from "../constants";

export const withFigma: DecoratorFunction = (StoryFn, context) => {
	const [globals] = useGlobals();
	const addon = globals[KEY];
	const { figma: url } = context.parameters;

	// Is the addon being used in the docs panel
	const isInDocs = context.viewMode === "docs";

	return (
		<>
			{StoryFn() as React.ReactNode}
			{!isInDocs && addon && <Figma url={url} />}
		</>
	)
}