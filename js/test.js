//addボタンを押下した時の挙動
$("#add").on("click",function(e){
    e.preventDefault();//ボタンクリックによるページのリロードを防ぐ
    const taskName = $("#taskName").val();
    const html =`<tr><th>`+ taskName + `</th></tr>`;  
    $("#taskList").append(html);
    $("#taskName").val("");//入力フィールドをクリアする
})