import * as Figma from "figma-js";

export const ADDON_ID = "storybook-love-figma";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const KEY = `storybook-love-figma`;
export const FIGMA_TOKEN = "figd_u1cEwpoxoxXhtK2XIfADsga6eGQdFzorqv9lLfsM";
export const FIGMA_CLIENT = Figma.Client({ personalAccessToken: FIGMA_TOKEN });
// process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
};
