let taskId = 0; // タスクのIDを管理するための変数




$("#add").on("click",function(e){
    e.preventDefault();//ボタンクリックによるページのリロードを防ぐ
    const taskName = $("#taskName").val();
    const html =`<tr id="task${taskId}" class="taskRow"><th>`+ taskName + `</th></tr>
                 <tr id="taskDetail${taskId}" class="taskDetail" style="display: none;">
                    <td><input type="text" class="detailInput" placeholder="ToDo詳細"></td>
                    <td><input type="number" class="timeInput" placeholder="時間（分）"></td>
                    <td><button class="addDetail" data-id="${taskId}">詳細追加</button></td>
                    <td><button class="deleteTask" data-id="${taskId}">削除</button></td>
                 </tr>`;  
    $("#taskList").append(html);
    $("#taskName").val("");//入力フィールドをクリアする
    taskId++; // 次のタスクのためにIDをインクリメントする
});

// タスクリストの行がクリックされたときの動作
$(document).on("click", ".taskRow", function() {
    const id = $(this).attr('id');
    const detailId = "#taskDetail" + id.substring(4); // 関連する詳細行のIDを取得する
    $(detailId).toggle(); // タスク詳細の入力フィールドと時間フィールドを表示/非表示にする
});

// 詳細追加ボタンがクリックされた時の動作
$(document).on("click", ".addDetail", function() {
    const id = $(this).data('id');
    const html =`<tr id="taskDetail${taskId}" class="taskDetail">
                    <td><input type="text" class="detailInput" placeholder="ToDo詳細"></td>
                    <td><input type="number" class="timeInput" placeholder="時間（分）"></td>
                    <td><button class="addDetail" data-id="${taskId}">詳細追加</button></td>
                    <td><button class="deleteTask" data-id="${taskId}">削除</button></td>
                 </tr>`; 
    $(`#taskDetail${id}`).after(html); // クリックされた詳細追加ボタンの後ろに新しい詳細行を追加する
    taskId++;
});

// 削除ボタンがクリックされた時の動作
$(document).on("click", ".deleteTask", function() {
    const id = $(this).data('id');
    $("#taskDetail" + id).remove(); // 詳細行を削除する
});

// セットボタンがクリックされた時の動作
$("#set").on("click", function() {
    let todaysTasksHtml = '<tr><th>本日のToDo</th></tr>';
    $(".detailInput").each(function() {
        const detail = $(this).val();
        const time = $(this).parent().next().find(".timeInput").val();
        localStorage.setItem(detail,time);//ローカルストレージに保存
        todaysTasksHtml += `<tr><td>${detail}</td><td>${time}分</td></tr>`;
    });
    $("#todaysTasks").html(todaysTasksHtml); // 本日のToDoリストに追加する
});

// 全削除ボタンがクリックされた時の動作
$("#deleteAll").on("click", function() {
    $(".taskDetail").remove(); // 全ての詳細行を削除する
    localStorage.clear();//ローカルストレージの保存データを全削除
});

for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const html=`
    <tr>
        <th>${key}</th>
        <td>${value}分</td>
    </tr>
    `
    $("#todaysTasks").append(html).css({'text-align':'left'});//左詰めで登録
}