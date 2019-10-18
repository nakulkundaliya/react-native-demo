// a library to wrap and simplify api calls
import Unsplash, { toJson } from 'unsplash-js/native';
import Config from 'react-native-config';

// our "constructor"
const create = () => {
  const unsplash = new Unsplash({
    // accessKey: Config.ACCESS_KEY,
    accessKey:
      'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5',
    headers: {
      'X-Custom-Header': 'foo'
    },
    timeout: 500 // values set in ms
  });

  const getUsers = (search, pageNo) => {
    return unsplash.search
      .users(search, pageNo, 20)
      .then(toJson)
      .then(json => {
        return json;
      });
  };

  const getCollection = (username, pageNo) => {
    console.log('==============pageNo', pageNo);
    return unsplash.users
      .photos(username, pageNo, 10, 'popular', false)
      .then(toJson)
      .then(json => {
        return json;
      });
  };

  return {
    // a list of the API functions from step 2
    getUsers,
    getCollection
  };
};

// let's return back our create method as the default.
export default {
  create
};
