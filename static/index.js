$(function () {
// first question:
$("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>What type of chart?  </div> </div>')


//global
var initial = 'yes'
var id;


//

// pressing enter is the same as pressing send button
$(document).keypress(function(e) {
    if(e.which == 13) {
        $("#sendbtn").click()
    }
});

// press send button
$(document).on('click', '#sendbtn', () => {

if (first == 'yes')
{
  unique_identifier()
  logs = new FormData()
  logs.append('id',id)
  logs.append('user_input',$("#input_text").val())
  user_input()
  send_data()

}
else if (first ='no')
{

  logs = new FormData()
  logs.append('id',id)
  logs.append('user_input',$("#input_text").val())
  user_input()
  send_data()
}

  logs = new FormData()
  console.log($("#input_text").val())
  logs.append('user_input',$("#input_text").val())
  user_input()


    })

})










// bot output



// user output

user_input = ()=>{
  $("#inner_text").append('<div class="row"> <div class="col text-right"><b>User: </b>'+$("#input_text").val()+'</div> </div>')
  $("#input_text").val('')
  var objDiv = document.getElementById("inner");
  objDiv.scrollTop = objDiv.scrollHeight;

}

// unique identifier

unique_identifier = ()=>{
var id;
  $.ajax({
        type:'POST',
        url:'http://localhost:5000/getid',
        data:logs,
        processData: false,
        contentType:false,
        error:function(error){
          console.log(error)
        },
        success:function(data){
          console.log(data)
          id = data
        }
    })

}

scroll_down = () =>{
  ar objDiv = document.getElementById("inner");
  objDiv.scrollTop = objDiv.scrollHeight;
}

send_data = ()=>{

  $.ajax({
        type:'POST',
        data: logs,
        url:'http://localhost:5000/sendout',
        processData: false,
        contentType:false,
        success:function(data){
          console.log(data)


          if (data.length > 200)
          {
            source = 'data:image/jpeg;base64,' + data
            $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b><img style="width:55%;height:auto;" src="'+ source +'"/></div> </div>')
            scroll_down()
            first = 'yes'
          }
          else if (data.length < 200)
          {
              $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>'+ data +'</div> </div>')
              scroll_down()
          }

            logs = new FormData()
        }
    })

}
