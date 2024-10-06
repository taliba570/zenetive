import { iconMap } from "../types";

export const getIconComponent = (iconName: string): any  => {
  return iconMap[iconName] || null;
};