export default class FetchHelper {
    get = () =>  {
        return [
            {
                id: 1,
                name: 'Pilates',
                isBillable: false
            },
            {
                id: 2,
                name: 'Transporte Especial',
                isBillable: true
            },
            {
                id: 3,
                name: 'Consultorio',
                isBillable: false
            },
            {
                id: 4,
                name: 'Psicopedagogía',
                isBillable: true
            }
        ]
    }
}


//   fetch('http://localhost:5000/api/user/login', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8'
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