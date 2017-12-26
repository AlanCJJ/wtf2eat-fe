const backendUrl = 'http://192.168.0.175:3000/api'

export const createUser = (email, contactNo, name, password, cb = {}) => {
  console.log('you Hit!');
  fetch(backendUrl + '/auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email,
        name,
        password,
        contactNo
    }),
  }).then((token)=>{
    cb(token);
  });;
}