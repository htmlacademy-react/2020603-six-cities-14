import Main from '../../pages/main/main';

export type AppProps = {
  placesCount: number;
}

function App(props: AppProps): JSX.Element {
  return (
    <Main {...props} />
  );
}

// function App({ placesCount }: AppProps): JSX.Element {
//   return (
//     <Main placesCount={placesCount} />
//   );
// }

export default App;
