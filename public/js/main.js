
const SubmitHandler=(e)=>{
    e.preventDefault()
    document.querySelector(".msg").textContent=""
    document.querySelector(".image").src=""
    const prompt=document.getElementById("prompt").value
    const size=document.getElementById("size").value
    if(prompt===''){
        alert("Please add Something")
        return
    }
    generateImageRequest(prompt,size)
}

const generateImageRequest= async(prompt,size)=>{
try {
    showSpinner()
    const response=await fetch("/openai/generateImage",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            prompt,
            size
        })
    })
    if(!response.ok){
        removeSpinner()
        throw new Error("That Image can not be generated")
    }
    removeSpinner()
    const data=await response.json()
    const imageUrl=data.data
    document.querySelector(".image").src=imageUrl
} catch (error) {
    document.querySelector(".msg").textContent=error
}
}
const showSpinner=()=>{
    document.querySelector(".spinner").classList.add("loading")
}

const removeSpinner=()=>{
    document.querySelector(".spinner").classList.remove("loading")
}





document.getElementById("form").addEventListener("submit",SubmitHandler)
