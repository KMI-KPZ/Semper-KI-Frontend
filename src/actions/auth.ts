import axios, { AxiosHeaders } from "axios";
import { REGISTER_SUCCESS,REGISTER_FAIL } from "./types";
import { Dispatch } from "redux";

interface Register {
    username:string,
    password:string,
    re_password:string
}

export const register = ({username,password,re_password}:Register) => async (dispatch:Dispatch) => {
    const config = {
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    };

    const body = JSON.stringify({username,password,re_password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`,body,config);

        if(res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({type:REGISTER_SUCCESS});
        }

    } catch (err) {
        dispatch({type:REGISTER_FAIL});
    }
}