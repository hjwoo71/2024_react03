import React, { useState } from 'react';

//실제 DB를 수정하자
// Create : POST
// Read   : GET
// Update : PUT
// Delete : DELETE

function Word({word}) {
  const [wo , setWo] = useState(false);
  const[isShow, setIsShow] = useState(false);
  const [isDone,setIsDone] = useState(word.isDone);
  
  function toggleShow(params) {
    setIsShow(!isShow)
  }
  
  // JSON.stringify : 객체를 json으로 변경(보낼때)
  // response.json()메서드를 호출하면 JSON 데이터를 javascript 객체로 변환한다.(받을때)
  function toggleDone() {
    fetch(`http://localhost:3010/words/${word.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone, // Toggling the 'isDone' status
      })
    })
    .then(res => {
      if (res.ok) {
        setIsDone(!isDone); // Update the state if the request is successful
      } else {
        console.error("Failed to update word:", res.status);
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Catch any error during fetch
    });
  }

  function del(params){
      if(window.confirm('정말 삭제할까요?')){
        fetch(`http://localhost:3010/words/${word.id}`, {
          method: 'DELETE',
        })
        .then(res => {
          if (res.ok) {
            // 상태를 초기화 랜더링을 하고
            setWo({id:0 })
          } 
        })
        .catch((error) => console.error("Error:", error));
       }
  } 
  // id가 0 이면 아무런 랜더링하지 않는다.
  // 컴포넌트가 null 리턴하면 랜더링을 하지 않는다.
  // 삭제 후 UI에서 내용을 감추는 역할을 한다.
  if (wo.id === 0){
     return null;
  }
  return (
    <tr className={isDone ? "off" : ""} >
      <td><input type='checkbox' checked={isDone} onChange={toggleDone} /></td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'} </button>
        <button onClick={del }class="btn_del">삭제</button>
      </td>
    </tr>  
  );
}

export default Word;