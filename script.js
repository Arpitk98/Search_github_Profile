const url ="https://api.github.com/users"; 

const searchInputEle = document.getElementById("searchInput");
const searchBtnEle = document.getElementById("search_btn");
const profileEle = document.getElementById("profileContainer");
const loadingEle = document.getElementById("loading"); 

const generateProfile = (profile) =>{

     return `
     <div class="profile"> 
     <div class="top">
         <div class="left">  
             <div class="avatar"> 
                 <img  src="${profile.avatar_url}" alt="avatar">
             </div>

             <div class="self"> 
                 <h3>${profile.name}</h3>
                 <h3>@${profile.login}</h3> 
             </div>
         </div>
         <div class="right">
           <a href="${profile.html_url}" target="_blank">
           <button class="buttonclass"> Check Profile</button>
           </a>
         </div>
     </div> 

     <div class="about">
          <h3>About</h3>
          <p>${profile.bio}</p>
     </div>

     <div class="status">
         <div class="status-item">
             <h4>Followers</h4>
             <p>${profile.followers}</p> 
         </div>
         <div class="status-item">
             <h4>Followings</h4>
             <p>${profile.following}</p>
         </div>
         <div class="status-item">
             <h4>Repos</h4>
             <p>${profile.public_repos}</p>
         </div>
        
     </div>
 </div>

</div>
`; 

};



const fetchProfile = async () => { 
      const user = searchInputEle.value;
      
      loadingEle.innerText="loading...."
      loadingEle.style.color= "black"; 
      try {
         const res =  await fetch(`${url}/${user}`); 
         const data = await res.json();  
         if(data.bio)   
            {    loadingEle.innerText="";
                profileEle.innerHTML= generateProfile(data);  
            }
            else
            {
                loadingEle.innerText= data.message;
                loadingEle.style.color="red";
                profileEle.innerText="";
            }

            console.log("data" , data); 

      }
      catch(error ){
         console.log({ error  });
         loadingEle.innerText="";  

      }
};

searchBtnEle.addEventListener("click",fetchProfile); 
