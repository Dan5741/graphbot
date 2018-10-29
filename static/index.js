$(function () {
questions(0)

////global variables
inputs = new FormData()

logic = 0;
categories = 0;
dataz = ''
type = ''


/////
$(document).keypress(function(e) {
    if(e.which == 13) {
        $("#sendbtn").click()
    }
});


$(document).on('click', '#sendbtn', () => {
      if ($("#input_text").val() == '')
      {
        return;
      }

      if (logic == 0)
      {
        console.log($("#input_text").val())
        type = $("#input_text").val()
        inputs.append('type',$("#input_text").val())
        first = 'no'
        user_input()
        questions(1)
        logic ++
      }

      else if (logic == 1 )
      {
        console.log($("#input_text").val())
        inputs.append('title',$("#input_text").val())
        user_input()
        if (type == 'bar' || type =='line')
        {
          questions(2)
        }
        else if(type=='pie')
        {
          questions(3)
        }

        logic ++
      }
      else if (logic == 2)
      {
        console.log($("#input_text").val())
        inputs.append('data',$("#input_text").val())
        user_input()

        questions(4)
      }






    })

})










// bot output

questions = (int) =>{

if (int == 0)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>What type of chart?  </div> </div>')
}
else if (int == 1)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>What is the title of your chart?</div> </div>')
}
else if (int == 2)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>Please enter the data in the following format Category,1,2,3:Category,1,2,3</div> </div>')
}
else if (int == 3)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>Please enter the data in the following format Category,23:Category,65</div> </div>')
}

else if (int ==4)
{
  $.ajax({
        type:'POST',
        url:'http://localhost:5000/send',
        data:inputs,
  processData: false,
  contentType:false,
        success:function(data){
            console.log(data)
  source = 'data:image/jpeg;base64,' + data
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b><img style="width:55%;height:auto;" src="'+ source +'"/></div> </div>')
  inputs = new FormData()
  questions(0)
  logic = 0;
  categories = 0;
  dataz = ''
  type =''
  var objDiv = document.getElementById("inner");
  objDiv.scrollTop = objDiv.scrollHeight;
        }
    })
}
var objDiv = document.getElementById("inner");
objDiv.scrollTop = objDiv.scrollHeight;

}

// user output

user_input = ()=>{
  $("#inner_text").append('<div class="row"> <div class="col text-right"><b>User: </b>'+$("#input_text").val()+'</div> </div>')
  $("#input_text").val('')
  var objDiv = document.getElementById("inner");
  objDiv.scrollTop = objDiv.scrollHeight;

}
