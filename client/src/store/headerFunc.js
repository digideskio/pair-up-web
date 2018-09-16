const headers = () => {
  const token = window.localStorage.getItem('token');
  return { authorization: token };
};

export default headers;

//This is used for routes that need authentication only. A headers object is the second argument in a get request and the third in a post.
