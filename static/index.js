$(function () {
    $.ajax({
        type:'POST',
        url:'http://localhost:5000/webhook',
        data:JSON.stringify({result:'hello',action:'yo'}),
        enctype:JSON,
        success:function(data){
            console.log(data)
        }
    })
    $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b> What type of chart? </div> </div>')
    
    question_int = 0;
    question_int ++;
    inputs = []
    $(document).on('click', '#sendbtn', () => {
        if ($("#input_text").val() == '')
        {
          return;
        }

           
            switch (question_int) {
                case 0:
                    question = 'What chart do you want?'
                   sendbtn()
                   break;
                case 1:
               
                question = 'What type of ' +  $("#input_text").val() + "?"
                sendbtn()
                break;
                case 2:
                question = 'What is your data?'
                sendbtn()
                break;
                case 3:
                question = 'Here is your chart:'
                question_int = -1;
                
                inputs = []
                sendbtn()
                break;
                
            }
            
           
        


    })



})

sendbtn = () =>{
    
    inputs.push($("#input_text").val())
    console.log(inputs[0])
    console.log(...inputs)
    $("#inner_text").append('<div class="row text-right"> <div class="col"><b>You: </b>'+ $("#input_text").val() + ' </div> </div>')
    $("#inner_text").append('<div class="row"> <div class="col text-left"><b>Bot: </b>'+ question +'</div> </div>')
    console.log('<div class="row"> <div class="col text-left"><b>Bot: </b>'+ question +'</div> </div>')
   
    $("#input_text").val('')

    question_int ++ 

    var objDiv = document.getElementById("inner");
    objDiv.scrollTop = objDiv.scrollHeight;
}