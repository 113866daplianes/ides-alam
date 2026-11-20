const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const accounts = {
  parent:{name:"Juan Dela Cruz",role:"Parent",initials:"JD",children:2},
  teacher:{name:"Maria G. Santisima",role:"Grade 4 Adviser",initials:"MS",children:0},
  admin:{name:"Ronell Nicolas",role:"Administrative Officer · System Admin",initials:"RN",children:0},
  head:{name:"School Head",role:"School Head · Administrator",initials:"SH",children:0},
  public:{name:"Public Visitor",role:"Public · Read-only",initials:"PV",children:0}
};
let currentRole="parent", currentFilter="All", currentMonth=new Date(2026,10,1);
const posts=[
 {id:1,author:"Daplian Elementary School",role:"admin",meta:"Official School Post · 2 hours ago",category:"Announcement",title:"Welcome to iDES – ALAM!",body:"Your digital connection to Daplian Elementary School. Stay informed about school news, activities, and important announcements. This is a sample post for the ALAM prototype.",image:"photo-one",likes:24,comments:[["Maria G. Santisima","Excited to use this platform!"],["Juan Dela Cruz","Thank you for keeping us updated."]]},
 {id:2,author:"Maria G. Santisima",role:"teacher",meta:"Grade 4 Adviser · Yesterday",category:"Advisory",title:"Grade 4 classroom reminder",body:"Good day, parents! Please be reminded to check the learners' activity materials for the upcoming classroom activity on Friday. Thank you for your continued support.",image:"photo-two",likes:18,comments:[["Ana Reyes","Noted, Ma'am. Thank you!"]]},
 {id:3,author:"Daplian Elementary School",role:"admin",meta:"Facebook Sync · Nov 18",category:"Event",title:"School community activity",body:"A sample imported post showing how an approved Facebook Page publication may appear in the ALAM feed. Facebook synchronization is not connected in this prototype.",image:"photo-three",likes:31,comments:[]},
 {id:4,author:"Maria G. Santisima",role:"teacher",meta:"Grade 4 Adviser · Nov 16",category:"Reminder",title:"A little reminder for our families",body:"Thank you, parents and guardians, for being our partners in supporting every learner. Please follow the official ALAM announcements for school updates.",image:"",likes:12,comments:[]}
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
 ["School Head","School Head","School Administration","SH"]
];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function showPage(page){$$(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));window.scrollTo({top:0,behavior:"smooth"});if(page==="calendar")renderCalendar();if(page==="directory")renderDirectory();if(page==="announcements")renderAnnouncements();}
function roleBadge(role){return role==="admin"||role==="head"?"Administrator":role==="teacher"?"Teacher":"Parent"}
function canInteract(){return currentRole!=="public"}
function canPublish(){return ["teacher","admin","head"].includes(currentRole)}
function renderPosts(target, list=posts){
 target.innerHTML=list.map(p=>`<article class="post card" data-id="${p.id}">
  <div class="post-head"><span class="avatar">${initials(p.author)}</span><div class="post-author"><b>${esc(p.author)}</b><small>${esc(p.meta)}</small></div><span class="role-badge ${p.role==='admin'||p.role==='head'?'admin':''}">${roleBadge(p.role)}</span></div>
  <h3>${esc(p.title)}</h3><div class="post-copy">${esc(p.body)}</div>${p.image?`<div class="post-image ${p.image}">School activity photo · demo placeholder</div>`:""}
  <div class="post-meta"><span>♥ ${p.likes} reactions</span><span>${p.comments.length} comments</span></div>
  <div class="post-actions"><button class="${p.liked?'liked':''}" data-action="like" data-id="${p.id}">${p.liked?'♥ Liked':'♡ Like'}</button><button data-action="comment" data-id="${p.id}">▢ Comment</button><button data-action="share" data-id="${p.id}">↗ Share</button></div>
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
function renderDirectory(q=""){let filtered=staff.filter(s=>s.join(" ").toLowerCase().includes(q.toLowerCase()));$("#directoryList").innerHTML=filtered.map(s=>`<div class="staff-card"><span class="avatar">${s[3]}</span><div class="staff-info"><b>${s[0]}</b><small>${s[1]} · ${s[2]}</small></div><span class="role-badge">Staff</span></div>`).join("")||"<p class='muted'>No matching personnel found.</p>"}
function updateAccount(){let a=accounts[currentRole];$("#topAvatar").textContent=a.initials;$("#composerAvatar").textContent=a.initials;$("#profileAvatar").textContent=a.initials;$("#profileName").textContent=a.name;$("#profileRole").textContent=a.role+" · Demo account";$("#profileChildren").textContent=a.children;$("#composerHint").textContent=canPublish()?"You can publish as school personnel":canInteract()?"You can like and comment on posts":"Read-only visitor access";$("#composer").classList.toggle("hidden",!canPublish());}
function openModal(title,body){$("#modalTitle").textContent=title;$("#modalBody").innerHTML=body;$("#modalBackdrop").classList.remove("hidden")}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function accountModal(){openModal("Switch demo account",`<p>Choose a mock account to preview different ALAM permissions. No real authentication is performed.</p>${Object.entries(accounts).map(([k,a])=>`<button class="account-option" data-role="${k}"><span class="avatar">${a.initials}</span><span><b>${a.name}</b><small>${a.role}</small></span></button>`).join("")}`)}
function composerModal(){if(!canPublish()){toast("Only school personnel can publish posts.");return}openModal("Create a school post",`<form id="newPostForm"><label>Post type<select class="field" id="newCategory"><option>Announcement</option><option>Advisory</option><option>Event</option><option>Reminder</option><option>School Update</option></select></label><label>Title<input class="field" id="newTitle" required placeholder="Write a post title"></label><label>Message<textarea class="field" id="newBody" rows="4" required placeholder="Share an update…"></textarea></label><div class="modal-actions"><button class="btn btn-primary" type="submit">Publish demo post</button></div><p>Prototype only. Posts are stored in this browser session and are not sent to a server.</p></form>`)}
document.addEventListener("click",e=>{
 const page=e.target.closest("[data-page]");if(page){showPage(page.dataset.page);return}
 const role=e.target.closest("[data-role]");if(role){currentRole=role.dataset.role;updateAccount();closeModal();toast("Previewing "+accounts[currentRole].role);return}
 const act=e.target.closest("[data-action]");if(act){const id=Number(act.dataset.id),p=posts.find(x=>x.id===id);if(act.dataset.action==="like"){if(!canInteract()){toast("Please log in to interact.");return}p.liked=!p.liked;p.likes+=p.liked?1:-1;renderPosts($("#feedList"));renderAnnouncements();}if(act.dataset.action==="comment"){if(!canInteract()){toast("Please log in to comment.");return}act.closest(".post").querySelector("input")?.focus()}if(act.dataset.action==="share")toast("Demo: post link copied.");if(act.dataset.action==="login")accountModal();return}
 const day=e.target.closest("[data-day]");if(day)toast("School activity on November "+day.dataset.day);
 const pin=e.target.closest("[data-place]");if(pin)$("#mapDescription").textContent=pin.dataset.place+" · Demo campus location. Confirm actual location details before launch.";
});
document.addEventListener("submit",e=>{
 if(e.target.matches(".comment-form")){e.preventDefault();if(!canInteract())return;const id=Number(e.target.dataset.id),p=posts.find(x=>x.id===id),v=e.target.querySelector("input").value.trim();if(v){p.comments.push([accounts[currentRole].name,v]);renderPosts($("#feedList"));renderAnnouncements();toast("Comment added to demo post.");}}
 if(e.target.id==="newPostForm"){e.preventDefault();const p={id:Date.now(),author:accounts[currentRole].name,role:currentRole,meta:accounts[currentRole].role+" · Just now",category:$("#newCategory").value,title:$("#newTitle").value,body:$("#newBody").value,image:"",likes:0,comments:[]};posts.unshift(p);renderPosts($("#feedList"));renderAnnouncements();closeModal();showPage("home");toast("Demo post published.");}
 if(e.target.id==="supportForm"){e.preventDefault();const vals=[...e.target.querySelectorAll("input,select,textarea")].map(x=>x.value);const body=encodeURIComponent(vals[3]+"\n\nFrom: "+vals[0]+"\nTopic: "+vals[1]);location.href="mailto:school.office@example.com?subject="+encodeURIComponent(vals[2])+"&body="+body;toast("Opening your email application.");}
});
$("#modalClose").onclick=closeModal;$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
$("#switchAccount").onclick=accountModal;$("#topAvatar").onclick=()=>showPage("profile");$("#composerPrompt").onclick=composerModal;$("#editProfile").onclick=()=>toast("Profile editing is a future feature.");$("#privacyInfo").onclick=()=>openModal("Privacy & safety","<p>ALAM is designed to avoid a public student directory and to keep learner identifiers and attendance records private. This prototype uses mock data only.</p>");
$("#searchToggle").onclick=()=>$("#searchStrip").classList.toggle("hidden");$("#searchClose").onclick=()=>$("#searchStrip").classList.add("hidden");$("#searchInput").oninput=e=>{let q=e.target.value.toLowerCase();renderPosts($("#feedList"),posts.filter(p=>(p.title+" "+p.body+" "+p.author).toLowerCase().includes(q)));showPage("home")};
$("#prevMonth").onclick=()=>{currentMonth.setMonth(currentMonth.getMonth()-1);renderCalendar()};$("#nextMonth").onclick=()=>{currentMonth.setMonth(currentMonth.getMonth()+1);renderCalendar()};
$("#staffSearch").oninput=e=>renderDirectory(e.target.value);
$$(".filter-chip").forEach(b=>b.onclick=()=>{$$(".filter-chip").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");currentFilter=b.dataset.filter;renderAnnouncements()});
renderPosts($("#feedList"));renderAnnouncements();renderCalendar();renderDirectory();updateAccount();
