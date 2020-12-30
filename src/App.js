import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
    });

    const { username, email } = inputs; // 비구조화 할당을 통해 각 비열값을 추출해줌

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true,
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false,
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false,
        },
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        /* 기존의 배열에 새항목을 추가하는 방법
         * 1. 전개연사자
         * 2. concat 함수 사용
         */
        const user = {
            id: nextId.current,
            username,
            email,
        };
        setUsers([...users, user]);

        setInputs({
            username: '',
            email: '',
        });
        nextId.current += 1;
    };

    const onRemove = (id) => {
        /* user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
         * user.id 가 id 인 요소는 제외하고 배열로 추출함 */
        setUsers(users.filter((user) => user.id !== id));
    };

    /* 불변성을 지키면서도 배열을 업데이트할때 map함수가 사용됨
     * users의 객체들을 user로 받아서 삼항연산자를 통해 조건에 부합하는
     * 객체만 값을 업데이트 해준다 */
    const onToggle = (id) => {
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
    };
    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default App;
