document.addEventListener("DOMContentLoaded", () => {

// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target=document.querySelector(
            this.getAttribute("href")
        );

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});

// =========================
// TYPING EFFECT
// =========================

const words=[

    "AI Engineer",

    "Machine Learning Engineer",

    "Generative AI Developer",

    "Python Developer"

];

let wordIndex=0;

let charIndex=0;

let deleting=false;

const typing=document.getElementById("typing");

function typeEffect(){

    const current=words[wordIndex];

    if(!deleting){

        typing.textContent=current.substring(0,charIndex++);

    }

    else{

        typing.textContent=current.substring(0,charIndex--);

    }

    if(!deleting && charIndex===current.length+1){

        deleting=true;

        setTimeout(typeEffect,1200);

        return;

    }

    if(deleting && charIndex===0){

        deleting=false;

        wordIndex++;

        if(wordIndex===words.length){

            wordIndex=0;

        }

    }

    setTimeout(typeEffect,deleting?60:120);

}

typeEffect();

// =========================
// CHATBOT
// =========================

const chatToggle=document.getElementById("chat-toggle");

const chatContainer=document.getElementById("chat-container");

const closeChat=document.getElementById("close-chat");

const chatBody=document.getElementById("chat-body");

const userInput=document.getElementById("user-input");

const sendBtn=document.getElementById("send-btn");

// Open Chat

chatToggle.addEventListener("click",()=>{

    chatContainer.style.display="flex";

});

// Close Chat

closeChat.addEventListener("click",()=>{

    chatContainer.style.display="none";

});
// =========================
// SEND MESSAGE
// =========================

async function sendMessage(){

    const message = userInput.value.trim();

    if(message==="") return;

    // Show User Message
    chatBody.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    userInput.value="";

    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing Indicator

    chatBody.innerHTML += `
        <div class="bot-message typing-message" id="typing-indicator">

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>
    `;

    chatBody.scrollTop = chatBody.scrollHeight;

    try{

        const apiUrl = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
            ? "http://127.0.0.1:8000/chat"
            : "https://portfolio-ai-2-y9r0.onrender.com/chat";

        const response = await fetch(apiUrl,{
            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data = await response.json();

        document.getElementById("typing-indicator").remove();

        chatBody.innerHTML += `

            <div class="bot-message">

                ${data.reply.replace(/\n/g,"<br>")}

            </div>

        `;

        chatBody.scrollTop = chatBody.scrollHeight;

    }

    catch(error){

        const typing=document.getElementById("typing-indicator");

        if(typing){

            typing.remove();

        }

        chatBody.innerHTML += `

            <div class="bot-message">

                ❌ Unable to connect to AI server.

            </div>

        `;

    }

}
// =========================
// EVENTS
// =========================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

// =========================
// AUTO SCROLL
// =========================

const observer = new MutationObserver(()=>{

    chatBody.scrollTop = chatBody.scrollHeight;

});

observer.observe(chatBody,{
    childList:true
});

// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// End DOMContentLoaded
});