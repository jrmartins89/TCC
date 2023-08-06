import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/boarduser";
import BoardModerator from "./components/boardmoderator";
import BoardAdmin from "./components/boardadmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
const App = () => {
    // ...
}

export default App;