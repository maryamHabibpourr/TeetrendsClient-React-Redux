// import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../../assets/assets";
import { logoShirt, stylishShirt } from "../../assets/assets";

import fileIcon from '@iconify/icons-bxs/file';
import color16Filled from '@iconify/icons-fluent/color-16-filled';
import fileTypeAi from '@iconify/icons-vscode-icons/file-type-ai';




export const EditorTabs = [
  {
    name: "filepicker",
    icon: fileIcon,
    iconType: "iconify"
  },
  {
    name: "aipicker",
    icon: fileTypeAi,
    iconType: "iconify"
  },
  {
    name: "colorpicker",
    icon: color16Filled,
    iconType: "iconify"
  },
];



export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
