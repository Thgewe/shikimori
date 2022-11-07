import React, {useEffect} from 'react';
import {routes} from "../routes";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {shadeSlice} from "../store/reducers/ShadeSlice";
import {locationSlice} from "../store/reducers/LocationSlice";

const AppRouter = () => {

    const dispatch = useAppDispatch()
    const {hideShade} = shadeSlice.actions
    const {changeLocation} = locationSlice.actions
    // const locationState = useAppSelector(state => state.locationReducer)
    const location = useLocation()
    useEffect(() => {
        dispatch(hideShade())
        if (location.pathname.match(/^\/[a-z]*/)) {
            dispatch(changeLocation(location.pathname.match(/^\/[a-z]*/)![0]))
        }
    }, [location.pathname])

    return (
        <Routes>
            {routes.map((route) =>
                <Route
                    key={route.name}
                    path={route.path}
                    element={<route.component />}
                />
            )}
            <Route path={'*'} element={<Navigate to={'/'} />}/>
        </Routes>
    );
};

export default AppRouter;