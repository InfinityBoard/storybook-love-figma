import React from "react"
import { createRoot } from 'react-dom/client';
import { Figma } from "../components";
import { useGlobals, useEffect } from "storybook/internal/preview-api";
import type { DecoratorFunction } from "storybook/internal/types"

import { KEY } from "../constants";

interface FigmaState {
	addon: boolean;
	url: string | undefined;
}

export const withFigma: DecoratorFunction = (StoryFn, context) => {
	const [globals] = useGlobals();
	const addon = globals[KEY];
	const canvas = context.canvasElement as ParentNode;
	const { figma: url } = context.parameters;

	// Is the addon being used in the docs panel
	const isInDocs = context.viewMode === "docs";

	useEffect(() => {
		if (!isInDocs) {
			addExtraContentToStory(canvas, {
				addon,
				url,
			});
		}
	}, [addon, isInDocs]);

	return StoryFn;
}

function addExtraContentToStory(canvas: ParentNode, state: FigmaState) {
	let container = canvas.querySelector(`[data-id="${KEY}"]`) as HTMLElement;

	if (!container) {
		container = document.createElement("div");
		container.setAttribute('data-id', KEY);
		canvas.appendChild(container);
	}

	const root = createRoot(container);

	if(state.addon && state.url) {
		root.render(<Figma url={state.url} />);
	} else {
		root.unmount();
		container.remove();
	}
}