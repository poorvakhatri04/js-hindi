//Primitive
//7: String, Number, Boolean, null, undefined,symbol,BigInt

//reference or non-primitive
//Arrays, Objects, Functions

//dynamically typed language
const id=Symbol('123')
const id1=Symbol('123')
console.log(id===id1)//false
//BigInt-> add n to the number
const bign=346778237566347682372343797n

const hero=["shaktiman","krish"]//array
let myobj={
    name: "Poorva",
    age: 18
}//object

const myfunc=function(){
    console.log("Hello world")
}

console.log(typeof bign)//bigInt
const score=null
console.log(typeof score)//object
console.log(typeof myfunc)//function object
console.log(typeof hero)//object
console.log(typeof id)//symbol
//*****************************************

//stack memory(primitive) and heap memory(non primitive)
//stack->copy of variable
//heap->reference of variable
//objects will have similar reference to the same object
