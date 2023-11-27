import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
// 쿼리를 사용하기 위한 클라이언트 객체 생성
const qeuryClient = new QueryClient();
root.render(
    // 쿼리 클라이언트를 제공받고자 하는 컴포넌트를 감싸준다.
    <QueryClientProvider client={qeuryClient}>
        <App />
    </QueryClientProvider>
);