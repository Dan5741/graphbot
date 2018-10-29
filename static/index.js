$(function () {
questions(0)

////global variables
inputs = new FormData()

logic = 0;
categories = 0;
dataz = ''


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
        inputs.append('type',$("#input_text").val())
        first = 'no'
        user_input()
        questions(1)
        logic ++
      }

      else if (logic == 1 )
      {
        inputs.append('title',$("#input_text").val())
        user_input()
        questions(2)
        logic ++
      }
      else if (logic ==2)
      {
        categories = $("#input_text").val() -1
        user_input()
        questions(3)
        logic ++

      }
      else if (logic == 3)
      {
        if (dataz == '')
        {
          dataz = $("#input_text").val()

        }
        else{
          dataz = dataz + ':' + $("#input_text").val()

        }
        user_input()
        questions(4)
        logic ++
      }
      else if (logic == 4)
      {
        if (categories > 0)
        {
          categories = categories - 1
          logic = logic - 1
          dataz = dataz + ',' + $("#input_text").val()
          user_input()
          questions(3)
        }
        else if (categories == 0)
        {
          dataz = dataz + ',' + $("#input_text").val()
          user_input()

          inputs.append('data',dataz)
          questions(5)

        }
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
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>How many categories?</div> </div>')
}
else if (int == 3)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>What is the name of the category?</div> </div>')
}
else if (int == 4)
{
  $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>Enter the data of the category separated by commas</div> </div>')
}
else if (int ==5)
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


category_logic = ()=>{



}
