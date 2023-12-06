function editTask(id){
    const title =prompt("title");
        const description =prompt("description");
        const content={
            title,
            description
        }

        fetch(`/task/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(content)
        }) .then(response => response.json())
        .then(location.replace('/'));
}
function doneTask(id){
        fetch(`/task/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({done:true})
        }) .then(response => response.json())
        .then((data)=>{
            console.log(data)
            location.replace('/')
        });
}
function undoneTask(id){
    fetch(`/task/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify({done:false})
    }) .then(response => response.json())
    .then((data)=>{
        console.log(data)
        location.replace('/')
    });
}
function deleteTask(id){
    console.log("Funciono?")
    fetch(`/task/${id}`,  {
      method: 'DELETE'
    }).then(response => response.json())
    .then(location.replace('/'));
}
  
function avatar(id){
    fetch(`/users/${id}/avatar`)
  .then(response => response.arrayBuffer())
  .then(buffer => {

    const image = new Blob([buffer], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(image);
    
    const avatars =document.querySelectorAll('.avatar');
    avatars.forEach((avatar)=>{
        avatar.src=imageUrl;
    })
  })
  .catch(error => console.error('Error fetching image:', error));
}