import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {BoardPage} from './pages/BoardPage';
import {IssueDetailPage} from './pages/IssueDetailPage';
import "./App.css"
import {Layout} from "./components/layout/Layout";

export const App = () => {

    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/board" element={<BoardPage/>}/>
                    <Route path="/issue/:id" element={<IssueDetailPage/>}/>
                    <Route path="*" element={<Navigate to="/board"/>}/>
                </Route>
            </Routes>
        </Router>
    );
}