const questions=[
{c:"Science",d:"Easy",q:"Which planet is known as the Red Planet?",a:["Venus","Mars","Jupiter","Mercury"],correct:1},
{c:"Science",d:"Easy",q:"What force pulls objects toward Earth?",a:["Magnetism","Friction","Gravity","Electricity"],correct:2},
{c:"Science",d:"Easy",q:"How many legs does an insect have?",a:["4","6","8","10"],correct:1},
{c:"Science",d:"Easy",q:"What do humans need to breathe?",a:["Oxygen","Helium","Carbon","Neon"],correct:0},
{c:"Science",d:"Medium",q:"What gas do plants primarily absorb during photosynthesis?",a:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],correct:2},
{c:"Science",d:"Medium",q:"Which organ pumps blood around the human body?",a:["Liver","Heart","Lung","Kidney"],correct:1},
{c:"Science",d:"Medium",q:"What is the boiling point of water at sea level?",a:["50°C","75°C","100°C","150°C"],correct:2},
{c:"Science",d:"Hard",q:"What is the chemical symbol for potassium?",a:["P","Pt","K","Po"],correct:2},
{c:"Science",d:"Hard",q:"Which particle has a negative electric charge?",a:["Proton","Neutron","Electron","Photon"],correct:2},
{c:"Science",d:"Hard",q:"What is the approximate speed of light in vacuum?",a:["3,000 km/s","30,000 km/s","300,000 km/s","3,000,000 km/s"],correct:2},

{c:"Technology",d:"Easy",q:"What does HTML stand for?",a:["HyperText Markup Language","HighText Machine Language","Hyper Tool Multi Language","HomeText Markup Language"],correct:0},
{c:"Technology",d:"Easy",q:"Which device is commonly used to move the pointer on a computer?",a:["Printer","Mouse","Speaker","Scanner"],correct:1},
{c:"Technology",d:"Easy",q:"Which company develops the Android operating system?",a:["Google","Microsoft","Adobe","Intel"],correct:0},
{c:"Technology",d:"Easy",q:"Which symbol is commonly used for an email address?",a:["#","&","@","%"],correct:2},
{c:"Technology",d:"Medium",q:"Which language is mainly used to add interactivity to web pages?",a:["HTML","CSS","JavaScript","SQL"],correct:2},
{c:"Technology",d:"Medium",q:"What does CPU stand for?",a:["Central Processing Unit","Computer Power Utility","Core Program User","Central Program Upload"],correct:0},
{c:"Technology",d:"Medium",q:"Which storage unit is larger?",a:["KB","MB","GB","Byte"],correct:2},
{c:"Technology",d:"Hard",q:"Which data structure follows the LIFO principle?",a:["Queue","Stack","Array","Tree"],correct:1},
{c:"Technology",d:"Hard",q:"What does API commonly stand for?",a:["Application Programming Interface","Advanced Program Internet","Application Process Input","Automated Programming Instruction"],correct:0},
{c:"Technology",d:"Hard",q:"Which protocol is commonly used to securely transfer web pages?",a:["HTTP","FTP","HTTPS","SMTP"],correct:2},

{c:"History",d:"Easy",q:"The Great Wall is located in which country?",a:["Japan","India","China","Korea"],correct:2},
{c:"History",d:"Easy",q:"Which ancient civilization built the pyramids at Giza?",a:["Egyptians","Romans","Vikings","Aztecs"],correct:0},
{c:"History",d:"Easy",q:"Who was known as the first emperor of Rome?",a:["Julius Caesar","Augustus","Nero","Constantine"],correct:1},
{c:"History",d:"Easy",q:"Which invention is associated with Johannes Gutenberg?",a:["Telephone","Printing press","Steam engine","Compass"],correct:1},
{c:"History",d:"Medium",q:"Who was the first person to walk on the Moon?",a:["Yuri Gagarin","Neil Armstrong","Buzz Aldrin","John Glenn"],correct:1},
{c:"History",d:"Medium",q:"The Renaissance began in which European country?",a:["Italy","Spain","Norway","Ireland"],correct:0},
{c:"History",d:"Medium",q:"Which empire was ruled by Genghis Khan?",a:["Roman Empire","Mongol Empire","Ottoman Empire","British Empire"],correct:1},
{c:"History",d:"Hard",q:"Which ancient civilization developed cuneiform writing?",a:["Roman","Sumerian","Mayan","Viking"],correct:1},
{c:"History",d:"Hard",q:"Which treaty formally ended World War I with Germany?",a:["Treaty of Paris","Treaty of Versailles","Treaty of Rome","Treaty of Vienna"],correct:1},
{c:"History",d:"Hard",q:"Which civilization used quipu for record keeping?",a:["Inca","Roman","Persian","Greek"],correct:0},

{c:"Geography",d:"Easy",q:"What is the largest ocean on Earth?",a:["Atlantic Ocean","Indian Ocean","Pacific Ocean","Arctic Ocean"],correct:2},
{c:"Geography",d:"Easy",q:"Which continent is the Sahara Desert located in?",a:["Asia","Africa","Europe","Australia"],correct:1},
{c:"Geography",d:"Easy",q:"What is the capital city of France?",a:["Madrid","Paris","Rome","Berlin"],correct:1},
{c:"Geography",d:"Easy",q:"Which country is shaped like a boot?",a:["Italy","Brazil","Canada","India"],correct:0},
{c:"Geography",d:"Medium",q:"Which country is famous for the city of Cairo?",a:["Egypt","Greece","Turkey","Morocco"],correct:0},
{c:"Geography",d:"Medium",q:"Which is the largest continent by area?",a:["Africa","Europe","Asia","North America"],correct:2},
{c:"Geography",d:"Medium",q:"Mount Everest is part of which mountain range?",a:["Andes","Alps","Himalayas","Rockies"],correct:2},
{c:"Geography",d:"Hard",q:"Which is the longest river in South America?",a:["Nile","Amazon","Yangtze","Danube"],correct:1},
{c:"Geography",d:"Hard",q:"Which country has the most natural lakes?",a:["Canada","Brazil","Russia","Australia"],correct:0},
{c:"Geography",d:"Hard",q:"What is the deepest ocean trench known on Earth?",a:["Java Trench","Mariana Trench","Tonga Trench","Puerto Rico Trench"],correct:1}
];

let quiz=[],index=0,score=0,answers=[],timer=null,timeLeft=20;
const $=id=>document.getElementById(id);
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");window.scrollTo(0,0)}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function showToast(message){
 const t=$("toast");t.textContent=message;t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),2200);
}
function startQuiz(){
 const cat=$("category").value,diff=$("difficulty").value,count=Number($("questionCount").value);
 let pool=questions.filter(x=>(cat==="All"||x.c===cat)&&(diff==="All"||x.d===diff));
 pool=shuffle(pool);if(!pool.length){alert("No questions match these settings.");return}
 quiz=pool.slice(0,Math.min(count,pool.length));index=0;score=0;answers=[];$("totalNum").textContent=quiz.length;
 if(pool.length<count) showToast(`Only ${pool.length} questions are available for this filter.`);
 $("quizCategory").textContent=cat==="All"?"MIXED QUIZ":cat.toUpperCase();show("quizScreen");loadQuestion();
}
function loadQuestion(){
 clearInterval(timer);timeLeft=20;$("timer").textContent=timeLeft;$("timer").parentElement.classList.remove("warning");
 const q=quiz[index];$("currentNum").textContent=index+1;$("questionText").textContent=q.q;$("difficultyBadge").textContent=q.d;$("questionPoints").textContent=q.d==="Hard"?"20 points":q.d==="Medium"?"15 points":"10 points";
 $("progress").style.width=((index)/quiz.length*100)+"%";$("liveScore").textContent=score;$("answered").textContent=answers.length;$("nextBtn").disabled=true;
 $("answers").innerHTML=q.a.map((a,i)=>`<button class="answer" data-i="${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${a}</span></button>`).join("");
 document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>selectAnswer(Number(b.dataset.i))));
 timer=setInterval(()=>{timeLeft--;$("timer").textContent=timeLeft;if(timeLeft<=5)$("timer").parentElement.classList.add("warning");if(timeLeft<=0){clearInterval(timer);selectAnswer(null)}},1000);
}
function selectAnswer(choice){
 if(answers[index])return;clearInterval(timer);const q=quiz[index];
 let correct=choice===q.correct;let points=q.d==="Hard"?20:q.d==="Medium"?15:10;if(correct)score+=points;
 answers[index]={choice,correct};document.querySelectorAll(".answer").forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add("correct");if(choice===i&&!correct)b.classList.add("wrong")});
 $("liveScore").textContent=score;$("answered").textContent=answers.length;$("nextBtn").disabled=false;
 $("nextBtn").textContent=index===quiz.length-1?"See Results →":"Next Question →";
}
$("startBtn").addEventListener("click",startQuiz);
$("nextBtn").addEventListener("click",()=>{if(index<quiz.length-1){index++;loadQuestion()}else finish()});
function finish(){
 clearInterval(timer);const correct=answers.filter(a=>a.correct).length,skipped=quiz.length-answers.length,wrong=answers.length-correct;
 $("finalScore").textContent=score;$("scorePercent").textContent=Math.round(score/quiz.reduce((n,q)=>n+(q.d==="Hard"?20:q.d==="Medium"?15:10),0)*100)+"%";
 $("correctCount").textContent=correct;$("wrongCount").textContent=wrong;$("skippedCount").textContent=skipped;
 const pct=Number($("scorePercent").textContent);$("resultTitle").textContent=pct>=80?"Excellent!":pct>=60?"Good job!":"Keep practicing!";
 $("resultMessage").textContent=pct>=80?"You really know your stuff.":"Every attempt helps you learn. Try again and beat your score!";
 $("resultIcon").textContent=pct>=80?"🏆":pct>=60?"⭐":"💪";show("resultScreen");
}
$("reviewBtn").addEventListener("click",()=>{
 $("reviewList").innerHTML=quiz.map((q,i)=>{const a=answers[i],correct=a?.correct;return `<div class="review-item"><div class="review-q">${i+1}. ${q.q}</div><div class="review-answer ${correct?"good":a?"bad":"skipped"}">${a?`Your answer: ${a.choice===null?"Skipped":q.a[a.choice]}`:"Skipped"} ${correct?"✓":""}</div>${!correct?`<div class="review-answer good">Correct answer: ${q.a[q.correct]} ✓</div>`:""}</div>`}).join("");show("reviewScreen");
});
$("backResult").addEventListener("click",()=>show("resultScreen"));
$("restartBtn").addEventListener("click",()=>show("startScreen"));
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("quizTheme",document.body.classList.contains("dark")?"dark":"light")});
if(localStorage.getItem("quizTheme")==="dark")document.body.classList.add("dark");