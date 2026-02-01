// components/Button/variants.js

import { BaseButton } from "./BaseButtons";
import { CodeButton } from "./CodeButton";
import { LinkButton } from "./LinkButton";
import { RoundedButton } from "./RoundedButton";
import { IconButton } from "./IconButton";
import { FeaturedButton } from "./FeaturedButton";
import { TagButton } from "./TagButton";
import { ModernButtonVariant } from "./ModernButtonVariant";
import { DevStyleButton } from "./DevStyleButton";
import { TextButton, RichButton, NavButton } from "./MiscButtons";
import { StoreButton } from "./StoreButtons";

export const VARIANT_COMPONENTS = {
  default: BaseButton,
  link: LinkButton,
  code: CodeButton,
  code_small: CodeButton,
  rounded: RoundedButton,
  icon_only: IconButton,
  featured: FeaturedButton,
  rounded_tag: TagButton,
  modern: ModernButtonVariant,
  dev: DevStyleButton,
  dev_simple: DevStyleButton,

  dev_highlight: DevStyleButton,
  dev_icon_only: DevStyleButton,
  dev_icon_only_end_card: DevStyleButton,
  text: TextButton,
  rich: RichButton,
  nav: NavButton,
  appstore: StoreButton,
  googleplay: StoreButton,
  github: StoreButton,
};
