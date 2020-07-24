import React from 'react';

const Test = (props) => {
    //   fetch('http://localhost:5000/api/user/login', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //       'Authorization': `Bearer ${props.auth.getAccessToken()}`
    //     }
    //   })
    //   .then(res => {
    //     if(!res.ok) 
    //       throw res;

    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(response => 
    //     response.text().then(error => { 
    //         showAlert(JSON.parse(error).message);
    //       }
    //     )
    //   );

    return <div>Bearer ${props.auth.getAccessToken()}</div>
}

export default Test;