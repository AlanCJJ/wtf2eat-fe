const backendUrl = 'http://192.168.2.139:3000/api'

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
