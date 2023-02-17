import Error from "../404";

export default () => { console.log('404 NOTICE')
  return <Error statusCode={404} />;
};
