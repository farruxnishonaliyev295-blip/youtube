const navbarList =document.querySelector(".navbar-list")
const ifremesList = document.querySelector(".iframes-list")
async function getUsers() {
    let users = await axios.get("http://localhost:4545/api/users")
    users = users.data.data
    
    for(const user of users){
        navbarList.innerHTML +=`
        <li class="channel" data-id="1">
                        <a href="#">
                            <img src="http://localhost:4545/file/${user.avatar}" alt="channel-icon" width="30px" height="30px">
                            <span>${user.username}</span>
                        </a>
                    </li>`
    }
}

async function getAllFiles(){
    let files = await axios.get("http://localhost:4545/api/files/all")
    files = files.data.files;

    for (const file of files) {
        const year =  new Date(file.created_at).getFullYear()
        const month =  new Date(file.created_at).getMonth()
        const day =  new Date(file.created_at).getDate()
        const hour =  new Date(file.created_at).getHours()
        const minute =  new Date(file.created_at).getMinutes()
        
        ifremesList.innerHTML+=`
                <li class="iframe">
                    <video src="http://localhost:4545/file/${file.file_name}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="http://localhost:4545/file/${file.user.avatar}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${file.user.name}</h2>
                                <h3 class="iframe-title">${file.title} </h3>
                                <time class="uploaded-time">${year}/${month+1}/${day} | ${hour}.${minute}</time>
                                <a class="download" href="http://localhost:4545/api/file/download/${file.file_name}">
                                    <span>${file.size}</span>
                                    <img src="./img/download.png">
                                </a>
                            </div>                  
                        </div>
                    </li>  `
    }
    
}

getUsers();
getAllFiles()