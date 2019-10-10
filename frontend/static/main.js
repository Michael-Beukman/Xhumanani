function main() {
  $("#btnSensd").on('click', () => {
    value = $("#inpData").attr('value');
    $.post("http://127.0.0.1:5000/get", { lol: data }, function (data, status) {
      console.log(data)
      document.getElementById('messages').innerHTML += '<br>' + data.data
      //    console.log("Data: " + JSON.parse(data) + "\nStatus: " + status);
    });
  })
  $(".selectpicker").on('change', ()=>{
    console.log("heyss")
      $("#allmessages").html('')
  });
}
function sendMessage() {
  console.log('hey');
  // document.getElementById('inpMessage')
  const inp = document.getElementById('inpMessage');
  const value = inp.value
  inp.value = '';
  console.log(value);
  // make our own message block
  var d = new Date();

  var datestring = d.getHours() + ":" + d.getMinutes();
  const addToMessages = (value, datestring, classname='')=>{
    
    const isHuman = classname==='';
    const margins = (isHuman ? 'margin-left' : 'margin-right') +":15px;"
    const icon = `  <div class="img_cont_msg" style="${margins}">
    <i class='fas fa-2x fa-${isHuman? 'user' : 'robot'}'></i>
  </div>`
  const msg = `
  <div class="msg_cotainer${classname}">
    ${value}
    <span class="msg_time">${datestring}</span>
  </div>`;
  const main = isHuman ? msg + icon : icon + msg;
    return `							
  <div class="d-flex justify-content-${isHuman ? 'end' : 'start'} mb-4">
    ${main}
</div>`};
  document.getElementById('allmessages').innerHTML += addToMessages(value, datestring)

  document.getElementById('allmessages').scrollTo({top: document.getElementById("allmessages").getBoundingClientRect().height +10000});
  const zfill = (num, d=2) => {
    let s = num.toString();
    while (s.length < d){
      s = '0' + s;
    }
  };
  // send to server
  $.post("http://127.0.0.1:5000/get", { text: value, language: $(".selectpicker").val()}, function (data, status) {
      data = JSON.parse(data);
      console.log(data + ' response');
      var d = new Date();

      var datestring = d.getHours() + ":" + zfill(d.getMinutes());
      document.getElementById('allmessages').innerHTML += addToMessages(data.response, datestring, '_send')
      document.getElementById('allmessages').scrollTo({top: document.getElementById("allmessages").getBoundingClientRect().height +10000});
    });
}
$(document).ready(function () {
  $('#action_menu_btn').click(function () {
    $('.action_menu').toggle();
  });

  $("#btnSend").on('click', sendMessage);
  $("#inpMessage").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      sendMessage();
    }
  });
  main();
});



console.log('running')