import { defaultTheme, Preflight, ThemeProvider } from "@xstyled/styled-components";
import { AppProps } from "next/app";
import { FC } from "react";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Preflight />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
