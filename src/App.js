import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter((user) => user.active).length;
}

const initialState = {
    /* useInputs에서 관리하므로 더이상 필요없음
    inputs: {
        username: '',
        email: '',
    }, */
    users: [
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
    ],
};

function reducer(state, action) {
    switch (action.type) {
        /* useInputs.js를 사용하므로써 App.js에서 별도의 관리가 필요없어짐 
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value,
                },
            }; */
        case 'CREATE_USER':
            return {
                /* useState를 사용해서 구현할때에는 inputs를 날리는 작업 따로하고
                 * users 배열 업데이트하는 작업 따로 했었음
                 * 'CREATE_USER'에 해당하는 action이 동작하면 동시에 처리할수 있게됨 */
                inputs: initialState.inputs,
                users: state.users.concat(action.user),
            };
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map((user) =>
                    /* 삼항연산자 + map 함수 */
                    user.id === action.id
                        ? { ...user, active: !user.active }
                        : user
                ),
            };
        case 'REMOVE_USER':
            return {
                ...state,
                /* filter함수를 통해 조건에 해당하는 경우에 배열에서 걸러지게 됨 */
                users: state.users.filter((user) => user.id !== action.id),
            };
        default:
            return state;
    }
}

function App() {
    const [{ username, email }, onChange, reset] = useInputs({
        username: '',
        email: '',
    });
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email,
            },
        });
        nextId.current += 1;
        reset();
    }, [username, email, reset]); /* 상태를 의존하는 값을 등록해줌 */

    const onToggle = useCallback((id) => {
        dispatch({
            type: 'TOGGLE_USER',
            id,
        });
    }, []);

    const onRemove = useCallback((id) => {
        dispatch({
            type: 'REMOVE_USER',
            id,
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
            <div>활성사용자 수 : {count}</div>
        </>
    );
}

export default App;
