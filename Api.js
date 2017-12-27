const backendUrl = 'http://192.168.2.214:3000/api'

export const createUser = (email, contactNo, name, password, cb = {}) => {
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
    return cb(null, token);
  }).catch((ex) => {
    return cb(ex, null);
  });
}

export const loginUser = (email, password, cb = {}) => {
  fetch(backendUrl + '/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email,
        password,
    })
  }).then((token)=>{
    return cb(null, token);
  }).catch((ex) => {
    console.log(ex);
    return cb(ex, null);
  });
}
export const createEvent = (startDate, endDate, placeName, longitude, latitude, activityName,
  deadline, startTime, endTime, invitationOnly, organiser, remarks, cb = {}) => {
  console.log('you Hit again!');
  fetch(backendUrl + '/events', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        startDate,
        endDate,
        placeName,
        longitude,
        latitude,
        activityName,
        deadline,
        startTime,
        endTime,
        invitationOnly,
        organiser,
        remarks
    }),
  }).then((token)=>{
    cb(token);
  });;
}

export const getEvent = (status, cb = {}) => {
  console.log('you Hit again!');
  fetch(backendUrl + '/events?status=' + status, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((token)=>{
    cb(token);
  });;
}

// export const getEventById = (status, cb = {}) => {
//   console.log('you Hit again!');
//   fetch(backendUrl + '/events?status=' + status, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then((token)=>{
//     cb(token);
//   });;
// }
