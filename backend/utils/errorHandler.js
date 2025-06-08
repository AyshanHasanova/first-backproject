// class Insanlar{
//     constructor(ad,soyad,cins){
//         this.firstName=ad
//         this.surName = soyad
//         this.gender = cins
//     }
//     melumatlariEkranaYanst(){
//         console.log(`Mit telebesi ${this.firstName}`)
//     }
// }
// const newHuman1 = new Insanlar("Ayshan","Hesenova","Female")
// newHuman1.melumatlariEkranaYanst()

// // function People(ad,soyad,cins){
// //     this.firstName = ad
// //     this.surName = soyad
// //     this.gender =cins
// // }

// class Telebler extends Insanlar{
//     constructor(ad,soyad,cins,qiymet){
//         super(ad,soyad,cins)
//         this.grade = qiymet
//     }
// }


// class Muellimler extends Insanlar{
//     constructor(ad,soyad,cins,derece){
//         super(ad,soyad,cins)
//         this.status = derece
//     }
// }






// const telebe1= new Telebler("Aysen","Hesenova","female","A")
// console.log(telebe1)
// const muellim1 = new Muellimler("Anvar","Khalid","male","MCT")
// console.log(muellim1)

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor)
    }
    
}

export default ErrorHandler



