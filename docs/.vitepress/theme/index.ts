/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Theme from "vitepress/theme";
import "./group-icons.css";
import "./styles.css";
export default {
  ...Theme,
  enhanceApp({ app }) {
    Theme.enhanceApp?.({ app } as any);
  },
};
