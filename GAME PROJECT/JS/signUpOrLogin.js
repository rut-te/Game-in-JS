let currentPerson = {//הגדרת בנא לברירת מחדל וכן לשמירת פרטי המשחק הנוכחי 
    name: 'Chef',
    mail: ' ',
    password: '',
    points: 0,
    winnes: 0,
    first: true
}
let user = {//הגדרת המשתמשים
    name: ' ',
    mail: ' ',
    password: '',
    points: 0,
    winnes: 0,
    first: true
}
localStorage.setItem(currentPerson.name, JSON.stringify(currentPerson));//שמירה ברירת המחדל בזיכרון
let formOfSignUp = document.querySelector("#formOfSignUp");//יבוא sign up
formOfSignUp.addEventListener("submit", addPersonInSignUp);//sign up יצירת ארוע הקורא לפונקציה לבדיקת 
let formOfLogin = document.querySelector("#formOfLogin");//יבוא login
formOfLogin.addEventListener("submit", addPersonInLogin);//login יצירת ארוע הקורא לפונקציה לבדיקת 
let perNow;
let nameNow;
let flagIfPersonConect;
//sign up פונקציה להשמת משתמש דרך  
function addPersonInSignUp(e) {
    e.preventDefault();
    flagIfPersonConect = true;
    user.name = document.getElementById("nameOfSignUp").value;//יבוא שם המשתמש
    user.mail = document.getElementById("mailOfSignUp").value;//יבוא מייל המשתמש
    user.password = document.getElementById("passwordOfSignUp").value//יבוא קוד המשתמש
    for (let i = 0; i < localStorage.length; i++)//בדיקה האם המשתמש קיים
    {
        nameNow = localStorage.key(i);//מציאת המשתמש על ידי שמו 
        perNow = JSON.parse(localStorage.getItem(nameNow))//יבוא כל פרטי המשתמש
        if (user.mail === "" || user.name === "" || user.password === "")//אם המשתמש לא הכניס פרטים
        {
            alert("הכנס פרטים");
            return;
        }

        if (user.mail === perNow.mail)//אם המייל כבר קיים במערכת
        {
            alert("שגיאה בקבלת פרטים, נסה שנית או התחבר");
            flagIfPersonConect = false;
        }
    }
    if (flagIfPersonConect)//אם כל הפרטים תקינים
    {
        localStorage.setItem(currentPerson.name, JSON.stringify(user))//שמירת פרטי המשתמש כמשתמש נוכחי
        localStorage.setItem(user.name, JSON.stringify(user))//שמירת פרטי משתמש
        window.location.assign("../html/homePage.html");//העברה לדף הבית

    }

}
//פונקציה לכניסת משתמש קיים
function addPersonInLogin(e) {
    e.preventDefault();
    flagIfPersonConect = false;
    user.name = document.getElementById("nameOfLogin").value;//יבוא שם המשתמש
    user.password = document.getElementById("passwordOfLogin").value;//יבוא הסיסמה
    if (user.name === "" || user.password === "")//במקרה שהמשתמש לא הכניס פרטים
    {

        alert("הכנס פרטים");
        return;
    }
    for (let i = 0; i < localStorage.length; i++)//חיפוש המשתמש בזיכון
    {
        nameNow = localStorage.key(i);//מציאת המשתמש על ידי שמו
        perNow = JSON.parse(localStorage.getItem(nameNow));//יבוא כל פרטי המשתמש
        if (user.name === perNow.name)//אם השם משתמש זהה
        {
            if (user.password === perNow.password)//אם גם הסיסמה זהה
            {
                user.mail = perNow.mail;//שמירת פרטי המשתמש 
                user.points = perNow.points;
                user.winnes = perNow.winnes;
                flagIfPersonConect = true;
                localStorage.setItem(currentPerson.name, JSON.stringify(user))//שמירת פרטי המשתמש למשתמש הנוכחי
                localStorage.setItem(user.name, JSON.stringify(user))//שמירת כל הנתונים למשתמש
                window.location.assign("../html/homePage.html");
            }
            else {
                flagIfPersonConect = true;
                alert("פרטים שגויים, הכנס שנית או התחבר");
            }
        }
    }
    if (!flagIfPersonConect)//אם המשתמש לא קיים
    {
        alert("התחבר");
    }
}
//localStorage.clear();