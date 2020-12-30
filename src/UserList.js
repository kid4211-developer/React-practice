import React from 'react';

function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user; //비구조화 할당을 통한 변수 선언
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
