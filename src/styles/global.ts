import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html{
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body{
  padding: 0;
  margin: 0;
  background-color: #bcdfeb;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

a :hover {
  color: #0070f3;
  text-decoration: underline
}

* {
  box-sizing: border-box;
}
`;
