const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const accounts = {
  parent:{name:"Juan Dela Cruz",role:"Parent",initials:"JD",children:2},
  teacher:{name:"Maria G. Santisima",role:"Grade 4 Adviser",initials:"MS",children:0},
  admin:{name:"Ronell Nicolas",role:"Administrative Officer · System Admin",initials:"RN",children:0},
  head:{name:"Rosauro B. Capariño Jr.",role:"Principal I · School Head",initials:"RC",children:0,photo:"assets/principal-rosauro-caparino.png"},
  public:{name:"Public Visitor",role:"Public · Read-only",initials:"PV",children:0}
};
let currentRole="parent", currentFilter="All", currentMonth=new Date(2026,10,1);
const posts=[
 {id:101,author:"Daplian Elementary School",role:"admin",meta:"Official School Post · Featured",category:"Announcement",title:"Welcome to iDES – ALAM!",body:"Your digital connection to Daplian Elementary School. Stay informed about school news, activities, and announcements. This is our official school community space.",image:"assets/school-front-post.jpg",likes:24,comments:[["Maria G. Santisima","Excited to use this platform!"],["Juan Dela Cruz","Thank you for keeping us updated."]]},
 {id:102,author:"Rosauro B. Capariño Jr.",role:"head",meta:"Principal I · School Head · Today",category:"Announcement",title:"DES Procures Emergency Batteries for Power Shortage",body:"To help ensure continuity of school operations during power interruptions, Daplian Elementary School has procured emergency battery power stations. These units will provide a dependable backup power source for essential school needs and help our personnel respond to unexpected outages. This initiative reflects our continuing commitment to preparedness, service, and a safe learning environment for our learners and community.\n\n#DESdaBest",image:"assets/school-head-emergency-batteries.jpg",likes:36,comments:[["Maria G. Santisima","A helpful addition for the school. Congratulations!"],["Juan Dela Cruz","Thank you for preparing for emergencies."]]},
 {id:103,author:"Maria G. Santisima",role:"teacher",meta:"Grade 4 Adviser · Yesterday",category:"Advisory",title:"Grade 4 Classroom Reminder",body:"Good day, parents! Please be reminded to check the learners' activity materials for the upcoming classroom activity on Friday. Thank you for your continued support.",image:"assets/school-front-post.jpg",likes:18,comments:[["Ana Reyes","Noted, Ma'am. Thank you!"]]},
 {id:104,author:"Daplian Elementary School",role:"admin",meta:"School Update · November 18",category:"Event",title:"A welcoming campus for every learner",body:"A glimpse of our school grounds as we continue creating a bright, safe, and welcoming environment for the Daplian ES community.",image:"assets/school-front-post.jpg",likes:31,comments:[]},
 {id:105,author:"Maria G. Santisima",role:"teacher",meta:"Grade 4 Adviser · November 16",category:"Reminder",title:"A Little Reminder for Our Families",body:"Thank you, parents and guardians, for being our partners in supporting every learner. Please follow the official ALAM announcements for school updates.",image:"assets/school-front-post.jpg",likes:12,comments:[]}
];
const events=[
 {day:24,month:"NOV",title:"School-Based Activity",detail:"Tuesday · School grounds",type:"School activity"},
 {day:27,month:"NOV",title:"Parent-Teacher Meeting",detail:"Friday · School office",type:"Important date"},
 {day:30,month:"NOV",title:"Bonifacio Day",detail:"Monday · Public holiday",type:"Important date"},
 {day:4,month:"DEC",title:"School Community Celebration",detail:"Friday · Daplian ES",type:"School activity"}
];
const staff=[
 ["Maria G. Santisima","Grade 4 Adviser","Teaching Personnel","MS"],
 ["Pedro A. Reyes","Grade 6 Adviser","Teaching Personnel","PR"],
 ["Ana L. Mendoza","Kindergarten Teacher","Teaching Personnel","AM"],
 ["Ronell Nicolas","Administrative Officer II","Non-Teaching Personnel","RN"],
 ["Rosauro B. Capariño Jr.","Principal I · School Head","School Administration","RC"]
];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
let pageHistory=["home"];
function showPage(page, fromBack=false){const current=$(".page.active")?.id.replace("page-","")||"home";if(!fromBack&&current!==page){pageHistory.push(current);if(pageHistory.length>20)pageHistory.shift();}$$(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$$(".desktop-nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("#backButton").classList.toggle("invisible",page==="home");window.scrollTo({top:0,behavior:"smooth"});if(page==="calendar")renderCalendar();if(page==="directory")renderDirectory();if(page==="announcements")renderAnnouncements();}
function goBack(){if(pageHistory.length>1){const previous=pageHistory.pop();showPage(previous,true)}else{showPage("home",true)}}
function roleBadge(role){return role==="head"?"School Head":role==="admin"?"Administrator":role==="teacher"?"Teacher":"Parent"}
function canInteract(){return currentRole!=="public"}
function canPublish(){return ["teacher","admin","head"].includes(currentRole)}
function renderPosts(target, list=posts){
 target.innerHTML=list.map(p=>`<article class="post card" data-id="${p.id}">
  <div class="post-head">${p.role==="head"?`<img class="avatar principal-avatar" src="assets/principal-rosauro-caparino.png" alt="Rosauro B. Capariño Jr.">`:`<span class="avatar">${initials(p.author)}</span>`}<div class="post-author"><b>${esc(p.author)}</b><small>${esc(p.meta)}</small></div><span class="role-badge ${p.role==='admin'||p.role==='head'?'admin':''}">${roleBadge(p.role)}</span></div>
  <h3>${esc(p.title)}</h3><div class="post-copy">${esc(p.body)}</div>${p.image?`<img class="post-photo" src="${p.image}" alt="${p.role==="head"?"School Head presenting emergency battery power equipment":"Daplian Elementary School campus"}" loading="lazy">`:""}
  <div class="post-meta"><span>♥ ${p.likes} reactions</span><span>${p.comments.length} comments</span></div>
  <div class="post-actions"><button class="like-button ${p.liked?'liked':''}" data-action="like" data-id="${p.id}"><span class="heart-symbol">♥</span> Like</button><button data-action="comment" data-id="${p.id}">▢ Comment</button><button data-action="share" data-id="${p.id}">↗ Share</button></div>
  <div class="comment-list">${p.comments.map(c=>`<div class="comment"><b>${esc(c[0])}</b>${esc(c[1])}</div>`).join("")}</div>
  ${canInteract()?`<form class="comment-form" data-id="${p.id}"><input required maxlength="300" placeholder="Write a comment…"><button>Send</button></form>`:`<div class="comment-form"><input disabled placeholder="Log in to like or comment"><button type="button" data-action="login">Log in</button></div>`}
 </article>`).join("");
}
function initials(s){return s.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderAnnouncements(){renderPosts($("#announcementList"),posts.filter(p=>["Announcement","Advisory","Reminder","Event"].includes(p.category)&&(currentFilter==="All"||p.category===currentFilter)));}
function renderCalendar(){
 const y=currentMonth.getFullYear(),m=currentMonth.getMonth();$("#monthLabel").textContent=currentMonth.toLocaleDateString("en-US",{month:"long",year:"numeric"});
 const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(),prev=new Date(y,m,0).getDate();let cells=[];
 for(let i=0;i<42;i++){let d=i-first+1,day=d<1?prev+d:d>days?d-days:d,muted=d<1||d>days;let has=!muted&&((m===10&&[24,27,30].includes(day))||(m===11&&day===4));let today=y===2026&&m===10&&day===20&&!muted;cells.push(`<button class="day ${muted?'muted':''} ${has?'has-event':''} ${today?'today':''}" ${has?`data-day="${day}"`:''}>${day}</button>`)}
 $("#calendarGrid").innerHTML=cells.join("");
 $("#eventList").innerHTML=events.map(e=>`<div class="event-card"><div class="event-date"><b>${e.day}</b><small>${e.month}</small></div><div><h3>${e.title}</h3><p>${e.detail} · ${e.type}</p></div></div>`).join("");
}
function renderDirectory(q=""){let filtered=staff.filter(s=>s.join(" ").toLowerCase().includes(q.toLowerCase()));$("#directoryList").innerHTML=filtered.map(s=>`<div class="staff-card">${s[1].includes("Principal I")?`<img class="avatar principal-avatar" src="assets/principal-rosauro-caparino.png" alt="">`:`<span class="avatar">${s[3]}</span>`}<div class="staff-info"><b>${s[0]}</b><small>${s[1]} · ${s[2]}</small></div><span class="role-badge">Staff</span></div>`).join("")||"<p class='muted'>No matching personnel found.</p>"}
function updateAccount(){let a=accounts[currentRole];if(a.photo){$("#topAvatar").innerHTML=`<img src="${a.photo}" alt="">`;$("#profileAvatar").innerHTML=`<img src="${a.photo}" alt="">`;}else{$("#topAvatar").textContent=a.initials;$("#profileAvatar").textContent=a.initials;}$("#composerAvatar").textContent=a.initials;$("#profileName").textContent=a.name;$("#profileRole").textContent=a.role+" · Demo account";$("#profileChildren").textContent=a.children;$("#composerHint").textContent=canPublish()?"You can publish as school personnel":canInteract()?"You can like and comment on posts":"Read-only visitor access";$("#composer").classList.toggle("hidden",!canPublish());}
function openModal(title,body){$("#modalTitle").textContent=title;$("#modalBody").innerHTML=body;$("#modalBackdrop").classList.remove("hidden")}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function accountModal(){openModal("Switch demo account",`<p>Choose a mock account to preview different ALAM permissions. No real authentication is performed.</p>${Object.entries(accounts).map(([k,a])=>`<button class="account-option" data-role="${k}"><span class="avatar">${a.initials}</span><span><b>${a.name}</b><small>${a.role}</small></span></button>`).join("")}`)}
function composerModal(){if(!canPublish()){toast("Only school personnel can publish posts.");return}openModal("Create a school post",`<form id="newPostForm"><label>Post type<button type="button" class="picker-trigger form-picker" data-picker="postCategory"><span class="picker-icon">📣</span><span class="picker-value" id="newCategoryValue">Announcement</span><span class="picker-chevron">⌄</span></button><input type="hidden" id="newCategory" value="Announcement"></label><label>Title<input class="field" id="newTitle" required placeholder="Write a post title"></label><label>Message<textarea class="field" id="newBody" rows="4" required placeholder="Share an update…"></textarea></label><div class="modal-actions"><button class="btn btn-primary" type="submit">Publish demo post</button></div><p>Prototype only. Posts are stored in this browser session and are not sent to a server.</p></form>`)}

const pickerCatalog={
 child:{title:"Choose connected learner",subtitle:"Attendance will be shown only for the selected connected learner.",options:[["Maria Dela Cruz · Grade 4","🎒","Grade 4"],["Pedro Dela Cruz · Grade 1","🎒","Grade 1"]],target:"childPickerValue"},
 supportTopic:{title:"Choose inquiry topic",subtitle:"Select the subject that best describes your message.",options:[["General inquiry","✉️","Questions for the school office"],["Account assistance","🔐","ALAM account and access"],["School activity","🗓️","Events and school programs"],["Website issue","🖥️","Technical help with ALAM"],["Other","💬","Something else"]],target:"supportTopicValue"},
 postCategory:{title:"Choose post type",subtitle:"Select the category for your school publication.",options:[["Announcement","📢","Official school information"],["Advisory","📌","Important reminders and guidance"],["Event","🎉","Activities and events"],["Reminder","🔔","Friendly notices"],["School Update","🏫","General school news"]],target:"newCategoryValue"}
};
let activePicker=null;
function openPicker(key){
 const config=pickerCatalog[key];if(!config)return;
 activePicker=key;$("#pickerTitle").textContent=config.title;$("#pickerSubtitle").textContent=config.subtitle;
 $("#pickerOptions").innerHTML=config.options.map(([label,icon,desc])=>`<button class="picker-option" type="button" data-pick-value="${esc(label)}"><span class="picker-option-icon">${icon}</span><span class="picker-option-copy"><b>${esc(label)}</b><small>${esc(desc)}</small></span><span class="picker-option-arrow">›</span></button>`).join("");
 $("#pickerBackdrop").classList.remove("hidden");
}
function closePicker(){$("#pickerBackdrop").classList.add("hidden");activePicker=null}
function choosePicker(value){
 const key=activePicker,config=pickerCatalog[key];if(!config)return;
 const target=$("#"+config.target);if(target)target.textContent=value;
 if(key==="supportTopic")$("#supportTopic").value=value;
 if(key==="postCategory")$("#newCategory").value=value;
 if(key==="child")toast("Attendance view switched to "+value.split(" · ")[0]);
 closePicker();
}

document.addEventListener("click",e=>{
 const pickerTrigger=e.target.closest("[data-picker]");if(pickerTrigger){openPicker(pickerTrigger.dataset.picker);return}
 const pickerOption=e.target.closest("[data-pick-value]");if(pickerOption){choosePicker(pickerOption.dataset.pickValue);return}
 const page=e.target.closest("[data-page]");if(page){showPage(page.dataset.page);return}
 const role=e.target.closest("[data-role]");if(role){currentRole=role.dataset.role;updateAccount();closeModal();toast("Previewing "+accounts[currentRole].role);return}
 const act=e.target.closest("[data-action]");if(act){const id=Number(act.dataset.id),p=posts.find(x=>x.id===id);if(act.dataset.action==="like"){if(!canInteract()){toast("Please log in to interact.");return}p.liked=!p.liked;p.likes+=p.liked?1:-1;renderPosts($("#feedList"));renderAnnouncements();}if(act.dataset.action==="comment"){if(!canInteract()){toast("Please log in to comment.");return}act.closest(".post").querySelector("input")?.focus()}if(act.dataset.action==="share")toast("Demo: post link copied.");if(act.dataset.action==="login")accountModal();return}
 const day=e.target.closest("[data-day]");if(day)toast("School activity on November "+day.dataset.day);
 const pin=e.target.closest("[data-place]");if(pin)$("#mapDescription").textContent=pin.dataset.place+" · Demo campus location. Confirm actual location details before launch.";
});
document.addEventListener("submit",e=>{
 if(e.target.matches(".comment-form")){e.preventDefault();if(!canInteract())return;const id=Number(e.target.dataset.id),p=posts.find(x=>x.id===id),v=e.target.querySelector("input").value.trim();if(v){p.comments.push([accounts[currentRole].name,v]);renderPosts($("#feedList"));renderAnnouncements();toast("Comment added to demo post.");}}
 if(e.target.id==="newPostForm"){e.preventDefault();const p={id:Date.now(),author:accounts[currentRole].name,role:currentRole,meta:accounts[currentRole].role+" · Just now",category:$("#newCategory").value,title:$("#newTitle").value,body:$("#newBody").value,image:"",likes:0,comments:[]};posts.unshift(p);renderPosts($("#feedList"));renderAnnouncements();closeModal();showPage("home");toast("Demo post published.");}
 if(e.target.id==="supportForm"){e.preventDefault();const name=e.target.querySelector('input[placeholder="Enter your name"]').value;const topic=$("#supportTopic").value;const subject=e.target.querySelector('input[placeholder="What is this about?"]').value;const message=e.target.querySelector("textarea").value;const body=encodeURIComponent(message+"\n\nFrom: "+name+"\nTopic: "+topic);location.href="mailto:school.office@example.com?subject="+encodeURIComponent(subject)+"&body="+body;toast("Opening your email application.");}
});
$("#backButton").onclick=goBack;
$("#pickerClose").onclick=closePicker;
$("#pickerBackdrop").addEventListener("click",e=>{if(e.target.id==="pickerBackdrop")closePicker()});
$("#modalClose").onclick=closeModal;$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
$("#switchAccount").onclick=accountModal;$("#topAvatar").onclick=()=>showPage("profile");$("#composerPrompt").onclick=composerModal;$("#editProfile").onclick=()=>toast("Profile editing is a future feature.");$("#privacyInfo").onclick=()=>openModal("Privacy & safety","<p>ALAM is designed to avoid a public student directory and to keep learner identifiers and attendance records private. This prototype uses mock data only.</p>");
$("#searchToggle").onclick=()=>$("#searchStrip").classList.toggle("hidden");$("#searchClose").onclick=()=>$("#searchStrip").classList.add("hidden");$("#searchInput").oninput=e=>{let q=e.target.value.toLowerCase();renderPosts($("#feedList"),posts.filter(p=>(p.title+" "+p.body+" "+p.author).toLowerCase().includes(q)));showPage("home")};
$("#prevMonth").onclick=()=>{currentMonth.setMonth(currentMonth.getMonth()-1);renderCalendar()};$("#nextMonth").onclick=()=>{currentMonth.setMonth(currentMonth.getMonth()+1);renderCalendar()};
$("#staffSearch").oninput=e=>renderDirectory(e.target.value);
$$(".filter-chip").forEach(b=>b.onclick=()=>{$$(".filter-chip").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");currentFilter=b.dataset.filter;renderAnnouncements()});
renderPosts($("#feedList"));renderAnnouncements();renderCalendar();renderDirectory();updateAccount();


// Browser-side deterrents for this visual demo only. These do NOT secure a production backend.
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  const k=e.key.toLowerCase();
  if(e.key==="F12" || (e.ctrlKey&&e.shiftKey&&["i","j","c"].includes(k)) ||
     (e.ctrlKey&&["u","s"].includes(k))) {
    e.preventDefault(); e.stopPropagation(); toast("This action is disabled in the demo.");
  }
});

// Installable PWA support. Service workers require HTTPS or localhost.
let deferredInstallPrompt=null;
window.addEventListener("beforeinstallprompt", event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  $("#installPwa")?.classList.remove("hidden");
});
$("#installPwa")?.addEventListener("click",async()=>{
  if(!deferredInstallPrompt)return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  $("#installPwa")?.classList.add("hidden");
});
window.addEventListener("appinstalled",()=>{
  $("#installPwa")?.classList.add("hidden");
  toast("iDES ALAM installed successfully.");
});
if("serviceWorker" in navigator && (location.protocol==="https:" || location.hostname==="localhost")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}
