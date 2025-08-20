import Theme from "vitepress/theme";
import "./group-icons.css";
import "./styles.css";
export default {
  ...Theme,
  enhanceApp({ app }) {
    Theme.enhanceApp?.({ app } as any);
  },
};
