// a library to wrap and simplify api calls
import Unsplash, { toJson } from 'unsplash-js/native';
import Config from 'react-native-config';

// our "constructor"
const create = () => {
  const unsplash = new Unsplash({
    accessKey: Config.ACCESS_KEY,
    headers: {
      'X-Custom-Header': 'foo'
    },
    timeout: 500 // values set in ms
  });

  const getUsers = search => {
    console.log('search', search);
    return unsplash.search
      .users(search, 1, 10)
      .then(toJson)
      .then(json => {
        return json;
      });
  };

  return {
    // a list of the API functions from step 2
    getUsers
  };
};

// let's return back our create method as the default.
export default {
  create
};
