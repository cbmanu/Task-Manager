function alter_name(){
    
    let content = {
            Details: alter_form.alter.value.toString()
            };

    fetch("http://127.0.0.1:3000/api/member", {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(content)
    }).then((response) => {
        console.log('PATCH Response.status: ', response.status);
        if(response.status !== 204)
            return response.json();
        else
            return response.statusText;
    }).then((data) => {
        alert(data);
    });
} 