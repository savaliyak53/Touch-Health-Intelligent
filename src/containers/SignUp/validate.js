export function phone_number_mask() {
    var myMask = "(___) ___-____";
    var myCaja = document.getElementById("phoneNumber");
    var myText = "";
    var myNumbers = [];
    var myOutPut = ""
    var theLastPos = 1;
    myText = myCaja.value;
    //get numbers
    for (var i = 0; i < myText.length; i++) {
      if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
        myNumbers.push(myText.charAt(i));
      }
    }
    //write over mask
    for (var j = 0; j < myMask.length; j++) {
      if (myMask.charAt(j) == "_") { //replace "_" by a number 
        if (myNumbers.length == 0)
          myOutPut = myOutPut + myMask.charAt(j);
        else {
          myOutPut = myOutPut + myNumbers.shift();
          theLastPos = j + 1; //set caret position
        }
      } else {
        myOutPut = myOutPut + myMask.charAt(j);
      }
    }
    document.getElementById("phoneNumber").nodeValue = myOutPut;
    document.getElementById("phoneNumber").setSelectionRange(theLastPos, theLastPos);
  }
  
  document.getElementById("phoneNumber").onkeydown = validate_int;
  document.getElementById("phoneNumber").onkeyup = phone_number_mask;