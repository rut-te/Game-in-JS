let user = {//הגדרת משתמש נוכחי
    name: ' ',
    mail: ' ',
    password: '',
    points: 0,
    winnes: 0,
    first: true
}
let timerall;//הגדרת משתנה לטיימר המשחק
let timeone;//הגדרת משתנה לטיימר עבור לקוח עצבני
let wordsOfTimmer = document.getElementById("wordsOfTimmer");//יבוא המילים עבור הטיימר
let lineOftimmer = document.getElementById("lineOftimmer");//יבוא דיב בו יהיה הטימר 
let low = 97;//משתנה לערך אורך קו הטיימר
let currentPerson;//הגדרת משתנה עבור שמירת מספר הלקוח שאליו מתיחסים כרגע
let sumOfMoneyForFood;//הגדרת משתנה עבור סכום המצרכים לכל לקוח
let arrOfPrice = [7, 5, 25, 15, 3, 6, 0];//מערך לשמירת מחירי המאכלים
let rest = 0;// הגדרת משתנה לכמות העודף שצריך להחזיר
let sum = 0;//הגדרת משתנה עבור סכום כמות העודף שהמשחק מחזיר
let arrOfSum = [0, 0, 0, 0];//הגדרת מערך לשמירת העודפים שצריך להחזיר
let perNow = JSON.parse(localStorage.getItem('Chef'));//יבוא פרטי המשתמש הנוכחי
user.points = perNow.points;//שמירת פרטי המשתמש הנוכחי
user.name = perNow.name;
user.mail = perNow.mail;
user.password = perNow.password;
user.winnes = perNow.winnes;
let userName = document.getElementById("userName")//htmlיבוא מיקום לכתיבת שם המשתמש מ
let userWin = document.getElementById("userWin")//htmlיבוא מיקום לכתיבת מדליות המשתמש מ
let userPoints = document.getElementById("userPoints")//htmlיבוא מיקום לכתיבת נקודות המשתמש מ
let instructions = document.getElementById("instructions")//htmlיבוא מיקום לכתיבת הוראות המשחק מ
userName.innerHTML = '<br>' + '<img src="../pictures/personWithCircle.png" width=100vw>' + '<br>' + "שלום " + user.name;
userWin.innerHTML = '<br>' + '<img src="../pictures/whiteMedal.png" width=90vw>' + '<br>' + "המדליות שלך: " + user.winnes;
userPoints.innerHTML = '<br>' + '<img src="../pictures/whiteLike.png" width=110vw>' + '<br>' + "הלייקים שלך : " + user.points;
let points = user.points;//עדכון הנקודות לכמות הנקודות שיש למשתמש

let whichPersonCreatNow = 1;//הגדרת משתנה
let person1 = document.getElementById("person1")//יבוא אדם מס1
let person2 = document.getElementById("person2")//יבוא אדם מס2
let person3 = document.getElementById("person3")//יבוא אדם מס3
let person4 = document.getElementById("person4")//יבוא אדם מס4
let saveAllDataOfCustumer;//הגדרת משתנה ליצירת דיב לפרטי לקוח
let time;//הגדרת משתנה למשך הזמן שיש בשלב
let sizeOfLevel;//הגדרת משתנה לשלב בו המשתמש אוחז
let level = document.getElementById("level");//יבוא דיב אליו תוכנס הודעה על השלב בו אוחזים
let menu = document.getElementById("menu");//יבוא דיב בו קיים התפריט
let audio;//הגדרת משתנה עבור השמע
let backFromInstructions = document.getElementById("backFromInstructions");//יבוא כפתור חזרה מהוראות למשחק
let pageOfInstructions = document.getElementById("pageOfInstructions");//יבוא כפתור לפתיחת הוראות
let buttons = document.getElementById("buttonOfmessege");//יבוא כפתורים שיופיעו בעת הודעה על המסך
backFromInstructions.addEventListener('click', backToGame);//הוספת ארוע לחזרה למשחק

timerPer1();//קריאה לפונקצית טימר לקוח עצבני
if (points <= 10) {
    time = 250;
    sizeOfLevel = 3;
    person1.style.marginLeft = "30vw";
    person3.style.display = "none";
    person4.style.display = "none";
}
if (points > 10 && points <= 20) {
    sizeOfLevel = 4;
    time = 167;
    person1.style.marginRight = "12vw";
    person2.style.marginRight = "12vw";
    person4.style.display = "none";
}
if (points > 20) {
    sizeOfLevel = 5;
    time = 125;
}
callTimmer();//קריאה לפונקציה עבור הפעלת טיימר למשחק
if (perNow.first === true)//בדיקה האם זאת הפעם הראשונה בה המשתמש נכנס למשחק
    seeInstructions();//קריאה לפונקציה להקפצת הוראות המשחק
user.first = false;//שינוי ערך כניסה לראשונה
for (let i = 0; i < sizeOfLevel - 1; i++) {//יצירת לקוחות בתחילת המשחק
    whichPersonCreatNow = i + 1;//שינוי מספר הלקוח שציור כעת
    addCustomer();//קריאה לפונקציה לייצור לקוח
}
person1.addEventListener('click', countSum);//יצירת ארוע להחזרת עודף ללקוח 1
person2.addEventListener('click', countSum);//יצירת ארוע להחזרת עודף ללקוח 2
person3.addEventListener('click', countSum);//יצירת ארוע להחזרת עודף ללקוח 3
person4.addEventListener('click', countSum);//יצירת ארוע להחזרת עודף ללקוח 4
let coins1 = document.getElementById("coins1")//יבוא מטבע 1
coins1.addEventListener('click', add1);//הוספת ארוע למטבע 1
let coins2 = document.getElementById("coins2")//יבוא מטבע 2
coins2.addEventListener('click', add2);//הוספת ארוע למטבע 2
let coins5 = document.getElementById("coins5");//יבוא מטבע 5
coins5.addEventListener('click', add5);//הוספת ארוע למטבע 5
let coins10 = document.getElementById("coins10");//יבוא מטבע 10
coins10.addEventListener('click', add10);//הוספת ארוע למטבע 10
let check = document.getElementById("check");//יבוא כפתור להחזרת העודף
window.addEventListener("keydown", (e) => {// הוספת ארוע עבור מקשי מקלדת
    if (e.key == 1) {
        add1();
        makeNoise("money");
    }
    if (e.key == 2) {
        add2();
        makeNoise("money");
    }
    if (e.key == 5) {
        add5();
        makeNoise("money");
    }
    if (e.key == 0) {
        add10();
        makeNoise("money");
    }
    if (e.key === "Enter")//כאשר נלחץ מקש האנטר,שליחה לפונקציה להחזרת העודף
        checkResult()
});

//הגדרת פונקציה ליצירת טיימר ללקוח עצבני
function timerPer1() {
    timeone = window.setTimeout(endTimmerOfangryCustumer, 30000);
}
//הגדרת פונקציה שמופעלת בסיום הטיימר של הלקוח העצבני
function endTimmerOfangryCustumer() {
    person1.innerHTML = `<img src="../pictures/dislike.png" height=290vh>`;
    if (points > 0) {
        points = points - 1;
    }
    checkPoints();// קריאה לפונקציה לבדיקת ועדכון נקודות המשתמש
    window.setTimeout(creatPerson1, 1000);//קריאה לפונקציה ליצירת בנא חדש במקומו
}
//הגדרת פונקציה עבור טיימר המשחק 
function timmerLine() {
    lineOftimmer.style.width = low + "vw";
    low = low - 0.1;//קיצור הקו
    if (low < 67)
        lineOftimmer.style.backgroundColor = "rgb(246, 227, 88)";
    if (low < 20)
        lineOftimmer.style.backgroundColor = "rgb(203, 42, 42)";
    if (low < 0.4)
        end();//קריאה לפונקציה בסיום הטיימר עבוד גיים אובר
}
//הגדרת פונקציה שמפעילה את טיימר המשחק
function callTimmer() {
    timerall = window.setInterval(timmerLine, time);
}
//הגדרת פונקציה לעצירת הטיימרים
function stopTimmer() {
    clearInterval(timerall);
    clearInterval(timeone);
}
//הגדרת פונקציה להקפצת הוראות המשחק
function seeInstructions() {
    stopTimmer();//עצירת הטיימרים
    lineOftimmer.style.display = "none";
    menu.style.display = "none";
    wordsOfTimmer.style.display = "none";
    pageOfInstructions.innerHTML = '<p><h2>:הוראות משחק </h2>,הנך הקופאי כעת<br> ,מתחת לכל לקוח שמופיע על המסך ישנם המאכלים שהוא קנה <br>ומתחתם סכום הכסף שהוא שילם לך<br> על מנת להתייחס ללקוח עליך ללחוץ עליו ולהחזיר לו עודף מתאים <br>בעזרת לחצני המטבעות שעל המסך<br> כמו כן,ניתן להחזיר עודף גם על ידי לחיצה במספרים על המקלדת<br> שקל=1, שני שקל=2, חמישה שקלים=5, עשרה שקלים=0<br>.לסיום לחץ על אנטר או על כפתור ההחזרה במסך<br> כל לקוח שנענה בצורה מושלמת יעניק לך לייק <br>:(...ואילו לקוח מאוכזב שלא נענה או קיבל עודף לא מתאים- יעניק לך דיסלייק <br> ,עם צבירת הלייקים תעלה לשלבים הבאים<br> עד לצבירת סכום מספק של לייקים שיעניק לך מדליה מאת השף <br> עליך להספיק לענות ללקוחות במסגרת זמן המשמרת שלך (לפי הטיימר בראש העמוד) <br> !שים לב <br>!קיים לקוח עצבני שאם הוא לא נענה בתוך זמן מה – הוא בורח ומשאיר אחריו דיסלייק<br> בהצלחה, סומכים עליך </p>';
    pageOfInstructions.style.display = "block";
    backFromInstructions.style.display = "block";
}
//פונקציה ליצירת הקולות
function makeNoise(name) {
    audio = document.createElement("audio");//יצירת אלמנט מסוג שמע
    audio.src = `../audio/${name}.mp3`;//יבוא השמע הרצוי
    audio.playbackRate = 1;//מהירות הפעלה
    audio.autoplay = "true";//אישור הפעלה
    document.body.appendChild(audio);//הוספת השמע לעמוד
}
//הגדרת פונקציה ליצירת לקוח עצבני
function creatPerson1() {
    person1.replaceChildren();//ניקוי נתונים קודמים מהדיב
    sumOfMoneyForFood = 0;//איפוס סכום הקניה
    let saveAllDataForAngry = document.getElementById("person1");//יבוא מקום התמונה ללקוח 1
    saveAllDataForAngry.append(addPerson());//קריאה לפונקציה ליצירת תמונת הלקוח
    saveAllDataForAngry.append(addFood());//קריאה לפונקציה ליצירת מאכלים
    saveAllDataForAngry.append(addMoney(1 - 1));//קריאה לפונקציה ליצירת סכום
    timerPer1();//קריאה לפונקציה להפעלת הטיימר ללקוח עצבני
};
//הגדרת פונקציה ליצירת לקוח=תמונת לקוח+מאכלים+סכום כסף
function addCustomer() {
    let nameOfPersonImg = "person" + whichPersonCreatNow;//משתנה עבור התמונה
    let saveAllDataOfCustumer = document.getElementById(nameOfPersonImg);//יבוא התמונה לבנא המתאים
    saveAllDataOfCustumer.append(addPerson());//קריאה לפונקציה לייצור תמונת הלקוח
    saveAllDataOfCustumer.append(addFood());//קריאה לפונקציה ליצירת מאכלים
    saveAllDataOfCustumer.append(addMoney(whichPersonCreatNow - 1));//קריאה לפונקציה ליצירת הסכום
}
//הגדרת פונקציה להוספת תמונת הלקוח
function addPerson() {
    let manPicture = document.createElement('div');//יצירת דיב אליו תוכנס התמונה
    let choosePerson = Math.ceil(Math.random() * 10);//הגרלת מספר תמונה ללקוח
    while (imgSrc(choosePerson) > 0) {//בדיקה האם הלקוח כבר קיים במסך
        choosePerson = Math.ceil(Math.random() * 10);
    }
    manPicture.innerHTML = `<img src="../pictures/person${choosePerson}.png" height=200px>`;//הכנסת תמונת הלקוח שנבחרה  לתוך הדיב
    return manPicture;//החזרת הדיב עבור שרשור כל הפרטים יחד
}
//פונקציה לבדיקת כפילות תמונות לקוחות במסך
function imgSrc(choosePerson) {
    let person = document.querySelectorAll(`img[src='../pictures/person${choosePerson}.png']`);
    return person.length;
}
//הגדרת פונקציה להוספת תמונות אוכל ללקוח
function addFood() {
    sumOfMoneyForFood = 0;//איפוס סכום המאכלים
    let food = document.createElement('div');//יצירת דיב אליו יכנסו המאכלים
    food.id = "allFood";
    let chooseFood = 0;//הגדרת משתנה לשמירת הערך המוגרל
    for (let i = 0; i < sizeOfLevel; i++) {//לולאה עבור יצירת מאכלים לפי השלב בו המשתמש נמצא
        let eachFood = document.createElement('div');//יצירת דיב אליו יוכנס כל מאכל
        chooseFood = Math.ceil(Math.random() * 7);//הגרלת מספר תמונה של מאכל
        eachFood.innerHTML = `<img src="../pictures/food${chooseFood}.png" height=50px>`//יבוא התמונה של המאכל הנבחר
        food.append(eachFood);//שירשור המאכל לתוך הדיב לשמירת המאכלים כולם
        sumOfMoneyForFood = sumOfMoneyForFood + arrOfPrice[chooseFood - 1];//הוספת מחיר המאכל לסכום הקניה כולה
    }
    return food;//החזרת דיב עם כל המאכלים
}
// הגדרת פונקציה להוספת הסכום שהלקוח נתן לקופאי
function addMoney(i) {
    let chooseMoney = Math.ceil(Math.random() * 20) + sumOfMoneyForFood;// הגרלת סכום שגבוה מסכום הקניה 
    let money = document.createElement('div');//יצירת דיב אליו יוכנס הסכום המוגרל
    money.id = "moneyFromCustumer";
    rest = chooseMoney - sumOfMoneyForFood;//חישוב העודף
    arrOfSum[i] = rest;//הכנסת העודף למקומו במערך העודפים של הלקוחות
    money.innerHTML = chooseMoney;//הכנסת הסכום שהוגרל לדיב
    return money;//החזרת הדיב עם הכסף המתאים
}
// הגדרת פונקציה למציאת הלקוח שמחזירים לו עכשיו עודף 
function countSum() {
    sum = 0;
    let who = this.id;
    person1.style.boxShadow = "none";
    person2.style.boxShadow = "none";
    person3.style.boxShadow = "none";
    person4.style.boxShadow = "none";
    this.style.boxShadow = " 0 1.5rem 5rem rgb(255, 217, 0)";;
    currentPerson = who[6];
    console.log(arrOfSum[currentPerson - 1])
};
//הגדרת פונקציות להוספת המטבעות לעודף
function add1() {
    sum = sum + 1;
    makeNoise("money");
    coins1.style.boxShadow = "0.1vw 0.1vw 2vh rgb(136,132,132)";
    window.setTimeout(function () { coins1.style.boxShadow = "none" }, 200);
};
function add2() {
    sum = sum + 2;
    makeNoise("money");
    coins2.style.boxShadow = "0  0.1rem 2rem rgb(136,132,132)";
    window.setTimeout(function () { coins2.style.boxShadow = "none" }, 200);
};
function add5() {
    sum = sum + 5;
    makeNoise("money");
    coins5.style.boxShadow = "0 0.1rem 2rem rgb(136,132,132)";
    window.setTimeout(function () { coins5.style.boxShadow = "none" }, 200);
};
function add10() {
    sum = sum + 10;
    makeNoise("money");
    coins10.style.boxShadow = "0 0.1rem 2rem rgb(136,132,132)";
    window.setTimeout(function () { coins10.style.boxShadow = "none" }, 200);
};
//הגדרת פונקציה הבודקת האם הסכום שהוחזר שווה לסכום שהיו צריכים להחזיר
function checkResult() {
    person1.style.boxShadow = "none";
    person2.style.boxShadow = "none";
    person3.style.boxShadow = "none";
    person4.style.boxShadow = "none";
    let i = currentPerson;
    let nameOfPerson = "person" + i;
    saveAllDataOfCustumer = document.getElementById(nameOfPerson);
    whichPersonCreatNow = currentPerson;
    if (arrOfSum[currentPerson - 1] === sum) {//אם הסכום מתאים
        saveAllDataOfCustumer.innerHTML = `<img src="../pictures/like.png" height=280vh>`;
        points = points + 1;//הוספת לייק
        checkPoints();//בדיקת מצב הלייקים ועדכון
        window.setTimeout(creatNewCusumer, 1000);//קריאה לפונקציה ליצירת לקוח חדש לאחר שניה
    }
    else {//אם הסכום לא מתאים
        saveAllDataOfCustumer.innerHTML = `<img src="../pictures/dislike.png" height=280vh>`;
        if (points > 0) {
            points = points - 1;//הורדת לייק
        }
        checkPoints();//בדיקת מצב הלייקים ועדכון
        window.setTimeout(creatNewCusumer, 1000);//קריאה לפונקציה ליצירת לקוח חדש לאחר שניה
    }
    //הגדרת פונקציה ליצירת לקוח חדש
    function creatNewCusumer() {
        saveAllDataOfCustumer.replaceChildren();//מחיקת כל הנתונים מהלקוח הנוכחי
        addCustomer();//הוספת לקוח חדש
    }
}
//הגדרת פונקציה לעדכון מצב הנקודות במסך ובזכרון
function savePoints() {
    userPoints.innerHTML = '<br>' + '<img src="../pictures/whiteLike.png" width=110vw>' + '<br>' + "הלייקים שלך : " + user.points;
    for (let i = 0; i < localStorage.length; i++) {
        let name = localStorage.key(i);
        let onPer = JSON.parse(localStorage.getItem(name))
        if (user.name == onPer.name) {
            localStorage.setItem(onPer.name, JSON.stringify(user));
            localStorage.setItem("Chef", JSON.stringify(user));
        }
    }
}
//הגדרת פונקציה לבדיקת מצב הנקודות עבור שינוים במשחק-שלבים או ניצחון
function checkPoints() {
    user.points = points;
    savePoints();//קריאה לפונקציה לשמירת הלייקים
    if (user.points < 10 && sizeOfLevel != 3) {
        sendLevel(1);//שליחה לפונקציה עבור שלב 1
    }
    if (user.points > 10 && user.points < 20 && sizeOfLevel != 4) {
        sendLevel(2)//שליחה לפונקציה עבור שלב 2
    }
    if (user.points > 20 && user.points < 30 && sizeOfLevel != 5) {
        sendLevel(3)//שליחה לפונקציה עבור שלב 3
    }
    if (user.points ===30) {//במקרה של נצחון
        win();//קריאה לפונקצית נצחון
    }
}
//פונקציה שמופעלת בעת שינוי שלב
function sendLevel(i) {
    stopTimmer();//קריא הלפונקציה לעצירת הטיימרים
    level.innerHTML = `<img src="../pictures/level${i}.gif">`;
    makeNoise("level");
    changeDispley();
    window.setTimeout(() => { window.location.assign(url = "../html/game.html") }, 5000);//שליחה לפונקציה להורדת ההודעה
}
//הגדרת פונקציה למקרה של ניצחון
function win() {
    stopTimmer();//עצירת טיימרים
    user.winnes++;
    user.points = 0;//איפוס הלייקים
    savePoints();//שמירת הלייקים
    changeDispley();
    level.innerHTML = `<img src="../pictures/win.gif">`;
    makeNoise("won");
}
//גיים אובר=פונקציה הנקראת כאשר נגמר הטיימר למשחק
function end() {
    stopTimmer();//עצירת הטיימרים
    person1.style.display = "none";
    person2.style.marginLeft = "17vw";
    menu.style.display = "none";
    lineOftimmer.style.display = "none";
    wordsOfTimmer.style.display = "none";
    makeNoise("lose");//קריאה לפונקציית השמע 
    level.innerHTML = `<img src="../pictures/gameOver.gif" height=100%>`;//הצגת הודעה על סיום הזמן
    buttons.style.display = "flex";//הקפצת הכפתורים עבור משחק חדש וחזרה לדף הבית
}
//פונקציה לחזרה למשחק
function backToGame() {
    backFromInstructions.style.display = "none";
    pageOfInstructions.style.display = "none";
    menu.style.display = "block";
    lineOftimmer.style.display = "block";
    wordsOfTimmer.style.display = "block";
    callTimmer();//חידוש טיימר המשחק
    timerPer1();//חידוש טיימר לקוח עצבני
}
//פונקציה לשינוים במסך המשחק בעת קפיצת הודעות
function changeDispley() {
    person3.style.display = "none";
    person4.style.display = "none";
    lineOftimmer.style.display = "none";
    menu.style.display = "none";
    wordsOfTimmer.style.display = "none";
    buttons.style.display = "flex";
}
//הגדרת פונקציות שמופעלות על ידי אונקליק
//שליחה למסך הבית
function sendToHome() {
    window.location.assign(url = "../html/homePage.html");
}
//חזרה למשחק
function sendToGame() {
    window.location.assign(url = "../html/game.html");
}