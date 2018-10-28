$(function () {
$("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b> What type of chart? </div> </div>')
   
question_int = 0;
var dataz =''
categories = 0;
inputs = new FormData()

$(document).on('click', '#sendbtn', () => {
      if ($("#input_text").val() == '')
      {
        return;
      }

           
            switch (question_int) {
                case 0:
                   question = 'What type of chart?'
                   sendbtn()
                   break;
                case 1:
                question = 'What is the title of your chart?'
                sendbtn()
                break;
                case 2:
                question = 'How many categories will you have?'
                sendbtn()
                break;
                case 3:
                question = 'What is the category name?'
                sendbtn()
                break;
		case 4:
                question = 'Enter the data separated by commas'
                sendbtn()
                break;
		
                
            }
            
           
        


    })



})

sendbtn = () =>{
   $("#inner_text").append('<div class="row"> <div class="col text-left"><b>You: </b>'+ $("#input_text").val('') +'</div> </div>')
   $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>'+ question +'</div> </div>')
  
   if (question_int == 0 )
{
	inputs.append('type',$("#input_text").val().toLowerCase()))
}
else if (question_int ==1 )
{
	inputs.append('title',$("#input_text").val())	
}
else if (question_int ==2 )
{
		
categories = $("#input_text").val()
}
else if (question_int == 3 )
{
	if (dataz == ''){
dataz = $("#input_text").val()
}
else{
dataz = dataz + ':' + $("#input_text").val()
}
}
else if (question_int == 4 )
{
categories = categories - 1
if categories > 0
{
	question_int = 2
	dataz = ',' + $("#input_text").val()
	
}
else if (categories == 0){
	dataz = ',' + $("#input_text").val()
	inputs.append('data',dataz)
$.ajax({
        type:'POST',
        url:'http://localhost:5000/send',
        data:inputs,
	processData: false,
	contentType:false,
        success:function(data){
            console.log(data)
source = 'data:image/jpeg;base64,' + data
$("#hello").attr('src',source)
        }
    })	
}
}





    		question_int ++ 
	 $("#input_text").val('')
    
// scroll down
var objDiv = document.getElementById("inner");
objDiv.scrollTop = objDiv.scrollHeight;
}

dataz = new FormData()
sub1 = 'firefox,25'
sub2 = 'safari,75'
main = sub1 + ':' + sub2

dataz.append('title','yo')
dataz.append('data',main)
dataz.append('type','pie')
    
