var user = {id:0}
var urlz ='http://localhost:5000'
$(function () {
// first question:
$("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>What type of chart?  </div> </div>')


//global
var initial = 'yes'

var first = 'yes'
var logs = new FormData()


//

// pressing enter is the same as pressing send button
$(document).keypress(function(e) {
    if(e.which == 13) {
        $("#sendbtn").click()
    }
});

// press send button
$(document).on('click', '#sendbtn', () => {
console.log(first)
if (first == 'yes')
{
  unique_identifier()
  first ='no'



}
else if (first ='no')
{
  console.log('wtf')
  console.log(user.id)
  logs.append('id',user.id)
  logs.append('user_input',$("#input_text").val())
  user_input()
  $.ajax({
        type:'POST',
        data: logs,
        url:urlz +'/sendout',
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
  replacement = new FormData()
  $.ajax({
        type:'POST',
        url:urlz+'/getid',
        data:replacement,
        processData: false,
        contentType:false,
        async:false,
        error:function(error){
          console.log(error)
        },
        success:function(data){
          user.id = data
          console.log(data)
          first = 'no'
          logs = new FormData()
          logs.append('id',user.id)
          logs.append('user_input',$("#input_text").val())
          user_input()
          $.ajax({
                type:'POST',
                data: logs,
                async:false,
                url:urlz+'/sendout',
                processData: false,
                contentType:false,

                success:function(data){
                  console.log(data.length)


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
                        first = 'no'
                      scroll_down()
                  }

                    logs = new FormData()
                }
            })
        }
    })

}

scroll_down = () =>{
  var objDiv = document.getElementById("inner");
  objDiv.scrollTop = objDiv.scrollHeight;
}

send_data = ()=>{



}
