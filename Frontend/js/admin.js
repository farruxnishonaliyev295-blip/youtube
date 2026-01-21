function logoutBtn(){
        window.localStorage.clear()
        window.location = "/login"
    }

    const token = window.localStorage.getItem("accessToken")

    if(!token){
        alert("Video qosholmaysan")
    }

    async function createFile(e) {
        e.preventDefault()

        let formdata = new FormData()

        formdata.append("title", videoInput.value)
        formdata.append("file", uploadInput.files[0])

        const newFile = await axios.post("http://localhost:4545/api/files",formdata,{
            headers:{
                Authorization: "Bearer " + token
            },
        })
        if(newFile.data.status == 201){
            getFiles()
            alert("video qoshildi")
        } 

        videoInput.value= ""
        uploadInput.files[0]= ""
    }


async function getFiles(){
    videosList.innerHTML += ""
    const files = await axios.get("http://localhost:4545/api/files/oneUser",{
            headers:{
                Authorization: "Bearer " + token
            },
        });
    for (const file of files.data.files) {
        videosList.innerHTML +=`
        <li class="video-item"> 
            <video 
              controls
              src="http://localhost:4545/file/${file.file_name}">
            </video>

            <img
                class="delete-icon" 
                src="http://localhost:4545/file/delete.png" 
                width="25"
                onclick="deleteVideo('${file.id}')">

            <p class="content">${file.title}</p>
        </li> 
        

    `
    }
}
getFiles()
submitButton.onclick = createFile