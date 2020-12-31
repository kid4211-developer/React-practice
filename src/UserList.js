import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user; //비구조화 할당을 통한 변수 선언
    /* App.js에 rendering 단계에서 총 3개의 users 요소가 있으므로 User Component의 useEffect는 총 3번 실행됨
     * Component가 사라지는 경우는 return을 통해 함수를 반환해줌
    useEffect(() => {
         * Component가 mount될때 하는 작업
         * 1. props -> state : Props로 받은 값을 Component의 state로 설정
         * 2. REST API : 외부 API를 요청하는 경우
         * 3. Library를 사용 하는 경우
         * 4. setInterval, setTimeout 등을 사용하는 경우
         * useEffect에서 함수가 호출되는 시점에서는 UI가 화면에 나타난 시점 이후라서 바로 DOM에 접근할수 있음
         *
        console.log('컴포넌트가 Mount 됨');
        return () => {
             * Component가 unMount될때 하는 작업
             * 1. clearInterval, clearTimeout 등을 사용하는 경우
             * 2. Library Instance를 제거하는 경우
             *
            console.log('컴포넌트가 unMount 됨');
        };
    }, []);
    */

    /* props로 받은 값을 사용 하고자 한다면 deps로 [props]를 등록해야 한다.
     * [user]와 같이 등록하게 되면 user값이 업데이트 될떄마다 useEffect를 통해 나타남 */
    useEffect(() => {
        console.log('user값이 업데이트된 후');
        console.log(user);
        return () => {
            console.log('user값이 업데이트되기 전');
            console.log(user);
        };
    }, [user]);

    return (
        <div>
            {/* 이벤트에 함수를 걸어줄땐 반드시 익명함수형태로 선언해줘야 함
             * 만약 onClick={onRemove(id)} 형태로 compile이 된다면
             * 컴파일이 되는 과정중에 반복적인 삭제가 이루어짐 */}
            {/* React에서 style={ } 기본적으로 중괄호를 통해 선언된다.
             * 만약 스타일 요소가 배열객체라면 style={{color:'', cursor:''}}
             * 식으로 이중 중괄호를 선언해줘야함 */}
            <button onClick={() => onRemove(id)}>삭제</button>
            <b
                style={{ color: active ? 'green' : 'black', cursor: 'pointer' }}
                onClick={() => onToggle(id)}
            >
                &nbsp;{username}
            </b>{' '}
            <span>({email})</span>
        </div>
    );
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default UserList;
